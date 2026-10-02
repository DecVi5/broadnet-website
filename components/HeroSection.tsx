"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Wifi, ChevronDown, Star, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";
const Antigravity = dynamic(() => import("./Antigravity"), { ssr: false });
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

const METRICS = [
  { value: "2014", label: "Established", detail: "10+ Years Trust" },
  { value: "100+ km", label: "Private Fibre", detail: "Zero Reseller Mesh" },
  { value: "2,500+", label: "Deployments", detail: "Homes & Corporates" },
  { value: "< 2 Hrs", label: "Technician SLA", detail: "Rapid Local Dispatch" },
];

export default function HeroSection() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % METRICS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-12 bg-white text-[#16143E] scroll-mt-24"
    >
      {/* Background — clean subtle grid */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(78,13,186,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(78,13,186,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Centered ambient radial glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(78,13,186,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(239,19,19,0.035) 0%, transparent 70%)" }}
        />
      </div>

      {/* 3D Antigravity Particle Field Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        <Antigravity
          count={250}
          magnetRadius={6}
          ringRadius={10}
          waveSpeed={0.4}
          waveAmplitude={3.8}
          particleSize={0.5}
          lerpSpeed={0.07}
          color="#0d00ff"
          autoAnimate={true}
          particleVariance={3}
          rotationSpeed={0}
          depthFactor={2.1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={23}
        />
        {/* Soft radial backdrop to preserve crisp typography readability on mobile & desktop */}
        <div className="absolute inset-0 bg-white/45 md:bg-white/20 pointer-events-none" />
      </div>

      {/* Centered Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pointer-events-none w-full"
      >
        {/* Social Proof Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-center mb-5 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16143E]/[0.03] border border-[#16143E]/10 backdrop-blur-sm shadow-sm">
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-[#F59E0B]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#16143E]">4.9/5 Rating</span>
            <span className="text-xs text-[#16143E]/40">·</span>
            <span className="text-xs font-semibold text-[#16143E]/75">10+ Years Established in Avadi</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.12] sm:leading-[1.06] tracking-tight mb-5 text-[#16143E] max-w-4xl"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Engineered{" "}
          <span className="text-gradient">Connectivity.</span>
          <br className="hidden sm:inline" />
          Intelligent{" "}
          <span className="relative inline-block text-[#16143E]">
            Surveillance.
            <svg className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full" height="4" viewBox="0 0 300 4" preserveAspectRatio="none">
              <path d="M0 2 Q75 0.5 150 2 Q225 3.5 300 2" stroke="#EF1313" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle - Explicitly states offerings to local customers */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="text-[#16143E]/75 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-medium"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Broadnet provides dedicated high-speed fiber internet, certified CCTV surveillance systems, professional installation, and local support in Avadi and Chennai.
        </motion.p>

        {/* Focused CTAs: Exactly 1 Primary + 1 Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-12 pointer-events-auto w-full max-w-md sm:max-w-none"
        >
          <button
            type="button"
            onClick={() => scrollToWithPhysics("coverage")}
            className="btn-crimson min-h-[48px] px-8 justify-center shadow-lg shadow-[#EF1313]/25 hover:shadow-[#EF1313]/40 transition-all duration-300 group w-full sm:w-auto"
          >
            Check Availability <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => scrollToWithPhysics("security")}
            className="min-h-[48px] px-7 rounded-full border border-[#16143E]/18 text-xs sm:text-sm font-semibold text-[#16143E] hover:text-[#16143E] hover:border-[#16143E]/35 bg-white/90 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <Shield size={15} className="text-[#4E0DBA]" /> Security Solutions
          </button>
        </motion.div>

        {/* Metrics Centered Grid */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pointer-events-auto"
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 backdrop-blur-sm text-center ${
                tick === i
                  ? "border-[#4E0DBA]/35 bg-[#4E0DBA]/[0.04] shadow-md shadow-[#4E0DBA]/5"
                  : "border-[#16143E]/10 bg-white/85 shadow-sm"
              }`}
            >
              <div
                className="text-xl sm:text-2xl font-bold text-[#16143E] mb-0.5"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {m.value}
              </div>
              <div
                className="text-[10px] sm:text-xs text-[#16143E]/80 font-bold uppercase tracking-wider"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {m.label}
              </div>
              <div
                className="text-[10px] sm:text-[11px] text-[#4E0DBA] font-semibold mt-0.5"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {m.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="mt-6 flex flex-col items-center gap-1 text-[#16143E]/30 hover:text-[#16143E]/70 pointer-events-auto transition-colors z-20"
      >
        <span className="text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Scroll
        </span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}