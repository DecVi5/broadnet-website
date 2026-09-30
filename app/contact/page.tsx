import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquirySection from "@/components/EnquirySection";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Broadnet Internet Services",
  description: "Get in touch with Broadnet Internet Services. Call 98843 44075 or visit us at Avadi, Chennai.",
};

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["1093, Fire Station Road", "TNHB, Avadi", "Chennai — 600 054"],
    color: "#4E0DBA",
    links: [
      "https://www.google.com/maps/dir/?api=1&destination=1093,+Fire+Station+Road,+TNHB,+Avadi,+Chennai,+Tamil+Nadu+600054",
      "https://www.google.com/maps/dir/?api=1&destination=1093,+Fire+Station+Road,+TNHB,+Avadi,+Chennai,+Tamil+Nadu+600054",
      "https://www.google.com/maps/dir/?api=1&destination=1093,+Fire+Station+Road,+TNHB,+Avadi,+Chennai,+Tamil+Nadu+600054",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["98843 44075", "86818 88111"],
    color: "#EF1313",
    links: ["tel:+919884344075", "tel:+918681888111"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["admin@broadnet.in", "support@broadnet.in"],
    color: "#4E0DBA",
    links: ["mailto:admin@broadnet.in", "mailto:support@broadnet.in"],
  },
  {
    icon: Clock,
    title: "Support Hours",
    lines: ["Mon — Sat: 9:00 AM — 7:00 PM", "Emergency: 24/7 On-Call"],
    color: "#16143E",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header activePage="" />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-4">
              <span className="w-4 h-px bg-[#4E0DBA]" /> Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-[#16143E] mb-5">
              Let&apos;s Build Something
              <br />
              <span className="text-gradient">Extraordinary Together.</span>
            </h1>
            <p className="text-[#16143E]/55 text-xl max-w-xl mx-auto">
              Our engineers respond within 2 hours. On-site visits typically scheduled within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONTACT_INFO.map((info) => (
                <div key={info.title} className="p-6 rounded-2xl border border-[#16143E]/8 hover:border-[#4E0DBA]/25 transition-colors group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${info.color}12` }}>
                    <info.icon size={20} style={{ color: info.color }} />
                  </div>
                  <h3 className="text-[#16143E] font-bold text-sm uppercase tracking-wider mb-3">{info.title}</h3>
                  {info.lines.map((line, i) => (
                    info.links ? (
                      <a key={line} href={info.links[i]} className="block text-sm text-[#16143E]/55 hover:text-[#16143E] transition-colors mb-1">
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm text-[#16143E]/55 mb-1 leading-relaxed">{line}</p>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}
