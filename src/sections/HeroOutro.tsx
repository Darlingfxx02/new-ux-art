import { Container } from "@/components/primitives/Container";
import { type StatItem as StatItemData } from "@/content/stats";
import { ScrollBlurText } from "@/motion/ScrollBlurText";

export function HeroOutro() {
  const bottom: StatItemData = { value: "Вместе", label: "Делаем интернет красивее" };

  return (
    <section id="stats-outro" className="relative h-[50vh] bg-black md:h-[55vh]">
      <Container className="relative flex h-full items-end justify-center pb-10 md:pb-14">
        <Stat item={bottom} align="center" />
      </Container>
    </section>
  );
}

function Stat({
  item,
  align = "left",
}: {
  item: StatItemData;
  align?: "left" | "right" | "center";
}) {
  const alignCls =
    align === "right"
      ? "items-end text-right"
      : align === "center"
        ? "items-center text-center"
        : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      <ScrollBlurText
        as="span"
        className="font-medium leading-[0.9] tracking-tight text-white"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        align={align}
      >
        {item.value}
      </ScrollBlurText>
      <ScrollBlurText
        as="span"
        className="text-base font-medium tracking-[0.02em] text-white/70 md:text-lg"
        maxBlur={8}
        translateY={4}
        align={align}
      >
        {item.label}
      </ScrollBlurText>
    </div>
  );
}
