import { useState } from "react";

import { FadeIn } from "@/components/FadeIn";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Videos } from "@/components/sections/Videos";
import { media } from "@/data/media";
import { assetUrl } from "@/lib/assets";
import { useI18n } from "@/i18n";

export function Gallery() {
  const { lang, t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photos = media.gallery.filter((photo) => photo.file.trim() !== "");
  const hasVideos = media.videos.some((video) => video.file.trim() !== "");

  // Nothing to show at all: hide the whole section.
  if (photos.length === 0 && !hasVideos) return null;

  return (
    <section id="work" className="section-y mx-auto max-w-6xl px-4 md:px-8">
      {photos.length > 0 && (
        <>
          <FadeIn className="max-w-2xl">
            <span
              className="mb-[var(--space-3)] block h-px w-16 bg-gold"
              aria-hidden="true"
            />
            <h2 className="text-h2 text-foreground">{t.gallery.title}</h2>
            <p className="mt-[var(--space-3)] text-muted-foreground">
              {t.gallery.intro}
            </p>
          </FadeIn>

          <div className="gallery-grid mt-[var(--space-5)] grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => {
              const alt =
                lang === "en"
                  ? photo.altEn?.trim() || t.gallery.genericAlt
                  : photo.alt.trim() || t.gallery.genericAlt;

              return (
                <FadeIn key={photo.file} i={index} className="h-full">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    aria-label={t.gallery.zoom(alt)}
                    className="gallery-item img-frame vignette group block h-full w-full overflow-hidden border border-border bg-card"
                  >
                    <img
                      src={assetUrl(`/assets/${photo.file.trim()}`)}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[1.618/1] w-full object-cover transition-transform duration-[987ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.0618]"
                    />
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </>
      )}

      <Videos className={photos.length > 0 ? "mt-[var(--space-6)]" : undefined} />

      <GalleryLightbox
        items={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
