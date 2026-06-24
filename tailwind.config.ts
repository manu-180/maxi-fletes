import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          300: "var(--brand-300)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
        },
        accent: {
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
        },
        safe: {
          50: "var(--safe-50)",
          500: "var(--safe-500)",
        },
        ink: "var(--ink)",
        line: "var(--line)",
        bg: {
          DEFAULT: "var(--bg)",
          soft: "var(--bg-soft)",
          warm: "var(--bg-warm)",
        },
        slate: {
          400: "var(--slate-400)",
          600: "var(--slate-600)",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32,0.72,0,1)",
        snappy: "cubic-bezier(0.4,0,0.2,1)",
        reveal: "cubic-bezier(0.16,1,0.3,1)",
      },
      animation: {
        "pulse-ring": "pulse-ring 2s ease-out 3",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(37,211,102,0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(37,211,102,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(37,211,102,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
