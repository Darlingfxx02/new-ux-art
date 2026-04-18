import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ScrollBlurRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** Максимум blur в пикселях у ещё не раскрытого элемента. */
  maxBlur?: number;
  /** Сдвиг по Y у не раскрытого элемента (px). */
  translateY?: number;
  /** Минимальная opacity у не раскрытого элемента. */
  minOpacity?: number;
  /**
   * Ширина «волны» раскрытия (0..1). 1 — раскрывается одним куском,
   * меньше — с более мягким градиентом внутри блока.
   */
  waveWidth?: number;
  /** Отступ от края вьюпорта (px), при котором элемент уже полностью раскрыт. */
  edgeOffset?: number;
  /** Повторно размывать при уходе за верх экрана. */
  blurOnExit?: boolean;
};

/**
 * Оборачивает произвольный контент (кнопки, иконки, карточки) в тот же
 * scroll-driven blur/opacity/translateY, что и ScrollBlurText.
 * Весь контент анимируется как единый юнит — полезно для нетекстовых
 * элементов, где буквенная волна не нужна.
 */
export function ScrollBlurReveal({
  children,
  as = "div",
  className,
  style,
  maxBlur = 14,
  translateY = 8,
  minOpacity = 0.2,
  waveWidth = 1,
  edgeOffset = 100,
  blurOnExit = true,
}: ScrollBlurRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<{ pi: number; po: number }>({ pi: -1, po: -1 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
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

  const Tag = as as ElementType;
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;
      }}
      className={cn("sbr-root sbr-reveal", className)}
      style={
        {
          "--sbr-offi": 0,
          "--sbr-offo": 0,
          "--sbr-w": waveWidth,
          "--sbr-blur": `${maxBlur}px`,
          "--sbr-ty": `${translateY}px`,
          "--sbr-min-o": minOpacity,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
