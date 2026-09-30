"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Wifi, ChevronDown } from "lucide-react";
import Antigravity from "./Antigravity";
import { scrollToWithPhysics } from "@/lib/scrollPhysics";

const METRICS = [
  { value: "2014", label: "Established" },
  { value: "100+ km", label: "Own Optical Fibre" },
  { value: "2,500+", label: "Users on Network" },
  { value: "10+", label: "Technical Staff" },
];

export default function HeroSection() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % METRICS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Background — clean subtle grid */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(78,13,186,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(78,13,186,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Soft radial blobs */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(78,13,186,0.055) 0%, transparent 72%)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(239,19,19,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* 3D Antigravity Particle Field Background (Spans Complete Left and Right Corners) */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 pointer-events-none">
        <div className="grid lg:grid-cols-5 gap-16 items-center">

          {/* Left content (3/5) */}
          <div className="lg:col-span-3">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3 mb-8 pointer-events-auto"
            >
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#4E0DBA]/18 bg-[#4E0DBA]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4E0DBA] animate-pulse" />
                <span className="text-xs font-semibold text-[#4E0DBA] tracking-widest uppercase"
                  style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Avadi · Chennai · Since 2014
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Engineered{" "}
              <span className="text-gradient">Connectivity.</span>
              <br />
              Intelligent{" "}
              <span className="relative inline-block">
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
              className="text-[#16143E]/55 text-lg leading-relaxed mb-10 max-w-xl"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              From high-speed fiber internet to enterprise CCTV and ELV systems — Broadnet delivers infrastructure-grade solutions for homes and businesses across Avadi.
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
                className="btn-crimson"
              >
                Request Enquiry <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToWithPhysics("security")}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#16143E]/14 text-sm font-semibold text-[#16143E]/65 hover:text-[#16143E] hover:border-[#16143E]/28 bg-white/70 backdrop-blur-sm transition-all duration-200"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <Shield size={15} /> Security Solutions
              </button>
              <button
                type="button"
                onClick={() => scrollToWithPhysics("internet")}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#16143E]/14 text-sm font-semibold text-[#16143E]/65 hover:text-[#16143E] hover:border-[#16143E]/28 bg-white/70 backdrop-blur-sm transition-all duration-200"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <Wifi size={15} /> Internet Plans
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
                <div key={m.label}
                  className={`p-4 rounded-2xl border transition-all duration-500 ${
                    tick === i
                      ? "border-[#4E0DBA]/35 bg-[#4E0DBA]/6 shadow-lg shadow-[#4E0DBA]/8"
                      : "border-[#16143E]/7 bg-white"
                  }`}
                >
                  <div className="text-2xl font-bold text-[#16143E] mb-0.5"
                    style={{ fontFamily: "Syne, sans-serif" }}>{m.value}</div>
                  <div className="text-xs text-[#16143E]/45 font-medium uppercase tracking-wider"
                    style={{ fontFamily: "DM Sans, sans-serif" }}>{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right visual (2/5) — clean network diagram */}
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
                    <stop offset="100%" stopColor="#16143E" />
                  </radialGradient>
                </defs>
                {/* Connection lines */}
                {[
                  [130,130, 130,30],
                  [130,130, 222,80],
                  [130,130, 222,180],
                  [130,130, 130,230],
                  [130,130, 38,180],
                  [130,130, 38,80],
                ].map(([x1,y1,x2,y2],i)=>(
                  <line key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(78,13,186,0.18)" strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                ))}
                {/* Outer nodes */}
                {[
                  {cx:130,cy:30,label:"Fiber"},
                  {cx:222,cy:80,label:"CCTV"},
                  {cx:222,cy:180,label:"WiFi"},
                  {cx:130,cy:230,label:"LAN"},
                  {cx:38,cy:180,label:"ELV"},
                  {cx:38,cy:80,label:"VPN"},
                ].map((n,i)=>(
                  <g key={i}>
                    <circle cx={n.cx} cy={n.cy} r="22"
                      fill="white" stroke="rgba(78,13,186,0.2)" strokeWidth="1.5"
                    />
                    <circle cx={n.cx} cy={n.cy} r="16"
                      fill="rgba(78,13,186,0.06)"
                    />
                    <text x={n.cx} y={n.cy+4}
                      textAnchor="middle"
                      fontSize="8" fontWeight="700"
                      fill="#4E0DBA"
                      style={{fontFamily:"Syne,sans-serif"}}
                    >{n.label}</text>
                  </g>
                ))}
                {/* Centre node — BN */}
                <circle cx="130" cy="130" r="40" fill="url(#nodeGrad)" />
                <circle cx="130" cy="130" r="34" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
                <text x="130" y="127" textAnchor="middle"
                  fontSize="14" fontWeight="800" fill="white"
                  style={{fontFamily:"Syne,sans-serif"}}
                >BN</text>
                <text x="130" y="141" textAnchor="middle"
                  fontSize="6.5" fill="rgba(255,255,255,0.6)"
                  style={{fontFamily:"DM Sans,sans-serif",letterSpacing:"0.1em"}}
                >BROADNET</text>
              </svg>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-6 px-4 py-2.5 bg-white rounded-2xl shadow-xl border border-[#16143E]/8">
                <div className="text-lg font-bold text-[#4E0DBA]" style={{fontFamily:"Syne,sans-serif"}}>99.9%</div>
                <div className="text-xs text-[#16143E]/45" style={{fontFamily:"DM Sans,sans-serif"}}>Uptime SLA</div>
              </div>
              <div className="absolute -bottom-2 -left-4 px-4 py-2.5 bg-[#16143E] rounded-2xl shadow-xl">
                <div className="text-lg font-bold text-white" style={{fontFamily:"Syne,sans-serif"}}>24/7</div>
                <div className="text-xs text-white/55" style={{fontFamily:"DM Sans,sans-serif"}}>Tech Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#16143E]/28 pointer-events-auto"
      >
        <span className="text-xs tracking-widest uppercase font-medium" style={{fontFamily:"DM Sans,sans-serif"}}>Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}