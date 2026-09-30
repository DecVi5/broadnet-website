"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Wifi, ChevronDown, Star, CheckCircle2 } from "lucide-react";
import Antigravity from "./Antigravity";
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
    const onSplit = () => setIsRevealed(true);
    const onReset = () => setIsRevealed(false);

    window.addEventListener("broadnet:intro-splitting", onSplit);
    window.addEventListener("broadnet:intro-reset", onReset);

    // Fallback timer if intro is skipped or reloaded
    const fallback = setTimeout(() => setIsRevealed(true), 3200);

    return () => {
      window.removeEventListener("broadnet:intro-splitting", onSplit);
      window.removeEventListener("broadnet:intro-reset", onReset);
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
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden select-none">
        <Antigravity
          count={500}
          magnetRadius={6}
          ringRadius={10}
          waveSpeed={0.4}
          waveAmplitude={3.8}
          particleSize={0.5}
          lerpSpeed={0.07}
          color="#0d00ff"
          autoAnimate={false}
          particleVariance={3}
          rotationSpeed={0}
          depthFactor={2.1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={23}
        />
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
          className="flex flex-wrap items-center justify-center gap-3.5 mb-5 pointer-events-auto"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16143E]/4 border border-[#16143E]/10 backdrop-blur-sm shadow-sm">
            <div className="flex items-center text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-[#F59E0B]" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#16143E]">4.9/5</span>
            <span className="text-xs text-[#16143E]/50">Google Rating</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16143E]/70">
            <CheckCircle2 size={14} className="text-[#25D366] flex-shrink-0" />
            <span>420+ Certified Deployments in Avadi</span>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="flex items-center justify-center mb-6 pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#4E0DBA]/18 bg-[#4E0DBA]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E0DBA] animate-pulse" />
            <span
              className="text-xs font-semibold text-[#4E0DBA] tracking-widest uppercase font-display"
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
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.06] tracking-tight mb-6 text-[#16143E] max-w-4xl"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Engineered{" "}
          <span className="text-gradient">Connectivity.</span>
          <br className="hidden sm:inline" />
          Intelligent{" "}
          <span className="relative inline-block text-[#16143E]">
            Surveillance.
            <svg className="absolute -bottom-1.5 left-0 w-full" height="4" viewBox="0 0 300 4" preserveAspectRatio="none">
              <path d="M0 2 Q75 0.5 150 2 Q225 3.5 300 2" stroke="#EF1313" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#16143E]/65 text-lg sm:text-xl leading-relaxed mb-9 max-w-2xl mx-auto"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          From high-speed fiber internet to enterprise CCTV and ELV systems — Broadnet delivers infrastructure-grade solutions with guaranteed uptime and 2-hour on-site dispatch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-12 pointer-events-auto"
        >
          <button
            type="button"
            onClick={() => scrollToWithPhysics("enquiry")}
            className="btn-crimson shadow-xl shadow-[#EF1313]/30 hover:shadow-[#EF1313]/55 transition-all duration-300 ring-4 ring-[#EF1313]/15 hover:ring-[#EF1313]/35 group"
          >
            Request Enquiry <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => scrollToWithPhysics("security")}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#16143E]/14 text-sm font-semibold text-[#16143E]/75 hover:text-[#16143E] hover:border-[#16143E]/28 bg-white/80 backdrop-blur-sm transition-all duration-200"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <Shield size={15} /> Security Solutions
          </button>
          <button
            type="button"
            onClick={() => scrollToWithPhysics("internet")}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#16143E]/14 text-sm font-semibold text-[#16143E]/75 hover:text-[#16143E] hover:border-[#16143E]/28 bg-white/80 backdrop-blur-sm transition-all duration-200"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            <Wifi size={15} /> Internet Plans
          </button>
        </motion.div>

        {/* Metrics Centered Grid */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full max-w-4xl pointer-events-auto"
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`p-4 rounded-2xl border transition-all duration-500 backdrop-blur-sm text-center ${
                tick === i
                  ? "border-[#4E0DBA]/40 bg-[#4E0DBA]/6 shadow-lg shadow-[#4E0DBA]/8"
                  : "border-[#16143E]/8 bg-white/85 shadow-sm hover:shadow-md"
              }`}
            >
              <div
                className="text-2xl font-bold text-[#16143E] mb-0.5"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {m.value}
              </div>
              <div
                className="text-xs text-[#16143E]/75 font-semibold uppercase tracking-wider"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {m.label}
              </div>
              <div
                className="text-[11px] text-[#4E0DBA] font-semibold mt-1"
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