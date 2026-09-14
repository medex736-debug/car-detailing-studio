export interface Testimonial {
  name: string;
  city: string;
  vehicle: string;
  service: string;
  quote: string;
}

/**
 * Placeholder testimonials.
 * TODO: replace with real client reviews.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Marcus Hale",
    city: "Northbridge",
    vehicle: "Porsche 911 Carrera",
    service: "Paint correction",
    quote:
      "The swirls never came back after a hand wash. Eleven months on, the panels still look like the morning they were finished.",
  },
  {
    name: "Priya Nair",
    city: "Westford",
    vehicle: "Range Rover Velar",
    service: "Signature",
    quote:
      "They photographed the paint depth before touching it. That level of caution is exactly why I handed over a car I care about.",
  },
  {
    name: "Daniel Osei",
    city: "Fenwick",
    vehicle: "Tesla Model Y",
    service: "Ceramic coating",
    quote:
      "Booked a slot, got a slot. Dropped off Monday evening, collected Wednesday lunchtime. The coating survives automatic washes without a swirl.",
  },
];