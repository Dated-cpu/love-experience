"use client";

import { useEffect, useState } from "react";

function getInitialState(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(getInitialState);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange(e: MediaQueryListEvent) {
      setPrefersReduced(e.matches);
    }

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
}