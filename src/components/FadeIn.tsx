import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay index for staggered children (0-based). */
  i?: number;
}

/**
 * Fades + lifts its children once when they enter the viewport.
 * Disabled entirely under prefers-reduced-motion via the global CSS rule.
 */
export function FadeIn({ children, className, i = 0 }: FadeInProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn("animate-in", inView && "is-visible", className)}
      style={{ transitionDelay: `${i * 120}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}