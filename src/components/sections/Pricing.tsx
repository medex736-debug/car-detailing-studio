import { PricingModule, type PricingPlan } from "@/components/ui/pricing-module";
import { pricingPlans } from "@/data/pricing";

interface PricingProps {
  onBook?: (plan: PricingPlan) => void;
}

export function Pricing({ onBook }: PricingProps) {
  return (
    <section id="pricing" className="scroll-mt-16">
      <PricingModule
        title="Pricing"
        subtitle="Transparent, per-vehicle prices. A slot is a one-time detail, not a subscription."
        buttonLabel="Book this slot"
        plans={pricingPlans}
        onBook={onBook}
      />
      <p className="mx-auto max-w-2xl px-4 pb-16 text-center text-sm text-muted-foreground">
        Correction and coating rates are confirmed after a walkthrough
        inspection. The figures above are the starting rate, not a quote
        written before the car arrives.
      </p>
    </section>
  );
}