import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { Input, Label, Textarea } from "@/components/ui/field";
import { services } from "@/data/services";
import { site } from "@/data/site";

/**
 * WhatsApp number that receives booking requests.
 * Must be in international format, digits only, no "+", spaces or dashes.
 * Single source of truth: `site.whatsapp` in `src/data/site.ts`.
 */

/**
 * English service name -> Arabic translation used ONLY inside the WhatsApp
 * message. Update the keys on the left to match the exact `name` values
 * coming from `data/services`. Any service not listed here falls back to
 * its original (English) name so nothing breaks if a name doesn't match.
 */
const SERVICE_NAME_AR: Record<string, string> = {
  "Exterior detail": "تفصيل خارجي",
  "Interior detail": "تفصيل داخلي",
  "Paint correction": "تصحيح الطلاء",
  "Ceramic coating": "طلاء سيراميك",
  "Paint protection film": "فيلم حماية الطلاء",
};

/** Hourly slots, 9:00 AM -> 6:00 PM. Labels stay in English in the UI. */
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

interface BookingProps {
  /** Preselected service id, set when a pricing CTA is used. */
  preferredService?: string;
}

interface BookingSummary {
  name: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
}

function todayIso() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function toArabicServiceName(englishName: string) {
  return SERVICE_NAME_AR[englishName] ?? englishName;
}

function buildWhatsAppLink(payload: {
  name: string;
  serviceNameEn: string;
  date: string;
  time: string;
}) {
  const message =
    `مرحباً، أرغب بطلب موعد:\n` +
    `الخدمة: ${toArabicServiceName(payload.serviceNameEn)}\n` +
    `التاريخ المفضل: ${payload.date}\n` +
    `الوقت المفضل: ${payload.time}\n` +
    `الاسم: ${payload.name}\n\n` +
    `(بانتظار تأكيدكم للموعد)`;

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function Booking({ preferredService }: BookingProps) {
  const [serviceId, setServiceId] = useState(services[0].id);
  const [preferredLatch, setPreferredLatch] = useState(preferredService);
  const [summary, setSummary] = useState<BookingSummary | null>(null);

  if (preferredService !== preferredLatch) {
    setPreferredLatch(preferredService);
    const next = services.find((s) => s.id === preferredService)?.id;
    const sync = next ?? services[0].id;
    if (sync !== serviceId) setServiceId(sync);
  }

  const onSubmit = (e: { currentTarget: HTMLFormElement; preventDefault(): void }) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const selected = services.find((s) => s.id === serviceId);

    const name = String(data.get("name") ?? "").trim();
    const vehicle = String(data.get("vehicle") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const time = String(data.get("time") ?? "").trim();
    const serviceNameEn = selected?.name ?? serviceId;

    const link = buildWhatsAppLink({ name, serviceNameEn, date, time });
    window.open(link, "_blank");

    setSummary({ name, vehicle, service: serviceNameEn, date, time });
  };

  if (summary) {
    return (
      <section id="booking" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <Card className="max-w-xl border-border bg-card">
          <CardContent className="p-5 sm:p-8">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm font-medium text-foreground">Request sent on WhatsApp</p>
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
                <span className="font-medium text-foreground">Preferred date</span>{" "}
                — {summary.date}
              </p>
              <p>
                <span className="font-medium text-foreground">Preferred time</span>{" "}
                — {summary.time}
              </p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              A WhatsApp chat has opened with your request pre-filled. Just hit
              send — our team will confirm your final appointment time there.
            </p>
            <Button
              className="mt-6 w-full"
              variant="outline"
              onClick={() => setSummary(null)}
            >
              Submit another request
            </Button>
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
              Choose a service, pick a date and time, and send us your request
              on WhatsApp. Our team will contact you there to confirm your
              final appointment.
            </p>
            <p className="text-sm">
              Prefer to talk it through first —{" "}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-[44px] items-center text-foreground underline-offset-4 hover:text-gold"
              >
                {site.phone}
              </a>
              .
            </p>
          </div>
        </FadeIn>

        <Card className="border-border bg-card">
          <CardContent className="p-5 sm:p-8">
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
                  <Label htmlFor="booking-phone">Phone</Label>
                  <Input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="mt-1.5"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
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
                <div>
                  <Label htmlFor="booking-email">Email (optional)</Label>
                  <Input
                    id="booking-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="mt-1.5"
                    placeholder="your@email.com"
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
                    className="mt-1.5 min-h-[44px] h-11 w-full max-w-full rounded-lg border border-input bg-background px-3 py-2 text-base sm:px-3.5 sm:text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring touch-manipulation"
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
                <Label htmlFor="booking-time">Preferred time</Label>
                  <select
                    id="booking-time"
                    name="time"
                    required
                    defaultValue=""
                    className="mt-1.5 min-h-[44px] h-11 w-full max-w-full rounded-lg border border-input bg-background px-3 py-2 text-base sm:px-3.5 sm:text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring touch-manipulation"
                  >
                  <option value="" disabled>
                    Select a time
                  </option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
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
                Request this slot on WhatsApp
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                No payment is taken at booking. We'll open WhatsApp with your
                request ready to send — final confirmation happens there.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}