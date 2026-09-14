import { Button } from "@/components/ui/button";

/**
 * Mobile-only booking bar, quiet by design: a plain outline button pinned to
 * the bottom edge, not a loud floating pill. Hidden on md+ where the nav CTA
 * covers it.
 */
export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-md md:hidden">
      <Button asChild variant="outline" className="w-full">
        <a href="#booking">Book a detail</a>
      </Button>
    </div>
  );
}