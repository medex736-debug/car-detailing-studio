import { testimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { BrandText, useI18n } from "@/i18n";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

/** Numeric Google rating badge (no star field — the template has none). */
function GoogleRatingBadge() {
  const { t, site } = useI18n();
  const { ref, inView } = useInView();
  const { score, count } = site.googleRating;
  const scoreValue = useCountUp(score, inView, 987, 1);
  const countValue = useCountUp(count, inView, 987, 0);

  const className =
    "inline-flex flex-wrap items-baseline gap-[var(--space-1)] rounded-lg border border-border bg-card px-[var(--space-3)] py-[var(--space-2)] transition-colors";

  const content = (
    <>
      <span className="sr-only">
        {t.reviews.ratingSr(String(score), count)}
      </span>
      <span
        dir="ltr"
        aria-hidden="true"
        className="tnum text-2xl font-semibold leading-none text-foreground"
      >
        {scoreValue.toFixed(1)}
      </span>
      <span aria-hidden="true" className="text-sm text-muted-foreground">
        / <span className="tnum">{countValue}</span>{" "}
        {t.reviews.reviewsLabel(countValue)}
      </span>
    </>
  );

  return (
    <div ref={ref} className="inline-block">
      {!site.mapsUrl ? (
        <span className={className}>{content}</span>
      ) : (
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.reviews.ratingAria(String(score), count)}
          className={`${className} hover:border-gold`}
        >
          {content}
        </a>
      )}
    </div>
  );
}

export function Reviews() {
  const { t, site } = useI18n();

  return (
    <section
      id="reviews"
      className="section-y border-y border-border bg-section-bg"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <FadeIn className="max-w-2xl">
          <span
            className="mb-[var(--space-3)] block h-px w-16 bg-gold"
            aria-hidden="true"
          />
          <h2 className="text-h2 text-foreground">{t.reviews.title}</h2>
          <p className="mt-[var(--space-3)] text-muted-foreground">
            <BrandText text={t.reviews.intro} />
          </p>
        </FadeIn>

        <div className="mt-[var(--space-3)]">
          <GoogleRatingBadge />
        </div>

        {testimonials.length > 0 ? (
          <div className="mt-[var(--space-5)] grid gap-x-[var(--space-5)] gap-y-[var(--space-5)] md:grid-cols-3">
            {testimonials.map((review, i) => (
              <FadeIn key={review.name} i={i} from="x" className="h-full">
                <figure
                  dir="auto"
                  lang={review.lang ?? "ar"}
                  className="flex h-full flex-col"
                >
                  <blockquote
                    dir="auto"
                    className="whitespace-pre-line font-display text-xl leading-snug text-foreground"
                  >
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-[var(--space-3)] border-t border-border pt-[var(--space-2)] text-sm">
                    <p className="font-medium text-foreground">
                      {review.name}
                      {review.city && (
                        <span className="text-graphite"> · {review.city}</span>
                      )}
                    </p>
                    {(review.vehicle || review.service) && (
                      <p className="mt-1 text-muted-foreground">
                        {[review.vehicle, review.service]
                          .filter((v): v is string => Boolean(v))
                          .join(" — ")}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        ) : (
          site.mapsUrl && (
            <div className="mt-[var(--space-4)]">
              <Button asChild variant="outline" className="lift">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BrandText text={t.reviews.fallback} />
                </a>
              </Button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
