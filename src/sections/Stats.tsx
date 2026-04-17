import { Container } from "@/components/primitives/Container";
import { stats } from "@/content/stats";

export function Stats() {
  return (
    <section
      id="stats"
      className="border-y border-[var(--color-line)] py-16 md:py-20"
    >
      <Container>
        <ul className="grid grid-cols-2 gap-px bg-[var(--color-line)] md:grid-cols-4">
          {stats.map((item) => (
            <li
              key={item.label}
              className="flex flex-col gap-3 bg-[var(--color-bg)] p-6 md:p-8"
            >
              <span
                className="font-medium leading-[0.9] tracking-tight"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  color: item.accent ? "var(--color-accent)" : "var(--color-fg)",
                }}
              >
                {item.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
