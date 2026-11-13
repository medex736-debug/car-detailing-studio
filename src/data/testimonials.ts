export interface Testimonial {
  name: string;
  city?: string;
  vehicle?: string;
  service?: string;
  quote: string;
  lang?: "ar" | "en";
}

/**
 * Real client reviews from Google Maps, quoted exactly as written
 * (source: CLIENT-BRIEF.md §6 → docs/VERIFIED_FACTS.md). Do not rewrite,
 * shorten, translate or improve them.
 * `city`, `vehicle` and `service` are optional: render them only when set.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Mo'men Omer",
    lang: "en",
    quote:
      "Professional team and really hard working to give you the best results.\nHighly recommended.\nKeep it up 👍",
  },
  {
    name: "Asad Khaci",
    lang: "en",
    quote: "Nice work .I like this work because it is very Good work",
  },
  {
    name: "فضل محمد",
    lang: "ar",
    quote:
      "انصح بل تعامل مع هذا المحل\nشغل ممتاز وخبرة عالية\nادخلت سيارتي وفيها مشاكل في الصبغ\nوالحمد لله تم التعامل بحرفية تامة\nوادوا العمل بنجاح\nادعو لهم بل توفيق",
  },
];
