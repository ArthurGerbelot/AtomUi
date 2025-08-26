
// ---------------------------------------------------------------------------
// Surface Colors (bg, border)
// ---------------------------------------------------------------------------

import { Size, sizes } from "../base/base";
import { ColorTheme } from "../colors/colors"

export const bgColorVariants: Record<"primary" | ColorTheme, string> = {
  "primary": "bg-primary",
  "brand": "bg-brand",
  "full-contrast": "bg-full-contrast",
  "high-contrast": "bg-high-contrast",
  "low-contrast": "bg-low-contrast",
  "light": "bg-light",
  "muted": "bg-muted",
  "success": "bg-success",
  "warning": "bg-warning",
  "error": "bg-error",
  "info": "bg-info",
  "destructive": "bg-destructive",
  "bitcoin": "bg-bitcoin",
  "lightning": "bg-lightning",
  "liquid": "bg-liquid",
  "fiat": "bg-fiat",

  "foreground": "bg-foreground",
  "background": "bg-background",
  "foreground-inverse": "bg-foreground-inverse",
  "background-inverse": "bg-background-inverse",
  "white": "bg-white",
  "black": "bg-black",

  "slate": "bg-slate-500",
  "zinc": "bg-zinc-500",
  "neutral": "bg-neutral-500",
  "stone": "bg-stone-500",
  "red": "bg-red-500",
  "orange": "bg-orange-500",
  "amber": "bg-amber-500",
  "yellow": "bg-yellow-500",
  "lime": "bg-lime-500",
  "green": "bg-green-500",
  "emerald": "bg-emerald-500",
  "teal": "bg-teal-500",
  "cyan": "bg-cyan-500",
  "sky": "bg-sky-500",
  "blue": "bg-blue-500",
  "indigo": "bg-indigo-500",
  "violet": "bg-violet-500",
  "purple": "bg-purple-500",
  "fuchsia": "bg-fuchsia-500",
  "pink": "bg-pink-500",
  "rose": "bg-rose-500",
}

export const borderColorVariants: Record<"primary" | ColorTheme, string> = {
  "primary": "border-primary-higher-contrast",
  "brand": "border-brand-higher-contrast",
  "full-contrast": "border-full-contrast-higher-contrast",
  "high-contrast": "border-high-contrast-higher-contrast",
  "low-contrast": "border-low-contrast-higher-contrast",
  "light": "border-light-higher-contrast",
  "muted": "border-muted-higher-contrast",
  "success": "border-success-higher-contrast",
  "warning": "border-warning-higher-contrast",
  "error": "border-error-higher-contrast",
  "info": "border-info-higher-contrast",
  "destructive": "border-destructive-higher-contrast",
  "bitcoin": "border-bitcoin-higher-contrast",
  "lightning": "border-lightning-higher-contrast",
  "liquid": "border-liquid-higher-contrast",
  "fiat": "border-fiat-higher-contrast",

  "foreground": "border-foreground",
  "background": "border-background",
  "foreground-inverse": "border-foreground-inverse",
  "background-inverse": "border-background-inverse",
  "white": "border-white",
  "black": "border-black",

  "slate": "border-slate-500",
  "zinc": "border-zinc-500",
  "neutral": "border-neutral-500",
  "stone": "border-stone-500",
  "red": "border-red-500",
  "orange": "border-orange-500",
  "amber": "border-amber-500",
  "yellow": "border-yellow-500",
  "lime": "border-lime-500",
  "green": "border-green-500",
  "emerald": "border-emerald-500",
  "teal": "border-teal-500",
  "cyan": "border-cyan-500",
  "sky": "border-sky-500",
  "blue": "border-blue-500",
  "indigo": "border-indigo-500",
  "violet": "border-violet-500",
  "purple": "border-purple-500",
  "fuchsia": "border-fuchsia-500",
  "pink": "border-pink-500",
  "rose": "border-rose-500",
}



// ---------------------------------------------------------------------------
// Shadows / Radius / Border
// ---------------------------------------------------------------------------


export const shadows = ["none", ...sizes] as const
export type Shadow = typeof shadows[number]


// No need to define more for now.
export const shadowVariants: Record<Shadow, string> = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  none: "shadow-none",
}

export const radiuses = ["none", ...sizes, "full"] as const
export type Radius = typeof radiuses[number]

export const radiusVariants: Record<Radius, string> = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  none: "rounded-none",
  full: "rounded-full",
}


// ---------------------------------------------------------------------------
// Surface helpers
// ---------------------------------------------------------------------------

// Only the base of the surfaces, do not handle the hover: ... (button will do it)

export const surfaces = ['card', 'solid', 'outline', 'secondary', 'subtle', "subtle-accent", 'subtle-outline', 'text-accent', 'none', 'input', 'popover'] as const
export type Surface = typeof surfaces[number]

export const surfaceVariants: Record<Surface, string> = {
  card: "bg-surface-card text-surface-card-foreground rounded-xl border border-surface-card-border hover:bg-surface-card",
  solid: "bg-primary text-primary-foreground shadow-xs border-0 hover:bg-primary",
  secondary: "bg-surface-secondary text-surface-secondary-foreground shadow-xs border-0 hover:bg-surface-secondary",
  outline: "bg-transparent border border-primary-higher-contrast text-primary-higher-contrast shadow-xs hover:bg-transparent",
  subtle: "bg-primary/30 text-surface-secondary-foreground shadow-xs border-0 hover:bg-primary/30",
  "subtle-accent": "bg-primary/20 text-primary-higher-contrast shadow-xs border-0 hover:bg-primary/20",
  "subtle-outline": "bg-primary/10 border border-primary-higher-contrast text-primary-higher-contrast shadow-xs hover:bg-primary/10",
  "text-accent": "bg-transparent text-primary-higher-contrast border-0 shadow-none hover:bg-transparent",
  none: "bg-transparent text-foreground border-0 shadow-none hover:bg-transparent",

  /* Legacy Input surface - Now use new "input" surface (was only for "select"*/
  // input:
  //   "bg-transparent border border-low-contrast rounded-md w-full flex " +
  //   "placeholder:text-muted-foreground selection:bg-low-contrast selection:text-low-contrast-foreground " +
  //   "transition-colors outline-none " +
  //   "file:inline-flex file:bg-muted file:text-muted-foreground file:cursor-pointer file:py-1 file:-ml-2 file:px-2 file:rounded-md " +
  //   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus:border-ring focus:ring-ring/50 focus:ring-[3px] " +
  //   "hover:bg-low-contrast/20 " +
  //   "disabled:cursor-not-allowed disabled:opacity-50 " +
  //   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ",

  /* Input surface - base styling for all input-like components */
  input:
    /* Base layout & appearance */
    "bg-transparent text-surface-card-foreground border border-low-contrast/60 rounded-md w-full " +
    /* Visuals */
    "shadow-xs transition-[color,box-shadow] outline-none " +
    /* Focus ring + keep while open */
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] data-[state=open]:border-ring data-[state=open]:ring-ring/40 data-[state=open]:ring-[4px] " +
    /* Hover */
    "hover:bg-light/50 " +
    /* Disabled */
    "disabled:cursor-not-allowed disabled:opacity-50 " +
    /* Invalid */
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive " +
    /* Placeholder for Input and SelectValue (data) */
    "placeholder:text-muted-foreground data-[placeholder]:text-muted-foreground ",
  /* Popover surface */
  popover:
    "bg-surface-popover text-surface-popover-foreground border border-surface-popover-border rounded-md shadow-md",
}


