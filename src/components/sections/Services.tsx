import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="max-w-2xl">
        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] text-foreground">
          Five services, each done once, done properly.
        </h2>
        <p className="mt-4 text-muted-foreground">
          No packages built from a menu a wash bay can't deliver. Each service
          is a defined process with a defined finish.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.id}
              className="flex flex-col border border-border bg-card p-7"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 text-primary"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-6 text-xl text-foreground">{service.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-graphite">{service.duration}</span>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 transition-colors hover:text-gold"
                >
                  Pricing
                  <ArrowRight
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}