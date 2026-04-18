import { Container } from "@/components/primitives/Container";

export function CTA() {
  return (
    <section
      id="cta"
      data-theme="light"
      className="relative flex flex-col bg-white pt-16 pb-3 text-black md:pt-24 md:pb-5"
    >
      <Container className="flex flex-1 flex-col items-start justify-center gap-10">
        <h2 className="max-w-[22ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl">
          Один шаг<span className="text-black/45"> до крутого проекта</span>
        </h2>
        <a
          href="mailto:hello@uxart.ru"
          className="rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          Связаться
        </a>
      </Container>
      <Container className="mt-16 flex flex-wrap items-end justify-between gap-6 md:mt-24">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://t.me/konakovart"
            className="inline-flex items-center gap-2 rounded-full bg-black/5 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21.944 4.49 18.9 19.02c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.19c-.25.25-.46.46-.95.46l.34-4.82 8.79-7.94c.38-.34-.08-.53-.59-.19l-10.86 6.84-4.68-1.47c-1.02-.32-1.04-1.02.21-1.51l18.3-7.05c.85-.32 1.59.19 1.31 1.64Z" />
            </svg>
            <span>@konakovart</span>
          </a>
          <a
            href="mailto:account@uxart.ru"
            className="inline-flex items-center gap-2 rounded-full bg-black/5 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3.5 6.5 8.5 7 8.5-7" />
            </svg>
            <span>account@uxart.ru</span>
          </a>
        </div>
        <div className="flex flex-col items-end gap-1 text-right text-sm text-black/55">
          <span>© {new Date().getFullYear()} UXART</span>
          <span>Санкт-Петербург · с 2018</span>
          <a
            href="/privacy"
            className="underline decoration-black/20 underline-offset-4 transition-colors hover:text-black hover:decoration-black"
          >
            Политика конфиденциальности
          </a>
        </div>
      </Container>
    </section>
  );
}
