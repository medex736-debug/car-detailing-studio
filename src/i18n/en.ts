import type { Dictionary } from "./ar";

/**
 * English UI dictionary. Mirrors ar.ts exactly. Facts and copy are faithful
 * translations of the Arabic; no claims or prices are added.
 */
export const en: Dictionary = {
  meta: {
    title: "Ceramic Golden | Car Polishing & Ceramic Coating in Musaffah, Abu Dhabi",
    description:
      "Ceramic Golden Car Polishing in Musaffah, Abu Dhabi — cleaning, polishing, machine polish and nano ceramic coating for cars. Call or WhatsApp: +971 55 215 5543.",
    ogLocale: "en_US",
  },
  common: {
    skipToBooking: "Skip to booking",
    bookNow: "Book now",
    callNow: "Call now",
    backToTop: (name: string) => `${name} — Back to top`,
    addressSeparator: ", ",
    languageName: "English",
    languages: {
      ar: { label: "العربية", switchTo: "التبديل إلى العربية" },
      en: { label: "EN", switchTo: "Switch to English" },
    },
  },
  nav: {
    mainLabel: "Main menu",
    links: {
      services: "Services",
      portfolio: "Our work",
      gallery: "Gallery",
      location: "Location",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    title: "Restore your car's shine and protection",
    paragraph:
      "Cleaning, polishing, machine polish and nano ceramic coating in Musaffah, Abu Dhabi. Careful attention to every detail so your car comes back shining.",
    whatsappCta: "Book on WhatsApp",
    whatsappGreeting: "Hello, I would like to book an appointment",
    locationLabel: "Location",
    hoursLabel: "Working hours",
  },
  trust: {
    label: "Quick facts",
    ratingSr: (score: string, count: number) =>
      `${score} from ${count} reviews on Google`,
    ratingOn: "on",
    google: "Google",
    reviewsLabel: (count: number) => (count === 1 ? "review" : "reviews"),
  },
  services: {
    title: "Four services to care for your car",
    intro:
      "From a full car cleaning to nano ceramic paint protection, choose the service you need and we will help you find the right price.",
    askPrice: "Ask about the price",
  },
  portfolio: {
    title: "Our best work",
    intro: "A glimpse of our car cleaning and polishing work.",
    genericAlt: "A photo of our work",
    playVideo: "Play video",
  },
  gallery: {
    title: "Photo gallery",
    intro: "More photos from our car cleaning and polishing work.",
    genericAlt: "A photo from our work gallery",
    zoom: (label: string) => `Enlarge ${label}`,
    dialogLabel: "Image preview",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
  },
  videos: {
    title: "Videos of our work",
    genericLabel: "A video of our work",
    play: "Play video",
    instagramCta: "See more on Instagram",
  },
  pricing: {
    title: "Price depends on your car's condition",
    body: "Every car is different, so we set the price after inspecting the car. Send us photos on WhatsApp or call us for a quote.",
    whatsappCta: "Quote on WhatsApp",
    whatsappMessage:
      "Hello, I would like a quote for my car. I will send you photos of the car on WhatsApp.",
  },
  reviews: {
    title: "What our customers say",
    intro: "Reviews from customers who shared their experience on Google.",
    ratingSr: (score: string, count: number) =>
      `${score} from ${count} reviews`,
    reviewsLabel: (count: number) => (count === 1 ? "review" : "reviews"),
    ratingAria: (score: string, count: number) =>
      `Google rating ${score} from ${count} reviews`,
    fallback: "Read the reviews on Google",
  },
  location: {
    title: "Our location and working hours",
    addressLabel: "Address",
    hoursLabel: "Working hours",
    followLabel: "Follow us",
    instagram: "Instagram",
    facebook: "Facebook",
    mapTitle: "Map showing Ceramic Golden's location",
  },
  booking: {
    title: "Book your appointment",
    intro:
      "Choose the service, date and time that suit you, and send your request on WhatsApp. Our team will contact you to confirm the final appointment.",
    phonePrompt: "Prefer to talk to us first?",
    labels: {
      name: "Name",
      phone: "Phone number",
      vehicle: "Car",
      email: "Email (optional)",
      service: "Service",
      date: "Preferred date",
      time: "Preferred time",
      notes: "Notes (optional)",
    },
    placeholders: {
      name: "Your name",
      phone: "Your phone number",
      vehicle: "Car make and model",
      email: "Your email",
      time: "Select a time",
      notes: "Paint condition, notes, or any details…",
    },
    timeSlots: [
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
      "7:00 PM",
      "8:00 PM",
      "9:00 PM",
    ],
    submit: "Send booking request on WhatsApp",
    footnote:
      "WhatsApp will open with your request ready to send — the final appointment is confirmed there.",
    message: {
      greeting: "Hello, I would like to request an appointment:",
      service: "Service",
      date: "Preferred date",
      time: "Preferred time",
      name: "Name",
      pending: "(Waiting for your appointment confirmation)",
    },
    success: {
      sent: "Request sent on WhatsApp",
      service: "Service",
      vehicle: "Car",
      date: "Preferred date",
      time: "Preferred time",
      note: "WhatsApp opened with your request ready to send. Press send, and our team will confirm the final appointment there.",
      again: "Send another request",
    },
  },
  footer: {
    addressLabel: "Address",
    hoursLabel: "Working hours",
    contactLabel: "Contact us",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    rights: (year: number, name: string) =>
      `© ${year} ${name}. All rights reserved.`,
    priceNote: "Prices depend on your car's condition.",
  },
  whatsapp: {
    greeting: "Hello, I would like to ask about your services",
    aria: "Chat with us on WhatsApp",
  },
};
