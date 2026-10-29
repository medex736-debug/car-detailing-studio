export interface Testimonial {
  name: string;
  city?: string;
  vehicle?: string;
  service?: string;
  quote: string;
}

/**
 * Real client reviews, quoted exactly as written.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Abdulrhman Al Darwish",
    quote: "Great experience and great staff .. reasonable price.",
  },
  {
    name: "Werner Luzny",
    quote:
      "A team of experts with high skills and competencies, they are truly the best!",
  },
  {
    name: "Khaled Shash",
    quote: "Professional handling\nGreat material\nBest services",
  },
  {
    name: "Rogel Gatmaitan",
    quote:
      "Best shop ever must experience there service..very professional people and accommodating..2 THUMBS UP",
  },
];
