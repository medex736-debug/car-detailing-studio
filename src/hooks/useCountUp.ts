import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `target` once `active` turns true (987ms ease-out by default).
 * Respects prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp(
  target: number,
  active: boolean,
  duration = 987,
  decimals = 0,
) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      frame.current = requestAnimationFrame(() => setValue(target));
      return () => {
        if (frame.current !== null) cancelAnimationFrame(frame.current);
      };
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [active, target, duration]);

  return Number(value.toFixed(decimals));
}
