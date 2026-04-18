import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { ScrollBlurText } from "@/motion/ScrollBlurText";
import { Process } from "@/sections/Process";
import { Cases } from "@/sections/Cases";

// Grid из Showreel: фрейм держится в инсет-сетке со скруглением почти
// весь заход. Линейная scroll-linked анимация включается только в
// последний ENTRY_FRACTION вьюпорта приближения и заканчивается ровно
// в тот момент, когда верх секции касается верха вьюпорта — ширина,
// высота и радиус приходят к full-bleed одновременно.
// Спейсер перед секцией (высотой = entry) поднимает старт outer-враппера
// на entry выше #directions — sticky-слой залипает к top:0 ровно к
// началу entry-фазы. Без этого фрейм геометрически растёт в центр
// sticky, который сам ещё едет вместе со скроллом, и ширина визуально
// замыкается раньше, чем верх касается вьюпорта.
const GRID_MAX = 1880;
const GRID_PAD_MOBILE = 12;
const GRID_PAD_DESKTOP = 20;
const GRID_RADIUS = 16;
const ENTRY_FRACTION = 0.3;

export function Directions() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const descRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  // Верх Directions следует за темой Clients: пока Clients белый, pre-entry
  // зона держится белой, чтобы не было видимой границы при экранах выше
  // высоты Clients-блока (fullscreen 1920×1080 и больше). Правило и
  // таймингу совпадают с Clients.tsx, так что переход идёт синхронно.
  const [prevLight, setPrevLight] = useState(false);

  useEffect(() => {
    const clients = document.getElementById("clients");
    if (!clients) return;
    const update = () => {
      const r = clients.getBoundingClientRect();
      setPrevLight(r.bottom > window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    let raf: number | null = null;
    const trigger = document.querySelector<HTMLElement>("[data-dim-trigger]");

    const update = () => {
      raf = null;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Dim sticky-видео: триггер — нижняя кромка сетки принципов входит
      // во вьюпорт. Меняем только класс/opacity через CSS-transition,
      // чтобы анимация не была привязана к скорости скролла.
      const dim = dimRef.current;
      if (dim && trigger) {
        const tRect = trigger.getBoundingClientRect();
        const on = tRect.bottom <= vh;
        dim.style.opacity = on ? "1" : "0";
      }

      // Entry frame: линейная scroll-linked анимация в последний
      // ENTRY_FRACTION вьюпорта приближения. p=0 → инсет-сетка, p=1 →
      // full-bleed ровно в момент rect.top === 0.
      const section = sectionRef.current;
      const frame = frameRef.current;
      if (section && frame) {
        const rect = section.getBoundingClientRect();
        const pad = vw >= 768 ? GRID_PAD_DESKTOP : GRID_PAD_MOBILE;
        const gridW = Math.min(vw - pad * 2, GRID_MAX);
        // Вертикальный отступ зеркалим к фактическому горизонтальному —
        // на широких экранах (vw > GRID_MAX) эффективный H-pad больше
        // базового pad, и без симметрии вертикальный зазор закрывается
        // раньше горизонтального, ломая синхронный приход к full-bleed.
        const padV = Math.max(pad, (vw - gridW) / 2);
        const gridH = Math.max(0, vh - padV * 2);
        const entry = vh * ENTRY_FRACTION;
        const p = rect.top <= 0 ? 1 : Math.max(0, Math.min(1, 1 - rect.top / entry));
        const width = gridW + (vw - gridW) * p;
        const height = gridH + (vh - gridH) * p;
        const radius = GRID_RADIUS * (1 - p);
        frame.style.transition = "none";
        frame.style.width = `${width}px`;
        frame.style.height = `${height}px`;
        frame.style.borderRadius = `${radius}px`;
        const clip = `inset(0 round ${radius}px)`;
        frame.style.clipPath = clip;
        (frame.style as unknown as { webkitClipPath: string }).webkitClipPath = clip;
      }

      // detect active: slide whose midpoint is closest to viewport center
      let best = 0;
      let bestDist = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - vh / 2);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);

      // description visible while title bottom sits above the description area
      // and while the title hasn't exited off the top.
      // edge — длина мягкой зоны фейда. На коротком (0.06 ≈ 54px) появление
      // ощущается «резко», особенно у последнего блока, где нет exit-а
      // следующего, который бы визуально «прикрывал» переход.
      const descTop = vh * 0.72;
      const exitTop = vh * 0.02;
      const edge = vh * 0.14;
      titleRefs.current.forEach((el, i) => {
        const descEl = descRefs.current[i];
        if (!el || !descEl) return;
        const r = el.getBoundingClientRect();
        let o = 1;
        if (r.bottom > descTop) o = Math.max(0, (descTop + edge - r.bottom) / edge);
        if (r.top < exitTop) o = Math.min(o, Math.max(0, (r.top - (exitTop - edge)) / edge));
        o = Math.max(0, Math.min(1, o));
        const inv = 1 - o;
        descEl.style.opacity = String(o);
        descEl.style.filter = `blur(${(inv * 10).toFixed(2)}px)`;
      });
    };

    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="relative text-white transition-colors duration-500 ease-[cubic-bezier(.19,1,.22,1)]"
      style={{ backgroundColor: prevLight ? "#ffffff" : "#000000" }}
    >
      {/* pre-entry spacer: даёт sticky-слою прилипнуть к top:0 ДО старта
          entry-фазы — тогда ширина и верхняя грань приходят к вьюпорту
          одновременно. Высота = ENTRY_FRACTION вьюпорта. */}
      <div aria-hidden style={{ height: `${ENTRY_FRACTION * 100}vh` }} />
      {/* full-area dim: гасит sticky-видео по всей зоне Directions+Process,
          закрывая «полоску» над секцией принципов. Плавность — CSS-transition. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <div
          ref={dimRef}
          className="sticky top-0 h-screen w-full bg-black transition-opacity duration-[900ms] ease-[cubic-bezier(.19,1,.22,1)]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* sticky visual + subtitle layer — spans Directions scrolling titles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <div
            ref={frameRef}
            className="relative overflow-hidden"
            style={{
              willChange: "width, height, border-radius",
              transform: "translateZ(0)",
              isolation: "isolate",
            }}
          >
            {/* media fullscreen */}
            <div className="absolute inset-0">
              {services.map((s, i) => (
                <video
                  key={s.slug}
                  src={s.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={s.poster}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(.19,1,.22,1)]"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: s.mirror ? "scaleX(-1)" : undefined,
                  }}
                />
              ))}
            </div>

            {/* subtitle block bottom-left */}
            <div className="absolute bottom-10 left-6 w-[min(34rem,calc(100%-3rem))] md:bottom-16 md:left-10 md:w-[min(40rem,calc(100%-5rem))]">
              <div className="grid grid-cols-1 grid-rows-1">
                {services.map((s, i) => (
                  <div
                    key={s.slug}
                    ref={(el) => {
                      descRefs.current[i] = el;
                    }}
                    className="col-start-1 row-start-1 will-change-[opacity,filter]"
                    style={{
                      opacity: i === 0 ? 1 : 0,
                      filter: i === 0 ? "blur(0px)" : "blur(10px)",
                    }}
                  >
                    <p className="text-lg font-medium leading-[1.35] text-white/55 md:text-xl">
                      <span className="text-white">{s.lead}</span> {s.body}
                    </p>
                    <a
                      href={`#${s.slug}`}
                      className="pointer-events-auto mt-5 inline-flex h-11 w-[108px] items-center justify-center rounded-2xl bg-white/10 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 ease-[cubic-bezier(.19,1,.22,1)] hover:bg-white/15 md:h-12 md:text-base"
                    >
                      Перейти
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* scrolling titles */}
      <section id="directions" ref={sectionRef} className="relative z-10">
        {services.map((s, i) => (
          <div
            key={s.slug}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            data-index={i}
            className="flex h-screen items-end pb-[35vh]"
          >
            <div className="px-6 md:px-10">
              <div
                ref={(el) => {
                  titleRefs.current[i] = el;
                }}
                className="inline-block"
              >
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40 md:mb-6">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </div>
                <ScrollBlurText
                  as="h3"
                  className="font-medium leading-[0.95] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(2.75rem, 6.5vw, 6.5rem)" }}
                  maxBlur={16}
                  translateY={20}
                  minOpacity={0}
                  align="left"
                  waveWidth={1.1}
                  horizontalBias={0.6}
                  granularity="word"
                  edgeOffset={80}
                  blurOnExit
                >
                  {s.title}
                </ScrollBlurText>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Process + Cases — внутри stage-обёртки, чтобы sticky-видео сохранялось
          во время входа Process-героя, а затем гасилось его градиентом в чёрный.
          Cases уже идут на сплошном чёрном. */}
      <div className="relative z-10">
        <Process />
        <Cases />
      </div>
    </div>
  );
}
