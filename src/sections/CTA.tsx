import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";

export function CTA() {
  return (
    <Section id="cta" className="py-32 md:py-48">
      <Container className="flex flex-col items-start gap-10">
        <h2 className="max-w-[22ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl">
          Поговорим?<span className="text-[var(--color-muted)]"> Пишите.</span>
        </h2>
        <a
          href="mailto:hello@uxart.ru"
          className="rounded-full bg-[var(--color-fg)] px-8 py-4 text-base font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90"
        >
          hello@uxart.ru
        </a>
      </Container>
    </Section>
  );
}
