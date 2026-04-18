import { useEffect, useRef } from "react";

// Сетка совпадает с Container: max-w-[1680px] px-3 md:px-5.
// Скругление — как rounded-2xl у следующего блока (Clients).
const GRID_MAX = 1680;
const GRID_PAD_MOBILE = 12;
const GRID_PAD_DESKTOP = 20;
const GRID_RADIUS = 16;
const SNAP_EASING = "cubic-bezier(.19,1,.22,1)";
const SNAP_DURATION = "600ms";
// Структура секции: sticky-wrapper прилипает к top:0 на всю длину секции.
// Пока он прилип, мы проходим три подфазы по scroll-прогрессу:
//   [0 .. ENTRY]           — вход: фрейм растёт от ENTRY_SCALE до full-bleed.
//   [ENTRY .. ENTRY+HOLD]  — hold: full-bleed удержание.
//   [ENTRY+HOLD .. 1]      — exit: триггер-снап в grid.
// Всё делаем внутри sticky, чтобы wrapper не двигался по вертикали во время
// входа — тогда рост идёт симметрично по всем осям.
const ENTRY_VIEWPORTS = 0.5;
const HOLD_VIEWPORTS = 0.5;

// Гистерезис: входим в triggered раньше (0.92), чтобы не ловить knife-edge
// на sticky=1, и выходим позже (0.85), чтобы микро-скролл назад на трекпаде
// не перезапускал 600ms-транзишн туда-сюда.
const TRIGGER_IN = 0.92;
const TRIGGER_OUT = 0.85;

// Начальный размер видео на входе — 70% от grid/vh. Масштабируется до
// full-bleed к моменту, когда верх секции доходит до верха вьюпорта.
const ENTRY_SCALE = 0.7;

export function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggeredRef = useRef(false);

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
      // Держим высоту секции и sticky-слота в пикселях — избегаем
      // расхождения CSS 100vh и window.innerHeight при входе/выходе из
      // fullscreen, где CSS vh в Chrome/Mac обновляется с задержкой.
      const vh = window.innerHeight;
      section.style.height = `${(1 + ENTRY_VIEWPORTS + HOLD_VIEWPORTS) * vh}px`;
      stickyEl.style.height = `${vh}px`;
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

      // Гистерезис: как только дошли до TRIGGER_IN — залипаем в triggered и
      // отпускаем только при явном возврате выше TRIGGER_OUT. Иначе micro-
      // scrollback дёргает состояние на границе sticky=1.
      if (!triggeredRef.current && sticky >= TRIGGER_IN) triggeredRef.current = true;
      else if (triggeredRef.current && sticky < TRIGGER_OUT) triggeredRef.current = false;
      const triggered = triggeredRef.current;
      const grid = gridWidth();

      // Скругление применяем в трёх местах:
      //   1) frame.borderRadius + overflow:hidden — для статичных браузеров;
      //   2) frame.clipPath — compositor-safe обход;
      //   3) video.borderRadius — единственный способ гарантированно
      //      скруглить сам видео-слой в Chrome (overflow и clip-path на
      //      родителе иногда пропускаются для hardware-accelerated video).
      const applyRadius = (radius: number) => {
        const r = `${radius}px`;
        frame.style.borderRadius = r;
        video.style.borderRadius = r;
        const clip = `inset(0 round ${radius}px)`;
        frame.style.clipPath = clip;
        (frame.style as unknown as { webkitClipPath: string }).webkitClipPath = clip;
      };
      // Вертикальный сдвиг в triggered: фрейм уезжает вниз на GRID_PAD,
      // верхний край уходит за вьюпорт → верхние скругления не видны,
      // снизу появляется зазор, равный боковым.
      const pad = vw >= 768 ? GRID_PAD_DESKTOP : GRID_PAD_MOBILE;
      const applyShift = (dy: number) => {
        frame.style.transform = `translate3d(0, ${dy}px, 0)`;
      };

      // Внутри sticky-зоны: первая треть прогресса = вход, дальше = hold.
      const entryFraction = ENTRY_VIEWPORTS / (ENTRY_VIEWPORTS + HOLD_VIEWPORTS);
      const pEntry = Math.min(sticky / entryFraction, 1);

      if (triggered) {
        // Финальное состояние — видео в сетке, высота = vh, скругления.
        frame.style.transition = `width ${SNAP_DURATION} ${SNAP_EASING}, height ${SNAP_DURATION} ${SNAP_EASING}, clip-path ${SNAP_DURATION} ${SNAP_EASING}, transform ${SNAP_DURATION} ${SNAP_EASING}`;
        video.style.transition = `border-radius ${SNAP_DURATION} ${SNAP_EASING}`;
        frame.style.width = `${grid}px`;
        frame.style.height = `${vh}px`;
        applyRadius(GRID_RADIUS);
        applyShift(-pad);
      } else if (rect.top > 0 || pEntry < 1) {
        // Вход — scroll-linked внутри sticky (wrapper уже прилип к top:0).
        // Фрейм центрирован в вьюпорте, растёт симметрично по всем осям от
        // ENTRY_SCALE до full-bleed. Все 4 стороны касаются краёв одновременно.
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
        applyShift(0);
      } else {
        // Hold-зона: видео держится full-bleed, без скруглений.
        frame.style.transition = `width ${SNAP_DURATION} ${SNAP_EASING}, height ${SNAP_DURATION} ${SNAP_EASING}, clip-path ${SNAP_DURATION} ${SNAP_EASING}, transform ${SNAP_DURATION} ${SNAP_EASING}`;
        video.style.transition = `border-radius ${SNAP_DURATION} ${SNAP_EASING}`;
        frame.style.width = `${vw}px`;
        frame.style.height = `${vh}px`;
        applyRadius(0);
        applyShift(0);
      }

      section.style.backgroundColor = triggered ? "#ffffff" : "#000000";
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
      id="showreel"
      aria-label="Шоурил"
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
            // Форсируем свой композиторный слой: в Chrome без этого
            // аппаратно-ускоренное видео игнорирует border-radius + overflow:hidden
            // на полном вьюпорте (баг «пропадают скругления в fullscreen»).
            transform: "translateZ(0)",
            isolation: "isolate",
          }}
        >
          {/* TODO placeholder: заменить на итоговый шоурил UXART */}
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
