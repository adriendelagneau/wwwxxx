"use client";

import { useResponsiveStore } from "@/store/useResponsiveStore";
import gsap from "gsap";
import { useLayoutEffect } from "react";

const BREAKPOINTS = {
  sm: "(max-width: 639px)",
  md: "(min-width: 640px)",
  lg: "(min-width: 768px)",
  xl: "(min-width: 1024px)",
  xxl: "(min-width: 1280px)",
  xxxl: "(min-width: 1536px)",
};

export function ResponsiveProvider() {
  const setBreakpoint = useResponsiveStore((s) => s.setBreakpoint);
  const setReady = useResponsiveStore((s) => s.setReady);
  const isReady = useResponsiveStore((s) => s.isReady);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add(BREAKPOINTS, (context) => {
      const { sm, md, lg, xl, xxl, xxxl } = context.conditions!;

      const current = xxxl
        ? "xxxl"
        : xxl
          ? "xxl"
          : xl
            ? "xl"
            : lg
              ? "lg"
              : md
                ? "md"
                : "sm";

      setBreakpoint(current);
      // Only set ready on first call, not on every breakpoint change
      if (!isReady) {
        setReady(true);
      }
    });

    return () => mm.revert();
  }, [setBreakpoint, setReady, isReady]);

  return null;
}
