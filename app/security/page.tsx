import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquirySection from "@/components/EnquirySection";
import { Shield, Camera, Lock, Zap, Radio, AlertTriangle, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "CCTV Installation & ELV Security Systems in Avadi, Chennai | Hikvision & CP PLUS Partner",
  description:
    "Official Hikvision HCSA and CP PLUS CSE certified CCTV camera installation, smart video door phones, eSSL biometric access control, and automated boom barriers in Avadi, Chennai. Free site inspection.",
  keywords: [
    "CCTV installation Avadi",
    "Hikvision dealer Chennai",
    "CP PLUS camera Avadi",
    "CCTV AMC maintenance Chennai",
    "biometric access control Avadi",
    "video door phone installation",
    "intercom system Chennai",
    "boom barrier dealer Avadi",
  ],
  alternates: {
    canonical: "https://www.broadnet.in/security",
  },
  openGraph: {
    title: "CCTV Installation & Security Systems in Avadi | Broadnet",
    description:
      "Certified Hikvision & CP PLUS surveillance, biometric access, and ELV integration with 2-hour technician dispatch in Avadi.",
    url: "https://www.broadnet.in/security",
  },
};

const PRODUCTS = [
  {
    icon: Camera,
    title: "CCTV Surveillance Systems",
    desc: "Full HD and 4K IP camera systems from Hikvision and CP PLUS with NVR storage, remote monitoring via mobile app, and AI-powered analytics including face detection, intrusion alerts, and line-crossing detection.",
    badge: "Hikvision HCSA • CP PLUS CSE",
    color: "#EF1313",
  },
  {
    icon: AlertTriangle,
    title: "Hikvision Intrusion Alarms",
    desc: "Passive infrared detectors, dual-tech sensors, glass break detectors, and magnetic door contacts. Fully supervised wireless and wired alarm panels with GSM/IP monitoring and remote disarm.",
    badge: "Hikvision Certified",
    color: "#EF1313",
  },
  {
    icon: Zap,
    title: "Video Door Phones",
    desc: "HD video intercom systems with touchscreen panels, remote door release, mobile notification, and visitor recording. Compatible with access control and building management systems.",
    badge: "CP PLUS • Hikvision",
    color: "#4E0DBA",
  },
  {
    icon: Radio,
    title: "CCL Intercom Systems",
    desc: "Multi-station building intercom networks for residential complexes and commercial premises. Full-duplex audio with selective calling, paging, and emergency broadcast capability.",
    badge: "CCL Authorised",
    color: "#4E0DBA",
  },
  {
    icon: Lock,
    title: "eSSL Access Control",
    desc: "Biometric fingerprint, face recognition, RFID card, and PIN-based access management. Centralized software for time-attendance, audit trails, and multi-door management.",
    badge: "eSSL Authorised Partner",
    color: "#4E0DBA",
  },
  {
    icon: Shield,
    title: "RFID Boom & Flap Barriers",
    desc: "Automated vehicle access with RFID/ANPR integration and pedestrian flap barriers for controlled entry. Heavy-duty motorized arms with safety edge sensors and manual override.",
    badge: "Authorised Dealer",
    color: "#EF1313",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Header activePage="Security" />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: "radial-gradient(circle, #EF1313 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EF1313] mb-4">
                <span className="w-4 h-px bg-[#EF1313]" /> Security & ELV Systems
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#16143E] leading-tight mb-4 sm:mb-6">
                Intelligent Security.
                <br />
                <span className="text-gradient">Zero Compromise.</span>
              </h1>
              <p className="text-[#16143E]/60 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                Certified Hikvision and CP PLUS solutions engineered for residential complexes, commercial buildings, and industrial facilities across Avadi and Chennai.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Hikvision HCSA", "CP PLUS CSE", "eSSL Partner"].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold border border-[#EF1313]/25 text-[#EF1313] bg-[#EF1313]/5"
                  >
                    <BadgeCheck size={14} className="text-[#EF1313] flex-shrink-0" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((p) => (
                <div key={p.title} className="card-obsidian p-7 group">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${p.color}20` }}>
                      <p.icon size={20} style={{ color: p.color }} />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-base leading-snug">{p.title}</h2>
                      <span className="text-xs font-medium mt-1 block" style={{ color: p.color }}>
                        {p.badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
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
