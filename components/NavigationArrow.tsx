"use client";

import React from "react";
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper to merge tailwind classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type NavigationArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  className?: string; // For custom positioning
  variant?: "solid" | "ghost" | "outline"; 
};

const NavigationArrow = ({
  direction,
  onClick,
  disabled,
  className,
  variant = "ghost",
}: NavigationArrowProps) => {
  const isLeft = direction === "left";
  const Icon = isLeft ? ArrowBigLeftDashIcon : ArrowBigRightDashIcon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous item" : "Next item"}
      className={cn(
        "z-50 flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none",
        // Default Styles
        variant === "ghost" && "bg-secondary/20 hover:bg-secondary/40 text-secondary rounded-full p-4",
        variant === "solid" && "bg-secondary text-white rounded-lg p-3 shadow-lg",
        className // Specific positioning passed from parent
      )}
    >
      <Icon size={40} strokeWidth={1.5} />
    </button>
  );
};

export default NavigationArrow;