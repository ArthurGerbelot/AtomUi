// ===========================================================================
// Display
// ===========================================================================

import { BooleanVariants, NumericalVariants, OmitableVariants } from "../base/base";

export const containerSizes = [
  '7xs', '6xs', '5xs', '4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',
] as const
export type ContainerSize = typeof containerSizes[number]

export const maxWidthVariants: Record<ContainerSize | "full", string> = {
  '7xs': "max-w-7xs",
  '6xs': "max-w-6xs",
  '5xs': "max-w-5xs",
  '4xs': "max-w-4xs",
  '3xs': "max-w-3xs",
  '2xs': "max-w-2xs",
  'xs': "max-w-xs",
  'sm': "max-w-sm",
  'md': "max-w-md",
  'lg': "max-w-lg",
  'xl': "max-w-xl",
  '2xl': "max-w-2xl",
  '3xl': "max-w-3xl",
  '4xl': "max-w-4xl",
  '5xl': "max-w-5xl",
  '6xl': "max-w-6xl",
  '7xl': "max-w-7xl",
  full: "max-w-full",
}


export const displays = [
  'inline',
  'block',
  'inline-block',
  'flow-root',
  'flex',
  'inline-flex',
  'grid',
  'inline-grid',
  'contents',
  'table',
  'inline-table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row-group',
  'table-row',
  'list-item',
  'hidden',
  'sr-only',
  'not-sr-only',
];
export type Display = typeof displays[number]
export const displayVariants: Record<Display, string> = {
  inline: "inline",
  block: "block",
  "inline-block": "inline-block",
  "flow-root": "flow-root",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
  "inline-grid": "inline-grid",
  contents: "contents",
  table: "table",
  "inline-table": "inline-table",
  "table-caption": "table-caption",
  "table-cell": "table-cell",
  "table-column": "table-column",
  "table-column-group": "table-column-group",
  "table-footer-group": "table-footer-group",
  "table-header-group": "table-header-group",
  "table-row-group": "table-row-group",
  "table-row": "table-row",
  "list-item": "list-item",
  hidden: "hidden",
  "sr-only": "sr-only",
  "not-sr-only": "not-sr-only",
}


// Boolean Display variants helpers

export type DisplayInline = BooleanVariants;
export const inlineVariants: Record<"true" | "false", string> = {
  true: "inline",
  false: "",
}
export type DisplayInlineBlock = BooleanVariants;
export const inlineBlockVariants: Record<"true" | "false", string> = {
  true: "inline-block",
  false: "",
}
export type DisplayBlock = BooleanVariants;
export const blockVariants: Record<"true" | "false", string> = {
  true: "block",
  false: "",
}
// No "flex" boolean for "display=flex"
// - Already used to flex-1, flex-2, etc..
// - Container will be set majorily by <Stack>, <HStack>, <VStack>, ... (or use display="flex")

// ===========================================================================
// Flex
// ===========================================================================

// "display=flex" and "flex" boolean helper already added by "display" section


// Flex children
// ---------------
// - "min-w-0" is used to avoid the flex child to shrink to 0 width
//      (Example: a Fieldset with a too long Input will get out of the container without 'min-w-0')
export type Flex = BooleanVariants | NumericalVariants | "auto" | "none" | "initial";
export const flexVariants: Record<Exclude<Flex, OmitableVariants>, string> = {
  "true": "min-w-0 flex-1",
  "false": "",
  "_n": "min-w-0 flex-[var(--flex-numerical)]", // "_n" is used a "format" for ALL numeric keys
  "1": "min-w-0 flex-1",
  "2": "min-w-0 flex-2",
  "3": "min-w-0 flex-3",
  "4": "min-w-0 flex-4",  // Also provide most used variants
  "5": "min-w-0 flex-5",
  "6": "min-w-0 flex-6",
  "auto": "min-w-0 flex-auto",
  "none": "flex-none",
  "initial": "flex-initial",
}

export const flexDirections = ["row", "row-reverse", "column", "column-reverse"] as const
export type FlexDirection = typeof flexDirections[number]
export const flexDirectionVariants: Record<FlexDirection, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  column: "flex-col",
  "column-reverse": "flex-col-reverse",
}