"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef } from "react";

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let time = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function animate() {
      time += 0.002;
      const w = canvas.width;
      const h = canvas.height;

      const gradient = ctx.createRadialGradient(
        w * (0.5 + 0.3 * Math.sin(time)),
        h * (0.5 + 0.2 * Math.cos(time * 0.7)),
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.8,
      );

      gradient.addColorStop(0, "rgba(15, 0, 30, 1)");
      gradient.addColorStop(0.3, "rgba(30, 0, 40, 1)");
      gradient.addColorStop(0.6, "rgba(40, 0, 30, 1)");
      gradient.addColorStop(0.8, "rgba(20, 0, 20, 1)");
      gradient.addColorStop(1, "rgba(10, 0, 15, 1)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const accent = ctx.createRadialGradient(
        w * (0.7 + 0.2 * Math.sin(time * 0.5)),
        h * (0.3 + 0.15 * Math.cos(time * 0.3)),
        0,
        w * 0.7,
        h * 0.3,
        w * 0.4,
      );

      accent.addColorStop(0, "rgba(244, 63, 94, 0.06)");
      accent.addColorStop(0.5, "rgba(168, 85, 247, 0.04)");
      accent.addColorStop(1, "rgba(244, 63, 94, 0)");

      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, w, h);

      animationIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  if (prefersReduced) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, #0f001e 0%, #1a0010 50%, #0a000f 100%)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}