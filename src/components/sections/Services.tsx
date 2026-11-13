import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { services } from "@/data/services";
import { serviceDescription, serviceName, useI18n } from "@/i18n";

export function Services() {
  const { lang, t } = useI18n();

  return (
    <section
      id="services"
      className="section-y mx-auto max-w-6xl px-4 md:px-8"
    >
      <FadeIn className="max-w-2xl">
        <span className="mb-[var(--space-3)] block h-px w-16 bg-gold" aria-hidden="true" />
        <h2 className="text-h2 text-foreground">{t.services.title}</h2>
        <p className="mt-[var(--space-3)] text-muted-foreground">
          {t.services.intro}
        </p>
      </FadeIn>

      <div className="mt-[var(--space-5)] grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <FadeIn key={service.id} i={index} className="h-full">
              <article className="group glint shadow-warm relative flex h-full flex-col border border-border bg-card pad-card transition-[transform,border-color] duration-[233ms] [transition-timing-function:var(--ease-out)] hover:-translate-y-[5px] hover:border-gold/40">
                <div
                  className="flex h-[55px] w-[55px] items-center justify-center rounded-full border border-primary/50 text-primary transition-transform duration-[233ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.0618]"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-[var(--space-3)] text-h4 text-foreground">
                  {serviceName(service, lang)}
                </h3>
                <p className="mt-[var(--space-2)] flex-1 text-sm leading-relaxed text-muted-foreground">
                  {serviceDescription(service, lang)}
                </p>

                <div className="mt-[var(--space-4)] border-t border-border pt-[var(--space-2)] text-sm">
                  <a
                    href="#pricing"
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-foreground underline-offset-4 transition-colors hover:text-gold"
                  >
                    {t.services.askPrice}
                    <span className="inline-flex rtl:rotate-180">
                      <ArrowRight
                        className="arrow-nudge h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
