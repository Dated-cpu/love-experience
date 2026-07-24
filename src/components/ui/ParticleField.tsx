"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
  isHeart: boolean;
}

function isMobile(): boolean {
  return typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);
}

function getDPR(): number {
  return Math.min(window.devicePixelRatio || 1, 2);
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const initParticles = useCallback((width: number, height: number) => {
    const mobile = isMobile();
    const density = mobile ? 25000 : 15000;
    const count = Math.min(Math.floor((width * height) / density), mobile ? 30 : 60);
    const heartCount = mobile ? 3 : 6;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 60 + 300,
        isHeart: false,
      });
    }

    for (let i = 0; i < heartCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.3 - 0.2,
        radius: 10 + Math.random() * 8,
        opacity: Math.random() * 0.25 + 0.08,
        hue: 340,
        isHeart: true,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = getDPR();

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles(window.innerWidth, window.innerHeight);
    }

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse, { passive: true });

    function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 15, size / 15);
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-5, -2, -8, 2, 0, 8);
      ctx.bezierCurveTo(8, 2, 5, -2, 0, 3);
      ctx.closePath();
      ctx.fillStyle = `rgba(244, 63, 94, ${opacity})`;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isHeart) {
          p.y += p.vy;
          p.x += Math.sin(Date.now() * 0.001 + i) * 0.2;
          if (p.y < -50) {
            p.y = window.innerHeight + 50;
            p.x = Math.random() * window.innerWidth;
          }
          drawHeart(ctx, p.x, p.y, p.radius, p.opacity);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;

          ctx.beginPath();
          ctx.strokeStyle = `hsla(${p.hue}, 70%, 60%, ${force * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
        ctx.fill();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [prefersReduced, initParticles]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}