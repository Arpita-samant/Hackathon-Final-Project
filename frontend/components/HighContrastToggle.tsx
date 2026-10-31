"use client";

import React, { useEffect } from "react";

export const HighContrastToggle: React.FC<any> = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("high-contrast");
      localStorage.removeItem("theme_high_contrast");
    }
  }, []);

  return null;
};

export default HighContrastToggle;
