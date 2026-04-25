import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: "#00d9ff", soft: "#5fe7ff" },
        warm: "#ff7a45",
        bg: { DEFAULT: "#000000", soft: "#0a0a0a", card: "#0f0f10" },
      },
      fontFamily: {
        sans: ["var(--font-comfortaa)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-jetbrains)", "ui-monospace"],
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        "spin-rev": { to: { transform: "rotate(-360deg)" } },
        pulse: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".4" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "orbit-slow": "spin 60s linear infinite",
        "orbit-med": "spin-rev 45s linear infinite",
        "orbit-fast": "spin 30s linear infinite",
        float: "float 4s ease-in-out infinite",
        fadeUp: "fadeUp .6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
