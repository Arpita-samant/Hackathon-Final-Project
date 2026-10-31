/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#104E8B",   // Deep Trust Blue (Primary)
          secondary: "#1E7E34", // Vibrant Foliage Green (Secondary)
          accent: "#2BB656",    // Emerald Leaf (Accent / Hover)
          deep: "#0A2540",      // Midnight Navy (Deep Accent)
        },
        gov: {
          blue: "#104E8B",      // Deep Trust Blue (Primary Brand)
          navy: "#0A2540",      // Midnight Navy (Deep Accent / Headers / Footer)
          light: "#F0F7FF",     // Soft Trust Blue background tint
          green: "#1E7E34",     // Vibrant Foliage Green (Secondary)
          accent: "#2BB656",    // Emerald Leaf (Hover & Highlights)
          orange: "#E99A28",    // Warning Amber/Orange
          red: "#DC3545",       // Danger / Scam Red
          slate: "#374151",     // Dark Neutral
          border: "#D1D5DB",    // Subtle borders
          saffron: "#FF9933",   // Indian Tiranga Saffron
        }
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        hindi: ["Noto Sans Devanagari", "Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
