import { useEffect, useRef } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { ScrollBlurText } from "@/motion/ScrollBlurText";
import { ScrollBlurReveal } from "@/motion/ScrollBlurReveal";
import { posts } from "@/content/blog";

const FIRST_ROW = 4;
const TX_FIRST = [-42, -14, 14, 42]; // % — те же «крылья», что и у Cases
const START_SCALE_FIRST = 0.22;

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export function Blog() {
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      cardRefs.current.forEach((li, i) => {
        if (!li || i >= FIRST_ROW) return;
        const inner = li.firstElementChild as HTMLElement | null;
        if (!inner) return;
        const r = li.getBoundingClientRect();
        // Прогресс по аналогии с Cases: 0 — карточка ниже вьюпорта,
        // 1 — карточка вошла на 70% вьюпорта.
        const raw = (vh - r.top) / (vh * 0.7);
        const p = Math.max(0, Math.min(1, raw));
        const eased = easeOutCubic(p);
        const t = 1 - eased;
        const tx = TX_FIRST[i] * t;
        const scale = 1 + START_SCALE_FIRST * t;
        inner.style.transform = `translate3d(${tx.toFixed(2)}%, 0, 0) scale(${scale.toFixed(4)})`;
        inner.style.opacity = String(Math.min(1, p * 2.2));
      });
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : rail.clientWidth * 0.6;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section id="blog" className="overflow-x-clip border-b-0">
      <Container>
        <div className="mb-16 flex items-end justify-between">
          <div>
            <ScrollBlurText
              as="div"
              className="text-base font-medium text-white/55"
              granularity="word"
              maxBlur={10}
              translateY={6}
            >
              Пишем на VC.RU
            </ScrollBlurText>
            <h2 className="mt-4 text-2xl font-medium tracking-[-0.02em] text-white md:text-4xl">
              <ScrollBlurText
                as="span"
                granularity="word"
                maxBlur={12}
                translateY={8}
                waveWidth={0.8}
              >
                Статьи
              </ScrollBlurText>
              <ScrollBlurText
                as="span"
                className="text-white/45"
                granularity="word"
                maxBlur={12}
                translateY={8}
                waveWidth={0.8}
              >
                {" От команды"}
              </ScrollBlurText>
            </h2>
          </div>
          <ScrollBlurReveal
            className="hidden items-center gap-2 md:flex"
            maxBlur={10}
            translateY={6}
            minOpacity={0.2}
          >
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Прокрутить назад"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Прокрутить вперёд"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40"
            >
              →
            </button>
          </ScrollBlurReveal>
        </div>
      </Container>

      {/* Горизонтальный рейл — full-bleed по ширине, но левый/правый padding
          совпадает с контентной границей Container (max-w-1880, px-5), чтобы
          первая карточка стояла ровно под «Статьи.». */}
      <div
        ref={railRef}
        className="hide-scrollbar relative overflow-x-auto scroll-smooth"
      >
        <ul
          className="flex gap-6 md:gap-8"
          style={{
            scrollSnapType: "x mandatory",
            paddingInline: "max(0.75rem, calc((100vw - 1880px) / 2 + 1.25rem))",
            scrollPaddingInlineStart: "max(0.75rem, calc((100vw - 1880px) / 2 + 1.25rem))",
          }}
        >
          {posts.map((post, i) => (
            <li
              key={post.slug}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-card
              className="shrink-0 snap-start"
              style={{
                width: "clamp(260px, calc((min(100vw,1880px) - 56px) / 4), 380px)",
                willChange: i < FIRST_ROW ? "transform" : undefined,
              }}
            >
              {/* inner: на этом узле живёт fly-in transform; внешний li
                  держит фиксированную ширину, чтобы canvas не плыл. */}
              <div
                className="will-change-transform"
                style={{ opacity: i < FIRST_ROW ? 0 : 1 }}
              >
                <a href={post.url} className="group flex h-full flex-col">
                  {/* Медиа-враппер с жёсткой маской: radius + overflow + clip-path +
                      isolation + translateZ. Нужно для того, чтобы при
                      fly-in scale(>1) Chrome не терял border-radius у
                      hardware-accelerated <img>-слоя (та же история, что
                      со скруглениями видео в Showreel/Directions). */}
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white/[0.04]"
                    style={{
                      clipPath: "inset(0 round 1rem)",
                      WebkitClipPath: "inset(0 round 1rem)",
                      isolation: "isolate",
                      transform: "translateZ(0)",
                    } as React.CSSProperties}
                  >
                    {post.cover ? (
                      <img
                        src={post.cover}
                        alt=""
                        loading="lazy"
                        className="block h-full w-full rounded-2xl object-cover transition-opacity duration-500 group-hover:opacity-90"
                      />
                    ) : null}
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <ScrollBlurReveal
                      className="flex items-center gap-2 text-sm font-medium text-white/55"
                      maxBlur={8}
                      translateY={4}
                      minOpacity={0.2}
                    >
                      <span>{post.date}</span>
                      <span aria-hidden>·</span>
                      <span>{post.readTime}</span>
                    </ScrollBlurReveal>

                    <ScrollBlurText
                      as="h3"
                      className="mt-3 text-lg font-medium leading-[1.2] tracking-[-0.01em] text-white md:text-[1.375rem]"
                      granularity="word"
                      maxBlur={12}
                      translateY={6}
                      waveWidth={0.9}
                    >
                      {post.title}
                    </ScrollBlurText>

                    <ScrollBlurReveal
                      as="span"
                      className="mt-6 inline-flex items-center gap-1.5 text-base font-medium text-white/55 transition-colors group-hover:text-white"
                      maxBlur={8}
                      translateY={4}
                      minOpacity={0.2}
                    >
                      Читать
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                    </ScrollBlurReveal>
                  </div>
                </a>
              </div>
            </li>
          ))}
        </ul>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; }
        `}</style>
      </div>
    </Section>
  );
}
