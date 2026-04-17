import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { cases } from "@/content/cases";

export function Cases() {
  return (
    <Section id="cases">
      <Container>
        <div className="mb-16 flex items-end justify-between">
          <div>
            <Eyebrow>Избранные работы</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
              Работы.<span className="text-[var(--color-muted)]"> С деталями.</span>
            </h2>
          </div>
        </div>

        <ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {cases.map((item) => (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-white/[0.02]"
              >
                {/* TODO placeholder: обложка кейса */}
                <span className="col-span-2 md:col-span-1">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-md object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                </span>
                <span className="col-span-2 md:col-span-1 text-sm text-[var(--color-muted)]">{item.year}</span>
                <span className="col-span-8 md:col-span-5 text-xl font-medium md:text-2xl">{item.title}</span>
                <span className="hidden md:inline col-span-3 text-sm text-[var(--color-muted)]">{item.client}</span>
                <span className="hidden md:inline col-span-2 text-right text-sm text-[var(--color-muted)]">
                  {item.tags.join(" · ")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
