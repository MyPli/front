import type { Config } from 'tailwindcss';
import scrollbarHide from 'tailwind-scrollbar-hide';

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
      colors: {
        black: "#121212",
        primary: "#9400FF",
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
				sideOpen: '220px',
				sideClose: '96px',
			},
		},
	},
	plugins: [scrollbarHide],
} satisfies Config;
