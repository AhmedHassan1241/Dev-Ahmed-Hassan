import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        laravel: "#06B6D4",
        php: "#8B5CF6",
        violet: "#7C3AED",
        // Brighter slate for glassmorphism readability
        slate: {
          300: "#d4dde8",
          400: "#b2c2d4",
          500: "#8aaac2",
          600: "#5e7d99",
          700: "#3d5a72",
          800: "#1e3448",
          900: "#0f1f2e",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float 5s ease-in-out infinite",
        "float-2": "float 7s ease-in-out 1.5s infinite",
        "float-3": "float 6s ease-in-out 3s infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "text-gradient": "text-gradient 4s linear infinite alternate",
        "orb-1": "orb-1 22s ease-in-out infinite",
        "orb-2": "orb-2 28s ease-in-out infinite",
        "orb-3": "orb-3 19s ease-in-out infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "text-gradient": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "orb-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(70px, -50px) scale(1.1)" },
          "50%": { transform: "translate(-30px, -110px) scale(0.9)" },
          "75%": { transform: "translate(-70px, 35px) scale(1.05)" },
        },
        "orb-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-90px, 70px) scale(1.12)" },
          "66%": { transform: "translate(55px, -70px) scale(0.88)" },
        },
        "orb-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "40%": { transform: "translate(90px, 55px) scale(1.08)" },
          "80%": { transform: "translate(-55px, -35px) scale(0.92)" },
        },
        "border-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(6,182,212,0.3), 0 0 10px rgba(6,182,212,0.1)" },
          "50%": { boxShadow: "0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(6,182,212,0.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
