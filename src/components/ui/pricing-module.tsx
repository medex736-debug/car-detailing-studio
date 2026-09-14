"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FadeIn } from "@/components/FadeIn";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  /** One-time service price for a sedan. */
  priceSedan: number;
  /** One-time service price for an SUV or larger vehicle. */
  priceSuv: number;
  /** What the package covers, in one line. */
  scope: string;
  features: PlanFeature[];
  recommended?: boolean;
  /** Label shown on the recommended badge, e.g. "Signature". */
  recommendedLabel?: string;
}

export interface PricingModuleProps {
  title?: string;
  subtitle?: string;
  /** Shown beside the vehicle-size switch. */
  suvLabel?: string;
  buttonLabel?: string;
  /** Anchor the CTA points at once booked. */
  bookHref?: string;
  onBook?: (plan: PricingPlan) => void;
  plans: PricingPlan[];
  defaultSuv?: boolean;
  className?: string;
}

export function PricingModule({
  title = "Pricing",
  subtitle = "Transparent, per-vehicle prices. A slot is a one-time detail, not a subscription.",
  suvLabel = "SUV",
  buttonLabel = "Book this detail",
  bookHref = "#booking",
  onBook,
  plans,
  defaultSuv = false,
  className,
}: PricingModuleProps) {
  const [isSuv, setIsSuv] = React.useState(defaultSuv);

  const book = (plan: PricingPlan) => {
    onBook?.(plan);
  };

  return (
    <section
      className={cn(
        "w-full bg-background text-foreground py-20 px-4 md:px-8",
        className
      )}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground mb-8">{subtitle}</p>

        {/* Vehicle-size toggle: a studio prices by vehicle, not by month. */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span
            className={cn(
              "text-sm transition-colors",
              !isSuv
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            Sedan
          </span>
          <Switch
            isSelected={isSuv}
            onChange={setIsSuv}
            aria-label="Show SUV pricing"
          />
          <span
            className={cn(
              "text-sm transition-colors",
              isSuv ? "text-foreground font-medium" : "text-muted-foreground"
            )}
          >
            {suvLabel}
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {plans.map((plan, i) => (
            <FadeIn key={plan.id} i={i}>
            <Card
              className={cn(
                "relative border border-muted rounded-xl transition-colors",
                plan.recommended &&
                  "border-primary ring-1 ring-primary/40 bg-muted"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit border border-gold bg-background text-gold text-xs px-3 py-1 rounded-full">
                  {plan.recommendedLabel ?? "Recommended"}
                </div>
              )}

              <CardHeader className="pt-8 pb-2">
                <div className="flex justify-center mb-4">{plan.icon}</div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="text-[2.6rem] leading-none font-display mb-2">
                  ${isSuv ? plan.priceSuv : plan.priceSedan}
                </div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                  {isSuv ? `${suvLabel} detail` : "sedan detail"}
                </p>

                <Button
                  asChild
                  variant={plan.recommended ? "default" : "outline"}
                  className="w-full mb-6"
                >
                  <a href={bookHref} onClick={() => book(plan)}>
                    {buttonLabel}
                  </a>
                </Button>

                <div className="text-sm">
                  <h4 className="font-medium text-foreground mb-2">Scope</h4>
                  <p className="text-muted-foreground mb-4">{plan.scope}</p>

                  <h4 className="font-medium text-foreground mb-2">
                    Highlights
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {f.included ? (
                          <Check className="w-4 h-4 shrink-0 text-gold" />
                        ) : (
                          <X className="w-4 h-4 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={f.included
                            ? "text-muted-foreground"
                            : "text-muted-foreground/60 line-through"}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}