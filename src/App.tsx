import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Nav } from "@/components/sections/Nav";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { StickyCTA } from "@/components/sections/StickyCTA";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useI18n } from "@/i18n";

function App() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#booking"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-gold focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        {t.common.skipToBooking}
      </a>

      <Nav />
      <StickyCTA />
      <WhatsAppButton />

      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Portfolio />
        <Gallery />
        <Pricing />
        <Reviews />
        <Location />
        <Booking />
      </main>

      <Footer />
    </div>
  );
}

export default App;
