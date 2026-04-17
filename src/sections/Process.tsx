import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { process } from "@/content/process";

export function Process() {
  return (
    <Section id="process">
      <Container>
        <div className="mb-16">
          <Eyebrow>Как работаем</Eyebrow>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            Четыре шага.<span className="text-[var(--color-muted)]"> В этом порядке.</span>
          </h2>
        </div>

        <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <div key={step.index} className="bg-[var(--color-bg)] p-8">
              <span className="text-sm text-[var(--color-muted)]">{step.index}</span>
              <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
