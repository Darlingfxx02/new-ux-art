import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ScrollBlurTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** Максимум blur в пикселях у ещё не раскрытой буквы. */
  maxBlur?: number;
  /** Сдвиг по Y для не раскрытой буквы (px). 0 — без движения. */
  translateY?: number;
  /** Минимальная opacity у не раскрытой буквы. */
  minOpacity?: number;
  /** Максимальный letter-spacing (в em) у не раскрытой буквы. Применяется только при align="left". */
  maxSpacing?: number;
  /** Выравнивание текста. Letter-spacing раздвигается только для "left". */
  align?: "left" | "center" | "right";
  /**
   * Доля диагонали (0..1), которую занимает «волна» раскрытия.
   * Чем больше — тем мягче градиент между соседними буквами.
   */
  waveWidth?: number;
  /**
   * Вес горизонтальной оси в диагональной прогрессии (0..1).
   * 0 — чисто сверху вниз (по строкам), 1 — слева направо внутри строки тоже.
   */
  horizontalBias?: number;
  /**
   * Отступ от края вьюпорта (px), при котором текст уже полностью раскрыт.
   */
  edgeOffset?: number;
  /**
   * Повторно размывать текст при уходе вверх за край экрана.
   * По умолчанию true — волна выхода идёт в обратном направлении
   * относительно входа (нижние/правые буквы блюрятся первыми).
   */
  blurOnExit?: boolean;
  /**
   * Гранулярность анимации: "letter" — каждая буква независимо,
   * "word" — слово как единое целое (все буквы в слове одновременно).
   */
  granularity?: "letter" | "word";
};

export function ScrollBlurText({
  children,
  as = "span",
  className,
  style,
  maxBlur = 14,
  translateY = 8,
  minOpacity = 0.2,
  maxSpacing = 0.18,
  align = "left",
  waveWidth = 1.1,
  horizontalBias = 0.45,
  edgeOffset = 100,
  blurOnExit = true,
  granularity = "letter",
}: ScrollBlurTextProps) {
  const effectiveSpacing = align === "left" ? maxSpacing : 0;
  const effectiveTranslateY = align === "left" ? 0 : translateY;
  const containerRef = useRef<HTMLElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const tokens = useMemo(() => children.split(/(\s+)/), [children]);
  const totalLetters = useMemo(
    () =>
      tokens.reduce(
        (acc, t) => (/^\s+$/.test(t) ? acc : acc + [...t].length),
        0,
      ),
    [tokens],
  );
  const letterToWord = useMemo(() => {
    const map: number[] = [];
    let wordIdx = 0;
    tokens.forEach((chunk) => {
      if (/^\s+$/.test(chunk)) return;
      const len = [...chunk].length;
      for (let i = 0; i < len; i += 1) map.push(wordIdx);
      wordIdx += 1;
    });
    return map;
  }, [tokens]);

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const crect = container.getBoundingClientRect();
      const raw: { x: number; y: number }[] = [];
      letterRefs.current.forEach((el) => {
        if (!el) {
          raw.push({ x: 0, y: 0 });
          return;
        }
        const r = el.getBoundingClientRect();
        raw.push({
          x: r.left - crect.left + r.width / 2,
          y: r.top - crect.top + r.height / 2,
        });
      });
      if (raw.length === 0) return;
      const maxX = Math.max(...raw.map((p) => p.x)) || 1;
      const maxY = Math.max(...raw.map((p) => p.y)) || 1;
      const norm = raw.map(
        (p) =>
          (1 - horizontalBias) * (p.y / maxY) +
          horizontalBias * (p.x / maxX),
      );
      const min = Math.min(...norm);
      const max = Math.max(...norm);
      const span = max - min || 1;
      let normalized = norm.map((n) => (n - min) / span);
      if (granularity === "word") {
        const wordMin = new Map<number, number>();
        normalized.forEach((n, i) => {
          const w = letterToWord[i];
          const prev = wordMin.get(w);
          if (prev === undefined || n < prev) wordMin.set(w, n);
        });
        normalized = normalized.map((_, i) => wordMin.get(letterToWord[i]) ?? 0);
      }
      setPositions(normalized);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [totalLetters, horizontalBias, granularity]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      rafRef.current = null;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const h = rect.height;
      const enter = Math.max(
        0,
        Math.min(1, (vh + h - rect.bottom) / (h + edgeOffset)),
      );
      const exit = blurOnExit
        ? Math.max(
            0,
            Math.min(1, (edgeOffset - rect.top) / (h + edgeOffset)),
          )
        : 0;
      const next = enter + exit * 10; // дешёвая композитная сигнатура
      if (next !== progressRef.current) {
        progressRef.current = next;
        el.style.setProperty("--sbr-pi", String(enter));
        el.style.setProperty("--sbr-po", String(exit));
      }
    };
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [edgeOffset, blurOnExit]);

  let letterIdx = 0;
  const nodes: ReactNode[] = tokens.map((chunk, ti) => {
    if (/^\s+$/.test(chunk)) return chunk;
    const letters = [...chunk];
    return (
      <span key={ti} className="sbr-group">
        {letters.map((ch, li) => {
          const idx = letterIdx++;
          const pos =
            positions[idx] ?? idx / Math.max(1, totalLetters - 1);
          const offIn = pos * (1 - waveWidth);
          const offOut = pos * (1 - waveWidth);
          return (
            <span
              key={li}
              ref={(node) => {
                letterRefs.current[idx] = node;
              }}
              className="sbr-word"
              style={
                {
                  "--sbr-offi": offIn,
                  "--sbr-offo": offOut,
                  "--sbr-w": waveWidth,
                  "--sbr-blur": `${maxBlur}px`,
                  "--sbr-ty": `${effectiveTranslateY}px`,
                  "--sbr-min-o": minOpacity,
                  "--sbr-max-sp": `${effectiveSpacing}em`,
                } as React.CSSProperties
              }
            >
              {ch}
            </span>
          );
        })}
      </span>
    );
  });

  const Tag = as as ElementType;
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;
      }}
      className={cn("sbr-root", className)}
      style={style}
    >
      {nodes}
    </Tag>
  );
}
