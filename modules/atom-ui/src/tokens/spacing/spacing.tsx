import { BooleanVariants, NumericalVariants, OmitableVariants, Size } from "../base/base";

// Gap
// ------------------------

// Only both axis.
// For secial case with one axis, use "gap-x" or "gap-y"

export type Gap = BooleanVariants | NumericalVariants | Size;
export const gapVariants: Record<Exclude<Gap, OmitableVariants>, string> = {
  true: "gap-md",
  false: "gap-0",

  // Alias
  "xs": "gap-xs",
  "sm": "gap-sm",
  "md": "gap-md",
  "lg": "gap-lg",
  "xl": "gap-xl",

  // Numerical
  "_n": "gap-[var(--gap-numerical)]", // "_n" is used a "format" for ALL numeric keys
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",  // Also provide most used variants
  "5": "gap-5",
  "6": "gap-6",
  "7": "gap-7",
  "8": "gap-8",
}

// "Easy set 'nogap'"
export type NoGapBlock = BooleanVariants;
export const noGapVariants: Record<"true" | "false", string> = {
  true: "gap-0",
  false: "",
}