import { Container } from "@/components/primitives/Container";
import { ScrollBlurText } from "@/motion/ScrollBlurText";
import { ScrollBlurReveal } from "@/motion/ScrollBlurReveal";
import {
  ceoProfile,
  studioProfile,
  type SocialChannel,
  type SocialProfile,
} from "@/content/socials";
import { asset } from "@/lib/asset";

export function Socials() {
  const ceoTelegram = ceoProfile.channels.find(
    (c) => c.platform.toLowerCase() === "telegram",
  );
  const ceoRest = ceoProfile.channels.filter(
    (c) => c.platform.toLowerCase() !== "telegram",
  );

  return (
    <section id="socials" className="relative bg-black py-40 text-white md:py-56">
      <Container className="grid gap-16 md:grid-cols-12 md:gap-y-28">
        <div className="md:col-span-8 md:col-start-5">
          <h2
            className="font-normal leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4.25rem)" }}
          >
            <ScrollBlurText
              as="span"
              className="block"
              maxBlur={14}
              translateY={16}
              granularity="word"
              waveWidth={1.1}
            >
              Будем на связи.
            </ScrollBlurText>
            <ScrollBlurText
              as="span"
              className="block text-white/45"
              maxBlur={10}
              translateY={6}
              granularity="word"
            >
              Рассказываем о жизни студии.
            </ScrollBlurText>
          </h2>
        </div>

        {ceoTelegram && (
          <div className="md:col-span-12">
            <CeoTelegramHero
              name={ceoProfile.name}
              channel={ceoTelegram}
              otherChannels={ceoRest}
            />
          </div>
        )}

        <div className="md:col-span-12">
          <div className="border-t border-white/10 pt-14 md:pt-20">
            <ProfileBlock
              profile={studioProfile}
              caption="Процесс, работы, команда."
            />
          </div>
        </div>

        <div className="md:col-span-12">
          <ScrollBlurReveal
            className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl md:rounded-[2rem]"
            maxBlur={14}
            translateY={20}
            minOpacity={0.2}
          >
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2400&q=80"
              alt="Команда UXART"
              className="block h-full w-full object-cover"
              loading="lazy"
            />
          </ScrollBlurReveal>
        </div>
      </Container>
    </section>
  );
}

function CeoTelegramHero({
  name,
  channel,
  otherChannels,
}: {
  name: string;
  channel: SocialChannel;
  otherChannels: SocialChannel[];
}) {
  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-14">
      <div className="md:col-span-5">
        <div
          data-theme="light"
          data-theme-scope="logo"
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white"
          style={{
            clipPath: "inset(0 round 1rem)",
            WebkitClipPath: "inset(0 round 1rem)",
            isolation: "isolate",
            transform: "translateZ(0)",
          } as React.CSSProperties}
        >
          <img
            src={asset("/media/socials/konakov.png")}
            alt="Артём Конаков, CEO UXART"
            className="block h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex flex-col justify-end gap-10 md:col-span-7">
        <div className="flex flex-col gap-6">
          <div className="text-base font-medium text-white/55">
            Telegram · CEO
          </div>

          <h3
            className="font-normal leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.75rem)" }}
          >
            <ScrollBlurText
              as="span"
              granularity="word"
              maxBlur={14}
              translateY={16}
              waveWidth={1.1}
            >
              {channel.handle}
            </ScrollBlurText>
            <ScrollBlurText
              as="span"
              className="text-white/45"
              granularity="word"
              maxBlur={14}
              translateY={16}
              waveWidth={1.1}
            >
              {`.${channel.followers ? ` ${channel.followers} подписчиков.` : ""}`}
            </ScrollBlurText>
          </h3>

          <ScrollBlurText
            as="p"
            className="max-w-[40ch] text-lg text-white/55 md:text-xl"
            granularity="word"
            maxBlur={10}
            translateY={6}
          >
            {`${name} — о бизнесе, интерфейсах и студийной кухне. Из первых рук.`}
          </ScrollBlurText>
        </div>

        <ScrollBlurReveal
          className="flex flex-wrap items-center gap-2"
          maxBlur={10}
          translateY={6}
          minOpacity={0.2}
        >
          <a
            href={channel.url}
            aria-label={`Подписаться на ${channel.handle}`}
            className="inline-flex h-11 items-center gap-2.5 rounded-2xl bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 ease-[cubic-bezier(.19,1,.22,1)] hover:bg-white/15 md:h-12 md:text-base"
          >
            <PlatformIcon platform={channel.platform} />
            <span>Подписаться на {channel.handle}</span>
          </a>

          {otherChannels.map((c) => (
            <a
              key={c.platform}
              href={c.url}
              aria-label={`${c.platform} ${c.handle}`}
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-white/10 px-4 text-white backdrop-blur-md transition-colors duration-300 ease-[cubic-bezier(.19,1,.22,1)] hover:bg-white/15 md:h-12 md:px-5"
            >
              <PlatformIcon platform={c.platform} />
            </a>
          ))}
        </ScrollBlurReveal>
      </div>
    </div>
  );
}

