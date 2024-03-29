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

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: "rgb(53, 53, 54)" },
          secondary: { value: "rgb(207, 252, 229)" },
          error: { value: "rgb(255, 138, 112)" }
        }
      }
    }
  },

  // The output directory for your css system
  outdir: "styled-system"
});