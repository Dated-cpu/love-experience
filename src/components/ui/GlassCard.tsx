"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "rose" | "purple" | "none";
  as?: "div" | "section" | "article";
}

export function GlassCard({
  className,
  children,
  glow = "none",
  as: Tag = "div",
  ...props
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-2xl transition-all duration-500",
        glow === "rose" && "hover:glow-rose",
        glow === "purple" && "hover:glow-purple",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}