function ProfileBlock({
  profile,
  caption,
}: {
  profile: SocialProfile;
  caption: string;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="flex flex-col gap-6 md:col-span-7">
        <ScrollBlurText
          as="h3"
          className="font-normal leading-[1] tracking-[-0.02em]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3.75rem)" }}
          granularity="word"
          maxBlur={14}
          translateY={16}
          waveWidth={1.1}
        >
          {profile.name}
        </ScrollBlurText>
        <ScrollBlurReveal
          as="ul"
          className="flex flex-wrap items-start gap-2"
          maxBlur={10}
          translateY={6}
          minOpacity={0.2}
        >
          {profile.channels.map((channel) => (
            <li key={`${profile.name}-${channel.platform}`}>
              <ChannelPill channel={channel} />
            </li>
          ))}
        </ScrollBlurReveal>
      </div>

      <div className="flex flex-col gap-4 md:col-span-5 md:items-end md:text-right">
        <div className="text-base font-medium text-white/55">
          {profile.role}
        </div>
        <ScrollBlurText
          as="p"
          className="max-w-[32ch] text-lg text-white/55"
          granularity="word"
          maxBlur={10}
          translateY={6}
        >
          {caption}
        </ScrollBlurText>
      </div>
    </div>
  );
}

function ChannelPill({ channel }: { channel: SocialChannel }) {
  return (
    <a
      href={channel.url}
      aria-label={`${channel.platform} ${channel.handle}`}
      className="inline-flex h-11 items-center gap-2.5 rounded-2xl bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 ease-[cubic-bezier(.19,1,.22,1)] hover:bg-white/15 md:h-12 md:text-base"
    >
      <PlatformIcon platform={channel.platform} />
      <span>{channel.handle}</span>
    </a>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    className: "shrink-0 text-white/80",
  } as const;

  switch (key) {
    case "telegram":
      return (
        <svg {...common}>
          <path d="M21.944 4.49 18.9 19.02c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.19c-.25.25-.46.46-.95.46l.34-4.82 8.79-7.94c.38-.34-.08-.53-.59-.19l-10.86 6.84-4.68-1.47c-1.02-.32-1.04-1.02.21-1.51l18.3-7.05c.85-.32 1.59.19 1.31 1.64Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "vc.ru":
    case "vc":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 6h3.6l3.2 8.6L14.1 6h5.9l-5.4 12h-5.2L4 6Z" />
        </svg>
      );
    case "behance":
      return (
        <svg {...common}>
          <path d="M2 5h6.3c2.1 0 3.6 1 3.6 3 0 1.3-.6 2.1-1.7 2.6 1.5.4 2.3 1.5 2.3 3.1 0 2.4-1.8 3.5-4.1 3.5H2V5Zm2.5 2v2.8h3.2c1 0 1.6-.4 1.6-1.4 0-.9-.6-1.4-1.6-1.4H4.5Zm0 4.7v3.1h3.4c1.2 0 1.9-.5 1.9-1.6 0-1.1-.7-1.5-1.9-1.5H4.5ZM15 8.8h6v1.4h-6V8.8Zm7.9 5.8c-.2 1.9-1.8 3.1-4 3.1-2.6 0-4.3-1.7-4.3-4.3 0-2.5 1.7-4.3 4.2-4.3 2.6 0 4.2 1.8 4.2 4.6v.3h-6c.1 1.2.8 2 2 2 .9 0 1.4-.4 1.6-1.1l2.3-.3Zm-6-2h3.5c-.1-1.1-.7-1.8-1.7-1.8-1.1 0-1.7.7-1.8 1.8Z" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3.7 9.3c4.8 0 10.6-.9 14.9-5M21 13.5c-4.9-1.8-10.2-.9-13.3 1.3-2.1 1.5-3.6 3.6-4.1 5.6M8.5 3.5c3.2 3.8 5.7 8.2 6.9 13" />
        </svg>
      );
    default:
      return (
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          {platform}
        </span>
      );
  }
}
