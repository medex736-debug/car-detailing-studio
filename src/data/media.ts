/**
 * Media manifest for Ceramic Golden Car Polishing.
 * Source: docs/MEDIA_MANIFEST.md. Files live in public/assets/ (case-sensitive).
 * Entries with an empty `file` are filtered out at render. Empty titles,
 * services, captions, posters and alt text are TODO — the UI hides them.
 */
export interface PortfolioItem {
  file: string;
  width?: number;
  height?: number;
  title: string;
  titleEn?: string;
  service: string;
  caption: string;
  captionEn?: string;
  videoFile?: string;
}

export interface ImageItem {
  file: string;
  width?: number;
  height?: number;
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
  hero: "WhatsApp Image 2026-11-08 at 20.06.51.jpeg",
  portfolio: [
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.53.jpeg",
      width: 1280,
      height: 957,
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (1).jpeg",
      width: 762,
      height: 567,
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (2).jpeg",
      width: 764,
      height: 571,
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (3).jpeg",
      width: 1280,
      height: 959,
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (4).jpeg",
      width: 1280,
      height: 959,
      title: "",
      service: "",
      caption: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52.jpeg",
      width: 764,
      height: 570,
      title: "",
      service: "",
      caption: "",
    },
  ],
  gallery: [
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.53.jpeg",
      width: 1280,
      height: 957,
      alt: "",
    },
    {
      file: "WhatsApp Image 2026-11-08 at 20.06.52 (5).jpeg",
      width: 764,
      height: 570,
      alt: "",
    },
    {
      file: "White Simple Coffee Meme.jpeg",
      width: 1600,
      height: 900,
      alt: "",
    },
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
    {
      file: "Video Project 1 (1).mp4",
      poster: "",
      caption: "",
    },
  ],
};
