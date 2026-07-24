"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { content } from "@/data/content";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

function TiltCard({
  item,
  index,
}: {
  item: (typeof content.gallery.items)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX((y - centerY) / centerY * -10);
    setRotateY((x - centerX) / centerX * 10);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  }

  function handleLeave() {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  }

  return (
    <RevealOnScroll delay={index * 0.15}>
      <div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        data-cursor="hover-card"
        className="group perspective-[1000px]"
      >
        <motion.div
          className="relative cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <GlassCard glow="rose" className="relative overflow-hidden p-6 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(244,63,94,0.15), transparent 60%)`,
              }}
            />

            <div className="relative z-10">
              <div className="mb-4 text-4xl">{item.emoji}</div>

              <h3
                className={`mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-2xl font-bold text-transparent sm:text-3xl`}
              >
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                {item.description}
              </p>
            </div>

            <div
              className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-150`}
            />
          </GlassCard>
        </motion.div>
      </div>
    </RevealOnScroll>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-light sm:text-4xl md:text-5xl">
              <span className="text-gradient">{content.gallery.title}</span>
            </h2>
            <p className="text-sm text-white/50 sm:text-base">
              {content.gallery.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2">
          {content.gallery.items.map((item, index) => (
            <TiltCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}