"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Shield, ArrowRight, Sparkles } from "lucide-react";

interface CinematicIntroProps {
  onComplete?: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Sequence stages: "intro" -> "subtitle" -> "splitting" -> "done"
  const [stage, setStage] = useState<"intro" | "subtitle" | "splitting" | "done">("done");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if intro has already run
    const hasShown = typeof window !== "undefined"
      ? (localStorage.getItem("broadnet_intro_shown") || sessionStorage.getItem("broadnet_intro_shown"))
      : null;

    if (hasShown) {
      setStage("done");
      setShouldRender(false);
      window.dispatchEvent(new CustomEvent("broadnet:intro-done"));
      onComplete?.();
      return;
    }

    // First time visitor: activate opening sequence
    setShouldRender(true);
    setStage("intro");
    try {
      localStorage.setItem("broadnet_intro_shown", "true");
      sessionStorage.setItem("broadnet_intro_shown", "true");
    } catch {
      // ignore storage error
    }

    // Stage 1 -> Subtitle (1.3s)
    const t1 = setTimeout(() => {
      setStage("subtitle");
    }, 1300);

    // Stage 2 -> Curtains splitting (2.8s)
    const t2 = setTimeout(() => {
      setStage("splitting");
      window.dispatchEvent(new CustomEvent("broadnet:intro-splitting"));
    }, 2800);

    // Stage 3 -> Finished (3.9s)
    const t3 = setTimeout(() => {
      setStage("done");
      setShouldRender(false);
      window.dispatchEvent(new CustomEvent("broadnet:intro-done"));
      onComplete?.();
    }, 3900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // Allow clicking anywhere to skip straight to split
  const handleSkip = () => {
    if (stage !== "splitting" && stage !== "done") {
      setStage("splitting");
      window.dispatchEvent(new CustomEvent("broadnet:intro-splitting"));
      setTimeout(() => {
        setStage("done");
        window.dispatchEvent(new CustomEvent("broadnet:intro-done"));
        onComplete?.();
      }, 900);
    }
  };

  if (!shouldRender || stage === "done") return null;

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
        initial={{ x: 0, opacity: 1 }}
        animate={isSplitting ? { x: "-102%", opacity: [1, 1, 0.9, 0] } : { x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Inner seam soft trailing feather */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#00C2FF]/20 via-[#070B28]/60 to-transparent pointer-events-none" />

        {/* Left text portion (BROAD) */}
        <div className="pr-2 sm:pr-4 text-right flex items-center relative z-10">
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
              className="absolute right-2 sm:right-10 top-[60%] sm:top-[62%] flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#00C2FF]/30 bg-[#00C2FF]/10 backdrop-blur-md shadow-[0_0_25px_rgba(0,194,255,0.25)] z-10"
            >
              <Wifi size={14} className="sm:w-4 sm:h-4 text-[#00C2FF] animate-pulse flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white tracking-wider uppercase font-display whitespace-nowrap">
                Internet Services
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left seam light highlight */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#00C2FF] to-transparent shadow-[0_0_25px_#00C2FF]" />
      </motion.div>

      {/* ================= RIGHT SHUTTER ================= */}
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={isSplitting ? { x: "102%", opacity: [1, 1, 0.9, 0] } : { x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Inner seam soft trailing feather */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#EF1313]/20 via-[#070B28]/60 to-transparent pointer-events-none" />

        {/* Right text portion (NET) */}
        <div className="pl-2 sm:pr-4 text-left flex items-center relative z-10">
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
              className="absolute left-2 sm:left-10 top-[60%] sm:top-[62%] flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#EF1313]/35 bg-[#EF1313]/10 backdrop-blur-md shadow-[0_0_25px_rgba(239,19,19,0.25)] z-10"
            >
              <Shield size={14} className="sm:w-4 sm:h-4 text-[#EF1313] animate-pulse flex-shrink-0" />
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white tracking-wider uppercase font-display whitespace-nowrap">
                Security Systems
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right seam light highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#EF1313] to-transparent shadow-[0_0_25px_#EF1313]" />
      </motion.div>



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
