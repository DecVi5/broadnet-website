import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PlansSection from "@/components/PlansSection";
import AdvantageSection from "@/components/AdvantageSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";
import CinematicIntro from "@/components/CinematicIntro";

export default function HomePage() {
  return (
    <>
      <CinematicIntro />
      <Header activePage="Home" />
      <main>
        <HeroSection />
        <ServicesSection />
        <PlansSection />
        <AdvantageSection />
        <TestimonialsSection />
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
