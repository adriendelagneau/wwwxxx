"use client";

import { useResponsiveStore } from "@/store/useResponsiveStore";
import gsap from "gsap";
import { useLayoutEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" ;

const BREAKPOINTS = {
  xs: "(max-width: 639px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  xxl: "(min-width: 1536px)",
};

export function ResponsiveProvider() {
  const setBreakpoint = useResponsiveStore((s) => s.setBreakpoint);
  const setReady = useResponsiveStore((s) => s.setReady);
  const isReady = useResponsiveStore((s) => s.isReady);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Set initial breakpoint immediately on mount
    const width = window.innerWidth;
    let initialBreakpoint: Breakpoint = "xs";
    if (width >= 1536) initialBreakpoint = "xxl";
    else if (width >= 1280) initialBreakpoint = "xl";
    else if (width >= 1024) initialBreakpoint = "lg";
    else if (width >= 768) initialBreakpoint = "md";
    else if (width >= 640) initialBreakpoint = "sm";

    setBreakpoint(initialBreakpoint);
    setReady(true);

    const mm = gsap.matchMedia();

    mm.add(BREAKPOINTS, (context) => {
      const {  xs, sm, md, lg, xl, xxl } = context.conditions!;

      const current = xxl
        ? "xxl"
        : xl
          ? "xl"
          : lg
            ? "lg"
            : md
              ? "md"
              : sm
                ? "sm"
                : "xs";

      setBreakpoint(current);
      console.log(current, "screen size");
    });

    return () => mm.revert();
  }, [setBreakpoint, setReady]);

  return null;
}
