import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve("dist");
const html = await readFile(resolve(root, "index.html"), "utf8");

const ldMatch = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);
const ld = ldMatch ? JSON.parse(ldMatch[1]) : null;
const faqPage = ld?.["@graph"]?.find((node) => node["@type"] === "FAQPage");

const results = {
  "single <h1>": (html.match(/<h1[\s>]/g) || []).length === 1,
  "h1 has brand + service + location": (() => {
    const h1 = html.match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? "";
    return h1.includes("سيراميك جولدن") && h1.includes("المصفح");
  })(),
  "phone visible": html.includes("+971 55 215 5543"),
  "no noindex": !/noindex/i.test(html),
  "canonical present": /rel="canonical"/.test(html),
  "og:image present": /property="og:image"/.test(html),
  "twitter card present": /name="twitter:card"/.test(html),
  "no hreflang": !/hreflang/i.test(html),
  "JSON-LD parses": Boolean(ld),
  "JSON-LD FAQPage present": Boolean(faqPage),
  "JSON-LD has 8 questions": faqPage?.mainEntity?.length === 8,
  "FAQ first question visible": html.includes(
    "ما هو طلاء النانو سيراميك؟",
  ),
  "FAQ first answer visible": html.includes("طبقة سائلة تُطبَّق"),
  "FAQ last question visible": html.includes("ما ساعات العمل؟"),
  "last updated visible": html.includes("آخر تحديث"),
  "semantic header/nav/main/footer":
    /<header[\s>]/.test(html) &&
    /<nav[\s>]/.test(html) &&
    /<main[\s>]/.test(html) &&
    /<footer[\s>]/.test(html),
  "FAQ section id": /<section[^>]*id="faq"/.test(html),
  "8 <details> answers": (html.match(/<details/g) || []).length === 8,
  "NAP name visible": html.includes("سيراميك جولدن لتلميع السيارات"),
  "NAP country visible": html.includes("الإمارات"),
  "build date visible": /آخر تحديث: \d{4}-\d{2}-\d{2}/.test(html),
};

let failed = 0;
for (const [name, ok] of Object.entries(results)) {
  if (!ok) failed += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
}

for (const file of [
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "site.webmanifest",
  "og-image.jpg",
  "apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
]) {
  try {
    await access(resolve(root, file));
    console.log(`PASS  dist/${file}`);
  } catch {
    failed += 1;
    console.log(`FAIL  dist/${file} missing`);
  }
}

if (faqPage) {
  const mismatched = faqPage.mainEntity.filter(
    (entry) =>
      !html.includes(entry.name) || !html.includes(entry.acceptedAnswer.text),
  );
  if (mismatched.length) {
    failed += 1;
    console.log(
      `FAIL  ${mismatched.length} FAQ JSON-LD entries not found verbatim in HTML`,
    );
  } else {
    console.log("PASS  FAQ JSON-LD text matches visible HTML");
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll SEO checks passed");
