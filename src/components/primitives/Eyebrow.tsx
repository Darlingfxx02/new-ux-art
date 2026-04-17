import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-block text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]",
        className,
      )}
      {...props}
    />
  );
}
