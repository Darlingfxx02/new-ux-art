import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/primitives/Container";
import { ScrollBlurText } from "@/motion/ScrollBlurText";
import { team } from "@/content/team";

export function Team() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const cards = rail.querySelectorAll<HTMLElement>("[data-card]");
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const cc = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.6;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const current = team[active];

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-black py-32 text-white md:py-44"
    >
      <Container>
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
              / Команда
            </div>
            <ScrollBlurText
              as="h2"
              className="mt-5 font-medium leading-[0.9] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
              maxBlur={12}
              translateY={16}
              granularity="word"
            >
              Семеро на чёрном
            </ScrollBlurText>
            <p className="mt-6 max-w-[42ch] text-base leading-[1.55] text-white/55 md:text-lg">
              Маленькая студия с большим характером. Каждый проект ведут
              двое — дизайнер и инженер. Без агентских прослоек.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            {/* «Активная карточка» — крупная подпись под слайдером */}
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/35">
              {String(active + 1).padStart(2, "0")} / {String(team.length).padStart(2, "0")}
            </div>
            <div
              key={current.id}
              className="mt-3 flex flex-wrap items-baseline gap-x-3"
              style={{ animation: "team-name-in 600ms cubic-bezier(.19,1,.22,1) both" }}
            >
              <span className="bg-[#fff705] px-2 py-1 font-medium tracking-[-0.02em] text-black md:text-2xl">
                {current.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                — {current.role}
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Слайдер на всю ширину */}
      <div className="relative mt-14 md:mt-20">
        <div
          ref={railRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1.25rem,calc((100vw-1680px)/2+1.25rem))] pb-2"
          style={{ scrollPaddingLeft: "max(1.25rem, calc((100vw - 1680px)/2 + 1.25rem))" }}
        >
          {team.map((m, i) => {
            const isActive = i === active;
            return (
              <div
                key={m.id}
                data-card
                className="snap-start shrink-0"
                style={{ width: "min(78vw, 460px)" }}
              >
                <figure className="group relative">
                  <div className="relative overflow-hidden bg-white/[0.04]" style={{ aspectRatio: "4/5" }}>
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className={
                        "absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-[cubic-bezier(.19,1,.22,1)] " +
                        (isActive ? "grayscale-0 scale-100" : "grayscale scale-[1.02] opacity-70")
                      }
                    />
                    <span
                      className={
                        "pointer-events-none absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.2em] " +
                        (isActive ? "text-[#fff705]" : "text-white/45")
                      }
                    >
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className={isActive ? "text-white" : "text-white/45"}>{m.name}</span>
                    <span className="text-white/35">— {m.role}</span>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>

        {/* Управление */}
        <Container className="mt-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Предыдущий"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Следующий"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40"
              >
                →
              </button>
            </div>

            {/* Прогресс-бар */}
            <div className="relative hidden h-px flex-1 bg-white/10 md:block">
              <span
                className="absolute left-0 top-0 h-px bg-white transition-all duration-500 ease-[cubic-bezier(.19,1,.22,1)]"
                style={{ width: `${((active + 1) / team.length) * 100}%` }}
              />
            </div>

            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
              Перетащите →
            </div>
          </div>
        </Container>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; }
        @keyframes team-name-in {
          from { opacity: 0; transform: translateY(8px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
