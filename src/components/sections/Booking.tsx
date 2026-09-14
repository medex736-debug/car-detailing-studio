import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { Input, Label, Textarea } from "@/components/ui/field";
import { services } from "@/data/services";
import { site } from "@/data/site";

interface BookingProps {
  /** Preselected service id, set when a pricing CTA is used. */
  preferredService?: string;
}

interface BookingSummary {
  name: string;
  vehicle: string;
  service: string;
  date: string;
}

function todayIso() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function Booking({ preferredService }: BookingProps) {
  const [serviceId, setServiceId] = useState(services[0].id);
  const [preferredLatch, setPreferredLatch] = useState(preferredService);
  const [summary, setSummary] = useState<BookingSummary | null>(null);

  // Keep the select in sync when a pricing CTA picks a service. Done during
  // render (adjusting state from a changing prop), the effect-free pattern:
  // once the user edits the select themselves, a fresh plan click still wins.
  if (preferredService !== preferredLatch) {
    setPreferredLatch(preferredService);
    const next = services.find((s) => s.id === preferredService)?.id;
    const sync = next ?? services[0].id;
    if (sync !== serviceId) setServiceId(sync);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const selected = services.find((s) => s.id === serviceId);
    setSummary({
      name: String(data.get("name") ?? ""),
      vehicle: String(data.get("vehicle") ?? ""),
      service: selected?.name ?? serviceId,
      date: String(data.get("date") ?? ""),
    });
  };

  if (summary) {
    return (
      <section id="booking" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <Card className="max-w-xl border-border bg-card">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm font-medium text-foreground">Slot requested</p>
            </div>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Service</span>{" "}
                — {summary.service}
              </p>
              <p>
                <span className="font-medium text-foreground">Vehicle</span> —{" "}
                {summary.vehicle}
              </p>
              <p>
                <span className="font-medium text-foreground">Requested date</span>{" "}
                — {summary.date}
              </p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              We confirm every slot within four working hours. This form is a
              demonstration — no request is sent until a booking system is
              connected.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="booking" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn className="max-w-md">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] text-foreground">
            Book a slot, not a quote.
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Choose a service, pick a date, and we confirm the slot within
              four working hours. Corrections and coatings are priced after a
              walkthrough, but the bay is held from the moment you book.
            </p>
            <p className="text-sm">
              Prefer to talk it through first —{" "}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="text-foreground underline-offset-4 hover:text-gold"
              >
                {site.phone}
              </a>
              .
            </p>
          </div>
        </FadeIn>

        <Card className="border-border bg-card">
          <CardContent className="p-8">
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="booking-name">Name</Label>
                  <Input
                    id="booking-name"
                    name="name"
                    autoComplete="name"
                    required
                    className="mt-1.5"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="booking-vehicle">Vehicle</Label>
                  <Input
                    id="booking-vehicle"
                    name="vehicle"
                    required
                    className="mt-1.5"
                    placeholder="Make and model"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="booking-service">Service</Label>
                  <select
                    id="booking-service"
                    name="service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    required
                    className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.duration}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="booking-date">Preferred date</Label>
                  <Input
                    id="booking-date"
                    name="date"
                    type="date"
                    min={todayIso()}
                    required
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="booking-notes">
                  Anything we should know?
                </Label>
                <Textarea
                  id="booking-notes"
                  name="notes"
                  className="mt-1.5"
                  placeholder="Paintwork history, known issues, access notes…"
                />
              </div>

              <Button type="submit" size="lg" className="mt-2 w-full">
                Request this slot
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                No payment is taken at booking. Corrections and coatings are
                confirmed after inspection.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}