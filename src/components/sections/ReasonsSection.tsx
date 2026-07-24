"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { content } from "@/data/content";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function ReasonCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof content.reasons.items)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.div
        layout
        className="glass cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:glow-rose"
        onClick={onToggle}
        data-cursor="hover-card"
        initial={false}
      >
        <motion.div layout="position" className="p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                {item.title}
              </h3>
              <p className="text-sm text-white/50">{item.preview}</p>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5"
            >
              <svg
                className="h-4 w-4 text-rose-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.p
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="pt-4 text-sm leading-relaxed text-white/70 sm:text-base"
                >
                  {item.fullText}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="h-1 bg-gradient-to-r from-rose-500 to-purple-600"
          initial={{ width: "0%" }}
          animate={{ width: isOpen ? "100%" : "0%" }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </RevealOnScroll>
  );
}

export function ReasonsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="reasons" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-light sm:text-4xl md:text-5xl">
              <span className="text-gradient">{content.reasons.title}</span>
            </h2>
            <p className="text-sm text-white/50 sm:text-base">
              {content.reasons.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-4">
          {content.reasons.items.map((item, index) => (
            <ReasonCard
              key={item.title}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}