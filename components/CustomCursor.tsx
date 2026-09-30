"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const isHovering = useRef(false);
  const isClicked = useRef(false);
  const isOverInput = useRef(false);
  const [hovering, setHovering] = useState(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.opacity = isOverInput.current ? "0" : "1";
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = isOverInput.current ? "0" : "1";
      }
    };

    const onDown = () => {
      isClicked.current = true;
    };

    const onUp = () => {
      isClicked.current = false;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInput = !!target.closest("input, textarea, select, [contenteditable='true']");
      isOverInput.current = isInput;
      if (isInput) {
        if (ringRef.current) ringRef.current.style.opacity = "0";
        if (dotRef.current) dotRef.current.style.opacity = "0";
        return;
      }

      const isInteractive = !!target.closest("a, button, [role='button'], input[type='submit'], .interactive");
      if (isInteractive !== isHovering.current) {
        isHovering.current = isInteractive;
        setHovering(isInteractive);
      }
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const onLeaveWindow = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const onEnterWindow = () => {
      if (!isOverInput.current) {
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    // Snappy, smooth 60fps spring follow
    const animate = () => {
      const factor = 0.22;
      ring.current.x += (pos.current.x - ring.current.x) * factor;
      ring.current.y += (pos.current.y - ring.current.y) * factor;

      if (ringRef.current) {
        const scale = isClicked.current ? 0.8 : isHovering.current ? 1.3 : 1;
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${scale})`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 rounded-full z-[99998] will-change-transform"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          border: `2px solid ${hovering ? "#EF1313" : "#4E0DBA"}`,
          boxShadow: hovering
            ? "0 0 16px 4px rgba(239,19,19,0.45), 0 0 32px 8px rgba(239,19,19,0.18)"
            : "0 0 14px 3px rgba(78,13,186,0.45), 0 0 28px 7px rgba(78,13,186,0.18)",
          transition: "border-color 0.18s ease, box-shadow 0.18s ease, opacity 0.15s ease",
          opacity: 0,
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed top-0 left-0 rounded-full z-[99999] will-change-transform"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: hovering ? "#EF1313" : "#4E0DBA",
          boxShadow: hovering
            ? "0 0 8px 2px rgba(239,19,19,0.7)"
            : "0 0 8px 2px rgba(78,13,186,0.7)",
          transition: "background 0.18s ease, box-shadow 0.18s ease, opacity 0.15s ease",
          opacity: 0,
        }}
      />
    </>
  );
}