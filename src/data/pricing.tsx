import { Armchair, Droplets, Shield, Sparkles } from "lucide-react";

import type { PricingPlan } from "@/components/ui/pricing-module";

/**
 * Placeholder pricing — sedans vs SUVs, per-vehicle one-time prices.
 * TODO: replace every number value below with the studio's real pricing.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "exterior",
    name: "Exterior detail",
    description: "Decontamination wash, sealant, wheels.",
    icon: <Droplets className="w-8 h-8 text-primary" />,
    priceSedan: 180,
    priceSuv: 220,
    scope: "Foam pre-wash, iron and tar removal, hand sealant.",
    features: [
      { label: "Foam pre-wash and rinse", included: true },
      { label: "Iron and tar decontamination", included: true },
      { label: "Wheels cleaned and sealed", included: true },
      { label: "Paint protection film care", included: false },
    ],
  },
  {
    id: "interior",
    name: "Interior detail",
    description: "Steam, extraction, leather conditioning.",
    icon: <Armchair className="w-8 h-8 text-primary" />,
    priceSedan: 160,
    priceSuv: 200,
    scope: "Full cabin steam clean, fabric extraction, trim.",
    features: [
      { label: "Steam clean and fabric extraction", included: true },
      { label: "Leather cleaned and conditioned", included: true },
      { label: "Trim, vents and glass detailed", included: true },
      { label: "Ceramic fabric guard", included: false },
    ],
  },
  {
    id: "paint-correction",
    name: "Paint correction",
    description: "Staged machine correction of swirls.",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    priceSedan: 420,
    priceSuv: 520,
    scope: "Paint-depth measurement, multi-stage machine polish.",
    features: [
      { label: "Paint-depth measurement", included: true },
      { label: "Multi-stage machine polish", included: true },
      { label: "Haze and swirl removed", included: true },
      { label: "Ceramic top coat applied", included: false },
    ],
  },
  {
    id: "signature",
    name: "Signature",
    description: "Correction, coating, and interior.",
    icon: <Shield className="w-8 h-8 text-gold" />,
    priceSedan: 950,
    priceSuv: 1150,
    scope: "The complete package. Correction, ceramic, and interior detail.",
    recommended: true,
    recommendedLabel: "Signature",
    features: [
      { label: "Full paint correction", included: true },
      { label: "Two-year ceramic coating", included: true },
      { label: "Interior deep detail", included: true },
      { label: "Glass and trim protection", included: true },
      { label: "Six-month inspections", included: true },
      { label: "Paint protection film", included: false },
    ],
  },
];