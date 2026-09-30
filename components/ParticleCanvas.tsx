"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  hue: number;
}

const COLORS = [
  "rgba(78,13,186,",
  "rgba(107,47,212,",
  "rgba(239,19,19,",
  "rgba(22,20,62,",
];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouseX = -9999;
    let mouseY = -9999;
    const particles: Particle[] = [];
    const MAX_PARTICLES = 180;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (e instanceof TouchEvent) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    const spawn = () => {
      if (particles.length >= MAX_PARTICLES) return;
      const spread = 8;
      const vx = (Math.random() - 0.5) * 3.5;
      const vy = (Math.random() - 0.5) * 3.5 - 1;
      const maxLife = 55 + Math.random() * 50;
      const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
      particles.push({
        x: mouseX + (Math.random() - 0.5) * spread,
        y: mouseY + (Math.random() - 0.5) * spread,
        vx, vy,
        life: 0,
        maxLife,
        size: 1.2 + Math.random() * 2.8,
        color: colorBase,
        hue: 0,
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouseX > -100) {
        for (let i = 0; i < 4; i++) spawn();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.98;
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const t = p.life / p.maxLife;
        const alpha = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8;
        const size = p.size * (1 - t * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, size), 0, Math.PI * 2);
        ctx.fillStyle = p.color + (alpha * 0.85).toFixed(3) + ")";
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}
