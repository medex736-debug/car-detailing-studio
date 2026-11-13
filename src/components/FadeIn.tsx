import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay index for staggered children (0-based, capped at 5 steps). */
  i?: number;
  /** Reveal axis: vertical lift (default) or from the reading side. */
  from?: "y" | "x";
}

/**
 * Fades + lifts its children once when they enter the viewport.
 * Hidden states only apply under `html.js`; content stays visible without JS.
 * Disabled entirely under prefers-reduced-motion via the global CSS rule.
 */
export function FadeIn({ children, className, i = 0, from = "y" }: FadeInProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        from === "x" ? "reveal-x" : "reveal",
        inView && "is-visible",
        className,
      )}
      style={
        { transitionDelay: `${Math.min(i, 5) * 89}ms` } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
