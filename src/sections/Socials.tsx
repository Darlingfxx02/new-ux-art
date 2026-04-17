import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import {
  ceoProfile,
  stories,
  studioProfile,
  type SocialChannel,
  type SocialProfile,
} from "@/content/socials";

export function Socials() {
  return (
    <Section id="socials">
      <Container className="flex flex-col gap-16">
        {/* Ярус 1 — Stories */}
        <div className="flex flex-col gap-6">
          <Eyebrow>Истории</Eyebrow>
          <ul className="-mx-6 flex gap-5 overflow-x-auto px-6 md:-mx-10 md:px-10">
            {stories.map((story) => (
              <li key={story.title} className="shrink-0">
                <button
                  type="button"
                  className="group flex flex-col items-center gap-2"
                >
                  {/* TODO placeholder: превью story 9:16 */}
                  <span
                    className="block h-20 w-20 rounded-full p-[2px] transition-transform group-hover:scale-[1.04]"
                    style={{
                      background:
                        "conic-gradient(from 180deg, var(--color-accent), var(--color-muted), var(--color-accent))",
                    }}
                  >
                    <span className="block h-full w-full rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-line)]" />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] group-hover:text-[var(--color-fg)]">
                    {story.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Ярус 2 — Split 6/6 */}
        <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-2">
          <ProfileColumn profile={ceoProfile} quote="О бизнесе и интерфейсах. Из первых рук." />
          <ProfileColumn profile={studioProfile} quote="Процесс, работы, команда." />
        </div>

        {/* Ярус 3 — финальная строка */}
        <a
          href="#"
          className="group flex items-center justify-between border-y border-[var(--color-line)] py-8 transition-colors hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
        >
          <span className="text-3xl font-medium tracking-tight md:text-5xl">
            Подписаться на всё
          </span>
          <span
            aria-hidden
            className="text-3xl transition-transform group-hover:translate-x-2 md:text-5xl"
          >
            →
          </span>
        </a>
      </Container>
    </Section>
  );
}

function ProfileColumn({ profile, quote }: { profile: SocialProfile; quote: string }) {
  return (
    <div className="flex flex-col gap-8 bg-[var(--color-bg)] p-8 md:p-12">
      <div className="flex items-center gap-4">
        {/* TODO placeholder: аватар профиля */}
        <span className="h-12 w-12 shrink-0 rounded-full bg-[var(--color-line)]" />
        <div>
          <p className="text-lg font-medium">{profile.name}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {profile.role}
          </p>
        </div>
      </div>

      <p
        className="font-medium leading-[1.05] tracking-tight"
        style={{ fontSize: "clamp(1.75rem, 3.2vw, 3rem)" }}
      >
        {quote}
      </p>

      <ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {profile.channels.map((channel) => (
          <li key={`${profile.name}-${channel.platform}`}>
            <ChannelLink channel={channel} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChannelLink({ channel }: { channel: SocialChannel }) {
  return (
    <a
      href={channel.url}
      className="group grid grid-cols-12 items-center gap-4 py-4 transition-colors hover:text-[var(--color-accent)]"
    >
      <span className="col-span-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] group-hover:text-[var(--color-accent)]">
        {channel.platform}
      </span>
      <span className="col-span-6 text-base md:text-lg">{channel.handle}</span>
      <span className="col-span-2 text-right text-xs text-[var(--color-muted)]">
        {channel.followers ?? "—"}
      </span>
      <span aria-hidden className="col-span-1 text-right transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
