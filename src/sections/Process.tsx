import { Container } from "@/components/primitives/Container";
import { process } from "@/content/process";
import { ScrollBlurText } from "@/motion/ScrollBlurText";

export function Process() {
  return (
    <section id="process" className="relative border-b border-[var(--color-line)]">
      {/* Text hero: eyebrow bottom-left, heading globally centered on screen */}
      <div className="relative z-10 h-[60vh]">
        {/* Static gradient: transparent top → black bottom. Держит визуальный
            переход от светлого блока сверху (Services) к тёмной сетке снизу. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          }}
        />

        <Container className="absolute inset-x-0 bottom-10 md:bottom-16">
          <div className="relative flex items-center justify-center">
            <h2 className="max-w-[32ch] text-center text-2xl font-semibold leading-[1.2] tracking-tight text-white md:text-4xl">
              <ScrollBlurText
                as="span"
                granularity="word"
                maxBlur={12}
                translateY={8}
                minOpacity={0}
                waveWidth={0.6}
                horizontalBias={0.2}
              >
                Понимаем, что делаем
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
                В любом направлении
              </ScrollBlurText>
            </h2>
          </div>
        </Container>
      </div>

      {/* Principles grid on solid black */}
      <div data-dim-trigger className="relative z-10 bg-black pt-0 pb-24 md:pb-32">
        <Container>
          <div
            className="grid gap-px bg-[var(--color-line)] md:grid-cols-2 lg:grid-cols-4"
          >
            {process.map((step) => (
              <div key={step.index} className="bg-black p-8">
                <ScrollBlurText
                  as="span"
                  className="block text-sm text-[var(--color-muted)]"
                  maxBlur={6}
                  translateY={2}
                  minOpacity={0.2}
                  waveWidth={0.9}
                  horizontalBias={0.3}
                  edgeOffset={80}
                >
                  {step.index}
                </ScrollBlurText>
                <ScrollBlurText
                  as="h3"
                  className="mt-6 text-xl font-medium text-white"
                  granularity="word"
                  maxBlur={12}
                  translateY={6}
                  minOpacity={0}
                  waveWidth={0.8}
                  horizontalBias={0.4}
                  edgeOffset={80}
                >
                  {step.title}
                </ScrollBlurText>
                <ScrollBlurText
                  as="p"
                  className="mt-3 text-sm text-[var(--color-muted)]"
                  granularity="word"
                  maxBlur={8}
                  translateY={4}
                  minOpacity={0.15}
                  waveWidth={1}
                  horizontalBias={0.4}
                  edgeOffset={80}
                >
                  {step.description}
                </ScrollBlurText>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
