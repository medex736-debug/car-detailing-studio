/**
 * Business details for Profection Car Wash.
 * TODO: email, address.line2, address.postal, hours and serviceArea still hold
 * template placeholder values — they are awaiting the client's real data.
 */
export const site = {
  name: "Profection Car Wash",
  nameTagline: "Profection",
  year: "2018",
  phone: "509518818",
  email: "studio@example.com",
  whatsapp: "971509518818",
  currency: "AED ",
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