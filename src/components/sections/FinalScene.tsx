"use client";

import { content } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function AnimatedHeart() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.svg
      className="mx-auto h-20 w-20 sm:h-28 sm:w-28"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M50 88.5C50 88.5 10 60 10 35C10 20 22 10 35 10C43 10 48 15 50 20C52 15 57 10 65 10C78 10 90 20 90 35C90 60 50 88.5 50 88.5Z"
        fill="url(#heart-gradient)"
        initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="heart-gradient" x1="10" y1="10" x2="90" y2="88.5">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {!prefersReduced && (
        <motion.circle
          cx="50"
          cy="50"
          r="50"
          fill="url(#heart-gradient)"
          className="opacity-20 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.svg>
  );
}

function LightParticle({ index }: { index: number }) {
  const prefersReduced = useReducedMotion();

  const colors = ["#f43f5e", "#a855f7", "#f472b6", "#6366f1", "#fbbf24"];
  const positions = [
    { x: "35%", y: "25%" }, { x: "65%", y: "35%" }, { x: "45%", y: "55%" },
    { x: "55%", y: "45%" }, { x: "30%", y: "65%" }, { x: "70%", y: "25%" },
    { x: "40%", y: "40%" }, { x: "60%", y: "60%" }, { x: "25%", y: "35%" },
    { x: "75%", y: "45%" }, { x: "50%", y: "30%" }, { x: "35%", y: "70%" },
    { x: "65%", y: "55%" }, { x: "45%", y: "20%" }, { x: "55%", y: "70%" },
    { x: "20%", y: "45%" }, { x: "80%", y: "55%" }, { x: "30%", y: "30%" },
    { x: "70%", y: "65%" }, { x: "50%", y: "50%" }, { x: "40%", y: "60%" },
    { x: "60%", y: "40%" }, { x: "45%", y: "75%" }, { x: "55%", y: "25%" },
    { x: "35%", y: "45%" }, { x: "65%", y: "35%" }, { x: "50%", y: "65%" },
    { x: "30%", y: "55%" }, { x: "70%", y: "45%" }, { x: "25%", y: "50%" },
  ];
  const durations = [3, 4, 5, 3.5, 4.5, 5.5, 3.2, 4.2, 5.2, 3.8,
                     4.8, 3, 4, 5, 3.5, 4.5, 5.5, 3.2, 4.2, 5.2,
                     3.8, 4.8, 3.3, 4.3, 5.3, 3.7, 4.7, 3.1, 4.1, 5.1];
  const delays = [0, 0.5, 1.0, 0.3, 0.8, 1.3, 0.2, 0.7, 1.2, 0.4,
                  0.9, 0.1, 0.6, 1.1, 0.35, 0.85, 1.35, 0.15, 0.65, 1.15,
                  0.45, 0.95, 1.25, 0.25, 0.75, 1.05, 0.55, 0.05, 0.5, 1.0];
  const pos = positions[index % positions.length];
  const dur = durations[index % durations.length];
  const del = delays[index % delays.length];

  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full"
      style={{
        background: colors[index % colors.length],
        boxShadow: `0 0 6px 2px ${colors[index % colors.length]}80`,
      }}
      initial={prefersReduced ? { opacity: 0.5 } : { opacity: 0, x: "50%", y: "50%" }}
      animate={
        prefersReduced ? {} : { opacity: [0, 1, 0], x: pos.x, y: pos.y }
      }
      transition={{ duration: dur, delay: del, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

export function FinalScene() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mounted] = useState(true);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <LightParticle key={i} index={i} />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={mounted ? { opacity: 0, scale: 0.5 } : {}}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <AnimatedHeart />
        </motion.div>

        <motion.h2
          initial={mounted ? { opacity: 0, y: 30 } : {}}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 text-4xl font-light sm:text-5xl md:text-6xl"
        >
          <span className="text-gradient">{content.final.title}</span>
        </motion.h2>

        <motion.p
          initial={mounted ? { opacity: 0, y: 20 } : {}}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 text-lg text-rose-300/80 sm:text-xl"
        >
          {content.final.subtitle}
        </motion.p>

        <motion.p
          initial={mounted ? { opacity: 0, y: 20 } : {}}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
        >
          {content.final.message}
        </motion.p>

        <motion.p
          initial={mounted ? { opacity: 0, y: 20 } : {}}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 text-lg font-light text-rose-300/60 sm:text-xl"
        >
          {content.final.signature}
        </motion.p>
      </div>
    </section>
  );
}