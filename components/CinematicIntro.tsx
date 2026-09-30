"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Shield, ArrowRight, Sparkles } from "lucide-react";

interface CinematicIntroProps {
  onComplete?: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Sequence stages: "idle" -> "intro" -> "subtitle" -> "splitting" -> "done"
  const [stage, setStage] = useState<"intro" | "subtitle" | "splitting" | "done">("intro");
  const [hasStarted, setHasStarted] = useState(true);

  useEffect(() => {
    // Stage 1: Broadnet appears (0s -> 1.4s)
    const t1 = setTimeout(() => {
      setStage("subtitle");
    }, 1400);

    // Stage 2: Subtitle shows "Internet Services" and "Security Systems" (1.4s -> 3.2s)
    const t2 = setTimeout(() => {
      setStage("splitting");
    }, 3200);

    // Stage 3: Split curtains and reveal hero page (3.2s -> 4.4s)
    const t3 = setTimeout(() => {
      setStage("done");
      onComplete?.();
    }, 4400);

    const handleReplay = () => {
      setStage("intro");
      setHasStarted(true);
      setTimeout(() => setStage("subtitle"), 1400);
      setTimeout(() => setStage("splitting"), 3200);
      setTimeout(() => {
        setStage("done");
        onComplete?.();
      }, 4400);
    };

    window.addEventListener("broadnet:replay-intro", handleReplay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("broadnet:replay-intro", handleReplay);
    };
  }, [onComplete]);

  // Allow clicking anywhere to skip straight to split
  const handleSkip = () => {
    if (stage !== "splitting" && stage !== "done") {
      setStage("splitting");
      setTimeout(() => {
        setStage("done");
        onComplete?.();
      }, 1000);
    }
  };

  if (stage === "done") return null;

  const letterVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.15 + i * 0.08,
        duration: 0.6,
      },
    }),
  };

  const isSplitting = stage === "splitting";

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[999999] overflow-hidden select-none pointer-events-auto cursor-pointer"
      title="Click anytime to skip intro"
    >
      {/* ================= LEFT SHUTTER ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={isSplitting ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#070B28] z-20 overflow-hidden flex items-center justify-end"
        style={{
          background: "radial-gradient(circle at 100% 50%, #0E1855 0%, #070B28 75%, #040618 100%)",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient blue glow orb */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0047FF]/20 blur-[100px] pointer-events-none" />

        {/* Left text portion (BROAD) */}
        <div className="pr-2 sm:pr-4 text-right flex items-center">
          <div className="flex">
            {"BROAD".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter inline-block font-display"
                style={{
                  textShadow: "0 0 35px rgba(255,255,255,0.35), 0 0 70px rgba(78,13,186,0.5)",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle Left Pillar: Internet Services */}
        <AnimatePresence>
          {(stage === "subtitle" || stage === "splitting") && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={
                isSplitting
                  ? { opacity: 0, x: -80, transition: { duration: 0.6 } }
                  : { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1 } }
              }
              className="absolute right-4 sm:right-10 top-[60%] sm:top-[62%] flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 backdrop-blur-md shadow-[0_0_25px_rgba(0,194,255,0.25)]"
            >
              <Wifi size={16} className="text-[#00C2FF] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase font-display whitespace-nowrap">
                Internet Services
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left seam light highlight */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#00C2FF] to-transparent shadow-[0_0_20px_#00C2FF]" />
      </motion.div>

      {/* ================= RIGHT SHUTTER ================= */}
      <motion.div
        initial={{ x: 0 }}
        animate={isSplitting ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#070B28] z-20 overflow-hidden flex items-center justify-start"
        style={{
          background: "radial-gradient(circle at 0% 50%, #0E1855 0%, #070B28 75%, #040618 100%)",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient red/purple glow orb */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#EF1313]/20 blur-[100px] pointer-events-none" />

        {/* Right text portion (NET) */}
        <div className="pl-2 sm:pr-4 text-left flex items-center">
          <div className="flex">
            {"NET".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i + 5}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-[#EF1313] tracking-tighter inline-block font-display"
                style={{
                  textShadow: "0 0 35px rgba(239,19,19,0.5), 0 0 70px rgba(239,19,19,0.3)",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle Right Pillar: Security Systems */}
        <AnimatePresence>
          {(stage === "subtitle" || stage === "splitting") && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                isSplitting
                  ? { opacity: 0, x: 80, transition: { duration: 0.6 } }
                  : { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
              }
              className="absolute left-4 sm:left-10 top-[60%] sm:top-[62%] flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#EF1313]/35 bg-[#EF1313]/10 backdrop-blur-md shadow-[0_0_25px_rgba(239,19,19,0.25)]"
            >
              <Shield size={16} className="text-[#EF1313] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase font-display whitespace-nowrap">
                Security Systems
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right seam light highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#EF1313] to-transparent shadow-[0_0_20px_#EF1313]" />
      </motion.div>

      {/* ================= CENTER LIGHT BEAM / SEAM ON SPLIT ================= */}
      <AnimatePresence>
        {isSplitting && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0.8, 0], scaleY: 1, scaleX: [1, 3, 0] }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-white blur-[8px] z-30 pointer-events-none"
            style={{
              boxShadow: "0 0 50px #00C2FF, 0 0 100px #EF1313",
            }}
          />
        )}
      </AnimatePresence>

      {/* Skip indicator prompt at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-[11px] font-bold text-white/50 tracking-widest uppercase flex items-center gap-1.5"
      >
        <span>Click anywhere to enter</span>
        <ArrowRight size={12} />
      </motion.div>
    </div>
  );
}
