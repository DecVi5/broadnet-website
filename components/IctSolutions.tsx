"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wifi, Server, Network, Shield, Zap, Globe, Tv, Cpu } from "lucide-react";

const SOLUTIONS = [
  { icon: Globe, title: "Broadnet Private FTTH", desc: "Private optical fiber network across Avadi starting at ₹499/mo with Free Installation & Free ONT. Symmetric speed with zero bottlenecks." },
  { icon: Tv, title: "Railwire FTTH + OTT", desc: "50–300 Mbps broadband bundled with Amazon Prime Video, 20+ leading OTT apps, and 450+ Live TV channels starting from ₹599/mo." },
  { icon: Wifi, title: "BSNL Bharat Fibre", desc: "Authorised BSNL FTTH partner providing government-backed fiber internet with nationwide backbone connectivity and competitive pricing." },
  { icon: Cpu, title: "Dual Band Gigabit ONT", desc: "Netlink Dual-Band 2.4GHz & 5GHz optical ONT router (₹3,500) with 2GE ports + 1POTS for maximum home Wi-Fi range and throughput." },
  { icon: Zap, title: "Grandstream Enterprise Wi-Fi", desc: "High-density Wi-Fi 6 access points with centralized cloud management, seamless roaming, and VLAN segmentation for enterprise environments." },
  { icon: Network, title: "Structured Cabling & Firewalls", desc: "Cat6A/fiber backbone installation, and Tactine next-gen UTM firewalls with IPS/IDS and real-time threat intelligence." },
];

export default function IctSolutions() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-24 bg-[#16143E] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A78BFA] mb-3">
            <span className="w-4 h-px bg-[#A78BFA]" /> Full Spectrum Infrastructure <span className="w-4 h-px bg-[#A78BFA]" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">ICT Solutions</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto font-body">End-to-end network infrastructure engineered for speed, stability, and scale</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((s, index) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="card-obsidian p-7 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4E0DBA]/25 border border-[#4E0DBA]/30 flex items-center justify-center mb-5 group-hover:bg-[#4E0DBA]/40 transition-colors duration-300">
                <s.icon size={22} className="text-[#A78BFA]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3 font-display">{s.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed font-body">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
