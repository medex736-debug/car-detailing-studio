const steps = [
  {
    title: "Inspection",
    text: "Paint thickness measured across every panel. A written defect map before any machine touches the body.",
  },
  {
    title: "Decontamination",
    text: "Fallout, tar and bonded contamination removed. The paint is bare and honest before correction starts.",
  },
  {
    title: "Correction",
    text: "Multi-stage machine polish, cutting only as deep as the measurement allows. Unnecessary material is never removed.",
  },
  {
    title: "Protection",
    text: "Coating or film applied in a controlled bay, then cured to spec — not rushed out the door.",
  },
  {
    title: "Handover",
    text: "Panel-by-panel walkthrough under studio light, with care instructions and a written protection schedule.",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      className="border-y border-border bg-[#0d0d10] py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] text-foreground">
            How a booking actually runs.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sequenced by requirement, not convenience. Each step is checkable
            before the next begins.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-[#0d0d10] p-7">
              <span
                className="font-display text-3xl text-graphite"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-base font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-muted-foreground">
          Times are approximate and confirmed at booking. Correction and
          protection packages may extend to two or three days.
        </p>
      </div>
    </section>
  );
}