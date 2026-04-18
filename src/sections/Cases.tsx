import { useEffect, useRef } from "react";
import { Container } from "@/components/primitives/Container";
import { cases } from "@/content/cases";
import { ScrollBlurText } from "@/motion/ScrollBlurText";

const ROUND = "rounded-[0.75rem]";

const FIRST_ROW = 3;
const START_SCALE_FIRST = 0.28;
const START_SCALE_REST = 0.06;
const TX_FIRST = [-42, 0, 42];
const TY_FIRST = [0, 0, 0];
const TY_REST = 18;

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export function Cases() {
  const liRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      liRefs.current.forEach((li, i) => {
        if (!li) return;
        const r = li.getBoundingClientRect();
        const raw = (vh - r.top) / (vh * 0.7);
        const p = Math.max(0, Math.min(1, raw));
        const eased = easeOutCubic(p);
        const t = 1 - eased;
        let tx = 0;
        let ty: number;
        let scale: number;
        if (i < FIRST_ROW) {
          tx = TX_FIRST[i];
          ty = TY_FIRST[i];
          scale = 1 + START_SCALE_FIRST * t;
        } else {
          ty = TY_REST;
          scale = 1 + START_SCALE_REST * t;
        }
        li.style.transform = `translate3d(${(tx * t).toFixed(2)}%, ${(ty * t).toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
        li.style.opacity = String(Math.min(1, p * 2.2));
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

  return (
    <section id="cases" className="relative border-b border-[var(--color-line)] bg-black">
      {/* Text hero: eyebrow bottom-left, heading globally centered on screen.
          Градиента на этом блоке больше нет — принципы выше уже затемняют фон
          до чёрного, поэтому здесь сразу работаем на тёмной теме. */}
      <div className="relative h-[42vh]">
        <Container className="absolute inset-x-0 bottom-10 md:bottom-14">
          <div className="relative flex items-center justify-center">
            <h2 className="max-w-[28ch] text-center text-2xl font-semibold leading-[1.2] tracking-tight text-white md:text-4xl">
              <ScrollBlurText
                as="span"
                granularity="word"
                maxBlur={12}
                translateY={8}
                minOpacity={0}
                waveWidth={0.6}
                horizontalBias={0.2}
              >
                Работы
              </ScrollBlurText>
              {" "}
              <ScrollBlurText
                as="span"
                granularity="word"
                className="text-[var(--color-muted)]"
                maxBlur={12}
                translateY={8}
                minOpacity={0}
                waveWidth={0.6}
                horizontalBias={0.2}
              >
                С деталями
              </ScrollBlurText>
            </h2>
          </div>
        </Container>
      </div>

      {/* Cases grid on solid black */}
      <div className="relative pt-0 pb-24 md:pb-32">
        <Container>
          <ul
            className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 md:grid-cols-3"
          >
            {cases.map((item, i) => (
              <li
                key={item.slug}
                ref={(el) => {
                  liRefs.current[i] = el;
                }}
                className="cases-card"
                style={{ opacity: 0, willChange: "transform, opacity" }}
              >
                <a href={`#${item.slug}`} className="group block">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className={`aspect-[4/3] w-full object-cover transition-opacity group-hover:opacity-90 ${ROUND}`}
                  />
                  <p className="mt-4 text-base font-medium text-white">{item.title}</p>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
