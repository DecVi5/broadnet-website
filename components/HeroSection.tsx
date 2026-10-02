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
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % METRICS.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // If intro has already completed in this session, reveal Hero immediately
    if (typeof window !== "undefined" && sessionStorage.getItem("broadnet_intro_completed")) {
      setIsRevealed(true);
    }

    const onReveal = () => setIsRevealed(true);

    window.addEventListener("broadnet:intro-splitting", onReveal);
    window.addEventListener("broadnet:intro-done", onReveal);

    // Fallback so Hero is revealed after intro finishes or if skipped
    const fallback = setTimeout(() => setIsRevealed(true), 3500);

    return () => {
      window.removeEventListener("broadnet:intro-splitting", onReveal);
      window.removeEventListener("broadnet:intro-done", onReveal);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-12 bg-white text-[#16143E]"
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
        initial={{ opacity: 0.15, scale: 0.985, y: 10 }}
        animate={
          isRevealed
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0.15, scale: 0.985, y: 10 }
        }
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pointer-events-none w-full"
      >
        {/* Social Proof Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 mb-4 sm:mb-5 pointer-events-auto max-w-full"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#16143E]/4 border border-[#16143E]/10 backdrop-blur-sm shadow-sm flex-shrink-0">
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="fill-[#F59E0B]" />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#16143E]">4.9/5</span>
            <span className="text-[11px] sm:text-xs text-[#16143E]/50">Google Rating</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-[#16143E]/70 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#16143E]/[0.02] border border-[#16143E]/6 sm:border-transparent">
            <CheckCircle2 size={13} className="text-[#25D366] flex-shrink-0" />
            <span className="text-center">420+ Certified Deployments in Avadi</span>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="flex items-center justify-center mb-5 sm:mb-6 pointer-events-auto max-w-full px-2"
        >
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#4E0DBA]/18 bg-[#4E0DBA]/5 max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E0DBA] animate-pulse flex-shrink-0" />
            <span
              className="text-[10px] sm:text-xs font-semibold text-[#4E0DBA] tracking-wide sm:tracking-widest uppercase font-display text-center leading-tight"
            >
              Avadi · Chennai · Direct Fiber & ELV Partner
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.12] sm:leading-[1.06] tracking-tight mb-4 sm:mb-6 text-[#16143E] max-w-4xl"
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

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#16143E]/65 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-9 max-w-2xl mx-auto px-1 sm:px-0"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          From high-speed fiber internet to enterprise CCTV and ELV systems — Broadnet delivers infrastructure-grade solutions with guaranteed uptime and 2-hour on-site dispatch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 pointer-events-auto w-full max-w-xs sm:max-w-none"
        >
          <button
            type="button"
            onClick={() => scrollToWithPhysics("enquiry")}
            className="btn-crimson justify-center shadow-xl shadow-[#EF1313]/30 hover:shadow-[#EF1313]/55 transition-all duration-300 ring-4 ring-[#EF1313]/15 hover:ring-[#EF1313]/35 group w-full sm:w-auto"
          >
            Request Enquiry <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => scrollToWithPhysics("security")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 rounded-full border border-[#16143E]/14 text-xs sm:text-sm font-semibold text-[#16143E]/75 hover:text-[#16143E] hover:border-[#16143E]/28 bg-white/80 backdrop-blur-sm transition-all duration-200"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <Shield size={14} className="sm:w-[15px] sm:h-[15px]" /> Security Solutions
            </button>
            <button
              type="button"
              onClick={() => scrollToWithPhysics("internet")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 rounded-full border border-[#16143E]/14 text-xs sm:text-sm font-semibold text-[#16143E]/75 hover:text-[#16143E] hover:border-[#16143E]/28 bg-white/80 backdrop-blur-sm transition-all duration-200"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <Wifi size={14} className="sm:w-[15px] sm:h-[15px]" /> Internet Plans
            </button>
          </div>
        </motion.div>

        {/* Metrics Centered Grid */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-4xl pointer-events-auto"
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`p-3 sm:p-4 rounded-2xl border transition-all duration-500 backdrop-blur-sm text-center ${
                tick === i
                  ? "border-[#4E0DBA]/40 bg-[#4E0DBA]/6 shadow-lg shadow-[#4E0DBA]/8"
                  : "border-[#16143E]/8 bg-white/85 shadow-sm hover:shadow-md"
              }`}
            >
              <div
                className="text-xl sm:text-2xl font-bold text-[#16143E] mb-0.5"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {m.value}
              </div>
              <div
                className="text-[10px] sm:text-xs text-[#16143E]/75 font-semibold uppercase tracking-wider"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {m.label}
              </div>
              <div
                className="text-[10px] sm:text-[11px] text-[#4E0DBA] font-semibold mt-0.5 sm:mt-1"
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