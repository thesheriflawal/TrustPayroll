import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        slate: {
          1: "rgb(var(--slate-1) / <alpha-value>)",
          2: "rgb(var(--slate-2) / <alpha-value>)",
          3: "rgb(var(--slate-3) / <alpha-value>)",
          4: "rgb(var(--slate-4) / <alpha-value>)",
          5: "rgb(var(--slate-5) / <alpha-value>)",
          6: "rgb(var(--slate-6) / <alpha-value>)",
          7: "rgb(var(--slate-7) / <alpha-value>)",
          8: "rgb(var(--slate-8) / <alpha-value>)",
          9: "rgb(var(--slate-9) / <alpha-value>)",
          10: "rgb(var(--slate-10) / <alpha-value>)",
          11: "rgb(var(--slate-11) / <alpha-value>)",
          12: "rgb(var(--slate-12) / <alpha-value>)",
        },
        gray: {
          1: "rgb(var(--gray-1) / <alpha-value>)",
          2: "rgb(var(--gray-2) / <alpha-value>)",
          3: "rgb(var(--gray-3) / <alpha-value>)",
          4: "rgb(var(--gray-4) / <alpha-value>)",
          5: "rgb(var(--gray-5) / <alpha-value>)",
          6: "rgb(var(--gray-6) / <alpha-value>)",
          7: "rgb(var(--gray-7) / <alpha-value>)",
          8: "rgb(var(--gray-8) / <alpha-value>)",
          9: "rgb(var(--gray-9) / <alpha-value>)",
          10: "rgb(var(--gray-10) / <alpha-value>)",
          11: "rgb(var(--gray-11) / <alpha-value>)",
          12: "rgb(var(--gray-12) / <alpha-value>)",
        },
        white: "#ffffff",
        black: "#000000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
