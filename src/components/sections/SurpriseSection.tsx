"use client";

import { ConfettiEffect } from "@/components/effects/ConfettiEffect";
import { InteractiveButton } from "@/components/ui/InteractiveButton";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { content } from "@/data/content";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {text.slice(0, counter)}
      {counter < text.length && (
        <span className="inline-block h-[1em] w-[2px] animate-pulse bg-rose-400 ml-0.5" />
      )}
    </span>
  );
}

function HeartParticles() {
  const positions = [
    { x: "20%", y: "30%" }, { x: "80%", y: "20%" }, { x: "30%", y: "70%" },
    { x: "70%", y: "80%" }, { x: "15%", y: "50%" }, { x: "85%", y: "55%" },
    { x: "40%", y: "15%" }, { x: "60%", y: "85%" }, { x: "25%", y: "85%" },
    { x: "75%", y: "15%" }, { x: "45%", y: "50%" }, { x: "55%", y: "40%" },
    { x: "10%", y: "40%" }, { x: "90%", y: "60%" }, { x: "35%", y: "25%" },
    { x: "65%", y: "75%" }, { x: "50%", y: "20%" }, { x: "50%", y: "80%" },
    { x: "20%", y: "65%" }, { x: "80%", y: "35%" },
  ];
  const delays = [0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.08, 0.18, 0.12, 0.22,
                  0.03, 0.13, 0.23, 0.07, 0.17, 0.28, 0.1, 0.2, 0.05, 0.15];
  const durations = [2.0, 2.5, 3.0, 2.2, 2.8, 3.2, 2.5, 2.0, 3.0, 2.8,
                     2.3, 2.7, 3.1, 2.1, 2.6, 2.9, 2.4, 3.2, 2.2, 2.6];
  const hearts = ["❤️", "💖", "💗", "💕", "✨", "🌟"];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-lg sm:text-2xl"
          initial={{ opacity: 0, x: "50%", y: "50%", scale: 0 }}
          animate={{ opacity: [0, 1, 0], x: pos.x, y: pos.y, scale: [0, 1.5, 0] }}
          transition={{ duration: durations[i], delay: delays[i], ease: "easeOut" }}
        >
          {hearts[i % hearts.length]}
        </motion.div>
      ))}
    </div>
  );
}

export function SurpriseSection() {
  const [phase, setPhase] = useState<"idle" | "loading" | "revealed">("idle");
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  function handleReveal() {
    setPhase("loading");

    setTimeout(() => {
      setPhase("revealed");
      setConfettiTrigger((prev) => prev + 1);
    }, 1500);
  }

  return (
    <section id="surprise" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <ConfettiEffect trigger={confettiTrigger > 0} />

      <div className="mx-auto max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RevealOnScroll>
                <h2 className="mb-8 text-2xl font-light text-white/80 sm:text-3xl">
                  Готова к сюрпризу?
                </h2>
              </RevealOnScroll>

              <InteractiveButton size="lg" magnetic onClick={handleReveal}>
                {content.surprise.buttonText}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </InteractiveButton>
            </motion.div>
          )}

          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="h-12 w-12 rounded-full border-2 border-rose-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-sm text-rose-300/80">
                {content.surprise.loadingText}
              </p>
            </motion.div>
          )}

          {phase === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <HeartParticles />

              <div className="glass-strong relative z-10 mx-auto max-w-lg rounded-3xl p-8 sm:p-12">
                <motion.div
                  className="mb-6 text-5xl sm:text-6xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {content.surprise.revealTitle}
                </motion.div>

                <p className="text-base leading-relaxed text-white/80 sm:text-lg">
                  <TypewriterText text={content.surprise.revealMessage} speed={25} />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}