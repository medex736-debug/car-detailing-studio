import { Droplets, Layers, Shield, Sparkles, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: LucideIcon;
}

/**
 * The four services offered by the client.
 * Source: CLIENT-BRIEF.md §3 / docs/VERIFIED_FACTS.md.
 * `duration` was removed — durations were not provided by the client.
 */
export const services: Service[] = [
  {
    id: "cleaning",
    name: "تنظيف",
    nameEn: "Cleaning",
    description: "تنظيف شامل للسيارة من الداخل والخارج",
    descriptionEn: "Comprehensive cleaning of the car inside and out",
    icon: Droplets,
  },
  {
    id: "polishing",
    name: "تلميع",
    nameEn: "Polishing",
    description: "إعادة اللمعان للطلاء وإزالة الشوائب السطحية",
    descriptionEn: "Restores the paint's gloss and removes surface impurities",
    icon: Sparkles,
  },
  // TODO: confirm the difference between تلميع and بوليش with the client.
  // The client listed them as two separate services, but the exact wording
  // distinction is still unconfirmed (see docs/VERIFIED_FACTS.md TODO list).
  {
    id: "polish-machine",
    name: "بوليش",
    nameEn: "Machine Polish",
    description: "تلميع بالماكينة لإزالة الخدوش والهالات",
    descriptionEn: "Machine polishing to remove scratches and swirl marks",
    icon: Layers,
  },
  {
    id: "nano-ceramic",
    name: "نانو سيراميك",
    nameEn: "Nano Ceramic Coating",
    description: "طبقة حماية نانو سيراميك تدوم طويلاً وتعزل الطلاء",
    descriptionEn:
      "A long-lasting nano ceramic protective layer that seals the paint",
    icon: Shield,
  },
];

export const serviceNames = services.map((s) => s.name);
