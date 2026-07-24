"use client";

import { useEffect, useRef } from "react";

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const COLORS = ["#f43f5e", "#a855f7", "#f472b6", "#fb7185", "#6366f1", "#fbbf24"];

export function ConfettiEffect({ trigger }: { trigger: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const animationIdRef = useRef<number>(0);
  const activeRef = useRef(false);

  useEffect(() => {
    if (!trigger || activeRef.current) return;
    activeRef.current = true;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -12 - 4,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
      });
    }

    particlesRef.current = particles;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particlesRef.current) {
        if (p.opacity <= 0) continue;
        alive = true;

        p.x += p.vx;
        p.vy += 0.1;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.003;

        if (p.opacity < 0) p.opacity = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      if (alive) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        activeRef.current = false;
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      activeRef.current = false;
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}