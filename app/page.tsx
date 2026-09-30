import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PlansSection from "@/components/PlansSection";
import AdvantageSection from "@/components/AdvantageSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
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
