
import { BooleanVariants, sizes } from "../base/base";
import { ColorTheme } from "../colors/colors";

// ===========================================================================
// Typography
// ===========================================================================


export const textSizes = [
  ...sizes, '2xl', '3xl', '4xl', '5xl',
] as const
export type TextSize = typeof textSizes[number]
export const textVariants: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

export const leadingValues = ["tight", "snug", "normal", "relaxed", "loose"] as const
export type Leading = typeof leadingValues[number]
export const leadingVariants: Record<Leading, string> = {
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
}

export const trackingValues = ["tighter", "tight", "normal", "wide"] as const
export type Tracking = typeof trackingValues[number]
export const trackingVariants: Record<Tracking, string> = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
}

export const weightValues = ["normal", "medium", "semibold", "bold"] as const
export type Weight = typeof weightValues[number]
export const weightVariants: Record<Weight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

export const familyValues = ["sans", "mono", "serif", "heading"] as const
export type Family = typeof familyValues[number]
export const familyVariants: Record<Family, string> = {
  sans: "font-sans",
  mono: "font-mono",
  serif: "font-serif",
  // Alias (need some others?)
  heading: "font-heading",
}

// Recipes
export const typos = [
  "body",
  "label",
  "subtle",
  "hint",
  "caption",
  "code",
  "number",
  "placeholder",
  "p",
  // "paragraph",
  "blockquote",
  "link",
  "main-title",
  "main-subtitle",
  "section-title",
  "section-subtitle",
  "subsection-title",
  "subsection-subtitle",
  "card-title",
  "card-subtitle",
] as const
export type Typos = typeof typos[number]

// DO NOT USE .typo-* @layer components.. but compose utilities classes here.
// See
//
export const typoVariants: Record<Typos, string> = {
  "body": "font-sans text-base leading-normal tracking-normal font-normal", // text-foreground",
  "label": "font-sans text-sm leading-snug tracking-wide font-medium", // text-foreground",
  "subtle": "font-sans text-md leading-normal tracking-wide font-normal text-low-contrast-higher-contrast",
  "hint": "font-sans text-sm leading-normal tracking-wide font-normal text-low-contrast-higher-contrast",
  "caption": "font-sans text-xs leading-normal tracking-wide font-normal text-light-higher-contrast",
  "code": "font-mono text-sm leading-snug tracking-normal font-normal", // text-foreground",
  "number": "text-4xl", // text-foreground",
  "placeholder": "text-sm text-low-contrast-higher-contrast",
  "p": "font-sans text-md leading-relaxed tracking-normal font-normal", // text-foreground",
  "blockquote": "font-serif text-md leading-relaxed tracking-normal font-normal text-low-contrast-higher-contrast italic",
  "link": "font-sans text-md leading-normal tracking-normal font-normal text-primary-higher-contrast underline-offset-6 hover:underline",

  "main-title": "font-heading text-5xl leading-tight tracking-tighter font-medium", // text-foreground",
  "main-subtitle": "font-heading text-2xl leading-snug tracking-normal font-medium", // text-foreground",
  "section-title": "font-heading text-3xl leading-tight tracking-normal font-medium", // text-foreground",
  "section-subtitle": "font-heading text-xl leading-normal tracking-normal font-medium", // text-foreground",
  "subsection-title": "font-heading text-xl leading-normal tracking-normal font-semibold", // text-foreground",
  "subsection-subtitle": "font-heading text-lg leading-normal tracking-normal font-medium", // text-foreground",
  "card-title": "font-heading text-lg leading-snug tracking-normal font-medium", // text-foreground",
  "card-subtitle": "font-heading text-md leading-normal tracking-normal font-medium", // text-foreground"
}


export const textColorVariants: Record<"primary" | ColorTheme, string> = {
  "primary": "text-primary-higher-contrast",
  "brand": "text-brand-higher-contrast",
  "full-contrast": "text-full-contrast-higher-contrast",
  "high-contrast": "text-high-contrast-higher-contrast",
  "low-contrast": "text-low-contrast-higher-contrast",
  "light": "text-light-higher-contrast",
  "muted": "text-muted-higher-contrast",
  "success": "text-success-higher-contrast",
  "warning": "text-warning-higher-contrast",
  "error": "text-error-higher-contrast",
  "info": "text-info-higher-contrast",
  "destructive": "text-destructive-higher-contrast",
  "bitcoin": "text-bitcoin-higher-contrast",
  "lightning": "text-lightning-higher-contrast",
  "liquid": "text-liquid-higher-contrast",
  "fiat": "text-fiat-higher-contrast",

  "foreground": "text-foreground",
  "background": "text-background",
  "foreground-inverse": "text-foreground-inverse",
  "background-inverse": "text-background-inverse",
  "white": "text-white",
  "black": "text-black",

  "slate": "text-slate-500",
  "zinc": "text-zinc-500",
  "neutral": "text-neutral-500",
  "stone": "text-stone-500",
  "red": "text-red-500",
  "orange": "text-orange-500",
  "amber": "text-amber-500",
  "yellow": "text-yellow-500",
  "lime": "text-lime-500",
  "green": "text-green-500",
  "emerald": "text-emerald-500",
  "teal": "text-teal-500",
  "cyan": "text-cyan-500",
  "sky": "text-sky-500",
  "blue": "text-blue-500",
  "indigo": "text-indigo-500",
  "violet": "text-violet-500",
  "purple": "text-purple-500",
  "fuchsia": "text-fuchsia-500",
  "pink": "text-pink-500",
  "rose": "text-rose-500",
}

// Boolean Typo variants helpers

export type Truncate = BooleanVariants;
export const truncateVariants: Record<"true" | "false", string> = {
  true: "truncate w-full",
  false: "truncate-none",
}
// Alias
export type Ellipsis = BooleanVariants;
export const ellipsisVariants: Record<"true" | "false", string> = {
  true: "truncate w-full",
  false: "truncate-none",
}

export type Underline = BooleanVariants;
export const underlineVariants: Record<"true" | "false", string> = {
  true: "underline",
  false: "no-underline",
}

export type Italic = BooleanVariants;
export const italicVariants: Record<"true" | "false", string> = {
  true: "italic",
  false: "not-italic",
}

