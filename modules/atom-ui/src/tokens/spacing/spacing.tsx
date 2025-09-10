import { BooleanVariants, NumericalVariants, OmitableVariants, Size } from "../base/base";

// Gap
// ------------------------

// Only both axis.
// For special case with one axis, use "gap-x" or "gap-y"

export type Gap = BooleanVariants | NumericalVariants | Size | number;
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
  "_n": "gap-[calc(var(--spacing)*var(--gap-numerical))]", // "_n" is used a "format" for ALL numeric keys
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",  // Also provide most used variants
  "5": "gap-5",
  "6": "gap-6",
  "7": "gap-7",
  "8": "gap-8",
}

// Margin
// ------------------------

export type Margin = BooleanVariants | NumericalVariants | Size | number;
export const marginVariants: Record<Exclude<Margin, OmitableVariants>, string> = {
  true: "m-md",
  false: "m-0",

  // Alias
  "xs": "m-xs",
  "sm": "m-sm",
  "md": "m-md",
  "lg": "m-lg",
  "xl": "m-xl",

  // Numerical
  "_n": "m-[calc(var(--spacing)*var(--m-numerical))]",
  "1": "m-1",
  "2": "m-2",
  "3": "m-3",
  "4": "m-4",
  "5": "m-5",
  "6": "m-6",
  "7": "m-7",
  "8": "m-8",
}

// Margin X (left + right)
export type MarginX = BooleanVariants | NumericalVariants | Size | number;
export const marginXVariants: Record<Exclude<MarginX, OmitableVariants>, string> = {
  true: "mx-md",
  false: "mx-0",
  "xs": "mx-xs", "sm": "mx-sm", "md": "mx-md", "lg": "mx-lg", "xl": "mx-xl",
  "_n": "mx-[calc(var(--spacing)*var(--mx-numerical))]",
  "1": "mx-1", "2": "mx-2", "3": "mx-3", "4": "mx-4", "5": "mx-5", "6": "mx-6", "7": "mx-7", "8": "mx-8",
}

// Margin Y (top + bottom)
export type MarginY = BooleanVariants | NumericalVariants | Size | number;
export const marginYVariants: Record<Exclude<MarginY, OmitableVariants>, string> = {
  true: "my-md",
  false: "my-0",
  "xs": "my-xs", "sm": "my-sm", "md": "my-md", "lg": "my-lg", "xl": "my-xl",
  "_n": "my-[calc(var(--spacing)*var(--my-numerical))]",
  "1": "my-1", "2": "my-2", "3": "my-3", "4": "my-4", "5": "my-5", "6": "my-6", "7": "my-7", "8": "my-8",
}

// Margin Top
export type MarginT = BooleanVariants | NumericalVariants | Size | number;
export const marginTVariants: Record<Exclude<MarginT, OmitableVariants>, string> = {
  true: "mt-md",
  false: "mt-0",
  "xs": "mt-xs", "sm": "mt-sm", "md": "mt-md", "lg": "mt-lg", "xl": "mt-xl",
  "_n": "mt-[calc(var(--spacing)*var(--mt-numerical))]",
  "1": "mt-1", "2": "mt-2", "3": "mt-3", "4": "mt-4", "5": "mt-5", "6": "mt-6", "7": "mt-7", "8": "mt-8",
}

// Margin Right
export type MarginR = BooleanVariants | NumericalVariants | Size | number;
export const marginRVariants: Record<Exclude<MarginR, OmitableVariants>, string> = {
  true: "mr-md",
  false: "mr-0",
  "xs": "mr-xs", "sm": "mr-sm", "md": "mr-md", "lg": "mr-lg", "xl": "mr-xl",
  "_n": "mr-[calc(var(--spacing)*var(--mr-numerical))]",
  "1": "mr-1", "2": "mr-2", "3": "mr-3", "4": "mr-4", "5": "mr-5", "6": "mr-6", "7": "mr-7", "8": "mr-8",
}

// Margin Bottom
export type MarginB = BooleanVariants | NumericalVariants | Size | number;
export const marginBVariants: Record<Exclude<MarginB, OmitableVariants>, string> = {
  true: "mb-md",
  false: "mb-0",
  "xs": "mb-xs", "sm": "mb-sm", "md": "mb-md", "lg": "mb-lg", "xl": "mb-xl",
  "_n": "mb-[calc(var(--spacing)*var(--mb-numerical))]",
  "1": "mb-1", "2": "mb-2", "3": "mb-3", "4": "mb-4", "5": "mb-5", "6": "mb-6", "7": "mb-7", "8": "mb-8",
}

// Margin Left
export type MarginL = BooleanVariants | NumericalVariants | Size | number;
export const marginLVariants: Record<Exclude<MarginL, OmitableVariants>, string> = {
  true: "ml-md",
  false: "ml-0",
  "xs": "ml-xs", "sm": "ml-sm", "md": "ml-md", "lg": "ml-lg", "xl": "ml-xl",
  "_n": "ml-[calc(var(--spacing)*var(--ml-numerical))]",
  "1": "ml-1", "2": "ml-2", "3": "ml-3", "4": "ml-4", "5": "ml-5", "6": "ml-6", "7": "ml-7", "8": "ml-8",
}

