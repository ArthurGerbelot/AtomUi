import { Choice, ChoiceObject, IconBug, IconCheckboxChecked, IconError, IconInfo, IconSettings } from "@uikit"



export const countryChoices: ChoiceObject[] = [
  { value: "fr", label: "France", group: "Europe" },
  { value: "de", label: "Germany", group: "Europe" },
  { value: "ca", label: "Canada", group: "North America" },
  { value: "es", label: "Spain", group: "Europe" },
  { value: "us", label: "United States", group: "North America", disabled: true },
  { value: "mx", label: "Mexico", group: "North America" },
  { value: "jp", label: "Japan" },
]

export type ColorChoices = "error" | "success" | "info";
export const colorChoices: ChoiceObject<ColorChoices>[] = [
  { value: "error", label: "Error", Icon: IconError, colorTheme: "error" },
  { value: "success", label: "Success", Icon: IconCheckboxChecked, colorTheme: "success" },
  { value: "info", label: "Info", Icon: IconInfo, colorTheme: "info" },
]

export const longList: ChoiceObject[] = Array.from({ length: 100 }).map((_, i) => ({ value: `item-${i + 1}`, label: `Item ${i + 1}` }))


// With Groups and keywords
export const temperatureColors: Choice<string>[] = [

  { value: 'black', label: 'Black', icon: IconBug, colorTheme: 'full-contrast', keywords: ['bug'] },
  { value: 'red', label: 'Red', group: 'Warm', icon: IconBug, colorTheme: 'red', keywords: ['bug', 'warm'] },
  { value: 'orange', label: 'Orange', group: 'Warm', icon: IconSettings, colorTheme: 'orange', keywords: ['cog', 'warm'] },
  { value: 'yellow', label: 'Yellow', group: 'Warm', icon: IconSettings, colorTheme: 'yellow', keywords: ['cog', 'warm'], badgeProps: { surface: 'outline' } },
  { value: 'blue', label: 'Blue', group: 'Cold', icon: IconBug, colorTheme: 'blue', keywords: ['bug', 'cold'] },
  { value: 'green', label: 'Green', group: 'Cold', icon: IconSettings, colorTheme: 'green', keywords: ['cog', 'cold'] },
  { value: 'emerald', label: 'Emerald', group: 'Cold', icon: IconBug, colorTheme: 'emerald', keywords: ['bug', 'cold'] },
]



export const frameworksWithLongLabels: Choice<string>[] = [
  { value: 'next', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'sveltekit', label: 'SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit', surface: 'outline' },
  { value: 'astro', label: 'Astroooooooooooooooooooooooooooooooooooooooooooooo' },
]
