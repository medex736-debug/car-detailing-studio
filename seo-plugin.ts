import type { HtmlTagDescriptor, Plugin } from "vite";

import { faq } from "./src/data/faq.ts";
import { services } from "./src/data/services.ts";
import { site } from "./src/data/site.ts";
import { ar } from "./src/i18n/ar.ts";

export interface SeoPluginOptions {
  /** Canonical production URL, already normalized (no trailing slash). */
  siteUrl: string;
  /** Build date, YYYY-MM-DD. */
  buildDate: string;
}

const OG_IMAGE_PATH = "/og-image.jpg";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const LOGO_PATH = "/assets/logo-mark.png";
const HERO_IMAGE = "/assets/WhatsApp Image 2026-11-08 at 20.06.51 (1).jpeg";

export function seoPlugin({ siteUrl, buildDate }: SeoPluginOptions): Plugin {
  const SITE_URL = siteUrl.replace(/\/+$/, "");
  const ROOT_URL = `${SITE_URL}/`;
  const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
  const LOGO = `${SITE_URL}${LOGO_PATH}`;

  const sameAs = [
    "https://www.instagram.com/ceramic_golden",
    site.social.facebook,
  ].filter((url) => url.trim() !== "");

  const jsonLd = () => {    const graph = [
      {
        "@type": "AutomotiveBusiness",
        "@id": `${ROOT_URL}#business`,
        name: site.name,
        alternateName: site.nameEn,
        url: ROOT_URL,
        description: ar.meta.description,
        telephone: "+971552155543",
        image: OG_IMAGE,
        logo: LOGO,
        address: {
          "@type": "PostalAddress",
          addressLocality: "المصفح",
          addressRegion: "أبوظبي",
          addressCountry: "AE",
        },
        areaServed: [
          { "@type": "City", name: "أبوظبي" },
          { "@type": "Place", name: "المصفح" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Saturday",
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "08:00",
            closes: "21:00",
          },
        ],
        sameAs,
        ...(site.mapsUrl ? { hasMap: site.mapsUrl } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات تلميع وحماية السيارات",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              alternateName: service.nameEn,
              description: service.description,
              serviceType: service.nameEn,
              areaServed: "المصفح، أبوظبي",
              provider: { "@id": `${ROOT_URL}#business` },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${ROOT_URL}#website`,
        url: ROOT_URL,
        name: site.name,
        inLanguage: ["ar", "en"],
        publisher: { "@id": `${ROOT_URL}#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${ROOT_URL}#webpage`,
        url: ROOT_URL,
        name: ar.meta.title,
        description: ar.meta.description,
        isPartOf: { "@id": `${ROOT_URL}#website` },
        about: { "@id": `${ROOT_URL}#business` },
        inLanguage: "ar",
        dateModified: buildDate,
      },
      {
        "@type": "FAQPage",
        "@id": `${ROOT_URL}#faq`,
        isPartOf: { "@id": `${ROOT_URL}#webpage` },
        inLanguage: "ar",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ];

    return JSON.stringify(
      { "@context": "https://schema.org", "@graph": graph },
      null,
      2,
    );
  };

  const syncCoreMeta = (html: string) =>
    html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${ar.meta.title}</title>`)
      .replace(
        /(<meta[^>]*name="description"[^>]*content=")[^"]*(")/,
        `$1${ar.meta.description}$2`,
      );

  const robotsTxt = () =>
    [
      "User-agent: *",
      "Allow: /",
      "",
      "User-agent: Googlebot",
      "Allow: /",
      "",
      "User-agent: Bingbot",
      "Allow: /",
      "",
      "User-agent: OAI-SearchBot",
      "Allow: /",
      "",
      "User-agent: GPTBot",
      "Allow: /",
      "",
      "User-agent: ChatGPT-User",
      "Allow: /",
      "",
      "User-agent: PerplexityBot",
      "Allow: /",
      "",
      "User-agent: ClaudeBot",
      "Allow: /",
      "",
      "User-agent: Google-Extended",
      "Allow: /",
      "",
      `Sitemap: ${ROOT_URL}sitemap.xml`,
      "",
    ].join("\n");

  const sitemapXml = () =>
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      "  <url>",
      `    <loc>${ROOT_URL}</loc>`,
      `    <lastmod>${buildDate}</lastmod>`,
      "  </url>",
      "</urlset>",
      "",
    ].join("\n");

  const llmsTxt = () =>
    [
      `# ${site.name}`,
      "",
      `> ${site.nameEn} — car cleaning, polishing, machine polish and nano ceramic coating in Mussafah, Abu Dhabi, UAE.`,
      "",
      "## Business",
      `- Name: ${site.name} (${site.nameEn})`,
      "- Location: المصفح (Mussafah), أبوظبي (Abu Dhabi), United Arab Emirates",
      "- Phone / WhatsApp: +971552155543",
      "- Opening hours: every day, 08:00–21:00",
      `- Website: ${ROOT_URL}`,
      "",
      "## Services",
      ...services.map(
        (service) =>
          `- ${service.name} (${service.nameEn}): ${service.description}`,
      ),
      "",
      "## Notes",
      "- Prices depend on the car's condition and the chosen service; contact the business for a quote.",
      "- The English interface is a client-side language switch on the same URL; Arabic is the primary indexable language.",
      "",
    ].join("\n");

  const webManifest = () =>
    JSON.stringify(
      {
        name: site.name,
        short_name: site.shortName,
        lang: "ar",
        dir: "rtl",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#0b0b0d",
        theme_color: "#0b0b0d",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      null,
      2,
    );

  let isSsr = false;

  return {
    name: "ceramic-golden-seo",
    configResolved(config) {
      isSsr = Boolean(config.build.ssr);
    },
    transformIndexHtml(html, ctx) {
      const head: HtmlTagDescriptor[] = [
        { tag: "link", attrs: { rel: "canonical", href: ROOT_URL }, injectTo: "head" },
        { tag: "link", attrs: { rel: "manifest", href: "/site.webmanifest" }, injectTo: "head" },
        { tag: "link", attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:type", content: "website" }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:site_name", content: site.name }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:url", content: ROOT_URL }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:title", content: ar.meta.title }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:description", content: ar.meta.description }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:image", content: OG_IMAGE }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:image:width", content: String(OG_IMAGE_WIDTH) }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) }, injectTo: "head" },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content: "سيارة لامعة بعد التلميع في سيراميك جولدن، المصفح، أبوظبي",
          },
          injectTo: "head",
        },
        { tag: "meta", attrs: { property: "og:locale", content: "ar_AE" }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:locale:alternate", content: "en_US" }, injectTo: "head" },
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" }, injectTo: "head" },
        { tag: "meta", attrs: { name: "twitter:title", content: ar.meta.title }, injectTo: "head" },
        { tag: "meta", attrs: { name: "twitter:description", content: ar.meta.description }, injectTo: "head" },
        { tag: "meta", attrs: { name: "twitter:image", content: OG_IMAGE }, injectTo: "head" },
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: jsonLd(),
          injectTo: "head",
        },
      ];

      if (ctx.bundle) {
        const fontFiles = Object.keys(ctx.bundle).filter((file) =>
          /(el-messiri-arabic-wght-normal|ibm-plex-sans-arabic-arabic-400-normal).*\.woff2$/.test(
            file,
          ),
        );
        for (const font of fontFiles) {
          head.push({
            tag: "link",
            attrs: {
              rel: "preload",
              as: "font",
              type: "font/woff2",
              crossorigin: "anonymous",
              href: `/${font}`,
            },
            injectTo: "head",
          });
        }
        head.push({
          tag: "link",
          attrs: {
            rel: "preload",
            as: "image",
            href: encodeURI(HERO_IMAGE),
            fetchpriority: "high",
          },
          injectTo: "head",
        });
      }

      return { html: syncCoreMeta(html), tags: head };
    },
    generateBundle() {
      if (isSsr) return;
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt() });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml() });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llmsTxt() });
      this.emitFile({
        type: "asset",
        fileName: "site.webmanifest",
        source: webManifest(),
      });
    },
  };
}
