"use client";

import { InteractiveButton } from "@/components/ui/InteractiveButton";
import { content } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

function FloatingOrb({ index }: { index: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute rounded-full opacity-20 blur-3xl"
      style={{
        width: 200 + index * 100,
        height: 200 + index * 100,
        background:
          index % 2 === 0
            ? "radial-gradient(circle, rgba(244,63,94,0.3), transparent)"
            : "radial-gradient(circle, rgba(168,85,247,0.3), transparent)",
      }}
      animate={
        prefersReduced
          ? {}
          : {
              x: [0, 30 - index * 15, 0],
              y: [0, -20 - index * 10, 0],
              scale: [1, 1.1, 1],
            }
      }
      transition={{
        duration: 6 + index * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5,
      }}
      aria-hidden="true"
    />
  );
}

function SplitText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[600px] w-[600px] sm:h-[800px] sm:w-[800px]">
          <FloatingOrb index={0} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FloatingOrb index={1} />
          </div>
          <div className="absolute right-0 top-1/3">
            <FloatingOrb index={2} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-sm tracking-[0.3em] uppercase text-rose-300/80 sm:text-base"
        >
          {content.hero.greeting}
        </motion.p>

        <h1 className="mb-4 font-serif text-5xl leading-tight sm:text-7xl md:text-8xl lg:text-9xl">
          {content.hero.title}{" "}
          <span className="text-gradient block sm:inline">
            <SplitText text={content.hero.highlight} delay={0.6} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-6 text-lg text-white/60 sm:text-xl md:text-2xl"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mx-auto mb-12 max-w-xl text-sm leading-relaxed text-white/40 sm:text-base"
        >
          {content.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <InteractiveButton
            size="lg"
            magnetic
            onClick={() => {
              document
                .getElementById("gallery")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Начать путешествие
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </InteractiveButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="h-6 w-6 text-rose-400/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 5v14m0 0l-6-6m6 6l6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      </motion.div>
    </section>
  );
}