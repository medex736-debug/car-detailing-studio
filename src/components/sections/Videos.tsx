import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { media } from "@/data/media";
import type { VideoItem } from "@/data/media";
import { assetUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

function VideoCard({ video }: { video: VideoItem }) {
  const { lang, t } = useI18n();
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const poster = video.poster.trim();
  const caption = (lang === "en" ? video.captionEn ?? "" : video.caption).trim();

  const play = () => {
    setPlaying(true);
    void videoRef.current?.play().catch(() => undefined);
  };

  return (
    <figure ref={wrapRef} className="flex flex-col">
      <div className="img-frame relative aspect-[1.618/1] w-full overflow-hidden border border-border bg-card">
        <video
          ref={videoRef}
          src={`${assetUrl(`/assets/${video.file.trim()}`)}#t=0.1`}
          controls={playing}
          muted
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          aria-label={caption || t.videos.genericLabel}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {poster && (
          <img
            src={assetUrl(`/assets/${poster}`)}
            alt=""
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-[610ms] [transition-timing-function:var(--ease-out)]",
              playing && "opacity-0",
            )}
          />
        )}

        {!playing && (
          <button
            type="button"
            onClick={play}
            aria-label={t.videos.play}
            className="absolute inset-0 z-[3] grid place-items-center bg-background/20 transition-colors duration-[233ms] hover:bg-background/40"
          >
            <span
              data-paused={!visible}
              className="play-ring flex h-[55px] w-[55px] items-center justify-center rounded-full border border-gold bg-background/80 text-gold backdrop-blur transition-transform duration-[233ms] [transition-timing-function:var(--ease-out)] hover:scale-[1.0618]"
            >
              <Play className="h-5 w-5" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>

      {caption && (
        <figcaption className="mt-[var(--space-2)] text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Videos({ className }: { className?: string }) {
  const { t, site } = useI18n();
  const videos = media.videos.filter((video) => video.file.trim() !== "");
  const instagram = site.social.instagram.trim();

  if (videos.length === 0 && !instagram) return null;

  return (
    <div className={cn(className)}>
      {videos.length > 0 && (
        <>
          <h3 className="text-h3 text-foreground">{t.videos.title}</h3>

          <div className="mt-[var(--space-4)] grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.file} video={video} />
            ))}
          </div>
        </>
      )}

      {instagram && (
        <div className={cn(videos.length > 0 && "mt-[var(--space-5)]")}>
          <Button asChild variant="outline" size="lg" className="lift gap-2">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink
                className="h-4 w-4 text-gold"
                aria-hidden="true"
              />
              {t.videos.instagramCta}
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
