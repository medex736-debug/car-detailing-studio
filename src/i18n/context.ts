import { createContext } from "react";

import { ar, type Dictionary } from "./ar";
import { en } from "./en";
import { site as baseSite, type Site } from "@/data/site";
import type { Service } from "@/data/services";

export type Lang = "ar" | "en";
export type Dir = "rtl" | "ltr";

export type { Dictionary } from "./ar";

export const dictionaries: Record<Lang, Dictionary> = { ar, en };
export const STORAGE_KEY = "lang";

/** ?lang wins, then localStorage, then Arabic. No browser-language sniffing. */
export function readInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "en" || param === "ar") return param;
  } catch {
    // Ignore malformed URLs and fall through to storage.
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ar") return stored;
  } catch {
    // Storage can be blocked; Arabic remains the default.
  }
  return "ar";
}

export function localizedSite(lang: Lang): Site {
  if (lang === "ar") return baseSite;
  return {
    ...baseSite,
    name: baseSite.en.name,
    shortName: baseSite.en.shortName,
    nameTagline: baseSite.en.nameTagline,
    address: baseSite.en.address,
    hours: baseSite.en.hours,
  };
}

export function serviceName(service: Service, lang: Lang): string {
  return lang === "en" ? service.nameEn : service.name;
}

export function serviceDescription(service: Service, lang: Lang): string {
  return lang === "en" ? service.descriptionEn : service.description;
}

export interface I18nContextValue {
  lang: Lang;
  dir: Dir;
  t: Dictionary;
  site: Site;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

function ensureMeta(attribute: "name" | "property", key: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  return el;
}

function setHreflang(hreflang: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`,
  );
  if (!el) {
    el = document.createElement("link");
    el.rel = "alternate";
    el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function syncDocument(lang: Lang, t: Dictionary) {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";

  document.title = t.meta.title;
  ensureMeta("name", "description").content = t.meta.description;
  ensureMeta("property", "og:title").content = t.meta.title;
  ensureMeta("property", "og:description").content = t.meta.description;
  ensureMeta("property", "og:locale").content = t.meta.ogLocale;
  ensureMeta("property", "og:locale:alternate").content =
    lang === "ar" ? "en_US" : "ar_AE";

  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  const arUrl = url.toString();
  const enUrl = new URL(arUrl);
  enUrl.searchParams.set("lang", "en");
  setHreflang("ar", arUrl);
  setHreflang("en", enUrl.toString());
  setHreflang("x-default", arUrl);
}
