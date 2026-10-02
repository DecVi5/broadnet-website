"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Camera,
  Lock,
  Zap,
  Radio,
  BadgeCheck,
  Wrench,
  Building,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

interface SecuritySolution {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  category: "Residential" | "Commercial" | "Both";
  price?: string;
  badge?: string;
  features: string[];
  desc: string;
  waText: string;
}

const SECURITY_SOLUTIONS: SecuritySolution[] = [
  {
    icon: Camera,
    title: "HD & 4K CCTV Surveillance Systems",
    category: "Both",
    price: "From ₹1,399",
    badge: "Official CP PLUS Partner",
    desc: "Complete end-to-end IP and HD camera installation for homes, retail shops, and residential complexes. Includes secure DVR/NVR configuration and mobile app setup.",
    features: [
      "Crystal-clear 1080p to 4K resolution with color night vision",
      "Live remote monitoring on iPhone, Android, and Windows PC",
      "Weatherproof IP66/IP67 rated bullet & dome cameras",
      "Continuous & motion-triggered high-capacity storage",
    ],
    waText: "Hi Broadnet, I am looking for CCTV surveillance installation in Avadi. Please provide a quotation.",
  },
  {
    icon: Zap,
    title: "Smart Video Door Phones (VDP)",
    category: "Residential",
    price: "From ₹3,999",
    badge: "Home Security",
    desc: "Two-way audio and high-definition video intercom system with remote electronic door latch release from inside your home or smartphone.",
    features: [
      "7-inch indoor color display screen with touch controls",
      "Infrared night vision doorbell camera with wide-angle lens",
      "Electronic door lock release integration",
      "Visitor snapshot capture & tamper detection alert",
    ],
    waText: "Hi Broadnet, I want to install a Video Door Phone system for my home in Avadi. Please share options and pricing.",
  },
  {
    icon: Lock,
    title: "Biometric Access Control & Attendance",
    category: "Commercial",
    price: "From ₹4,500",
    badge: "eSSL Authorized Partner",
    desc: "Secure physical access control utilizing optical fingerprint readers, facial recognition, RFID keycards, and digital logs for offices, schools, and clinics.",
    features: [
      "High-speed biometric fingerprint and contactless face scan",
      "Automated attendance report generation & payroll sync",
      "Magnetic drop-bolt & electromagnetic lock integration",
      "Backup battery operation during power outages",
    ],
    waText: "Hi Broadnet, I am interested in Biometric Access Control for our office in Avadi. Please provide details.",
  },
  {
    icon: Shield,
    title: "Perimeter Alarms & Intrusion Detection",
    category: "Both",
    badge: "Hikvision Certified",
    desc: "Comprehensive perimeter defense with laser trip sensors, PIR motion detectors, magnetic door/window sensors, and loud siren alert systems.",
    features: [
      "Laser photo-beam sensors for compound walls & gates",
      "GSM auto-dialer alerts your mobile phone during intrusion",
      "Pet-immune motion detectors preventing false triggers",
      "Seamless integration with existing CCTV systems",
    ],
    waText: "Hi Broadnet, I want to inquire about Perimeter Alarms and Intrusion Detection in Avadi.",
  },
  {
    icon: Radio,
    title: "Multi-Station Intercom & EPABX Systems",
    category: "Residential",
    badge: "Apartments & Societies",
    desc: "Dedicated internal communication infrastructure connecting security guard booths, individual flats, and management offices without recurring call costs.",
    features: [
      "Connects 8 to 500+ flats with dedicated security intercom lines",
      "Guard-to-resident visitor verification protocol",
      "Zero monthly subscription fees or external telephony charges",
      "Durable wiring and lightning surge protection",
    ],
    waText: "Hi Broadnet, our apartment association needs an Intercom/EPABX system in Avadi. Please schedule a site survey.",
  },
  {
    icon: Wrench,
    title: "Surveillance AMC & Maintenance Services",
    category: "Both",
    price: "Annual Contract",
    badge: "Preventive Care",
    desc: "Reliable Annual Maintenance Contracts (AMC) to ensure cameras stay clean, recording loops never corrupt, and cabling remains tamper-free.",
    features: [
      "Quarterly preventive maintenance, lens cleaning & calibration",
      "Priority same-day emergency technician dispatch in Avadi",
      "Periodic hard disk health and recording integrity verification",
      "Discounted spares and camera replacement support",
    ],
    waText: "Hi Broadnet, I want to discuss an Annual Maintenance Contract (AMC) for our CCTV surveillance system in Avadi.",
  },
];

