/**
 * Business placeholder details.
 * TODO: replace every value below with the studio's real details.
 */
export const site = {
  name: "Studio Detail",
  nameTagline: "Precision car care",
  year: "2018",
  phone: "+1 (555) 010-8200",
  email: "studio@example.com",
  address: {
    line1: "Unit 4, 12 Atlas Road",
    line2: "North Park Industrial Estate",
    city: "Metropolis",
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