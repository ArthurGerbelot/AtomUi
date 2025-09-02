
export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";
export const breakpoints: Breakpoint[] = ["base", "sm", "md", "lg", "xl", "2xl"];

export type ResponsiveObject<T> = Partial<Record<Breakpoint, T>>;
export type Responsive<T> = T | ResponsiveObject<T>;

// TypeGuard to know if we have a single value, or a responsive object
export function isResponsiveObject<T>(v: Responsive<T> | undefined): v is ResponsiveObject<T> {
  return typeof v === "object" && v !== null;
}
export function asResponsiveObject<T>(v: Responsive<T> | undefined): ResponsiveObject<T> {
  return isResponsiveObject(v) ? v : { base: v };
}