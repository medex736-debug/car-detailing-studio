/**
 * Business details for 974 | The Art Factory.
 * TODO: the values still holding template placeholders (address.line2/postal,
 * hours, serviceArea) are awaiting the client's data.
 */
export const site = {
  name: "974 | The Art Factory",
  nameTagline: "974 Car Detailing",
  year: "2018",
  phone: "05997 7781",
  email: "Hello@974cardetailing.com",
  whatsapp: "97459977781",
  currency: "QAR ",
  address: {
    line1: "ARS022 , Industrial Area Rd./Doha , Qatar",
    line2: "North Park Industrial Estate",
    city: "ARS022 , Industrial Area Rd.",
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