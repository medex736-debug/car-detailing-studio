import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";

type Category = "exterior" | "interior" | "protection";

interface WorkItem {
  id: string;
  category: Category;
  title: string;
  beforeNote: string;
  afterNote: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  result: string;
}

const work: WorkItem[] = [
  {
    id: "swirls",
    category: "exterior",
    title: "Swirl removal, black paint",
    beforeNote: "Before — holograms under flat light",
    afterNote: "After — single-stage correction",
    beforeSrc: "/assets/Pair1_before.jpg",
    afterSrc: "/assets/pair1_after.jpg",
    beforeAlt: "Black paint with visible swirl marks and holograms under LED inspection light",
    afterAlt: "Same panel after single-stage correction — swirl-free mirror finish",
    result: "Defects gone, clear coat retained.",
  },
  {
    id: "interior",
    category: "interior",
    title: "Cabin refresh, ten-year-old interior",
    beforeNote: "Before — embedded stains and wear",
    afterNote: "After — steam extraction and conditioning",
    beforeSrc: "/assets/Pair2_before.jpg",
    afterSrc: "/assets/pair2_after.jpg",
    beforeAlt: "Driver's cabin with stained fabric seats, worn leather trim, and dusty vents",
    afterAlt: "Same cabin after steam extraction — fabric clean, leather conditioned, trim detailed",
    result: "No fragrance from a bottle. The cabin smells clean, not masked.",
  },
  {
    id: "ceramic",
    category: "protection",
    title: "Ceramic coating, metallic grey",
    beforeNote: "Before — uncoated, water pooling",
    afterNote: "After — two-year coating, water sheeting",
    beforeSrc: "/assets/pair3_before.jpg",
    afterSrc: "/assets/pair3_after.jpg",
    beforeAlt: "Untreated paint surface with water pooling flat and spreading",
    afterAlt: "Same panel after ceramic coating — water beading tightly and sheeting off",
    result: "Hydrophobic finish maintained with six-month inspections.",
  },
];

const filters: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "protection", label: "Protection" },
];

function BeforeAfterSlider({
  beforeNote,
  afterNote,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: {
  beforeNote: string;
  afterNote: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden border border-border select-none"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* After (base layer) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* Before (clipped to the left of the divider) */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Corner labels */}
      <span className="absolute left-3 top-3 bg-background/80 px-2 py-0.5 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
        {beforeNote}
      </span>
      <span className="absolute right-3 top-3 bg-background/80 px-2 py-0.5 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
        {afterNote}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 w-px bg-gold"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            setPos((p) => Math.max(0, p - 3));
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            setPos((p) => Math.min(100, p + 3));
          }
        }}
        className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold bg-background text-gold"
        style={{ left: `${pos}%` }}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </div>
    </div>
  );
}

export function Gallery() {
  const [active, setActive] = useState<Category | "all">("all");
  const items = active === "all" ? work : work.filter((w) => w.category === active);

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <FadeIn className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] text-foreground">
            Before and after, shot without a filter.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Paired images from the same car, same light, same lens. Drag the
            divider — nothing is bounced through a gallery preset.
          </p>
        </FadeIn>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                active === f.id
                  ? "border-primary bg-primary/20 text-foreground"
                  : "border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-8">
        {items.map((item) => (
          <figure key={item.id} className="flex flex-col gap-4">
            <BeforeAfterSlider
              beforeNote={item.beforeNote}
              afterNote={item.afterNote}
              beforeSrc={item.beforeSrc}
              afterSrc={item.afterSrc}
              beforeAlt={item.beforeAlt}
              afterAlt={item.afterAlt}
            />
            <figcaption className="text-sm">
              <p className="font-display text-lg text-foreground">{item.title}</p>
              <p className="mt-1 text-muted-foreground">{item.result}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}