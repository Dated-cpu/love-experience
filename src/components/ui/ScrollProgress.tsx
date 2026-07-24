"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[9998] h-[2px] origin-left bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
}