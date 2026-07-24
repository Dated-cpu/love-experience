"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCallback, useEffect, useRef } from "react";

interface Heart {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  swing: number;
  swingSpeed: number;
  phase: number;
}

export function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const heartsRef = useRef<Heart[]>([]);
  const animationIdRef = useRef<number>(0);

  const initHearts = useCallback((width: number, height: number) => {
    const hearts: Heart[] = [];
    for (let i = 0; i < 12; i++) {
      hearts.push({
        x: Math.random() * width,
        y: height + Math.random() * 200,
        size: Math.random() * 12 + 6,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.3 + 0.2,
        swing: Math.random() * 50 + 20,
        swingSpeed: Math.random() * 0.005 + 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }
    heartsRef.current = hearts;
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initHearts(canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hearts = heartsRef.current;
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y -= h.speed;
        h.x += Math.sin(h.phase + Date.now() * h.swingSpeed) * 0.3;

        if (h.y < -50) {
          h.y = canvas.height + 50;
          h.x = Math.random() * canvas.width;
        }

        drawHeart(ctx, h.x, h.y, h.size, h.opacity);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced, initHearts]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}