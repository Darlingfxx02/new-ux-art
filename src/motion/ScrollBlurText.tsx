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
  /** Выравнивание текста. Управляет направлением translateY-сдвига и не более. */
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
   * "word" — слово как единое целое (один composited-слой на слово).
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
  align = "left",
  waveWidth = 1.1,
  horizontalBias = 0.45,
  edgeOffset = 100,
  blurOnExit = true,
  granularity = "letter",
}: ScrollBlurTextProps) {
  const effectiveTranslateY = align === "left" ? 0 : translateY;
  const containerRef = useRef<HTMLElement | null>(null);
  const unitRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const progressRef = useRef<{ pi: number; po: number }>({ pi: -1, po: -1 });
  const rafRef = useRef<number | null>(null);

  const tokens = useMemo(() => children.split(/(\s+)/), [children]);

  // Разбиение на «юниты» анимации: буква или слово целиком.
  // Один юнит = один <span> с blur-фильтром = один composited-слой.
  const units = useMemo(() => {
    const out: { text: string; leadingSpace: string }[] = [];
    let pendingSpace = "";
    tokens.forEach((chunk) => {
      if (/^\s+$/.test(chunk)) {
        pendingSpace += chunk;
        return;
      }
      if (granularity === "word") {
        out.push({ text: chunk, leadingSpace: pendingSpace });
        pendingSpace = "";
      } else {
        [...chunk].forEach((ch, i) => {
          out.push({ text: ch, leadingSpace: i === 0 ? pendingSpace : "" });
        });
        pendingSpace = "";
      }
    });
    return out;
  }, [tokens, granularity]);

  const unitCount = units.length;

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const crect = container.getBoundingClientRect();
      const raw: { x: number; y: number }[] = [];
      unitRefs.current.forEach((el) => {
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
      const normalized = norm.map((n) => (n - min) / span);
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
  }, [unitCount, horizontalBias]);

  useEffect(() => {
    // читаем ref свежо на каждом тике, чтобы переживать HMR/перемонт DOM
    const update = () => {
      rafRef.current = null;
      const el = containerRef.current;
      if (!el) return;
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
      const prev = progressRef.current;
      if (prev.pi !== enter || prev.po !== exit) {
        prev.pi = enter;
        prev.po = exit;
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
      rafRef.current = null;
    };
  }, [edgeOffset, blurOnExit]);

  const nodes: ReactNode[] = [];
  units.forEach((unit, idx) => {
    if (unit.leadingSpace) nodes.push(unit.leadingSpace);
    const pos = positions[idx] ?? idx / Math.max(1, unitCount - 1);
    const off = pos * (1 - waveWidth);
    nodes.push(
      <span
        key={idx}
        ref={(node) => {
          unitRefs.current[idx] = node;
        }}
        className="sbr-word"
        style={
          {
            "--sbr-offi": off,
            "--sbr-offo": off,
            "--sbr-w": waveWidth,
            "--sbr-blur": `${maxBlur}px`,
            "--sbr-ty": `${effectiveTranslateY}px`,
            "--sbr-min-o": minOpacity,
          } as React.CSSProperties
        }
      >
        {unit.text}
      </span>,
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
