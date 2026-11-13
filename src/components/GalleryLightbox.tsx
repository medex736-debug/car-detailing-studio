import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { ImageItem } from "@/data/media";
import { assetUrl } from "@/lib/assets";
import { useI18n } from "@/i18n";

const CONTROL =
  "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:border-gold hover:text-gold";

interface GalleryLightboxProps {
  items: ImageItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({ items, index, onClose, onNavigate }: GalleryLightboxProps) {
  const { lang, dir, t } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = index !== null && Boolean(items[index]);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      restoreRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const nextKey = dir === "ltr" ? "ArrowRight" : "ArrowLeft";
    const previousKey = dir === "ltr" ? "ArrowLeft" : "ArrowRight";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === nextKey) {
        event.preventDefault();
        onNavigate((index! + 1) % items.length);
      } else if (event.key === previousKey) {
        event.preventDefault();
        onNavigate((index! - 1 + items.length) % items.length);
      } else if (event.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onClose, onNavigate, dir]);

  if (!open) return null;
  const item = items[index!];
  const alt =
    lang === "en"
      ? item.altEn?.trim() || t.gallery.genericAlt
      : item.alt.trim() || t.gallery.genericAlt;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialogLabel}
      className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={assetUrl(`/assets/${item.file.trim()}`)}
          alt={alt}
          className="max-h-[80svh] w-full object-contain"
        />
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className={`${CONTROL} absolute end-0 top-0`}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((index! - 1 + items.length) % items.length)}
              aria-label={t.gallery.previous}
              className={`${CONTROL} absolute start-0 top-1/2 -translate-y-1/2`}
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate((index! + 1) % items.length)}
              aria-label={t.gallery.next}
              className={`${CONTROL} absolute end-0 top-1/2 -translate-y-1/2`}
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
