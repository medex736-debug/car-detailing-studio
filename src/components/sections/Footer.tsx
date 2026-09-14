import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border pb-24 md:pb-0">
      <div className="h-px w-24 bg-gold" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-base font-medium text-foreground">
              {site.name}
            </p>
            <span
              className="mt-2 block h-px w-10 bg-gold"
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
                  className="underline-offset-4 hover:text-foreground"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="underline-offset-4 hover:text-foreground"
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