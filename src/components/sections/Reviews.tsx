import { testimonials } from "@/data/testimonials";
import { FadeIn } from "@/components/FadeIn";

export function Reviews() {
  return (
    <section
      id="reviews"
      className="border-y border-border bg-[#0d0d10] py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <FadeIn className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] text-foreground">
            What owners say about a finished car.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Named clients, their own words. Collected after handover, not
            prompted at the till.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col">
              <blockquote className="font-display text-xl italic leading-snug text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                <p className="font-medium text-foreground">
                  {t.name} <span className="text-graphite">· {t.city}</span>
                </p>
                <p className="mt-1 text-muted-foreground">
                  {t.vehicle} — {t.service}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}