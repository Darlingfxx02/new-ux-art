import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { services, type Service } from "@/content/services";

export function Services() {
  return (
    <>
      {services.map((s, i) => (
        <ServiceSlide key={s.slug} service={s} position={i + 1} total={services.length} />
      ))}
    </>
  );
}

interface SlideProps {
  service: Service;
  position: number;
  total: number;
}

function ServiceSlide({ service, position, total }: SlideProps) {
  return (
    <section
      id={service.slug}
      className="relative flex min-h-screen flex-col border-b border-[var(--color-line)]"
    >
      <Container className="flex flex-1 flex-col pt-24 pb-16 md:pt-32 md:pb-20">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <Eyebrow>{position === 1 ? "Что делаем" : "Направление"}</Eyebrow>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {String(position).padStart(2, "0")}
            <span className="mx-2 text-[var(--color-line)]">/</span>
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* stage — слои в одной viewport-области */}
        <div className="relative flex-1">
          {/* огромный тайтл — по центру */}
          <h2
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-medium leading-[0.85] tracking-[-0.03em] text-[var(--color-fg)]"
            style={{ fontSize: "clamp(5rem, 18vw, 20rem)" }}
          >
            {service.title}
          </h2>

          {/* индекс — левый верх */}
          <span className="absolute left-0 top-6 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:top-10">
            {service.index}
          </span>

          {/* lead — правый верх */}
          <p className="absolute right-0 top-6 max-w-[28ch] text-right text-base leading-snug text-[var(--color-fg)] md:top-10 md:max-w-[32ch] md:text-xl">
            {service.lead}
          </p>

          {/* body + chips — левый низ */}
          <div className="absolute left-0 bottom-0 max-w-[56ch] space-y-5">
            <p className="text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
              {service.body}
            </p>
            <ul className="flex flex-wrap gap-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-bg)]/60 px-3 py-1.5 text-xs text-[var(--color-muted)] backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
