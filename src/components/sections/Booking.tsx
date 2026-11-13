import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/FadeIn";
import { Input, Label, Textarea } from "@/components/ui/field";
import { services } from "@/data/services";
import {
  serviceName,
  useI18n,
  type Dictionary,
  type Lang,
} from "@/i18n";

/**
 * WhatsApp number that receives booking requests.
 * Must be in international format, digits only, no "+", spaces or dashes.
 * Single source of truth: `site.whatsapp` in `src/data/site.ts`.
 */

interface BookingSummary {
  name: string;
  vehicle: string;
  serviceId: string;
  date: string;
  timeIndex: number;
}

function todayIso() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function buildWhatsAppLink(payload: {
  name: string;
  serviceNameAr: string;
  serviceNameEn: string;
  date: string;
  time: string;
  lang: Lang;
  t: Dictionary;
  whatsapp: string;
}) {
  const serviceLabel =
    payload.lang === "en"
      ? `${payload.serviceNameEn} (${payload.serviceNameAr})`
      : payload.serviceNameAr;

  const message =
    `${payload.t.booking.message.greeting}\n` +
    `${payload.t.booking.message.service}: ${serviceLabel}\n` +
    `${payload.t.booking.message.date}: ${payload.date}\n` +
    `${payload.t.booking.message.time}: ${payload.time}\n` +
    `${payload.t.booking.message.name}: ${payload.name}\n\n` +
    payload.t.booking.message.pending;

  return `https://wa.me/${payload.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function Booking() {
  const { lang, t, site } = useI18n();
  const [serviceId, setServiceId] = useState(services[0].id);
  const [timeIndex, setTimeIndex] = useState<number | "">("");
  const [summary, setSummary] = useState<BookingSummary | null>(null);

  const onSubmit = (e: { currentTarget: HTMLFormElement; preventDefault(): void }) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const selected = services.find((s) => s.id === serviceId);

    const name = String(data.get("name") ?? "").trim();
    const vehicle = String(data.get("vehicle") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const time = timeIndex === "" ? "" : t.booking.timeSlots[timeIndex];
    const serviceNameAr = selected?.name ?? serviceId;
    const serviceNameEn = selected?.nameEn ?? serviceId;

    const link = buildWhatsAppLink({
      name,
      serviceNameAr,
      serviceNameEn,
      date,
      time,
      lang,
      t,
      whatsapp: site.whatsapp,
    });
    window.open(link, "_blank");

    setSummary({
      name,
      vehicle,
      serviceId,
      date,
      timeIndex: timeIndex === "" ? 0 : timeIndex,
    });
  };

  if (summary) {
    const selected = services.find((s) => s.id === summary.serviceId);
    const serviceLabel = selected
      ? serviceName(selected, lang)
      : summary.serviceId;
    const timeLabel = t.booking.timeSlots[summary.timeIndex] ?? "";

    return (
      <section id="booking" className="section-y mx-auto max-w-6xl px-4 md:px-8">
        <Card className="max-w-xl border-border bg-card">
          <CardContent className="pad-card sm:p-[var(--space-5)]">
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm font-medium text-foreground">
                {t.booking.success.sent}
              </p>
            </div>
            <div className="mt-[var(--space-3)] space-y-[var(--space-2)] text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  {t.booking.success.service}
                </span>
                {" — "}
                {serviceLabel}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {t.booking.success.vehicle}
                </span>
                {" — "}
                {summary.vehicle}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {t.booking.success.date}
                </span>
                {" — "}
                {summary.date}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {t.booking.success.time}
                </span>
                {" — "}
                {timeLabel}
              </p>
            </div>
            <p className="mt-[var(--space-3)] text-sm text-muted-foreground">
              {t.booking.success.note}
            </p>
            <Button
              className="mt-[var(--space-4)] w-full"
              variant="outline"
              onClick={() => {
                setSummary(null);
                setTimeIndex("");
              }}
            >
              {t.booking.success.again}
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="booking" className="section-y mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid gap-[var(--space-5)] lg:grid-cols-[1fr_1.618fr] lg:gap-[var(--space-6)]">
        <FadeIn className="max-w-md">
          <h2 className="text-h2 text-foreground">{t.booking.title}</h2>
          <div className="mt-[var(--space-3)] space-y-[var(--space-2)] text-muted-foreground">
            <p>{t.booking.intro}</p>
            <p className="text-sm">
              {t.booking.phonePrompt}{" "}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                dir="ltr"
                className="inline-flex min-h-[44px] items-center text-foreground underline-offset-4 hover:text-gold"
              >
                {site.phone}
              </a>
            </p>
          </div>
        </FadeIn>

        <FadeIn i={1}>
          <Card className="shadow-warm border-border bg-card">
            <CardContent className="pad-card sm:p-[var(--space-5)]">
              <form onSubmit={onSubmit} className="grid gap-[var(--space-3)]">
              <div className="grid gap-[var(--space-3)] sm:grid-cols-2">
                <div>
                  <Label htmlFor="booking-name">{t.booking.labels.name}</Label>
                  <Input
                    id="booking-name"
                    name="name"
                    autoComplete="name"
                    required
                    className="mt-[var(--space-1)]"
                    placeholder={t.booking.placeholders.name}
                  />
                </div>
                <div>
                  <Label htmlFor="booking-phone">{t.booking.labels.phone}</Label>
                  <Input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    dir="ltr"
                    className="mt-[var(--space-1)] text-end"
                    placeholder={t.booking.placeholders.phone}
                  />
                </div>
              </div>

              <div className="grid gap-[var(--space-3)] sm:grid-cols-2">
                <div>
                  <Label htmlFor="booking-vehicle">
                    {t.booking.labels.vehicle}
                  </Label>
                  <Input
                    id="booking-vehicle"
                    name="vehicle"
                    required
                    className="mt-[var(--space-1)]"
                    placeholder={t.booking.placeholders.vehicle}
                  />
                </div>
                <div>
                  <Label htmlFor="booking-email">
                    {t.booking.labels.email}
                  </Label>
                  <Input
                    id="booking-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    className="mt-[var(--space-1)] text-end"
                    placeholder={t.booking.placeholders.email}
                  />
                </div>
              </div>

              <div className="grid gap-[var(--space-3)] sm:grid-cols-2">
                <div>
                  <Label htmlFor="booking-service">
                    {t.booking.labels.service}
                  </Label>
                  <select
                    id="booking-service"
                    name="service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    required
                    className="mt-[var(--space-1)] min-h-[44px] h-11 w-full max-w-full rounded-lg border border-input bg-background px-3 py-2 text-base sm:px-3.5 sm:text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring touch-manipulation"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {serviceName(s, lang)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="booking-date">{t.booking.labels.date}</Label>
                  <Input
                    id="booking-date"
                    name="date"
                    type="date"
                    min={todayIso()}
                    required
                    className="mt-[var(--space-1)]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="booking-time">{t.booking.labels.time}</Label>
                <select
                  id="booking-time"
                  name="time"
                  required
                  value={timeIndex}
                  onChange={(e) =>
                    setTimeIndex(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="mt-[var(--space-1)] min-h-[44px] h-11 w-full max-w-full rounded-lg border border-input bg-background px-3 py-2 text-base sm:px-3.5 sm:text-sm text-foreground transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-ring touch-manipulation"
                >
                  <option value="" disabled>
                    {t.booking.placeholders.time}
                  </option>
                  {t.booking.timeSlots.map((slot, index) => (
                    <option key={slot} value={index}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="booking-notes">{t.booking.labels.notes}</Label>
                <Textarea
                  id="booking-notes"
                  name="notes"
                  className="mt-[var(--space-1)]"
                  placeholder={t.booking.placeholders.notes}
                />
              </div>

              <Button type="submit" size="lg" className="glint mt-[var(--space-1)] min-h-[55px] w-full">
                {t.booking.submit}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {t.booking.footnote}
              </p>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
