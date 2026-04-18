import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/primitives/Container";
import { stats, type StatItem as StatItemData } from "@/content/stats";
import { ScrollBlurText } from "@/motion/ScrollBlurText";

export function Hero() {
  const [tl, tr, bottom] = stats;
  const dimTriggerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = dimTriggerRef.current;
    const overlay = overlayRef.current;
    if (!el || !overlay) return;
    let raf = 0;
    let last: boolean | null = null;
    let prevY = window.scrollY;
    let prevT = performance.now();
    let velocity = 0; // px / ms, сглаженная
    const tick = (now: number) => {
      const y = window.scrollY;
      const dt = Math.max(1, now - prevT);
      const instant = Math.abs(y - prevY) / dt;
      // экспоненциальное сглаживание — шум гаснет, реальный рывок ловится
      velocity = velocity * 0.82 + instant * 0.18;
      prevY = y;
      prevT = now;

      // Быстрый скролл → короткая длительность, чтобы тень догоняла кадр.
      // При обычном скролле держим длинную плавную анимацию, режем только
      // на реально быстрых свайпах (velocity > ~1.2 px/ms).
      const duration = Math.max(
        260,
        Math.min(2400, 2400 - velocity * 1100),
      );
      overlay.style.transitionDuration = `${duration}ms`;

      const rect = el.getBoundingClientRect();
      // Затемнение включается, когда центр блока TOP-10 доходит
      // до середины экрана, а не в момент его первого появления.
      const threshold = window.innerHeight * 0.5;
      const triggerPoint = rect.top + rect.height / 2;
      const next = triggerPoint <= threshold;
      if (next !== last) {
        last = next;
        setDark(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="hero" className="relative h-[232vh] bg-black">
      {/* Sticky stage: video + black dim overlay. Dim sits under text but over video. */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src="/media/uxart/027952_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
        <div
          ref={overlayRef}
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-black transition-opacity ease-[cubic-bezier(.19,1,.22,1)] ${
            dark ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Постоянный градиент: от верха второго экрана до низа блока (где видео уходит). 0% сверху → 40% внизу. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[100vh] h-[132vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Плавное затемнение в чёрный у низа блока — снимает жёсткую отсечку с шоурилом. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.85) 80%, #000 100%)",
        }}
      />

      {/* Hero slogan */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-screen">
        <Container className="relative flex h-full items-end pb-8 md:pb-12">
          <p className="text-base font-semibold text-white md:text-lg [mix-blend-mode:difference]">
            Сделаем интернет красивее.
          </p>
        </Container>
      </div>

      {/* Stats — always on top of the dim overlay */}
      <div
        id="stats"
        className="pointer-events-none absolute inset-x-0 top-[132vh] h-screen"
      >
        <Container className="relative flex h-full flex-col justify-between pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="flex items-start justify-between gap-6">
            <Stat item={tl} />
            <Stat item={tr} align="right" />
          </div>
          <div className="flex items-end justify-center">
            <Stat item={bottom} align="center" triggerRef={dimTriggerRef} />
          </div>
        </Container>
      </div>
    </section>
  );
}

function Stat({
  item,
  align = "left",
  triggerRef,
}: {
  item: StatItemData;
  align?: "left" | "right" | "center";
  triggerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const alignCls =
    align === "right"
      ? "items-end text-right"
      : align === "center"
        ? "items-center text-center"
        : "items-start text-left";
  return (
    <div ref={triggerRef} className={`flex flex-col gap-3 ${alignCls}`}>
      <ScrollBlurText
        as="span"
        className="font-medium leading-[0.9] tracking-tight text-white"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        align={align}
      >
        {item.value}
      </ScrollBlurText>
      <ScrollBlurText
        as="span"
        className="text-base font-medium tracking-[0.02em] text-white/70 md:text-lg"
        maxBlur={8}
        translateY={4}
        align={align}
      >
        {item.label}
      </ScrollBlurText>
    </div>
  );
}
