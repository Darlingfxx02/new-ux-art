import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
}

// Единая шкала вертикальных ритмов сайта.
// Section padding-y:  py-24 md:py-32  (96 / 128px)  — стандарт; используй и в кастомных секциях.
// Header → content:   mt-20 md:mt-28 / mb-20 md:mb-28  (80 / 112px).
// Row → row в grid:   gap-y-20 md:gap-y-24  (80 / 96px).
// Text stack:         gap-6 (24px) — лид + h + body.
// Flagship-fullscreen (Hero/Showreel/Directions) — управляются индивидуально.
export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("border-b border-[var(--color-line)] py-24 md:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
