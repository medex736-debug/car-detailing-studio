import { Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

/**
 * Location & business hours. The map iframe renders only when
 * `site.mapsEmbedUrl` is set; each social button only when its URL is set.
 */
export function Location() {
  const { t, site } = useI18n();
  const { instagram, facebook } = site.social;
  const hasMap = site.mapsEmbedUrl.trim() !== "";
  const cardClass = hasMap
    ? ""
    : "pad-card rounded-lg border border-border bg-card";
  const groupGap = hasMap
    ? "gap-[var(--space-3)]"
    : "gap-[var(--space-2)]";
  const iconClass = cn(
    "flex shrink-0 items-center justify-center rounded-full border border-gold text-gold",
    hasMap ? "h-[55px] w-[55px]" : "h-11 w-11",
  );

  return (
    <section id="location" className="section-y">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <FadeIn className="max-w-2xl">
          <span
            className="mb-[var(--space-3)] block h-px w-16 bg-gold"
            aria-hidden="true"
          />
          <h2 className="text-h2 text-foreground">{t.location.title}</h2>
        </FadeIn>

        <FadeIn
          className={cn(
            "mt-[var(--space-5)]",
            hasMap &&
              "grid gap-[var(--space-5)] lg:grid-cols-[1.618fr_1fr] lg:gap-[var(--space-6)]",
          )}
        >
          <div
            className={cn(
              hasMap
                ? "space-y-[var(--space-4)]"
                : "grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            <div className={cn("flex", groupGap, cardClass)}>
              <span className={iconClass}>
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-foreground">
                  {t.location.addressLabel}
                </h3>
                <p className="mt-[var(--space-1)] text-muted-foreground">
                  {site.address.area}
                  {t.common.addressSeparator}
                  {site.address.city}
                </p>
              </div>
            </div>

            <div className={cn("flex", groupGap, cardClass)}>
              <span className={iconClass}>
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-foreground">
                  {t.location.hoursLabel}
                </h3>
                <ul className="tnum mt-[var(--space-1)] space-y-[var(--space-1)] text-sm text-muted-foreground">
                  {site.hours.map((h) => (
                    <li
                      key={h.days}
                      className="flex items-baseline justify-between gap-x-[var(--space-2)]"
                    >
                      <span className="whitespace-nowrap">{h.days}</span>
                      <span className="whitespace-nowrap text-foreground">
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(instagram || facebook) && (
              <div className={cardClass}>
                <h3 className="text-sm font-medium text-foreground">
                  {t.location.followLabel}
                </h3>
                <div className="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-2)]">
                  {instagram && (
                    <Button asChild variant="outline" className="lift">
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.location.instagram}
                      </a>
                    </Button>
                  )}
                  {facebook && (
                    <Button asChild variant="outline" className="lift">
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.location.facebook}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {hasMap && (
            <div className="img-frame overflow-hidden rounded-lg border border-gold/40 shadow-warm">
              <iframe
                src={site.mapsEmbedUrl}
                title={t.location.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="aspect-[1.618/1] w-full border-0"
              />
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
