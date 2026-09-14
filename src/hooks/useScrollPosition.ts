import { useEffect, useState } from "react";

/**
 * Tracks how far down the page the user has scrolled.
 * Used by the nav (transparent -> solid) and nothing else — one purpose.
 */
export function useScrollPosition(threshold = 8): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}