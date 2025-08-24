

export type BooleanVariants = "true" | "false" | true | false;
export type NumericalVariants = "_n" | `${number}` | number; // use "1" to define all the number format

// See Layout.flex to see how to use: (combine boolean, numerical, and custom props)
export type OmitableVariants = true | false | number;



// Sizes (Shared with multiple domains: typo, spacing, boxing, ..)
// ===========================================================================

export const sizes = [
  'xs', 'sm', 'md', 'lg', 'xl',
] as const
export type Size = typeof sizes[number]

export const sizeVariants: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  //
};

export const sizeWithGapVariants: Record<Size, string> = {
  xs: "text-xs gap-1",
  sm: "text-sm gap-1.5",
  md: "text-md gap-2",
  lg: "text-lg gap-2.5",
  xl: "text-xl gap-3",
};

// Allow to override size for a component (e.g. Button)
// and implement padding
export const sizeWithPaddingVariants: Record<Size, string> = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-md px-4 py-2",
  lg: "text-lg px-6 py-3",
  xl: "text-xl px-8 py-4",
};
export const sizeWithSmallPaddingVariants: Record<Size, string> = {
  xs: "text-xs px-[.1rem]", //  py-[.05rem]",
  sm: "text-sm px-[.2rem]", //  py-[.125rem]",
  md: "text-md px-[.3rem]", //  py-[.1875rem]",
  lg: "text-lg px-[.4rem]", //  py-[.225rem]",
  xl: "text-xl px-[.5rem]", //  py-[.375rem]",
};
export const sizeWithHeightVariants: Record<Size, string> = {
  xs: "text-xs px-2 py-1 h-7",
  sm: "text-sm px-3 py-1 h-9",
  md: "text-md px-4 py-2 h-11",
  lg: "text-lg px-6 py-3 h-13",
  xl: "text-xl px-8 py-4 h-15",
};