// Padding
// ------------------------

export type Padding = BooleanVariants | NumericalVariants | Size | number;
export const paddingVariants: Record<Exclude<Padding, OmitableVariants>, string> = {
  true: "p-md",
  false: "p-0",

  // Alias
  "xs": "p-xs",
  "sm": "p-sm",
  "md": "p-md",
  "lg": "p-lg",
  "xl": "p-xl",

  // Numerical
  "_n": "p-[calc(var(--spacing)*var(--p-numerical))]",
  "1": "p-1",
  "2": "p-2",
  "3": "p-3",
  "4": "p-4",
  "5": "p-5",
  "6": "p-6",
  "7": "p-7",
  "8": "p-8",
}

// Padding X (left + right)
export type PaddingX = BooleanVariants | NumericalVariants | Size | number;
export const paddingXVariants: Record<Exclude<PaddingX, OmitableVariants>, string> = {
  true: "px-md",
  false: "px-0",
  "xs": "px-xs", "sm": "px-sm", "md": "px-md", "lg": "px-lg", "xl": "px-xl",
  "_n": "px-[calc(var(--spacing)*var(--px-numerical))]",
  "1": "px-1", "2": "px-2", "3": "px-3", "4": "px-4", "5": "px-5", "6": "px-6", "7": "px-7", "8": "px-8",
}

// Padding Y (top + bottom)
export type PaddingY = BooleanVariants | NumericalVariants | Size | number;
export const paddingYVariants: Record<Exclude<PaddingY, OmitableVariants>, string> = {
  true: "py-md",
  false: "py-0",
  "xs": "py-xs", "sm": "py-sm", "md": "py-md", "lg": "py-lg", "xl": "py-xl",
  "_n": "py-[calc(var(--spacing)*var(--py-numerical))]",
  "1": "py-1", "2": "py-2", "3": "py-3", "4": "py-4", "5": "py-5", "6": "py-6", "7": "py-7", "8": "py-8",
}

// Padding Top
export type PaddingT = BooleanVariants | NumericalVariants | Size | number;
export const paddingTVariants: Record<Exclude<PaddingT, OmitableVariants>, string> = {
  true: "pt-md",
  false: "pt-0",
  "xs": "pt-xs", "sm": "pt-sm", "md": "pt-md", "lg": "pt-lg", "xl": "pt-xl",
  "_n": "pt-[calc(var(--spacing)*var(--pt-numerical))]",
  "1": "pt-1", "2": "pt-2", "3": "pt-3", "4": "pt-4", "5": "pt-5", "6": "pt-6", "7": "pt-7", "8": "pt-8",
}

// Padding Right
export type PaddingR = BooleanVariants | NumericalVariants | Size | number;
export const paddingRVariants: Record<Exclude<PaddingR, OmitableVariants>, string> = {
  true: "pr-md",
  false: "pr-0",
  "xs": "pr-xs", "sm": "pr-sm", "md": "pr-md", "lg": "pr-lg", "xl": "pr-xl",
  "_n": "pr-[calc(var(--spacing)*var(--pr-numerical))]",
  "1": "pr-1", "2": "pr-2", "3": "pr-3", "4": "pr-4", "5": "pr-5", "6": "pr-6", "7": "pr-7", "8": "pr-8",
}

// Padding Bottom
export type PaddingB = BooleanVariants | NumericalVariants | Size | number;
export const paddingBVariants: Record<Exclude<PaddingB, OmitableVariants>, string> = {
  true: "pb-md",
  false: "pb-0",
  "xs": "pb-xs", "sm": "pb-sm", "md": "pb-md", "lg": "pb-lg", "xl": "pb-xl",
  "_n": "pb-[calc(var(--spacing)*var(--pb-numerical))]",
  "1": "pb-1", "2": "pb-2", "3": "pb-3", "4": "pb-4", "5": "pb-5", "6": "pb-6", "7": "pb-7", "8": "pb-8",
}

// Padding Left
export type PaddingL = BooleanVariants | NumericalVariants | Size | number;
export const paddingLVariants: Record<Exclude<PaddingL, OmitableVariants>, string> = {
  true: "pl-md",
  false: "pl-0",
  "xs": "pl-xs", "sm": "pl-sm", "md": "pl-md", "lg": "pl-lg", "xl": "pl-xl",
  "_n": "pl-[calc(var(--spacing)*var(--pl-numerical))]",
  "1": "pl-1", "2": "pl-2", "3": "pl-3", "4": "pl-4", "5": "pl-5", "6": "pl-6", "7": "pl-7", "8": "pl-8",
}

// "Easy set 'nogap'"
export type NoGapBlock = BooleanVariants;
export const noGapVariants: Record<"true" | "false", string> = {
  true: "gap-0",
  false: "",
}