

import { cva } from "class-variance-authority";

import { BadgeProps } from "../components/atoms/Badge";
import { sizeWithHeightVariants } from "../tokens/base/base";



// -----------------------------------------------------------------------------
// Select Helpers
// -----------------------------------------------------------------------------
//
// Like a SelectBase (like Button)
//    But in this case SimpleSelect and Select
//    are composed by different Primtives
//
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// STYLE & VARIANTS
// -----------------------------------------------------------------------------

export const selectBaseChoiceBadgeProps: Partial<BadgeProps> = {
  // size: "sm",
  surface: "text-accent",
  colorTheme: "high-contrast",
}

// Variants (aligned with Input.tsx)
export const selectTriggerVariants = cva("", {
  variants: {
    size: sizeWithHeightVariants,
  },
  defaultVariants: {
    size: "md",
  },
})

// -----------------------------------------------------------------------------
// HELPERS FUNCTIONS
// -----------------------------------------------------------------------------


export const selectFilterDefault = (value: string, search: string, keywords?: string[]) => {
  const haystack = (value + ' ' + (keywords?.join(' ') ?? '')).toLowerCase()
  const q = search.trim().toLowerCase()
  if (!q) return 1
  if (haystack.includes(q)) return 1
  return 0
}
