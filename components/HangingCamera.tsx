"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// Spring physics helper for smooth mechanical camera panning
function spring(
  current: number,
  target: number,
  velocity: number,
  stiffness = 0.06,
  damping = 0.78
) {
  const force = (target - current) * stiffness;
  const newVel = (velocity + force) * damping;
  return { value: current + newVel, velocity: newVel };
}

export default function HangingCamera() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraBodyRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<SVGLineElement>(null);

  const state = useRef({
    pitch: { value: 0, velocity: 0 },
    yaw: { value: 0, velocity: 0 },
    roll: { value: 0, velocity: 0 },
    targetPitch: 0,
    targetYaw: 0,
    targetRoll: 0,
  });

  const rafId = useRef<number>(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const camCenterX = rect.left + rect.width / 2;
    const camCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - camCenterX;
    const dy = e.clientY - camCenterY;

    // Angle of cursor relative to camera
    const angleX = Math.atan2(dx, 400); // yaw (degrees: ~ -25 to +25)
    const angleY = Math.atan2(dy, 400); // pitch (degrees: ~ -25 to +25)

    const s = state.current;
    // Camera aims towards cursor
    s.targetYaw = Math.max(-28, Math.min(28, (angleX * 180) / Math.PI));
    s.targetPitch = Math.max(-25, Math.min(25, (-angleY * 180) / Math.PI));
    s.targetRoll = Math.max(-5, Math.min(5, (angleX * 180) / Math.PI * 0.15));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      const s = state.current;

      const p = spring(s.pitch.value, s.targetPitch, s.pitch.velocity, 0.05, 0.8);
      const y = spring(s.yaw.value, s.targetYaw, s.yaw.velocity, 0.05, 0.8);
      const r = spring(s.roll.value, s.targetRoll, s.roll.velocity, 0.04, 0.82);

      s.pitch = p;
      s.yaw = y;
      s.roll = r;

      if (cameraBodyRef.current) {
        cameraBodyRef.current.style.transform = `perspective(500px) rotateX(${p.value}deg) rotateY(${y.value}deg) rotateZ(${r.value}deg)`;
      }

      // Dynamic optical lens glare tracking
      if (glareRef.current) {
        const gx = (y.value / 28) * 12;
        const gy = (p.value / 25) * 8;
        glareRef.current.style.transform = `translate(${gx}px, ${gy}px)`;
      }

      // Wire sway animation
      if (wireRef.current) {
        const wx = (y.value / 28) * 4;
        wireRef.current.setAttribute("x2", `${20 + wx}`);
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [onMouseMove]);

  return (
    <div
      ref={mountRef}
      className="relative flex flex-col items-center select-none"
      style={{ width: 130 }}
      title="Broadnet AI Surveillance — Tracking live"
    >
      {/* Heavy Steel Ceiling Mounting Bracket (anchored flush to the footer) */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Metal Mount Flange Base */}
        <div className="w-20 h-3 rounded-b-md bg-gradient-to-r from-[#1E1B38] via-[#3B3860] to-[#1E1B38] border-b border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center justify-around px-2">
          {/* Bolts */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#110E28] border border-white/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#110E28] border border-white/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#110E28] border border-white/30" />
        </div>

        {/* Industrial Hanging Conduit / Drop Cable */}
        <svg width="40" height="26" viewBox="0 0 40 26" className="overflow-visible">
          <line
            ref={wireRef}
            x1="20"
            y1="0"
            x2="20"
            y2="26"
            stroke="#2B2848"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="20"
            y1="0"
            x2="20"
            y2="26"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Weatherproof Cable Nut */}
          <rect x="15" y="20" width="10" height="6" rx="1.5" fill="#4E0DBA" stroke="#7A39EE" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Realistic Camera Body (swivels & pitches to track cursor) */}
      <div
        ref={cameraBodyRef}
        className="relative will-change-transform"
        style={{
          width: 120,
          height: 195,
          marginTop: -6,
          transformOrigin: "50% 0%",
        }}
      >
        {/* Photorealistic Camera Image Asset */}
        <div className="relative w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.75)]">
          <Image
            src="/assets/realistic_cctv.png"
            alt="Security Camera"
            width={560}
            height={910}
            className="w-full h-auto object-contain pointer-events-none"
            priority
          />

          {/* Dynamic Optical Lens Glass Reflection Shifter */}
          <div
            ref={glareRef}
            className="absolute bottom-[24%] left-[28%] w-[44%] h-[24%] rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none blur-[1px] transition-transform duration-75"
          />

          {/* Active Pulsing Red Recording Indicator Light */}
          <div className="absolute bottom-[17.5%] left-[50%] -translate-x-1/2 flex items-center justify-center pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF1313] animate-ping opacity-75" />
            <span className="absolute w-2 h-2 rounded-full bg-[#EF1313] shadow-[0_0_8px_3px_#EF1313]" />
          </div>
        </div>

        {/* Live Surveillance Status Tag */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#110E28]/95 border border-[#EF1313]/60 shadow-[0_0_12px_rgba(239,19,19,0.35)] flex items-center gap-1.5 pointer-events-none whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EF1313] animate-pulse" />
          <span className="text-[10px] font-bold tracking-wider text-white uppercase font-display">
            LIVE 24/7
          </span>
        </div>
      </div>
    </div>
  );
}