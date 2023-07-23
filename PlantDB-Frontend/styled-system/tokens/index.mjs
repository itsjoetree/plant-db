const tokens = {
  "colors.primary": {
    "value": "rgb(53, 53, 54)",
    "variable": "var(--colors-primary)"
  },
  "colors.secondary": {
    "value": "rgb(207, 252, 229)",
    "variable": "var(--colors-secondary)"
  },
  "colors.error": {
    "value": "rgb(255, 138, 112)",
    "variable": "var(--colors-error)"
  },
  "colors.red.300": {
    "value": "#fca5a5",
    "variable": "var(--colors-red-300)"
  },
  "colors.red.800": {
    "value": "#991b1b",
    "variable": "var(--colors-red-800)"
  },
  "colors.green.300": {
    "value": "#86efac",
    "variable": "var(--colors-green-300)"
  },
  "colors.green.800": {
    "value": "#166534",
    "variable": "var(--colors-green-800)"
  },
  "fontSizes.sm": {
    "value": "1.5rem",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "2.5rem",
    "variable": "var(--font-sizes-md)"
  },
  "fontSizes.lg": {
    "value": "4rem",
    "variable": "var(--font-sizes-lg)"
  },
  "sizes.container": {
    "value": "65rem",
    "variable": "var(--sizes-container)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "colors.colorPalette.300": {
    "value": "var(--colors-color-palette-300)",
    "variable": "var(--colors-color-palette-300)"
  },
  "colors.colorPalette.800": {
    "value": "var(--colors-color-palette-800)",
    "variable": "var(--colors-color-palette-800)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar