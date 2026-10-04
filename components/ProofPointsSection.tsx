"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Network, Award, Clock } from "lucide-react";

const PROOF_POINTS = [
  {
    icon: Clock,
    title: "10+ Years in Avadi",
    subtitle: "Established in 2014",
    desc: "A decade of dependable local operations serving homeowners, gated communities, and local businesses from Fire Station Road, TNHB Avadi.",
  },
  {
    icon: Network,
    title: "100+ km Private Fiber",
    subtitle: "Direct Owned Infrastructure",
    desc: "Engineered with our own dedicated optical fiber ring across Avadi. Zero reseller throttling or third-party congestion during evening peak hours.",
  },
  {
    icon: Award,
    title: "Authorized Brand Partner",
    subtitle: "CP PLUS, Hikvision & Railwire",
    desc: "Certified installer and distributor for world-class surveillance hardware and national telecom backbones with full manufacturer warranty.",
  },
  {
    icon: ShieldCheck,
    title: "< 2-Hour On-Site SLA",
    subtitle: "Direct Technician Dispatch",
    desc: "Real technicians based locally in Avadi for rapid installation, optical splicing, and on-site surveillance troubleshooting.",
  },
];

export default function ProofPointsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-white border-b border-[#16143E]/8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF1313] font-display">
            Local Credibility & Technical Capability
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#16143E] mt-1 font-display">
            Why Avadi Relies on Broadnet
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROOF_POINTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{
                  y: -10,
                  scale: 1.04,
                  boxShadow: "0 24px 48px rgba(78,13,186,0.14)",
                  borderColor: "rgba(78,13,186,0.35)",
                  backgroundColor: "#ffffff",
                  transition: { duration: 0.22 },
                }}
                whileTap={{ scale: 0.97 }}
                className="p-6 rounded-2xl border border-[#16143E]/10 bg-[#16143E]/[0.015] transition-colors duration-300 flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#4E0DBA]/8 border border-[#4E0DBA]/15 flex items-center justify-center text-[#4E0DBA] mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-[#16143E] font-display mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#4E0DBA] mb-2.5">
                    {item.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-[#16143E]/70 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
