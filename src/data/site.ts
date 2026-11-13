/**
 * Verified business details for Ceramic Golden Car Polishing.
 * Source of truth: docs/VERIFIED_FACTS.md (see that file before editing).
 * Removed vs the template: email, serviceArea, year, address.line1/line2/postal.
 */
export const site = {
  name: "سيراميك جولدن لتلميع السيارات",
  shortName: "سيراميك جولدن",
  nameEn: "Ceramic Golden Car Polishing",
  nameTagline: "خبرة منذ عام 1997",
  phone: "+971 55 215 5543",
  whatsapp: "971552155543",
  currency: "AED",
  address: { area: "المصفح", city: "أبوظبي", country: "الإمارات" },
  hours: [
    { days: "السبت – الخميس", time: "8:00 ص – 9:00 م" },
    { days: "الجمعة", time: "مغلق" },
  ],
  en: {
    name: "Ceramic Golden Car Polishing",
    shortName: "Ceramic Golden",
    nameTagline: "Car polishing and protection since 1997",
    address: { area: "Musaffah", city: "Abu Dhabi", country: "UAE" },
    hours: [
      { days: "Sat – Thu", time: "8:00 AM – 9:00 PM" },
      { days: "Friday", time: "Closed" },
    ],
  },
  social: {
    instagram:
      "https://www.instagram.com/ceramic_golden?utm_source=ig_web_button_share_sheet&vrfl=ZDNlZDc0MzIxNw==",
    facebook:
      "https://www.facebook.com/people/Ceramic-golden-car-polishing/100052054497127/",
  },
  mapsUrl: "https://share.google/7r8WgVkG5brow1Jwh",
  // TODO: Google Maps embed URL not provided. Keep empty; UI hides it.
  mapsEmbedUrl: "",
  googleRating: { score: 4.7, count: 23 },
};

export type Site = typeof site;
