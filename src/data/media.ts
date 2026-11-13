/**
 * Media manifest for Ceramic Golden Car Polishing.
 * Source: docs/MEDIA_MANIFEST.md. Files live in public/assets/ (case-sensitive).
 * Entries with an empty `file` are filtered out at render. Empty titles,
 * services, captions, posters and alt text are TODO — the UI hides them.
 */
export interface PortfolioItem {
  file: string;
  title: string;
  titleEn?: string;
  service: string;
  caption: string;
  captionEn?: string;
  videoFile?: string;
}

export interface ImageItem {
  file: string;
  alt: string;
  altEn?: string;
}

export interface VideoItem {
  file: string;
  poster: string;
  caption: string;
  captionEn?: string;
}

export const media: {
  hero: string;
  portfolio: PortfolioItem[];
  gallery: ImageItem[];
  videos: VideoItem[];
} = {
  hero: "WhatsApp Image 2026-11-08 at 20.06.53.jpeg",
  portfolio: [
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.51.jpeg",
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (1).jpeg",
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (2).jpeg",
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (3).jpeg",
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (4).jpeg",
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52.jpeg",
      title: "",
      service: "",
      caption: "",
    },
  ],
  gallery: [
    { file: "WhatsApp Image 2026-11-08 at 20.06.53.jpeg", alt: "" },
    { file: "WhatsApp Image 2026-11-08 at 20.06.52 (5).jpeg", alt: "" },
    { file: "White Simple Coffee Meme.jpeg", alt: "" },
  ],
  videos: [
    {
      file: "WhatsApp Video 2026-11-08 at 20.06.54.mp4",
      poster: "",
      caption: "",
    },
    {
      file: "WhatsApp Video 2026-11-08 at 20.06.53.mp4",
      poster: "",
      caption: "",
    },
    {
      file: "WhatsApp Video 2026-11-08 at 20.11.35.mp4",
      poster: "",
      caption: "",
    },
    {
      file: "WhatsApp Video 2026-11-08 at 20.11.42.mp4",
      poster: "",
      caption: "",
    },
  ],
};
