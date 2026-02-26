import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "../components/ServiceSection";
import { LaserDetailSection } from "../components/LaserDetailSection";
import { WhyChooseSection } from "../components/WhyChooseSection";
import { TestimonialsSection } from "../components/TestimonialSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Toaster } from "sonner";

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <LaserDetailSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
      <WhatsAppButton />
    </div>
  );
}
