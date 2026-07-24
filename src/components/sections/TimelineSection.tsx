"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { content } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function TimelineEvent({
  event,
  index,
}: {
  event: (typeof content.timeline.events)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-12 sm:mb-16">
      <div
        className={`flex flex-col items-center sm:flex-row ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
      >
        <div className={`w-full sm:w-1/2 ${isLeft ? "sm:pr-12" : "sm:pl-12"}`}>
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: isLeft ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <span className="mb-2 inline-block text-xs tracking-wider uppercase text-rose-400/80">
              {event.date}
            </span>

            <h3 className="mb-2 text-xl font-semibold text-white sm:text-2xl">
              {event.title}
            </h3>

            <p className="mb-4 text-sm leading-relaxed text-white/60 sm:text-base">
              {event.description}
            </p>

            <span className="inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-300">
              {event.emotion}
            </span>
          </motion.div>
        </div>

        <div className="flex w-full items-center justify-center sm:w-0">
          <motion.div
            initial={prefersReduced ? { scale: 1 } : { scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
            className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-rose-500 bg-[#0a0a0f] sm:h-10 sm:w-10"
          >
            <div className="h-2 w-2 rounded-full bg-rose-500 sm:h-3 sm:w-3" />
          </motion.div>
        </div>

        <div className="hidden w-1/2 sm:block" />
      </div>
    </div>
  );
}

export function TimelineSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll>
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-light sm:text-4xl md:text-5xl">
              <span className="text-gradient">{content.timeline.title}</span>
            </h2>
            <p className="text-sm text-white/50 sm:text-base">
              {content.timeline.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-rose-500/0 via-rose-500/30 to-rose-500/0"
            initial={prefersReduced ? { opacity: 1 } : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          {content.timeline.events.map((event, index) => (
            <TimelineEvent key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}