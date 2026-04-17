import { useEffect, useRef } from "react";

// Сетка совпадает с Container: max-w-[1680px] px-3 md:px-5.
// Скругление — как rounded-2xl у следующего блока (Clients).
const GRID_MAX = 1680;
const GRID_PAD_MOBILE = 12;
const GRID_PAD_DESKTOP = 20;
const GRID_RADIUS = 16;
const SNAP_EASING = "cubic-bezier(.19,1,.22,1)";
const SNAP_DURATION = "600ms";
// Секция выше вьюпорта: внутри sticky-видео держит full-bleed, пока
// страница прокручивается через запас. Триггер сужения — в конце этого
// запаса, когда видео уже доскролили.
const HOLD_VIEWPORTS = 1; // 1 лишний экран сверх sticky-вьюпорта

export function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const gridWidth = () => {
      const vw = window.innerWidth;
      const pad = vw >= 768 ? GRID_PAD_DESKTOP : GRID_PAD_MOBILE;
      return Math.min(vw - pad * 2, GRID_MAX);
    };

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      // Прогресс через sticky-зону: 0 — верх секции у верха вьюпорта,
      // 1 — низ секции у низа вьюпорта (sticky отпускает).
      const holdRange = section.offsetHeight - vh;
      const sticky = holdRange > 0
        ? Math.min(Math.max(-rect.top / holdRange, 0), 1)
        : rect.top <= 0
          ? 1
          : 0;

      // Триггер — в самом конце sticky-зоны: мы «досмотрели» видео по
      // высоте, низ секции касается низа вьюпорта. Только после этого
      // видео сужается и фон становится белым.
      const triggered = sticky >= 1;
      const grid = gridWidth();

      if (triggered) {
        // Финальное состояние — видео в сетке, скругления как у Clients.
        frame.style.transition = `width ${SNAP_DURATION} ${SNAP_EASING}, border-radius ${SNAP_DURATION} ${SNAP_EASING}`;
        frame.style.width = `${grid}px`;
        frame.style.borderRadius = `${GRID_RADIUS}px`;
      } else if (rect.top > 0) {
        // Вход — scroll-linked от grid-вида со скруглениями до full-bleed
        // к моменту, когда верх секции доходит до верха вьюпорта.
        const entryDistance = vh * 0.5;
        const pIn = Math.min(Math.max(1 - rect.top / entryDistance, 0), 1);
        const eased =
          pIn < 0.5 ? 2 * pIn * pIn : 1 - Math.pow(-2 * pIn + 2, 2) / 2;
        const width = grid + (vw - grid) * eased;
        const radius = GRID_RADIUS * (1 - eased);
        frame.style.transition = "none";
        frame.style.width = `${width}px`;
        frame.style.borderRadius = `${radius}px`;
      } else {
        // Sticky-зона: видео держится full-bleed, без скруглений.
        frame.style.transition = `width ${SNAP_DURATION} ${SNAP_EASING}, border-radius ${SNAP_DURATION} ${SNAP_EASING}`;
        frame.style.width = `${vw}px`;
        frame.style.borderRadius = "0px";
      }

      section.style.backgroundColor = triggered ? "#ffffff" : "#000000";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      aria-label="Шоурил"
      className="relative w-full bg-black"
      style={{ height: `${(1 + HOLD_VIEWPORTS) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          ref={frameRef}
          className="relative overflow-hidden"
          style={{ willChange: "width, border-radius" }}
        >
          {/* TODO placeholder: заменить на итоговый шоурил UXART */}
          <video
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
              minHeight: "100vh",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}
