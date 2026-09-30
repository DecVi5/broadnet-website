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
    const fallback = setTimeout(() => setIsRevealed(true), 3400);

    return () => {
      window.removeEventListener("broadnet:intro-splitting", onSplit);
      window.removeEventListener("broadnet:intro-reset", onReset);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 bg-[#06091F] text-white selection:bg-[#00C2FF] selection:text-[#06091F]"
    >
      {/* ================= ATMOSPHERIC COSMIC BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle high-tech grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,194,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* 1. Deep royal sapphire glow */}
        <div
          className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(14,24,85,0.9) 0%, rgba(0,71,255,0.25) 45%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        {/* 2. Cyber cyan energy node behind text */}
        <div
          className="absolute top-1/4 left-1/4 w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,194,255,0.18) 0%, rgba(78,13,186,0.15) 50%, transparent 75%)",
            filter: "blur(70px)",
          }}
        />

        {/* 3. Crimson security aura on right */}
        <div
          className="absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239,19,19,0.16) 0%, rgba(78,13,186,0.15) 50%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

        {/* 4. Center bottom atmospheric haze */}
        <div
          className="absolute bottom-16 left-1/3 w-[800px] h-[350px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(78,13,186,0.25) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* 3D Antigravity Particle Field Background (Glows Electric Cyan in 3D Space) */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden select-none opacity-90">
        <Antigravity
          count={500}
          magnetRadius={6}
          ringRadius={10}
          waveSpeed={0.4}
          waveAmplitude={3.8}
          particleSize={0.55}
          lerpSpeed={0.07}
          color="#00C2FF"
          autoAnimate={false}
          particleVariance={3}
          rotationSpeed={0}
          depthFactor={2.1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={23}
        />
      </div>

      {/* ================= COGNITIVE & MOTION BLEND WRAPPER ================= */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0.6, filter: "blur(10px)" }}
        animate={
          isRevealed
            ? { scale: 1, opacity: 1, filter: "blur(0px)" }
            : { scale: 0.94, opacity: 0.6, filter: "blur(10px)" }
        }
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-36 lg:pt-28 lg:pb-40 pointer-events-none w-full"
      >
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Left content (3/5) */}
          <div className="lg:col-span-3">
            {/* Social Proof Trust Strip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-wrap items-center gap-3.5 mb-5 pointer-events-auto"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md shadow-sm">
                <div className="flex items-center text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#F59E0B]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">4.9/5</span>
                <span className="text-xs text-slate-300">Google Rating</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                <CheckCircle2 size={14} className="text-[#00C2FF] flex-shrink-0" />
                <span>420+ Certified Deployments in Avadi</span>
              </div>
            </motion.div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="flex items-center gap-3 mb-7 pointer-events-auto"
            >
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,194,255,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-pulse" />
                <span
                  className="text-xs font-semibold text-[#00C2FF] tracking-widest uppercase font-display"
                >
                  Avadi · Chennai · Direct Fiber & ELV Partner
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight mb-6 text-white"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Engineered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00C2FF] to-[#A78BFA] drop-shadow-[0_0_35px_rgba(0,194,255,0.35)]">
                Connectivity.
              </span>
              <br />
              Intelligent{" "}
              <span className="relative inline-block text-white">
                Surveillance.
                <svg className="absolute -bottom-1 left-0 w-full" height="3" viewBox="0 0 300 3" preserveAspectRatio="none">
                  <path d="M0 1.5 Q75 0 150 1.5 Q225 3 300 1.5" stroke="#EF1313" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              From high-speed fiber internet to enterprise CCTV and ELV systems — Broadnet delivers infrastructure-grade solutions with guaranteed uptime and 2-hour on-site dispatch.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-14 pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => scrollToWithPhysics("enquiry")}
                className="btn-crimson shadow-2xl shadow-[#EF1313]/50 hover:shadow-[#EF1313]/70 transition-all duration-300 ring-4 ring-[#EF1313]/25 hover:ring-[#EF1313]/45 group"
              >
                Request Enquiry <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => scrollToWithPhysics("security")}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-semibold text-white hover:text-white hover:border-[#EF1313]/60 bg-white/[0.08] hover:bg-[#EF1313]/15 backdrop-blur-md transition-all duration-200"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <Shield size={15} className="text-[#EF1313]" /> Security Solutions
              </button>
              <button
                type="button"
                onClick={() => scrollToWithPhysics("internet")}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-semibold text-white hover:text-white hover:border-[#00C2FF]/60 bg-white/[0.08] hover:bg-[#00C2FF]/15 backdrop-blur-md transition-all duration-200"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <Wifi size={15} className="text-[#00C2FF]" /> Internet Plans
              </button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.48 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pointer-events-auto"
            >
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`p-4 rounded-2xl border transition-all duration-500 backdrop-blur-md ${
                    tick === i
                      ? "border-[#00C2FF]/60 bg-[#00C2FF]/15 shadow-xl shadow-[#00C2FF]/20"
                      : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]"
                  }`}
                >
                  <div
                    className="text-2xl font-bold text-white mb-0.5"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="text-xs text-white/70 font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {m.label}
                  </div>
                  <div
                    className="text-[11px] text-[#00C2FF] font-semibold mt-1"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {m.detail}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right visual (2/5) — Cybernetic Network Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="hidden lg:flex lg:col-span-2 items-center justify-center pointer-events-auto"
          >
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 260 260" width="260" height="260" className="absolute inset-0">
                <defs>
                  <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4E0DBA" />
                    <stop offset="100%" stopColor="#0B1340" />
                  </radialGradient>
                </defs>
                {/* Connection lines */}
                {[
                  [130, 130, 130, 30],
                  [130, 130, 222, 80],
                  [130, 130, 222, 180],
                  [130, 130, 130, 230],
                  [130, 130, 38, 180],
                  [130, 130, 38, 80],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(0,194,255,0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                ))}
                {/* Outer nodes */}
                {[
                  { cx: 130, cy: 30, label: "Fiber" },
                  { cx: 222, cy: 80, label: "CCTV" },
                  { cx: 222, cy: 180, label: "WiFi" },
                  { cx: 130, cy: 230, label: "LAN" },
                  { cx: 38, cy: 180, label: "ELV" },
                  { cx: 38, cy: 80, label: "VPN" },
                ].map((n, i) => (
                  <g key={i}>
                    <circle
                      cx={n.cx}
                      cy={n.cy}
                      r="22"
                      fill="#0B1340"
                      stroke="rgba(0,194,255,0.5)"
                      strokeWidth="1.5"
                    />
                    <circle cx={n.cx} cy={n.cy} r="16" fill="rgba(0,194,255,0.12)" />
                    <text
                      x={n.cx}
                      y={n.cy + 4}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="700"
                      fill="#00C2FF"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
                {/* Centre node — BN */}
                <circle cx="130" cy="130" r="40" fill="url(#nodeGrad)" stroke="rgba(0,194,255,0.6)" strokeWidth="1.5" />
                <circle cx="130" cy="130" r="34" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text
                  x="130"
                  y="127"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="800"
                  fill="white"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  BN
                </text>
                <text
                  x="130"
                  y="141"
                  textAnchor="middle"
                  fontSize="6.5"
                  fill="rgba(255,255,255,0.8)"
                  style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em" }}
                >
                  BROADNET
                </text>
              </svg>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-6 px-4 py-2.5 bg-[#070B28]/90 rounded-2xl shadow-2xl border border-[#00C2FF]/30 backdrop-blur-md">
                <div className="text-lg font-bold text-[#00C2FF]" style={{ fontFamily: "Syne, sans-serif" }}>
                  99.9%
                </div>
                <div className="text-xs text-slate-300" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Uptime SLA
                </div>
              </div>
              <div className="absolute -bottom-2 -left-4 px-4 py-2.5 bg-[#16143E]/90 rounded-2xl shadow-2xl border border-white/15 backdrop-blur-md">
                <div className="text-lg font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                  24/7
                </div>
                <div className="text-xs text-white/70" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Tech Support
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= SMOOTH SEAMLESS GRADIENT BRIDGE ================= */}
      {/* Elegantly blends dark cosmic command center into crisp white sections below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(6,9,31,0.2) 20%, rgba(255,255,255,0.7) 70%, #FFFFFF 100%)",
        }}
      />

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#16143E]/45 hover:text-[#16143E]/80 pointer-events-auto z-30 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Scroll
        </span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}