import type { CSSProperties } from "react";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { ScrollBlurText } from "@/motion/ScrollBlurText";

export function Value() {
  return (
    <Section
      id="value"
      data-theme="light"
      className="bg-white text-black"
      style={
        {
          ["--color-muted" as string]: "#6b6b6b",
          ["--color-line" as string]: "rgba(0,0,0,0.12)",
        } as CSSProperties
      }
    >
      <Container className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>Почему мы</Eyebrow>
        </div>
        <div className="md:col-span-8">
          <ScrollBlurText
            as="h2"
            className="text-3xl font-medium leading-tight tracking-tight md:text-5xl"
          >
            Дизайн как инструмент.
          </ScrollBlurText>
          <ScrollBlurText
            as="p"
            className="mt-8 max-w-[60ch] text-lg text-[var(--color-muted)]"
            maxBlur={8}
            translateY={4}
            minScale={0.94}
          >
            Аналитика, гипотезы, прототип, визуал. В этом порядке — и до самого релиза.
          </ScrollBlurText>
        </div>
        {/* TODO placeholder: кадр из проекта UX ART — потом заменить на подборку */}
        <div className="md:col-span-12 mt-8">
          <img
            src="/media/uxart/b9504c_vlcsnap-2025-08-22-1.png"
            alt=""
            loading="lazy"
            className="aspect-[16/9] w-full rounded-lg object-cover"
          />
        </div>
      </Container>
    </Section>
  );
}
