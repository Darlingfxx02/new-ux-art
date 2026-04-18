import { useEffect, useState, type CSSProperties } from "react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { clients } from "@/content/clients";
import { cn } from "@/lib/cn";
import { ScrollBlurText } from "@/motion/ScrollBlurText";

export function Clients() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = document.getElementById("clients");
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setDark(r.bottom <= window.innerHeight);
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
    <Section
      id="clients"
      data-theme={dark ? "dark" : "light"}
      className={cn(
        "border-b-0 transition-colors duration-500 ease-[cubic-bezier(.19,1,.22,1)]",
        dark ? "bg-black text-white" : "bg-white text-black",
      )}
      style={
        {
          ["--color-bg" as string]: dark ? "#000000" : "#ffffff",
          ["--color-muted" as string]: "#8a8a8a",
          ["--color-line" as string]: dark
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.08)",
        } as CSSProperties
      }
    >
      <Container>
        <h2 className="max-w-[28ch] text-2xl font-semibold leading-[1.2] tracking-tight md:text-4xl">
          <ScrollBlurText
            as="span"
            granularity="word"
            maxBlur={12}
            translateY={8}
            minOpacity={0}
            waveWidth={0.6}
            horizontalBias={0.2}
          >
            С нами работают бренды.
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
            От стартапов до холдингов — банки, телеком, ретейл, промышленность, медиа.
          </ScrollBlurText>
        </h2>

        <ul className="mt-20 grid grid-cols-2 gap-4 md:mt-28 md:grid-cols-4">
          {clients.map((item) => (
            <li
              key={item.name}
              className={cn(
                "group flex aspect-[4/3] items-center justify-center rounded-2xl p-8 transition-colors duration-500 ease-[cubic-bezier(.19,1,.22,1)]",
                dark
                  ? "bg-white/[0.04] hover:bg-white/[0.08]"
                  : "bg-[#f5f5f7] hover:bg-[#eeeef1]",
              )}
            >
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
                className={cn(
                  "h-auto max-h-10 w-full object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100",
                  item.logoClassName,
                )}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
