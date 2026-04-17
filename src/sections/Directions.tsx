import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { services } from "@/content/services";

export function Directions() {
  return (
    <Section id="directions" className="bg-black text-white">
      <Container>
        <div className="flex items-center justify-between">
          <Eyebrow>Направления</Eyebrow>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {String(services.length).padStart(2, "0")} / 05
          </span>
        </div>

        <ul className="mt-20 md:mt-28">
          {services.map((s, i) => (
            <li
              key={s.slug}
              className="group flex items-baseline gap-6 border-t border-[var(--color-line)] py-6 md:gap-10 md:py-10 last:border-b"
            >
              <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <a
                href={`#${s.slug}`}
                className="block flex-1 font-medium leading-[0.9] tracking-[-0.03em] transition-opacity duration-300 group-hover:opacity-60"
                style={{ fontSize: "clamp(3.5rem, 11vw, 12rem)" }}
              >
                {s.title}
              </a>
              <span
                aria-hidden
                className="hidden shrink-0 text-sm text-[var(--color-muted)] transition-transform duration-500 ease-[cubic-bezier(.19,1,.22,1)] group-hover:-translate-x-2 md:inline-block"
              >
                →
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
