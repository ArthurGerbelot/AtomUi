

import { cva, VariantProps } from "class-variance-authority";

//
//
// IN CASE OF CONFLICT (example gap-md then gap-0)
// USE extendTailwindMerge on tailwind-utils.ts
//
//

// Base
import {
  BooleanVariants,
  sizeVariants
} from "./base/base";

// Colors
import {
  colorThemes,
} from "./colors/colors";

// Typo
import {
  familyVariants, leadingVariants, textColorVariants, textVariants, trackingVariants, Truncate, truncateVariants, typoVariants, Underline, underlineVariants, weightVariants, Italic, italicVariants,
  ellipsisVariants,
} from "./typo/typo";

// Layout
import {
  displayVariants, blockVariants, inlineBlockVariants, inlineVariants,
  flexVariants, flexDirectionVariants, Flex,
  maxWidthVariants,
} from "./layout/layout";

// Spacing
import {
  gapVariants, Gap,
  noGapVariants,
  marginVariants, marginXVariants, marginYVariants, marginTVariants, marginRVariants, marginBVariants, marginLVariants,
  paddingVariants, paddingXVariants, paddingYVariants, paddingTVariants, paddingRVariants, paddingBVariants, paddingLVariants,
  Margin, MarginX, MarginY, MarginT, MarginR, MarginB, MarginL,
  Padding, PaddingX, PaddingY, PaddingT, PaddingR, PaddingB, PaddingL,
} from "./spacing/spacing";


// Surface
import {
  bgColorVariants, borderColorVariants,
  radiusVariants,
  shadowVariants,
  surfaceVariants,
} from "./surface/surface";



// ===========================================================================
// Atomics tokens
// ===========================================================================


// ORDERED TOKENS
// --------------

// In tailwind, the last token always wins. Whatever, it's an @apply composed of multiple classes (resolved like the list of classes)
//    The order is important !
//
// THIS IS THE WAY TO MANAGE TOKENS ORDER !
// For example :
//     typo is a composed of size, fontWeight, fontFamily, and typo.
//     it need to to be resolved first, so we could override only one of the tokens. (example typo="body" size="lg")

export const tokens: Record<string, readonly string[]> = {
  colorThemes: colorThemes,
}

export const atomicVariantsTokens = [
  // Theme Color (primary CSS var ..)
  'colorTheme',

  // Base
  'size',
  // Typography
  'textColor', 'textSize', 'leading', 'tracking', 'weight', 'family', 'typo',
  // Layout
  'maxW', 'display', 'flexDirection',    // Parent
  'flex',       // Child
  // Spacing
  'gap', 'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl',
  // Surface
  'surface', 'bgColor', 'borderColor', 'shadow', 'radius',
  //...
] as const

export const atomicBooleanTokens = [
  // Typography
  'truncate', 'ellipsis', 'underline', 'italic',
  // Layout
  'inline', 'inlineBlock', 'block',
  // Spacing
  'noGap',
] as const

export const atomicTokens = [
  ...atomicVariantsTokens,
  ...atomicBooleanTokens,
] as const

export type AtomicToken = typeof atomicTokens[number]


export const atomicVariants = {
  // Base
  // --------------
  size: sizeVariants,

  // Typo
  // --------------
  typo: typoVariants,

  textColor: textColorVariants,
  textSize: textVariants,
  leading: leadingVariants,
  tracking: trackingVariants,
  weight: weightVariants,
  family: familyVariants,

  truncate: truncateVariants,
  ellipsis: ellipsisVariants,
  underline: underlineVariants,
  italic: italicVariants,

  // layout
  // --------------
  maxW: maxWidthVariants,

  display: displayVariants,
  inline: inlineVariants,
  inlineBlock: inlineBlockVariants,
  block: blockVariants,

  flex: flexVariants,
  flexDirection: flexDirectionVariants,

  // Spacing
  // --------------
  gap: gapVariants,
  noGap: noGapVariants,

  // Margin
  m: marginVariants,
  mx: marginXVariants,
  my: marginYVariants,
  mt: marginTVariants,
  mr: marginRVariants,
  mb: marginBVariants,
  ml: marginLVariants,

  // Padding
  p: paddingVariants,
  px: paddingXVariants,
  py: paddingYVariants,
  pt: paddingTVariants,
  pr: paddingRVariants,
  pb: paddingBVariants,
  pl: paddingLVariants,

  // Surface
  // --------------
  bgColor: bgColorVariants,
  borderColor: borderColorVariants,

  shadow: shadowVariants,
  radius: radiusVariants,

  surface: surfaceVariants,
};

export const atomicRecipe = cva("", { variants: atomicVariants });


// Later find a way to override the AtomicTokenProps with boolean and numerical variants (trucate, underline, gap, etc..)
export type AtomicTokenProps = Omit<VariantProps<typeof atomicRecipe>,
  "flex" | "gap" | "m" | "mx" | "my" | "mt" | "mr" | "mb" | "ml" | "p" | "px" | "py" | "pt" | "pr" | "pb" | "pl"
> & {
  [key in typeof atomicBooleanTokens[number]]?: BooleanVariants
} & {
  flex?: Omit<Flex, "_n">, // flex is boolean and numerical (+ _n) variants
  gap?: Gap,
  m?: Margin, mx?: MarginX, my?: MarginY, mt?: MarginT, mr?: MarginR, mb?: MarginB, ml?: MarginL,
  p?: Padding, px?: PaddingX, py?: PaddingY, pt?: PaddingT, pr?: PaddingR, pb?: PaddingB, pl?: PaddingL,
};