export default function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Residential" | "Commercial">("All");
  const [arrived, setArrived] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    const handleArrival = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string }>;
      if (customEvent.detail?.targetId === "security" || customEvent.detail?.targetId === "services") {
        setArrived(true);
        setTimeout(() => setArrived(false), 3800);
      }
    };
    window.addEventListener("broadnet:section-arrived", handleArrival);
    return () => window.removeEventListener("broadnet:section-arrived", handleArrival);
  }, []);

  const filteredSolutions = SECURITY_SOLUTIONS.filter((item) => {
    if (activeFilter === "All") return true;
    return item.category === activeFilter || item.category === "Both";
  });

  const handleEnquireService = (serviceName: string) => {
    window.dispatchEvent(new CustomEvent("broadnet:select-service", { detail: { service: serviceName } }));
    scrollToWithPhysics("enquiry");
  };

  return (
    <section
      ref={ref}
      id="security"
      className={`py-24 sm:py-28 bg-[#0B091E] relative overflow-hidden transition-all duration-500 ${
        arrived ? "ring-2 ring-[#EF1313]/30 shadow-2xl shadow-[#EF1313]/15" : ""
      }`}
    >
      {/* Invisible anchor for #services compatibility */}
      <span id="services" className="absolute -top-20" />

      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-[#EF1313]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[400px] bg-[#4E0DBA]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EF1313] mb-3 font-display">
            <span className="w-3 h-px bg-[#EF1313]" /> Certified Electronic Security <span className="w-3 h-px bg-[#EF1313]" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Intelligent Surveillance & Security Systems
          </h2>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed font-body">
            Official CP PLUS and Hikvision certified installations for homes, gated apartment communities, commercial showrooms, and industrial sites across Avadi and Chennai.
          </p>

          {/* Solution Category Filter */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {(["All", "Residential", "Commercial"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`min-h-[44px] px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                  activeFilter === filter
                    ? "bg-[#EF1313] text-white shadow-md shadow-[#EF1313]/30"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {filter === "All" ? "All Solutions" : filter === "Residential" ? "Homes & Apartments" : "Offices & Commercial"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Security Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredSolutions.map((sol, index) => {
            const Icon = sol.icon;
            return (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="bg-[#120F2E] border border-white/10 hover:border-[#EF1313]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#EF1313]/10 group"
              >
                <div>
                  {/* Top Badge & Price */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold text-[#A78BFA] uppercase tracking-wider">
                      {sol.badge || "Certified"}
                    </span>
                    {sol.price && (
                      <span className="text-xs font-extrabold text-[#EF1313] bg-[#EF1313]/12 border border-[#EF1313]/25 px-2.5 py-0.5 rounded-md">
                        {sol.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#EF1313]/20 group-hover:border-[#EF1313]/35 text-[#EF1313] transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#A78BFA] transition-colors font-display leading-snug">
                      {sol.title}
                    </h3>
                  </div>

                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-5">
                    {sol.desc}
                  </p>

                  <ul className="space-y-2 mb-6 pt-3 border-t border-white/8">
                    {sol.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-white/75 leading-tight">
                        <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => handleEnquireService(sol.title)}
                    className="flex-1 min-h-[44px] px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Request Quote</span>
                    <ArrowRight size={13} />
                  </button>
                  <a
                    href={`https://wa.me/919884344075?text=${encodeURIComponent(sol.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    title="Inquire via WhatsApp"
                  >
                    <MessageCircle size={14} className="fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications & Brand Partnerships Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EF1313] animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">
              Official Certifications & Authorised Dealerships
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {[
              "CP PLUS CSE Certified",
              "Hikvision HCSA Trained",
              "eSSL Biometric Partner",
              "Grandstream Certified",
              "Tactine UTM Firewall Partner",
            ].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border border-white/10 text-white/80 bg-white/5"
              >
                <BadgeCheck size={14} className="text-[#EF1313] flex-shrink-0" />
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
