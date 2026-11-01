import type { Config } from "tailwindcss";

/**
 * HR Learning Zone — design system.
 * The palette follows a deliberate 70 / 20 / 10 split:
 *   70% → neutral canvas + typography (the quiet majority)
 *   20% → brand family (deep indigo → violet): structure, identity, navigation state
 *   10% → accent family (amber / lime / rose): calls to action, XP, streaks, celebrations
 * Never let brand or accent exceed their share — that is what keeps the UI premium.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // non-default alpha steps used across the UI (8, 12, 15, 35, 65, 85 …)
      opacity: { 8: "0.08", 12: "0.12", 15: "0.15", 35: "0.35", 45: "0.45", 65: "0.65", 85: "0.85" },
      colors: {
        // ---- 70% neutral ----
        canvas: "#080A0F",
        surface: {
          DEFAULT: "#0E1118",
          2: "#141926",
          3: "#1B2231",
        },
        line: "rgba(148,163,184,0.14)",
        ink: {
          DEFAULT: "#E8ECF5",
          muted: "#98A2B8",
          faint: "#667089",
        },
        // ---- 20% brand ----
        brand: {
          50: "#EEF0FF",
          200: "#C3C8FF",
          300: "#A5ACFF",
          400: "#8A8CFF",
          500: "#6D6AF7",
          600: "#5A4FE0",
          700: "#4A3FB8",
          900: "#241C5C",
        },
        // ---- 10% accent ----
        accent: {
          lime: "#B7F25C",
          amber: "#FFC24B",
          rose: "#FF7A8A",
          cyan: "#5EE7F0",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(138,140,255,0.20), 0 18px 50px -18px rgba(109,106,247,0.55)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -32px rgba(0,0,0,0.9)",
        accent: "0 12px 40px -14px rgba(183,242,92,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(183,242,92,0.45)" },
          "100%": { boxShadow: "0 0 0 18px rgba(183,242,92,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "pop-in": "pop-in 0.28s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2s infinite",
        "pulse-ring": "pulse-ring 1.4s ease-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
