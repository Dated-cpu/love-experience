"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  magnetic?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function InteractiveButton({
  children,
  className,
  variant = "primary",
  size = "md",
  glow = true,
  magnetic = false,
  onClick,
  disabled,
  type = "button",
}: InteractiveButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 15 });
  const springY = useSpring(y, { stiffness: 300, damping: 15 });

  function handleMouse(e: React.MouseEvent) {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2),
    );
    const maxDist = 150;
    const strength = Math.max(0, 1 - dist / maxDist);

    x.set((e.clientX - centerX) * strength * 0.4);
    y.set((e.clientY - centerY) * strength * 0.4);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <motion.button
        className={cn(
          "group relative overflow-hidden rounded-full font-medium transition-all duration-300",
          variant === "primary" &&
            "bg-gradient-to-r from-rose-500 to-purple-600 text-white",
          variant === "secondary" &&
            "glass-strong text-white hover:bg-white/20",
          variant === "ghost" && "text-rose-300 hover:text-rose-200",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-8 py-3 text-base",
          size === "lg" && "px-12 py-4 text-lg",
          glow && variant === "primary" && "shadow-lg shadow-rose-500/25",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        style={{ x: springX, y: springY }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-cursor="hover-button"
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        <motion.span
          className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={false}
        />

        {variant === "primary" && (
          <motion.span
            className="absolute inset-0 -z-10 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(244,63,94,0)",
                "0 0 0 8px rgba(244,63,94,0.1)",
                "0 0 0 0 rgba(244,63,94,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}