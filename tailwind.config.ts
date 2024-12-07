import type { Config } from "tailwindcss";

export default {
  content: [
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 색상 설정해주세요
      colors: {
        primary: "#9400FF",
        secondary: "#121212",
        gray1: "#D9D9D9",
        gray2: "#ffff50",
        gray3: "#ffffff38",
        gray4: "#ffffff05",
        error: "#ff0000",
        heart: "#ff0000",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
