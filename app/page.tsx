import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PlansSection from "@/components/PlansSection";
import LocationChecker from "@/components/LocationChecker";
import AdvantageSection from "@/components/AdvantageSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Broadnet Internet Services | Fiber Broadband & CCTV Installation in Avadi, Chennai",
  description:
    "Direct fiber broadband plans from ₹499/mo, BSNL Bharat Fibre, and certified Hikvision & CP PLUS CCTV surveillance installation with 2-hour technician dispatch in Avadi.",
  alternates: {
    canonical: "https://www.broadnet.in",
  },
};

export default function HomePage() {
  return (
    <>
      <Header activePage="Home" />
      <main>
        <HeroSection />
        <ServicesSection />
        <PlansSection />
        <LocationChecker />
        <AdvantageSection />
        <TestimonialsSection />
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
