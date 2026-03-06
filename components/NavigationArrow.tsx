"use client";

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
 
};

const NavigationArrow = ({
  direction,
  onClick,
  disabled,
  className,
 
}: NavigationArrowProps) => {
  const isLeft = direction === "left";
  const Icon = isLeft ? ArrowBigLeftDashIcon : ArrowBigRightDashIcon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous item" : "Next item"}
      className={cn(
        "z-50 flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none bg-primary/80 hover:bg-primary text-secondary rounded-full p-2",
    
        className // Specific positioning passed from parent
      )}
    >
      <Icon className="size-8 lg:size:10 xl:size-11" strokeWidth={1.5} />
    </button>
  );
};

export default NavigationArrow;