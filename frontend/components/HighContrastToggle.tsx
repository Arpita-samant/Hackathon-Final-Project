"use client";

import React, { useEffect } from "react";

export const HighContrastToggle: React.FC<any> = () => {
  useEffect(() => {
    // Clean up any residual high-contrast classes from root and localStorage
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("high-contrast");
      localStorage.removeItem("theme_high_contrast");
    }
  }, []);

  return null;
};
