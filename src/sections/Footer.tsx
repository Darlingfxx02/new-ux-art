import { Container } from "@/components/primitives/Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-10 text-sm text-[var(--color-muted)]">
      <Container className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} UXART</span>
        <span>Санкт-Петербург · с 2018</span>
      </Container>
    </footer>
  );
}
