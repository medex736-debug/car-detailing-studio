import {
  Armchair,
  Droplets,
  Layers,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: "exterior-detail",
    name: "Exterior detail",
    description:
      "Decontamination wash, fallout removal, and a hand-finished sealant. Paint, glass, wheels, and trim returned to a dry, protected finish.",
    duration: "4–5 hours",
    icon: Droplets,
  },
  {
    id: "interior-detail",
    name: "Interior detail",
    description:
      "Steam and fabric extraction, leather cleaning and conditioning, and full trim detailing. No dressing overspray, no lingering fragrance.",
    duration: "4–6 hours",
    icon: Armchair,
  },
  {
    id: "paint-correction",
    name: "Paint correction",
    description:
      "Paint-depth measurement before any machine work, then staged compounding and polishing to remove swirls and haze without thinning the clear coat.",
    duration: "1–2 days",
    icon: Sparkles,
  },
  {
    id: "ceramic-coating",
    name: "Ceramic coating",
    description:
      "A multi-layer ceramic body protection applied after correction. Hydrophobic, chemical-resistant, and maintained with six-month inspections.",
    duration: "2–3 days",
    icon: Shield,
  },
  {
    id: "paint-protection-film",
    name: "Paint protection film",
    description:
      "Self-healing film over high-impact panels. Applied in a controlled bay, wrapped, not cut on the paint.",
    duration: "2 days",
    icon: Layers,
  },
];

export const serviceNames = services.map((s) => s.name);