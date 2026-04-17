import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { posts } from "@/content/blog";

export function Blog() {
  return (
    <Section id="blog">
      <Container>
        <div className="mb-16 flex items-end justify-between">
          <div>
            <Eyebrow>Пишем на VC.RU</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
              Статьи.<span className="text-[var(--color-muted)]"> От команды.</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden text-sm uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)] md:inline"
          >
            Все статьи →
          </a>
        </div>

        <ul className="grid gap-px bg-[var(--color-line)] md:grid-cols-4">
          {posts.map((post) => (
            <li key={post.slug} className="bg-[var(--color-bg)]">
              <a
                href={post.url}
                className="group flex aspect-[4/5] flex-col justify-between p-6 transition-colors hover:bg-white/[0.02] md:p-8"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  {post.title}
                </h3>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] group-hover:text-[var(--color-fg)]">
                  Читать
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
