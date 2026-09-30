"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Shield, Wifi, Camera, Lock, Zap, Network, Server, Radio, BadgeCheck } from "lucide-react";
import { SectionLabel } from "./MotionHelpers";

const SECURITY_SERVICES = [
  { icon: Camera, title: "CCTV Surveillance", desc: "Hikvision & CP PLUS HD/4K IP systems with remote monitoring and AI analytics." },
  { icon: Shield, title: "Hikvision Intrusion Alarms", desc: "Perimeter detection, motion sensing, and instant alert systems for enterprise premises." },
  { icon: Zap, title: "Video Door Phones", desc: "Smart access control with HD video intercom and remote door release capability." },
  { icon: Radio, title: "CCL Intercom Systems", desc: "Building-wide communication infrastructure with multi-station intercom networks." },
  { icon: Lock, title: "eSSL Access Control", desc: "Biometric, RFID, and mobile-based access management for restricted zones." },
  { icon: Shield, title: "RFID Boom & Flap Barriers", desc: "Automated vehicle and pedestrian access management with RFID/ANPR integration." },
];

const ICT_SERVICES = [
  { icon: Wifi, title: "Broadnet Fiber / BSNL FTTH", desc: "High-speed dedicated fiber internet with guaranteed bandwidth for homes and businesses." },
  { icon: Radio, title: "Grandstream Enterprise Wi-Fi", desc: "High-density wireless networks with centralized management and seamless roaming." },
  { icon: Network, title: "Structured Cabling", desc: "Cat6A/fiber backbone cabling with professional installation and documentation." },
  { icon: Server, title: "Tactine Firewall & Security", desc: "Next-gen UTM firewalls with threat intelligence, VPN, and content filtering." },
];

function ServiceCard({ icon: Icon, title, desc, index }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="card-obsidian p-6 group cursor-default"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#4E0DBA]/20 flex items-center justify-center group-hover:bg-[#4E0DBA]/35 transition-colors duration-300">
          <Icon size={18} className="text-[#6B2FD4]" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-base mb-1.5">{title}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
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

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 p-6 rounded-3xl border border-[#16143E]/10 bg-[#16143E]/2"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#16143E]/40 mb-4">Certifications & Partnerships</p>
              <div className="flex flex-wrap gap-2.5">
                {["Hikvision HCSA", "CP PLUS CSE", "Grandstream Certified", "eSSL Partner", "Tactine Dealer"].map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#4E0DBA]/20 text-[#4E0DBA] bg-[#4E0DBA]/5 shadow-sm hover:bg-[#4E0DBA]/10 transition-colors"
                  >
                    <BadgeCheck size={14} className="text-[#4E0DBA] flex-shrink-0" />
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
