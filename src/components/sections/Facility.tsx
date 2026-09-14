import { FadeIn } from "@/components/FadeIn";

const points = [
  "A single bay, climate controlled, dust- and humidity-monitored.",
  "Filtered air supply over the coating area — polish pulls are done in still air.",
  "Paint-depth gauge in routine use, logged per panel per visit.",
  "Dedicated wash, correction and coating zones so nothing cross-contaminates.",
];

export function Facility() {
  return (
    <section
      id="facility"
      className="border-y border-border bg-[#0d0d10] py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-8 lg:gap-16">
        <div>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] text-foreground">
            The bay is the difference between a detailer and a car wash.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A two-bucket wash in a car park finishes a car. It cannot finish a
            correction. Every surface here is engineered for the few hours a
            year your paint is actually worked on.
          </p>

          <ul className="mt-9 space-y-4">
            {points.map((point) => (
              <li
                key={point}
                className="flex gap-3 border-l border-graphite pl-4 text-sm leading-relaxed text-muted-foreground"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <FadeIn className="flex flex-col gap-4">
          <img
            src="/assets/Facility.jpg"
            alt="The correction bay under working light — a clean, climate-controlled studio with LED panel lighting, organized tool cart, and a vehicle positioned for detailing."
            loading="lazy"
            className="aspect-[4/3] w-full border border-border object-cover"
          />
        </FadeIn>
      </div>
    </section>
  );
}