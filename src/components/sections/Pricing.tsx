import { MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { useI18n } from "@/i18n";

/**
 * No fixed prices: the price depends on the car's condition and the chosen
 * service (CLIENT-BRIEF.md §4 / docs/VERIFIED_FACTS.md). This section only
 * routes the visitor to WhatsApp or a phone call for a quote.
 * The WhatsApp number comes from `site.whatsapp` only.
 */
export function Pricing() {
  const { t, site } = useI18n();
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    t.pricing.whatsappMessage,
  )}`;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <section id="pricing" className="section-y scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <FadeIn className="glow-gold mx-auto max-w-2xl">
          <div className="shadow-warm border border-border bg-card pad-card text-center sm:p-[var(--space-6)]">
            <h2 className="text-h2 text-foreground">{t.pricing.title}</h2>
            <p className="mx-auto mt-[var(--space-3)] leading-relaxed text-muted-foreground">
              {t.pricing.body}
            </p>

            <div className="mt-[var(--space-4)] flex flex-col gap-[var(--space-2)] sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="glint min-h-[55px] gap-2 px-[var(--space-3)]"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t.pricing.whatsappCta}
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-[55px] gap-2 px-[var(--space-3)]"
              >
                <a href={telHref}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t.common.callNow}
                  <span dir="ltr" className="tnum text-xs text-muted-foreground">
                    {site.phone}
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
