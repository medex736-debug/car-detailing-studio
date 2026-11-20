import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useI18n } from "@/i18n";
import { assetUrl } from "@/lib/assets";

export function Footer() {
  const { t, site } = useI18n();
  const { instagram, facebook } = site.social;

  return (
    <footer className="border-t border-border pb-24 md:pb-0">
      <div className="h-px w-24 bg-gold" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-[var(--space-6)] md:px-8">
        <div className="grid gap-[var(--space-4)] md:grid-cols-4">
          <div className="md:col-span-1">
            <a
              href="#top"
              className="inline-flex min-h-[44px] items-center"
              aria-label={t.common.backToTop(site.name)}
            >
              <img
                src={assetUrl("/assets/logo-mark.png")}
                alt={site.name}
                width={316}
                height={334}
                className="h-auto w-32 object-contain"
              />
            </a>
            <span
              className="mt-[var(--space-2)] block h-px w-10 bg-gold"
              aria-hidden="true"
            />
            <p className="mt-[var(--space-2)] font-medium text-foreground">
              {site.name}
            </p>
            <p className="mt-[var(--space-1)] max-w-56 text-sm text-muted-foreground">
              {site.nameTagline}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-foreground">
              {t.footer.addressLabel}
            </h3>
            <ul className="mt-[var(--space-2)] space-y-[var(--space-1)] text-sm text-muted-foreground">
              <li>
                {site.address.area}
                {t.common.addressSeparator}
                {site.address.city}
                {t.common.addressSeparator}
                {site.address.country}
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-foreground">
              {t.footer.hoursLabel}
            </h3>
            <ul className="mt-[var(--space-2)] space-y-[var(--space-1)] text-sm text-muted-foreground">
              {site.hours.map((h) => (
                <li key={h.days} className="tnum flex justify-between gap-[var(--space-3)]">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-foreground">
              {t.footer.contactLabel}
            </h3>
            <ul className="mt-[var(--space-2)] space-y-[var(--space-1)] text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="tnum inline-flex min-h-[44px] items-center underline-offset-4 hover:text-foreground"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-foreground"
                >
                  {t.footer.whatsapp}
                </a>
              </li>
              {instagram && (
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-foreground"
                  >
                    {t.footer.instagram}
                  </a>
                </li>
              )}
              {facebook && (
                <li>
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-foreground"
                  >
                    {t.footer.facebook}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-1)] border-t border-border pt-[var(--space-3)] text-xs text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights(new Date().getFullYear(), site.shortName)}</p>
          <div className="flex flex-wrap items-center gap-[var(--space-2)]">
            <p>{t.footer.priceNote}</p>
            <p>{t.common.lastUpdated(__BUILD_DATE__)}</p>
            <LanguageSwitch variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
