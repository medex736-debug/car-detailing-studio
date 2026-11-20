import { assetUrl } from "@/lib/assets";
import { Button } from "@/components/ui/button";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { ScrollCue } from "@/components/motion/ScrollCue";
import { media } from "@/data/media";
import { useI18n } from "@/i18n";

/** Hero image comes from the media manifest (docs/MEDIA_MANIFEST.md). */
const heroImage = assetUrl(
  media.hero ? `/assets/${media.hero}` : "/assets/Hero.jpg"
);

export function Hero() {
  const { t, site } = useI18n();
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    t.hero.whatsappGreeting,
  )}`;
  const telUrl = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Image settles once; the wrapper adds a light view-timeline parallax. */}
      <div className="hero-parallax absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={t.hero.imageAlt}
          width={1524}
          height={1134}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-img absolute inset-0 h-full w-full object-cover object-[50%_40%]"
        />
      </div>

      {/* Dark overlay for text readability; darkest on the text (start) side. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-l from-background/90 via-background/60 to-background/30 ltr:bg-gradient-to-r"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-[max(var(--space-7),24svh)] pt-[max(var(--space-6),14svh)] md:px-8">
        <div className="glow-gold max-w-3xl">
          <span
            className="hero-rule mb-[var(--space-3)] block h-px w-16 bg-gold"
            aria-hidden="true"
          />

          <HeroTitle
            text={t.hero.title}
            className="text-h1 max-w-3xl break-words text-foreground"
          />

          <p
            className="hero-seq-item mt-[var(--space-3)] max-w-xl text-base text-muted-foreground sm:text-lg"
            style={{ animationDelay: "267ms" }}
          >
            {t.hero.paragraph}
          </p>

          <div
            className="hero-seq-item mt-[var(--space-5)] flex flex-wrap items-center gap-[var(--space-3)]"
            style={{ animationDelay: "356ms" }}
          >
            <Button
              asChild
              size="lg"
              className="glint min-h-[55px] px-[var(--space-4)]"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {t.hero.whatsappCta}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="min-h-[55px] px-[var(--space-3)]"
            >
              <a href={telUrl}>{t.common.callNow}</a>
            </Button>
          </div>

          <dl className="hero-seq-item mt-[var(--space-5)] grid max-w-lg grid-cols-1 gap-[var(--space-3)] border-t border-border pt-[var(--space-3)] text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-foreground">
                {t.hero.locationLabel}
              </dt>
              <dd className="mt-1 text-muted-foreground">
                {site.address.area}
                {t.common.addressSeparator}
                {site.address.city}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">
                {t.hero.hoursLabel}
              </dt>
              <dd className="tnum mt-1 text-muted-foreground">
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
