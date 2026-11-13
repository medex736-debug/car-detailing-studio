const BRANDS = ["Google", "WhatsApp", "Instagram", "Facebook"];
const BRAND_SPLIT = new RegExp(`(${BRANDS.join("|")})`);

/** Wraps Latin brand names in lang="en" so screen readers switch voice. */
export function BrandText({ text }: { text: string }) {
  return (
    <>
      {text.split(BRAND_SPLIT).map((part, index) =>
        BRANDS.includes(part) ? (
          <span key={index} lang="en">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
