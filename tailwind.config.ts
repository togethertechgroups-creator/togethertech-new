import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brandGreen: "#70B33F",
        brandGreenHover: "#5c9930",
        brandGreenLight: "#f0fdf4",
        brandDark: "#0f172a",
        brandLight: "#ffffff",
        brandGray: "#64748b",
        brandBorder: "#e2e8f0",
        // Temporary aliases to avoid visual breaks
        brandBlue: "#0f172a",
        brandOrange: "#70B33F",
        brandPlatinum: "#f8fafc",
        brandDarkCard: "#ffffff",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        hoshiko: ["var(--font-hoshiko)", "sans-serif"],
        eternalo: ["var(--font-eternalo)", "sans-serif"],
        rustic: ["var(--font-rustic)", "sans-serif"],
        neogen: ["var(--font-neogen)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

