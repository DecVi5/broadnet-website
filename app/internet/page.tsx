import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquirySection from "@/components/EnquirySection";
import PlansSection from "@/components/PlansSection";
import LocationChecker from "@/components/LocationChecker";
import InternetHero from "@/components/InternetHero";
import IctSolutions from "@/components/IctSolutions";

export const metadata: Metadata = {
  title: "Internet Services & Plans | Broadnet Internet Services",
  description: "High-speed fiber internet plans starting at ₹499/mo, BSNL FTTH, Grandstream enterprise Wi-Fi, structured cabling, and Tactine network security in Avadi, Chennai.",
};

export default function InternetPage() {
  return (
    <>
      <Header activePage="Internet" />
      <main>
        <InternetHero />
        <PlansSection />
        <LocationChecker />
        <IctSolutions />
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
