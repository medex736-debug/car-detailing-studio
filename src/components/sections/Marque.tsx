import { marqueeMakes } from "@/data/marque";

export function Marque() {
  const names = marqueeMakes.join(", ");

  return (
    <section
      aria-label="Vehicles the studio services regularly"
      className="relative overflow-hidden border-y border-border bg-[#0d0d10] py-10"
    >
      {/* Edge masks so the row fades instead of clipping hard */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />

      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden="true"
            className="flex items-baseline gap-20 pr-20"
          >
            {marqueeMakes.map((make) => (
              <span
                key={make}
                className="whitespace-nowrap text-lg font-medium tracking-[0.04em] text-graphite"
              >
                {make}
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className="sr-only">{names}</p>
    </section>
  );
}