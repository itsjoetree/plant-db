import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  "html, body": {
    backgroundColor: "rgb(73, 73, 74)",
    color: "secondary"
  }
});

export default defineConfig({
  globalCss,

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}",],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        primary: { value: "rgb(53, 53, 54)" },
        secondary: { value: "rgb(207, 252, 229)" },
        error: { value: "rgb(255, 138, 112)" },
        red: { 300: { value: "#fca5a5" }, 800: { value: "#991b1b" } },
        green: { 300: { value: "#86efac" }, 800: { value: "#166534" } },
      },
      fontSizes: {
        "sm": { value: "1.5rem" },
        "md": { value: "2.5rem" },
        "lg": { value: "4rem" }
      },
      sizes: {
        "container": { value: "65rem" }
      }
    },
    extend: {}
  },

  // The output directory for your css system
  outdir: "styled-system"
});