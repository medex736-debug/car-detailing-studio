import { ArrowDown } from "lucide-react";

import { assetUrl } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* One motion moment: the hero image eases in on load. Everything after
          this stays static. Reduced-motion disables the animation globally. */}
      <img
        src={assetUrl("/assets/Hero.jpg")}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{
          animation: "hero-in 1.1s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      />
      {/* Dark overlay for text readability over the paint reflection */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/60 to-background/30"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-32 pt-28 md:px-8">
        <span
          className="mb-8 block h-px w-16 bg-gold"
          aria-hidden="true"
        />

        <h1 className="max-w-3xl break-words text-[clamp(1.85rem,7vw,4.4rem)] text-foreground">
          Paint correction and ceramic protection for cars that show every
          mark.
        </h1>

        <p className="mt-5 max-w-xl text-base text-muted-foreground sm:mt-7 sm:text-lg">
          Single-slot detailing. Paint depth measured before and after each
          pass, interiors steamed rather than sprayed, and a protection
          schedule built to outlast the season. Booked by appointment,
          finished on time.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
          <Button asChild size="lg">
            <a href="#booking">Book a detail</a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="#services" className="gap-2">
              See the work <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <dl className="mt-12 grid max-w-lg grid-cols-1 gap-4 border-t border-border pt-6 text-sm sm:mt-16 sm:grid-cols-2 sm:gap-6">
          <div>
            <dt className="font-medium text-foreground">Location</dt>
            <dd className="mt-1 text-muted-foreground">
              {site.address.city}, {site.address.line2}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Service area</dt>
            <dd className="mt-1 text-muted-foreground">{site.serviceArea}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}