


export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

// Purge-safe: stack until bp, then row + centered
export function stackUntil(bp: Breakpoint) {
  if (bp === "sm") return "flex-col items-center sm:flex-row sm:items-start sm:justify-center"
  if (bp === "md") return "flex-col items-center md:flex-row md:items-start md:justify-center"
  if (bp === "lg") return "flex-col items-center lg:flex-row lg:items-start lg:justify-center"
  if (bp === "xl") return "flex-col items-center xl:flex-row xl:items-start xl:justify-center"
  if (bp === "2xl") return "flex-col items-center 2xl:flex-row 2xl:items-start 2xl:justify-center"
  return "flex-col items-center lg:flex-row lg:items-start lg:justify-center"
}

// At/after bp: prevent stretching and set explicit width = var(--container-KEY)
export function fixedWidthAtOrAbove(bp: Breakpoint, key: string | null) {
  if (!key) return "" // 'full' → no fixed width; columns will size to content
  if (bp === "sm") return `sm:flex-none sm:[width:var(--container-${key})]`
  if (bp === "md") return `md:flex-none md:[width:var(--container-${key})]`
  if (bp === "lg") return `lg:flex-none lg:[width:var(--container-${key})]`
  if (bp === "xl") return `xl:flex-none xl:[width:var(--container-${key})]`
  if (bp === "2xl") return `2xl:flex-none 2xl:[width:var(--container-${key})]`
  return `lg:flex-none lg:[width:var(--container-${key})]`
}