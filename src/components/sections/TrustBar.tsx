import { FadeIn } from "@/components/FadeIn";
import { BrandText, useI18n } from "@/i18n";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

/**
 * Slim trust band directly under the hero. Every value is read from the
 * localized site data; nothing here is hardcoded. The Google link only renders
 * when site.mapsUrl is set, and empty values hide their item.
 */
export function TrustBar() {
  const { t, site } = useI18n();
  const { ref, inView } = useInView();
  const openHours = site.hours[0]?.time ?? "";
  const area = [site.address.area, site.address.city]
    .filter(Boolean)
    .join(t.common.addressSeparator);

  const score = useCountUp(site.googleRating.score, inView, 987, 1);
  const count = useCountUp(site.googleRating.count, inView, 987, 0);

  const ratingLabel = (
    <>
      <span className="sr-only">
        <BrandText
          text={t.trust.ratingSr(
            String(site.googleRating.score),
            site.googleRating.count,
          )}
        />
      </span>
      <span aria-hidden="true" className="inline-flex items-center gap-1">
        <span dir="ltr" className="tnum">
          {score.toFixed(1)}
        </span>
        <span className="text-gold">★</span>
        <span>
          {t.trust.ratingOn} <BrandText text={t.trust.google} />
        </span>
      </span>
    </>
  );

  return (
    <section
      aria-label={t.trust.label}
      className="glint border-y border-border bg-card/40"
    >
      <div ref={ref}>
        <ul className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-x-[var(--space-3)] gap-y-[var(--space-1)] px-4 py-[var(--space-2)] text-sm text-muted-foreground md:flex md:flex-wrap md:justify-between md:px-8">
          <li className="flex justify-center md:block">
            <FadeIn i={0}>
              {site.mapsUrl ? (
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {ratingLabel}
                </a>
              ) : (
                <span className="inline-flex min-h-[44px] items-center">
                  {ratingLabel}
                </span>
              )}
            </FadeIn>
          </li>
          <li>
            <FadeIn i={1}>
              <span className="tnum inline-flex min-h-[44px] items-center">
                <span className="sr-only">
                  {site.googleRating.count}{" "}
                  {t.trust.reviewsLabel(site.googleRating.count)}
                </span>
                <span aria-hidden="true" dir="ltr">
                  {count}
                </span>
                <span aria-hidden="true" className="ms-1">
                  {t.trust.reviewsLabel(count)}
                </span>
              </span>
            </FadeIn>
          </li>
          {openHours && (
            <li>
              <FadeIn i={2}>
                <span className="tnum inline-flex min-h-[44px] items-center">
                  {openHours}
                </span>
              </FadeIn>
            </li>
          )}
          {area && (
            <li>
              <FadeIn i={3}>
                <span className="inline-flex min-h-[44px] items-center">
                  {area}
                </span>
              </FadeIn>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
