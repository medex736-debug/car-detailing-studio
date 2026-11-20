import { ChevronDown } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { faq } from "@/data/faq";
import { useI18n } from "@/i18n";

/**
 * Visible FAQ. Content comes from `src/data/faq.ts`, the same source the
 * FAQPage JSON-LD is generated from at build time, so the two never drift.
 * Every answer is in the DOM (details are rendered open by default).
 */
export function Faq() {
  const { lang, t } = useI18n();

  return (
    <section id="faq" className="section-y mx-auto max-w-6xl px-4 md:px-8">
      <FadeIn className="max-w-2xl">
        <span
          className="mb-[var(--space-3)] block h-px w-16 bg-gold"
          aria-hidden="true"
        />
        <h2 className="text-h2 text-foreground">{t.faq.title}</h2>
        <p className="mt-[var(--space-3)] text-muted-foreground">
          {t.faq.intro}
        </p>
      </FadeIn>

      <div className="mt-[var(--space-5)] grid gap-[var(--space-2)]">
        {faq.map((item, index) => {
          const question = lang === "en" ? item.qEn : item.q;
          const answer = lang === "en" ? item.aEn : item.a;

          return (
            <FadeIn key={item.id} i={index}>
              <details
                open
                className="group border border-border bg-card transition-colors open:border-gold/40"
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-[var(--space-2)] p-[var(--space-3)] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-h4 text-foreground">{question}</h3>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-gold transition-transform duration-[233ms] group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-[var(--space-3)] pb-[var(--space-3)] leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </details>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
