

import { cva, VariantProps } from "class-variance-authority";

import { BadgeProps } from "../components/atoms/Badge";
import { sizeWithHeightVariants } from "../tokens/base/base";
import { Choice, ChoiceValue } from "./choices";
import { ChoiceBadgeProps, SmartSlot } from "../components";



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
// BASE PROPS Type
// -----------------------------------------------------------------------------


// Same API Props for all Select components
export type BaseSelectOwnProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = {
  choices: Choice<_ChoiceValue>[]

  placeholder?: string
  groupLabels?: Record<string, string | React.ReactNode>

  // Redefine value/defaultValue/onValueChange to be able to infer the type of the value
  value?: _ChoiceValue
  defaultValue?: _ChoiceValue
  onValueChange?: (v: _ChoiceValue) => void


  // SmartSlot `choiceBadgeProps` - have lower priority override the choice.badgeProps
  // so use `overrideChoiceBadgeProps` to override everything
  overrideChoiceBadgeProps?: Partial<BadgeProps>
}
  & SmartSlot<ChoiceBadgeProps, "choiceBadge">  // { choiceBadge, choiceBadgeProps, ChoiceBadge }
  & VariantProps<typeof selectTriggerVariants>  // { size }


// -----------------------------------------------------------------------------
// STYLE & VARIANTS
// -----------------------------------------------------------------------------

export const selectBaseChoiceBadgeProps: Partial<BadgeProps> = {
  // size: "sm",
  surface: "text-accent",
  colorTheme: "high-contrast",
}

// Variants (aligned with Input.tsx)
export const selectTriggerVariants = cva(
  // Select-specific layout styles (added to surface "input" base)
  "inline-flex items-center justify-between gap-2 whitespace-nowrap " +
  /* Child icons */
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon-size])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground " +
  /* SelectValue child */
  "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
  {
    variants: {
      size: sizeWithHeightVariants,
    },
    defaultVariants: {
      size: "md",
    },
  }
)

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
