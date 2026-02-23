import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./view/**/*.{ts,tsx}",
    "./layout/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        cairo: ["var(--font-ibm)"],
      },
      colors: {
        natural: {
          DEFAULT: "#dedede",
          active: "rgba(0, 0, 0, .5)",
          dark: "#131516",
        },
        primary: {
          DEFAULT: "#b16950",
          active: "#b16950",
        },
        secondary: {
          DEFAULT: "#dedede",
          dark: "#dedede",
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "200px" },
        },
        "accordion-up": {
          from: { height: "200px" }, // Replace "200px" with the actual value of --radix-accordion-content-height
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
