import { ChoiceObject, IconCheckboxChecked, IconError, IconInfo } from "@uikit"

export const countryChoices: ChoiceObject[] = [
  { value: "fr", label: "France", group: "Europe" },
  { value: "de", label: "Germany", group: "Europe" },
  { value: "ca", label: "Canada", group: "North America" },
  { value: "es", label: "Spain", group: "Europe" },
  { value: "us", label: "United States", group: "North America", disabled: true },
  { value: "mx", label: "Mexico", group: "North America" },
  { value: "jp", label: "Japan" },
]
export const colorChoices: ChoiceObject[] = [
  { value: "error", label: "Error", Icon: IconError, colorTheme: "error" },
  { value: "success", label: "Success", Icon: IconCheckboxChecked, colorTheme: "success" },
  { value: "info", label: "Info", Icon: IconInfo, colorTheme: "info" },
]
