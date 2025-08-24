
// Color Scheme
// ===========================================================================

export const colorThemes = [
  // Custom colors
  "brand", "full-contrast", "high-contrast", "low-contrast", "light", "success", "warning", "error", "info", "destructive", "bitcoin", "lightning", "liquid", "fiat", "muted",
  // Tailwind colors (500 variants)
  "slate", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
  // Theme colors
  "foreground", "background", "white", "black",
  // Inverse theme colors
  "foreground-inverse", "background-inverse"
] as const
export type ColorTheme = typeof colorThemes[number]




// To add new colors:
// -----------------------------------------------------------------------------
// - Add token value here
// - Add CSS values triplets in colors.theme.css + .dark + @theme
// - Create alias for text in textColorVariants on typo/typo.tsx
// - Create alias for bg and border in bgColorVariants and borderColorVariants on surface/surface.tsx
// - Add color in getPrimaryColorStyle in lib/core/colors.ts