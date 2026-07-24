"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "gallery", label: "Воспоминания" },
  { id: "timeline", label: "Моменты" },
  { id: "reasons", label: "Причины" },
  { id: "surprise", label: "Сюрприз" },
  { id: "final", label: "Финал" },
];

export function NavigationDots() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      aria-label="Навигация по секциям"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          className="group relative flex h-6 w-6 items-center justify-center"
          onClick={() => {
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label={`Перейти к разделу ${section.label}`}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              active === section.id
                ? "w-3 bg-rose-400 shadow-lg shadow-rose-500/50"
                : "bg-white/20 group-hover:bg-white/40",
            )}
          />
          <span className="absolute right-8 whitespace-nowrap rounded-md bg-white/10 px-2 py-1 text-xs text-white/60 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}