import { useState } from "react";

import { Booking } from "@/components/sections/Booking";
import { Facility } from "@/components/sections/Facility";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Marque } from "@/components/sections/Marque";
import { Nav } from "@/components/sections/Nav";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { StickyCTA } from "@/components/sections/StickyCTA";
import type { PricingPlan } from "@/components/ui/pricing-module";
import { services } from "@/data/services";

/** Matches a pricing plan id to the equivalent booking service id. */
const serviceByPlan: Record<string, string> = {
  exterior: "exterior-detail",
  interior: "interior-detail",
  "paint-correction": "paint-correction",
  signature: "ceramic-coating",
};

function App() {
  const [preferredService, setPreferredService] = useState("");

  const onBook = (plan: PricingPlan) => {
    setPreferredService(serviceByPlan[plan.id] ?? services[0].id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#booking"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-gold focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to booking
      </a>

      <Nav />
      <StickyCTA />

      <main>
        <Hero />
        <Marque />
        <Services />
        <Process />
        <Gallery />
        <Facility />
        <Pricing onBook={onBook} />
        <Reviews />
        <Booking preferredService={preferredService} />
      </main>

      <Footer />
    </div>
  );
}

export default App;