import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceChoiceSection from "@/components/ServiceChoiceSection";
import ProofPointsSection from "@/components/ProofPointsSection";
import PlansSection from "@/components/PlansSection";
import ServicesSection from "@/components/ServicesSection";
import LocationChecker from "@/components/LocationChecker";
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
        {/* 1. Hero and immediate CTAs */}
        <HeroSection />

        {/* 2. Internet versus Security choice */}
        <ServiceChoiceSection />

        {/* 3. Brief proof points */}
        <ProofPointsSection />

        {/* 4. Featured plans */}
        <PlansSection />

        {/* 5. Featured security services */}
        <ServicesSection />

        {/* 6. Coverage check */}
        <LocationChecker />

        {/* 7. Testimonials/partner proof */}
        <TestimonialsSection />

        {/* 8. Enquiry form */}
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
