"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "./MotionHelpers";

const STEPS = [
  { n: "01", title: "Site Survey", desc: "On-site inspection to map layout, identify blind spots, and assess infrastructure requirements." },
  { n: "02", title: "Requirement Analysis", desc: "Deep consultation to define security zones, bandwidth needs, and system objectives." },
  { n: "03", title: "System Design", desc: "CAD-accurate blueprint with camera placements, cable routes, and network topology." },
  { n: "04", title: "Product Selection", desc: "Curated hardware selection from certified brands matched to your specific requirements." },
  { n: "05", title: "Installation", desc: "Precision installation by trained technicians following industry safety standards." },
  { n: "06", title: "Testing & Commissioning", desc: "End-to-end functional testing, calibration, and system validation before handover." },
  { n: "07", title: "Handover", desc: "Formal handover with documentation, user training, and system walkthrough." },
  { n: "08", title: "After-Sales Support", desc: "Ongoing AMC, remote diagnostics, and priority on-site support for all clients." },
];

const CERTIFICATIONS = [
  { name: "Hikvision HCSA", color: "#EF1313" },
  { name: "CP PLUS CSE", color: "#FF6B35" },
  { name: "Grandstream Certified", color: "#4E0DBA" },
  { name: "eSSL Authorised Partner", color: "#0A84FF" },
  { name: "Tactine Firewall Dealer", color: "#16143E" },
];

export default function AdvantageSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <section ref={ref} id="advantage" className="py-28 bg-[#16143E] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(78,13,186,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(78,13,186,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #4E0DBA 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            The Broadnet{" "}
            <span className="text-gradient">Advantage</span>
          </h2>
          <p className="text-white/65 max-w-xl mx-auto text-lg leading-relaxed">
            An 8-step engineered approach delivering precision execution from conception to commissioning.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="h-full p-6 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/7 hover:border-[#A78BFA]/40 transition-all duration-300 backdrop-blur-md">
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-[#E0D4FF] via-[#A78BFA] to-[#FF6B6B] bg-clip-text text-transparent opacity-95 group-hover:opacity-100 group-hover:drop-shadow-[0_2px_12px_rgba(196,181,253,0.5)] transition-all font-display">
                    {step.n}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className="w-6 h-px bg-gradient-to-r from-[#A78BFA]/40 to-transparent" />
                  )}
                </div>
                <h3 className="text-white font-bold text-base mb-2 font-display">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="border-t border-white/10 pt-12"
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/45 mb-8">
            Official Certifications & Authorised Partner Status
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/12 bg-white/5 hover:border-white/25 transition-all duration-200 cursor-default"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cert.color, boxShadow: `0 0 6px ${cert.color}80` }}
                />
                <span className="text-sm font-semibold text-white/80">{cert.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
