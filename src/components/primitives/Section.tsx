import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
}

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
