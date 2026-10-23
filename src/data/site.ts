/**
 * Business placeholder details.
 * TODO: replace every value below with the studio's real details.
 */
export const site = {
  name: "Profection Car Wash",
  nameTagline: "Profection",
  year: "2018",
  phone: "509518818",
  email: "studio@example.com",
  whatsapp: "971509518818",
  currency: "$",
  address: {
    line1: "PWR2+M5 Ras Al-Khaimah, Ras Al Khaimah - United Arab Emirates",
    line2: "North Park Industrial Estate",
    city: "Ras Al Khaimah",
    postal: "MP1 2PE",
  },
  hours: [
    { days: "Mon – Thu", time: "09:00 – 18:00" },
    { days: "Friday", time: "09:00 – 19:00" },
    { days: "Saturday", time: "09:00 – 15:00" },
    { days: "Sunday", time: "Closed" },
  ],
  serviceArea:
    "Mobile collection and delivery available within 40 km of the studio.",
} as const;