import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

import { FadeIn } from "@/components/FadeIn";
import { media } from "@/data/media";
import type { PortfolioItem } from "@/data/media";
import { services } from "@/data/services";
import { assetUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { serviceName, useI18n } from "@/i18n";

function PortfolioCard({
  item,
  featured,
}: {
  item: PortfolioItem;
  featured: boolean;
}) {
  const { lang, t } = useI18n();
  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const serviceId = item.service.trim();
  const service = serviceId
    ? services.find((entry) => entry.id === serviceId)
    : undefined;
  const label = service ? serviceName(service, lang) : "";
  const title = (lang === "en" ? item.titleEn ?? "" : item.title).trim();
  const caption = (lang === "en" ? item.captionEn ?? "" : item.caption).trim();
  const videoFile = item.videoFile?.trim() ?? "";
  const imageSrc = assetUrl(`/assets/${item.file.trim()}`);
  const hasBody = Boolean(label || title || caption);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = cardRef.current;
    if (!el || frame.current) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    });
  };

  return (
    <figure
      ref={cardRef}
      onPointerMove={onPointerMove}
      className="portfolio-card glint shadow-warm group relative flex h-full flex-col overflow-hidden border border-border bg-card"
    >
      <div
        className={cn(
          "clip-reveal img-frame vignette relative w-full overflow-hidden border-b border-border",
          "aspect-[1.618/1]",
          featured && "lg:aspect-auto lg:min-h-[26rem] lg:flex-1",
        )}
      >
        {showVideo && videoFile ? (
          <video
            src={assetUrl(`/assets/${videoFile}`)}
            poster={imageSrc}
            controls
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full bg-black object-cover"
          />
        ) : (
          <>
            <img
              src={imageSrc}
              alt={title || caption || t.portfolio.genericAlt}
              loading={featured ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[987ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.0618]"
            />
            {videoFile && (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                aria-label={t.portfolio.playVideo}
                className="absolute inset-0 z-[3] grid place-items-center bg-background/10 transition-colors duration-[233ms] hover:bg-background/30"
              >
                <span className="play-ring flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-background/80 text-gold backdrop-blur transition-transform duration-[233ms] group-hover:scale-[1.0618]">
                  <Play className="h-5 w-5" aria-hidden="true" />
                </span>
              </button>
            )}
          </>
        )}
      </div>

      {hasBody && (
        <div className="relative z-[3] flex flex-col gap-[var(--space-2)] p-[var(--space-3)] transition-transform duration-[377ms] [transition-timing-function:var(--ease-out)] group-hover:-translate-y-[8px]">
          {label && (
            <span className="self-start rounded-full border border-gold/40 px-[var(--space-2)] py-1 text-xs text-gold">
              {label}
            </span>
          )}
          {title && (
            <h3
              className={cn(
                "text-h4 font-display text-foreground",
                featured && "lg:text-[2.058rem]",
              )}
            >
              {title}
            </h3>
          )}
          {caption && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {caption}
            </p>
          )}
          <span
            className="mt-1 block h-px w-10 origin-right scale-x-0 bg-gold transition-transform duration-[377ms] [transition-timing-function:var(--ease-out)] group-hover:scale-x-100 ltr:origin-left"
            aria-hidden="true"
          />
        </div>
      )}
    </figure>
  );
}

export function Portfolio() {
  const { t } = useI18n();
  const items = media.portfolio.filter((item) => item.file.trim() !== "");

  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <section
      id="portfolio"
      className="section-y mx-auto max-w-6xl px-4 md:px-8"
    >
      <FadeIn className="max-w-2xl">
        <span className="mb-[var(--space-3)] block h-px w-16 bg-gold" aria-hidden="true" />
        <h2 className="text-h2 text-foreground">{t.portfolio.title}</h2>
        <p className="mt-[var(--space-3)] text-muted-foreground">
          {t.portfolio.intro}
        </p>
      </FadeIn>

      <div className="mt-[var(--space-5)] grid gap-[var(--space-3)] lg:grid-cols-[1.618fr_1fr]">
        <FadeIn i={0} className="h-full">
          <PortfolioCard item={featured} featured />
        </FadeIn>

        {rest.length > 0 && (
          <div className="grid gap-[var(--space-3)] sm:grid-cols-2">
            {rest.map((item, index) => (
              <FadeIn key={item.file} i={index + 1} className="h-full">
                <PortfolioCard item={item} featured={false} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
