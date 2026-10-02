"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wifi, Shield, ArrowRight, CheckCircle2, Tv, Camera, Zap, Clock } from "lucide-react";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

export default function ServiceChoiceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} id="solutions" className="py-20 sm:py-24 bg-[#F8F9FD] border-y border-[#16143E]/8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E0DBA] mb-2 font-display">
            <span className="w-3 h-px bg-[#4E0DBA]" />
            Direct Service Portals
            <span className="w-3 h-px bg-[#4E0DBA]" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#16143E] tracking-tight font-display mb-4">
            How Can Broadnet Serve You Today?
          </h2>
          <p className="text-[#16143E]/70 text-base sm:text-lg leading-relaxed font-body">
            Choose between our private optical fiber broadband or certified electronic security systems for your home, apartment, or commercial facility.
          </p>
        </motion.div>

        {/* Dual-Pillar Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Fiber Internet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-white p-7 sm:p-9 border border-[#16143E]/10 shadow-lg shadow-[#16143E]/5 flex flex-col justify-between hover:border-[#4E0DBA]/40 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#4E0DBA]/10 border border-[#4E0DBA]/20 flex items-center justify-center text-[#4E0DBA] group-hover:bg-[#4E0DBA] group-hover:text-white transition-all duration-300">
                  <Wifi size={24} />
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                  Free ONT & Setup
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#16143E] mb-2 font-display">
                High-Speed Fiber Internet
              </h3>
              <p className="text-sm font-semibold text-[#4E0DBA] mb-4">
                Broadnet FTTH & Railwire OTT Entertainment
              </p>
              <p className="text-[#16143E]/70 text-sm leading-relaxed mb-6">
                Private, symmetric optical fiber across Avadi. High-speed broadband from ₹499/mo with zero evening throttling, truly unlimited data, and bundled OTT channels.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#4E0DBA] flex-shrink-0 mt-0.5" />
                  <span>Symmetric speeds from 60 Mbps up to 150+ Mbps</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#4E0DBA] flex-shrink-0 mt-0.5" />
                  <span>100% Free installation & optical ONT Wi-Fi router</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#4E0DBA] flex-shrink-0 mt-0.5" />
                  <span>Bundled Amazon Prime, 20+ OTTs & 450+ Live TV channels</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#4E0DBA] flex-shrink-0 mt-0.5" />
                  <span>Local Avadi technician support with &lt; 2 hour SLA</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[#16143E]/8 space-y-3">
              <button
                type="button"
                onClick={() => scrollToWithPhysics("internet")}
                className="w-full min-h-[46px] px-6 py-3 rounded-xl bg-[#4E0DBA] hover:bg-[#3d0999] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#4E0DBA]/25 transition-all group-hover:shadow-lg"
              >
                <span>View Internet & OTT Plans</span>
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => scrollToWithPhysics("coverage")}
                className="w-full text-xs font-semibold text-[#16143E]/60 hover:text-[#4E0DBA] text-center py-1 transition-colors block"
              >
                Check fiber feasibility in your locality →
              </button>
            </div>
          </motion.div>

          {/* Card 2: CCTV & Security */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-white p-7 sm:p-9 border border-[#16143E]/10 shadow-lg shadow-[#16143E]/5 flex flex-col justify-between hover:border-[#EF1313]/40 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#EF1313]/10 border border-[#EF1313]/20 flex items-center justify-center text-[#EF1313] group-hover:bg-[#EF1313] group-hover:text-white transition-all duration-300">
                  <Shield size={24} />
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#EF1313]/10 text-[#EF1313] border border-[#EF1313]/20">
                  Official CP PLUS Partner
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#16143E] mb-2 font-display">
                CCTV & Electronic Security
              </h3>
              <p className="text-sm font-semibold text-[#EF1313] mb-4">
                Surveillance, Access Control & AMC Services
              </p>
              <p className="text-[#16143E]/70 text-sm leading-relaxed mb-6">
                Complete premises security engineered by certified technicians. HD & 4K IP cameras, smartphone live monitoring, video door phones, and annual maintenance contracts.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#EF1313] flex-shrink-0 mt-0.5" />
                  <span>Certified CP PLUS & Hikvision HD/4K IP camera setups</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#EF1313] flex-shrink-0 mt-0.5" />
                  <span>Instant live mobile app view & secure cloud/HDD recording</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#EF1313] flex-shrink-0 mt-0.5" />
                  <span>Smart video door phones & building intercom solutions</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#16143E]/80">
                  <CheckCircle2 size={16} className="text-[#EF1313] flex-shrink-0 mt-0.5" />
                  <span>Annual Maintenance Contracts (AMC) & on-site camera repair</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[#16143E]/8 space-y-3">
              <button
                type="button"
                onClick={() => scrollToWithPhysics("security")}
                className="w-full min-h-[46px] px-6 py-3 rounded-xl bg-[#16143E] hover:bg-[#232057] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#16143E]/25 transition-all group-hover:shadow-lg"
              >
                <span>View Security Solutions</span>
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => scrollToWithPhysics("enquiry")}
                className="w-full text-xs font-semibold text-[#16143E]/60 hover:text-[#EF1313] text-center py-1 transition-colors block"
              >
                Request a custom site security quote →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
