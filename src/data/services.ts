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
    name: "Premium Detailing",
    description:
      "Revive your ride inside and out — deep cleaning, engine bay care, and show-car perfection.",
    duration: "4–5 hours",
    icon: Droplets,
  },
  {
    id: "interior-detail",
    name: "Tinting",
    description:
      "Experience comfort and elegance — premium films that reduce heat, protect interiors, and elevate your car’s appearance.",
    duration: "4–6 hours",
    icon: Armchair,
  },
  {
    id: "paint-correction",
    name: "Color Full Wrapping",
    description:
      "Transform your vehicle into a statement — precision-applied chrome, satin, or matte wraps with striking design and flawless finish.",
    duration: "1–2 days",
    icon: Sparkles,
  },
  {
    id: "ceramic-coating",
    name: "Graphene Coating",
    description:
      "The ultimate shield of brilliance — advanced graphene coating that delivers deep gloss, smooth touch, and long-term resistance against the elements.",
    duration: "2–3 days",
    icon: Shield,
  },
  {
    id: "paint-protection-film",
    name: "Paint Protection Film",
    description:
      "Invisible armor for your paint — defends against scratches, chips, and road damage.\nAvailable in Gloss & Matt.\nXPEL  |  AVERY DENNISON  |  LUMINOUS",
    duration: "2 days",
    icon: Layers,
  },
];

export const serviceNames = services.map((s) => s.name);