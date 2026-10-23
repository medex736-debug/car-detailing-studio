export interface Testimonial {
  name: string;
  city?: string;
  vehicle?: string;
  service?: string;
  quote: string;
}

/**
 * Real Google reviews.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Mirela David",
    quote:
      "I love this car wash, they are fast and good price. Also upstairs have room prayer, sala with tv for waiting, and toilet. Thank you for the service always. Appreciate a lot.",
  },
  {
    name: "Md. Paiker",
    quote: "Amazing service. They made my car like a brand new one",
  },
  {
    name: "Arun Vasu",
    quote: "Best car detailing services in RAK.",
  },
];
