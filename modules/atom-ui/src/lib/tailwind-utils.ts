import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const myTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Only add news: 0-1-2 already in "default" gap. noGap is just an alias for gap-0
      gap: [{ gap: ["xs", "sm", "md", "lg", "xl"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return myTwMerge(clsx(inputs))
}