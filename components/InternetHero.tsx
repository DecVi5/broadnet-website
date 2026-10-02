"use client";

import { motion } from "framer-motion";

export default function InternetHero() {
  return (
    <section className="relative pt-32 pb-20 bg-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #4E0DBA 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-4"
          >
            <span className="w-4 h-px bg-[#4E0DBA]" /> ICT Infrastructure
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#16143E] leading-tight mb-4 sm:mb-6 font-display"
          >
            100+ km of Your
            <br />
            <span className="text-gradient">Own Fibre Network.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#16143E]/60 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl font-body"
          >
            Broadnet operates its own optical fibre backbone across Avadi — delivering symmetric, uncontended internet to homes and enterprises with 99.9% uptime.
          </motion.p>

          {/* Stats / Status */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 sm:gap-6"
          >
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#16143E]/80">Network Operational</span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#16143E]/50">2,500+ active subscribers</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
