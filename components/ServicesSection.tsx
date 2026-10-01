"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Wifi, Camera, Lock, Zap, Network, Server, Radio, BadgeCheck, Tv, Globe, Cpu, ArrowRight } from "lucide-react";
import { SectionLabel } from "./MotionHelpers";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

const SECURITY_SERVICES = [
  {
    icon: Camera,
    title: "CCTV Installation & Services",
    price: "From ₹1,399",
    badge: "Official CP PLUS Partner",
    desc: "HD & 4K IP camera installation, remote live smartphone/PC monitoring setup, and comprehensive AMC maintenance."
  },
  {
    icon: Shield,
    title: "Hikvision Intrusion Alarms",
    desc: "Perimeter detection, laser trip sensors, motion detection, and immediate siren & mobile alert systems."
  },
  {
    icon: Zap,
    title: "Smart Video Door Phones",
    desc: "High-definition two-way video intercom with night vision and remote electronic door latch release."
  },
  {
    icon: Radio,
    title: "CCL Multi-Station Intercom",
    desc: "Building-wide internal communication infrastructure for apartments, gated communities, and corporate offices."
  },
  {
    icon: Lock,
    title: "eSSL Biometric Access Control",
    desc: "Fingerprint, facial recognition, RFID card, and PIN-based door access management with audit logs."
  },
  {
    icon: Shield,
    title: "Automated Boom & Flap Barriers",
    desc: "Automated parking and pedestrian access barriers with RFID vehicle fast-tag integration."
  },
];

const ICT_SERVICES = [
  {
    icon: Wifi,
    title: "Broadnet Private FTTH Plans",
    price: "From ₹499/mo",
    badge: "Free Installation & ONT",
    desc: "60 to 150 Mbps symmetric private fiber network across Avadi. Zero reseller bottlenecks, truly unlimited."
  },
  {
    icon: Tv,
    title: "Railwire FTTH & OTT Bundles",
    price: "From ₹599/mo",
    badge: "Prime + 20 OTTs Included",
    desc: "50 to 300 Mbps broadband bundled with Amazon Prime, 20+ top OTT apps, and 450+ Live TV channels."
  },
  {
    icon: Globe,
    title: "BSNL Bharat Fibre Plans",
    price: "From ₹499/mo",
    badge: "Authorized Partner",
    desc: "Official BSNL FTTH partner offering Bharat Fibre Basic, Plus, and Premium with nationwide backbone reliability."
  },
  {
    icon: Cpu,
    title: "Dual Band Gigabit ONT Upgrades",
    price: "₹3,500",
    badge: "Hardware Upgrade",
    desc: "Netlink Dual-Band 2.4G & 5G Gigabit fiber router with 2GE + 1POTS for whole-home high-speed coverage."
  },
  {
    icon: Radio,
    title: "Grandstream Enterprise Wi-Fi",
    desc: "High-density Wi-Fi 6 wireless access points with centralized cloud dashboard and seamless roaming."
  },
  {
    icon: Network,
    title: "Structured Cabling & Tactine UTM",
    desc: "Cat6A/fiber backbone installation, and Tactine next-gen firewalls with VPN & real-time intrusion prevention."
  },
];

function ServiceCard({ icon: Icon, title, desc, price, badge, index }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  price?: string;
  badge?: string;
  index: number;
}) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("broadnet:select-service", { detail: { service: title } }));
    scrollToWithPhysics("enquiry");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleClick}
      className="card-obsidian p-6 group cursor-pointer transition-all duration-300 hover:border-[#4E0DBA]/60 hover:shadow-xl hover:shadow-[#4E0DBA]/10 relative"
      title={`Click to enquire about ${title}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3.5">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#4E0DBA]/20 border border-[#4E0DBA]/30 flex items-center justify-center group-hover:bg-[#4E0DBA]/35 group-hover:border-[#4E0DBA]/50 transition-all duration-300">
            <Icon size={19} className="text-[#A78BFA] group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base group-hover:text-[#A78BFA] transition-colors flex items-center gap-1.5">
              <span>{title}</span>
              <ArrowRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#A78BFA]" />
            </h3>
            {price && (
              <span className="inline-block text-xs font-bold text-[#EF1313] bg-[#EF1313]/12 border border-[#EF1313]/25 px-2 py-0.5 rounded-md mt-1">
                {price}
              </span>
            )}
          </div>
        </div>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      <p className="text-white/50 text-sm leading-relaxed pl-[56px] group-hover:text-white/70 transition-colors">{desc}</p>
    </motion.div>
  );
}

export default function ServicesSection() {
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

  return (
    <section
      ref={ref}
      id="security"
      className={`py-28 bg-white relative overflow-hidden transition-all duration-500 ${
        arrived ? "ring-2 ring-[#EF1313]/30 shadow-2xl shadow-[#EF1313]/15" : ""
      }`}
    >
      {/* Invisible anchor for #services compatibility */}
      <span id="services" className="absolute -top-20" />
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-[#16143E] mt-2 mb-4">
            Dual-Pillar{" "}
            <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-[#16143E]/50 max-w-xl mx-auto text-lg">
            Two specialised divisions working in tandem — securing your premises and powering your connectivity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Security Pillar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#EF1313]/25 bg-[#EF1313]/5">
                <Shield size={18} className="text-[#EF1313]" />
                <span className="font-bold text-[#16143E] text-sm tracking-wide">Security & ELV Systems</span>
              </div>
            </motion.div>
            <div className="grid gap-4">
              {SECURITY_SERVICES.map((s, i) => (
                <ServiceCard key={s.title} {...s} index={i} />
              ))}
            </div>
          </div>

          {/* ICT Pillar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#4E0DBA]/25 bg-[#4E0DBA]/5">
                <Network size={18} className="text-[#4E0DBA]" />
                <span className="font-bold text-[#16143E] text-sm tracking-wide">ICT Infrastructure</span>
              </div>
            </motion.div>
            <div className="grid gap-4">
              {ICT_SERVICES.map((s, i) => (
                <ServiceCard key={s.title} {...s} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Partnerships - Spanning Horizontally */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 p-6 md:p-7 rounded-3xl border border-[#16143E]/10 bg-[#16143E]/[0.02] flex flex-col lg:flex-row lg:items-center justify-between gap-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF1313] animate-pulse flex-shrink-0" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#16143E]/60 whitespace-nowrap">
              Certifications & Partnerships
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {["Hikvision HCSA", "CP PLUS CSE", "Grandstream Certified", "eSSL Partner", "Tactine Dealer"].map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border border-[#4E0DBA]/20 text-[#4E0DBA] bg-[#4E0DBA]/5 shadow-sm hover:bg-[#4E0DBA]/10 transition-colors"
              >
                <BadgeCheck size={14} className="text-[#4E0DBA] flex-shrink-0" />
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
