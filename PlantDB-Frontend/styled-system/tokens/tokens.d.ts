/* eslint-disable */
export type Token = "colors.primary" | "colors.secondary" | "colors.error" | "colors.red.300" | "colors.red.800" | "colors.green.300" | "colors.green.800" | "fontSizes.sm" | "fontSizes.md" | "fontSizes.lg" | "sizes.container" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "colors.colorPalette.300" | "colors.colorPalette.800"

export type ColorPalette = "red" | "green"

export type ColorToken = "primary" | "secondary" | "error" | "red.300" | "red.800" | "green.300" | "green.800" | "colorPalette.300" | "colorPalette.800"

export type FontSizeToken = "sm" | "md" | "lg"

export type SizeToken = "container" | "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type Tokens = {
		colors: ColorToken
		fontSizes: FontSizeToken
		sizes: SizeToken
		breakpoints: BreakpointToken
} & { [token: string]: never }

export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"