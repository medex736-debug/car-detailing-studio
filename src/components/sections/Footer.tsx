import { site } from "@/data/site";
import { assetUrl } from "@/lib/assets";

export function Footer() {
  return (
    <footer className="border-t border-border pb-24 md:pb-0">
      <div className="h-px w-24 bg-gold" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1">
              <img
                src={assetUrl("assets/logo.png")}
                alt={site.name}
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <span
              className="mt-3 block h-px w-10 bg-gold"
              aria-hidden="true"
            />
            <p className="mt-4 max-w-56 text-sm text-muted-foreground">
              {site.nameTagline}. Correction, coating and protection for
              vehicles that are driven sparingly and looked at closely.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-foreground">Visit</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{site.address.line1}</li>
              <li>{site.address.line2}</li>
              <li>
                {site.address.city}, {site.address.postal}
              </li>
              <li className="pt-1">
                <a
                  href="https://maps.app.goo.gl/Lv9gTkUjPWXfRgD56"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  View on Google Maps
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-graphite">
              {site.serviceArea}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-foreground">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-6">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-foreground"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-[44px] items-center break-all underline-offset-4 hover:text-foreground"
                >
                  {site.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-graphite">
              Slots are held at booking and confirmed within four working
              hours.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Booked by slot, priced after inspection.</p>
        </div>
      </div>
    </footer>
  );
}