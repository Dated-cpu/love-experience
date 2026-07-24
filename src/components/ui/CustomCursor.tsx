"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState } from "react";

type CursorVariant = "default" | "hover-card" | "hover-button" | "hover-heart" | "hidden";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const prefersReduced = useReducedMotion();
  const [variant, setVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const handleEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (target.dataset.cursor) {
        setVariant(target.dataset.cursor as CursorVariant);
      }
    };

    const handleLeave = () => setVariant("default");

    function attach(elements: NodeListOf<Element>) {
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    }

    function detach(elements: NodeListOf<Element>) {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    }

    const initial = document.querySelectorAll("[data-cursor]");
    attach(initial);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.dataset.cursor) {
              node.addEventListener("mouseenter", handleEnter);
              node.addEventListener("mouseleave", handleLeave);
            }
            const children = node.querySelectorAll("[data-cursor]");
            attach(children);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      detach(initial);
      observer.disconnect();
    };
  }, []);

  if (prefersReduced) return null;

  const size = variant === "default" ? 12 : variant === "hover-card" ? 60 : variant === "hover-button" ? 40 : 24;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] transition-all duration-200 ease-out"
        style={{
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
        }}
      >
        <div
          className={cn(
            "h-full w-full rounded-full transition-all duration-300",
            variant === "default" && "bg-rose-400/70",
            variant === "hover-card" && "border-2 border-rose-400 bg-rose-400/10",
            variant === "hover-button" && "border-2 border-purple-400 bg-purple-400/10",
            variant === "hover-heart" && "border-2 border-rose-300 bg-rose-300/20",
          )}
          style={{ transform: `scale(${variant === "default" ? 1 : 1.5})` }}
        />
      </div>
      <div
        className="pointer-events-none fixed z-[9998] transition-all duration-75"
        style={{ left: x - 2, top: y - 2, width: 4, height: 4 }}
      >
        <div className="h-full w-full rounded-full bg-rose-300" />
      </div>
    </>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}