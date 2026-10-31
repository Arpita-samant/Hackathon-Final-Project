"use client";

import React, { useEffect, useState } from "react";
import { Contrast, Check } from "lucide-react";

interface HighContrastToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const HighContrastToggle: React.FC<HighContrastToggleProps> = ({
  className = "",
  showLabel = true,
}) => {
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize preference from localStorage or system media query
  useEffect(() => {
    setMounted(true);
    const storedPref = localStorage.getItem("theme_high_contrast");
    
    if (storedPref !== null) {
      const enabled = storedPref === "true";
      setIsHighContrast(enabled);
      applyHighContrast(enabled);
    } else {
      // Check system preference for high contrast
      const prefersHighContrast = window.matchMedia?.(
        "(prefers-contrast: more)"
      ).matches;
      if (prefersHighContrast) {
        setIsHighContrast(true);
        applyHighContrast(true);
      }
    }
  }, []);

  const applyHighContrast = (enabled: boolean) => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  };

  const toggleHighContrast = () => {
    const nextState = !isHighContrast;
    setIsHighContrast(nextState);
    applyHighContrast(nextState);
    localStorage.setItem("theme_high_contrast", String(nextState));
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-11 h-6 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {showLabel && (
        <span
          id="high-contrast-label"
          className="text-xs font-bold text-gray-700 flex items-center space-x-1.5 cursor-pointer"
          onClick={toggleHighContrast}
        >
          <Contrast className="w-4 h-4 text-gray-600 shrink-0" aria-hidden="true" />
          <span>High Contrast</span>
        </span>
      )}

      {/* Accessible WAI-ARIA Switch Toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={isHighContrast}
        aria-labelledby={showLabel ? "high-contrast-label" : undefined}
        aria-label={!showLabel ? "Toggle High Contrast Mode" : undefined}
        onClick={toggleHighContrast}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleHighContrast();
          }
        }}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFF00] focus-visible:ring-offset-2 ${
          isHighContrast ? "bg-[#000000] border-[#FFFFFF]" : "bg-gray-300"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isHighContrast
              ? "translate-x-5 bg-[#FFFF00] text-[#000000]"
              : "translate-x-0 bg-white text-gray-400"
          }`}
        >
          {isHighContrast && <Check className="w-3 h-3 stroke-[3]" />}
        </span>
      </button>
    </div>
  );
};

export default HighContrastToggle;
