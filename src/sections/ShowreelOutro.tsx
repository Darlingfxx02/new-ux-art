import { useEffect, useRef } from "react";

// Дубль Showreel, но без exit-снапа в сетку: на выходе кадр остаётся full-bleed,
// а за ним по нормальному flow появляется футер.
const ENTRY_VIEWPORTS = 0.5;
const HOLD_VIEWPORTS = 0.5;
const ENTRY_SCALE = 0.7;
const GRID_MAX = 1680;
const GRID_PAD_MOBILE = 12;
const GRID_PAD_DESKTOP = 20;
const GRID_RADIUS = 16;

export function ShowreelOutro() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stickyEl = stickyRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!section || !stickyEl || !frame || !video) return;

    const gridWidth = () => {
      const vw = window.innerWidth;
      const pad = vw >= 768 ? GRID_PAD_DESKTOP : GRID_PAD_MOBILE;
      return Math.min(vw - pad * 2, GRID_MAX);
    };

    const syncHeight = () => {
      const vh = window.innerHeight;
      section.style.height = `${(1 + ENTRY_VIEWPORTS + HOLD_VIEWPORTS) * vh}px`;
      stickyEl.style.height = `${vh}px`;
    };

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const holdRange = section.offsetHeight - vh;
      const sticky = holdRange > 0
        ? Math.min(Math.max(-rect.top / holdRange, 0), 1)
        : rect.top <= 0
          ? 1
          : 0;

      const grid = gridWidth();

      const applyRadius = (radius: number) => {
        const r = `${radius}px`;
        frame.style.borderRadius = r;
        video.style.borderRadius = r;
        const clip = `inset(0 round ${radius}px)`;
        frame.style.clipPath = clip;
        (frame.style as unknown as { webkitClipPath: string }).webkitClipPath = clip;
      };

      const entryFraction = ENTRY_VIEWPORTS / (ENTRY_VIEWPORTS + HOLD_VIEWPORTS);
      const pEntry = Math.min(sticky / entryFraction, 1);

      if (rect.top > 0 || pEntry < 1) {
        // Вход — scroll-linked рост от ENTRY_SCALE до full-bleed.
        const eased =
          pEntry < 0.5 ? 2 * pEntry * pEntry : 1 - Math.pow(-2 * pEntry + 2, 2) / 2;
        const startW = grid * ENTRY_SCALE;
        const startH = vh * ENTRY_SCALE;
        const width = startW + (vw - startW) * eased;
        const height = startH + (vh - startH) * eased;
        const radius = GRID_RADIUS * (1 - eased);
        frame.style.transition = "none";
        video.style.transition = "none";
        frame.style.width = `${width}px`;
        frame.style.height = `${height}px`;
        applyRadius(radius);
      } else {
        // Hold до самого конца секции: full-bleed без скруглений. Никакого
        // обратного снапа в сетку — секция заканчивается, sticky отпускает,
        // и по нормальному flow ниже выезжает футер.
        frame.style.transition = "none";
        video.style.transition = "none";
        frame.style.width = `${vw}px`;
        frame.style.height = `${vh}px`;
        applyRadius(0);
      }
    };

    const onResize = () => {
      syncHeight();
      update();
    };

    syncHeight();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("fullscreenchange", onResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("fullscreenchange", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel-outro"
      aria-label="Финальный шоурил"
      className="relative w-full bg-black"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex w-full items-center justify-center overflow-hidden"
      >
        <div
          ref={frameRef}
          className="relative overflow-hidden"
          style={{
            willChange: "width, border-radius",
            transform: "translateZ(0)",
            isolation: "isolate",
          }}
        >
          <video
            ref={videoRef}
            src="/media/placeholders/5273c3_1751470729-home-desktop-sizzle-july2.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}
