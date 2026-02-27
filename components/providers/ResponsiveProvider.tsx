"use client";

import { useResponsiveStore } from "@/store/useZuStore";
import gsap from "gsap";
import { useLayoutEffect } from "react";

const BREAKPOINTS = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  xxl: "(min-width: 1536px)",
  isMobile: "(max-width: 639px)",
};

export function ResponsiveProvider() {
  const setBreakpoint = useResponsiveStore((s) => s.setBreakpoint);
  const setReady = useResponsiveStore((s) => s.setReady);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add(BREAKPOINTS, (context) => {
      const { sm, md, lg, xl, xxl } = context.conditions!;

      const current =
        xxl ? "xxl" :
        xl ? "xl" :
        lg ? "lg" :
        md ? "md" :
        sm ? "sm" :
        "isMobile";

      setBreakpoint(current);
      setReady(true);
    });

    return () => mm.revert();
  }, [setBreakpoint, setReady]);

  return null;
}