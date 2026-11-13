import { useEffect, useState } from "react";

interface NavScrollState {
  scrolled: boolean;
  hidden: boolean;
}

/**
 * Nav chrome state: glass after `threshold` px, hide while scrolling down and
 * return while scrolling up. rAF-throttled, transform-only on the consumer.
 */
export function useHideOnScroll(threshold = 24): NavScrollState {
  const [state, setState] = useState<NavScrollState>({
    scrolled: false,
    hidden: false,
  });

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const scrolled = y > threshold;
      const delta = y - last;
      last = y;

      setState((prev) => {
        if (!scrolled) return { scrolled: false, hidden: false };
        if (delta > 6) return { scrolled: true, hidden: true };
        if (delta < -6) return { scrolled: true, hidden: false };
        return prev.scrolled === scrolled ? prev : { scrolled, hidden: false };
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return state;
}
