import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./api/**/*.{js,ts,jsx,tsx,mdx}",
    "./model/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#121212",
        primary: "#9400FF",
        secondary: "#121212",
        sidebar: "#1D1D1D",
        gray: "#D9D9D9",
        divider: "#8E8E8E",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      spacing: {
        sidelistTop: "71px",
        mainTop: "91px",
        mainLeft: "102px",
      },
      width: {
        sideOpen: "220px",
        sideClose: "96px",
      },
      animation: {
        marquee: "marquee 15s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
