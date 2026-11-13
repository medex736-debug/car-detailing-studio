import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

/**
 * Mobile-only booking bar, quiet by design: a plain outline button pinned to
 * the bottom edge, not a loud floating pill. Hidden on md+ where the nav CTA
 * covers it. Retracts while the booking section is on screen so it never
 * covers the form's fields or its own submit button.
 */
export function StickyCTA() {
  const { t } = useI18n();
  const [overBooking, setOverBooking] = useState(false);

  useEffect(() => {
    const el = document.getElementById("booking");
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverBooking(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={overBooking || undefined}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-[233ms] [transition-timing-function:var(--ease-out)] md:hidden",
        overBooking && "pointer-events-none translate-y-full"
      )}
    >
      <Button asChild variant="outline" className="w-full">
        <a href="#booking" tabIndex={overBooking ? -1 : undefined}>
          {t.common.bookNow}
        </a>
      </Button>
    </div>
  );
}
