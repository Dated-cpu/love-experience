"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
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
  ...props
}: InteractiveButtonProps) {
  return (
    <motion.button
      className={cn(
        "group relative overflow-hidden rounded-full font-medium transition-all duration-300",
        variant === "primary" &&
          "bg-gradient-to-r from-rose-500 to-purple-600 text-white",
        variant === "secondary" &&
          "glass-strong text-white hover:bg-white/20",
        variant === "ghost" &&
          "text-rose-300 hover:text-rose-200",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-8 py-3 text-base",
        size === "lg" && "px-12 py-4 text-lg",
        glow && variant === "primary" && "shadow-lg shadow-rose-500/25",
        className,
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="hover-button"
      {...props}
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
  );
}