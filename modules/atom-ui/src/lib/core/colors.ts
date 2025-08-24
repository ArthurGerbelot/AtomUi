import { ColorTheme } from "../../tokens/colors/colors"

// Utility function for primary color styles injection
export function getPrimaryColorStyle(color: ColorTheme): React.CSSProperties {
  const known = {
    brand: {
      "--color-primary": "var(--color-brand)",
      "--color-primary-foreground": "var(--color-brand-foreground)",
      "--color-primary-higher-contrast": "var(--color-brand-higher-contrast)",
    },
    "full-contrast": {
      "--color-primary": "var(--color-full-contrast)",
      "--color-primary-foreground": "var(--color-full-contrast-foreground)",
      "--color-primary-higher-contrast": "var(--color-full-contrast-higher-contrast)",
    },
    "high-contrast": {
      "--color-primary": "var(--color-high-contrast)",
      "--color-primary-foreground": "var(--color-high-contrast-foreground)",
      "--color-primary-higher-contrast": "var(--color-high-contrast-higher-contrast)",
    },
    "low-contrast": {
      "--color-primary": "var(--color-low-contrast)",
      "--color-primary-foreground": "var(--color-low-contrast-foreground)",
      "--color-primary-higher-contrast": "var(--color-low-contrast-higher-contrast)",
    },
    light: {
      "--color-primary": "var(--color-light)",
      "--color-primary-foreground": "var(--color-light-foreground)",
      "--color-primary-higher-contrast": "var(--color-light-higher-contrast)",
    },
    success: {
      "--color-primary": "var(--color-success)",
      "--color-primary-foreground": "var(--color-success-foreground)",
      "--color-primary-higher-contrast": "var(--color-success-higher-contrast)",
    },
    warning: {
      "--color-primary": "var(--color-warning)",
      "--color-primary-foreground": "var(--color-warning-foreground)",
      "--color-primary-higher-contrast": "var(--color-warning-higher-contrast)",
    },
    error: {
      "--color-primary": "var(--color-error)",
      "--color-primary-foreground": "var(--color-error-foreground)",
      "--color-primary-higher-contrast": "var(--color-error-higher-contrast)",
    },
    destructive: {
      "--color-primary": "var(--color-destructive)",
      "--color-primary-foreground": "var(--color-destructive-foreground)",
      "--color-primary-higher-contrast": "var(--color-destructive-higher-contrast)",
    },
    info: {
      "--color-primary": "var(--color-info)",
      "--color-primary-foreground": "var(--color-info-foreground)",
      "--color-primary-higher-contrast": "var(--color-info-higher-contrast)",
    },
    muted: {
      "--color-primary": "var(--color-muted)",
      "--color-primary-foreground": "var(--color-muted-foreground)",
      "--color-primary-higher-contrast": "var(--color-muted-higher-contrast)",
    },
    bitcoin: {
      "--color-primary": "var(--color-bitcoin)",
      "--color-primary-foreground": "var(--color-bitcoin-foreground)",
      "--color-primary-higher-contrast": "var(--color-bitcoin-higher-contrast)",
    },
    lightning: {
      "--color-primary": "var(--color-lightning)",
      "--color-primary-foreground": "var(--color-lightning-foreground)",
      "--color-primary-higher-contrast": "var(--color-lightning-higher-contrast)",
    },
    liquid: {
      "--color-primary": "var(--color-liquid)",
      "--color-primary-foreground": "var(--color-liquid-foreground)",
      "--color-primary-higher-contrast": "var(--color-liquid-higher-contrast)",
    },
    fiat: {
      "--color-primary": "var(--color-fiat)",
      "--color-primary-foreground": "var(--color-fiat-foreground)",
      "--color-primary-higher-contrast": "var(--color-fiat-higher-contrast)",
    },
  } as const

  if (color in known) return known[color as keyof typeof known] as React.CSSProperties

  const tailwindColors = [
    "slate", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow",
    "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo",
    "violet", "purple", "fuchsia", "pink", "rose"
  ]

  if (tailwindColors.includes(color)) {
    return {
      ["--color-primary" as keyof React.CSSProperties]: `var(--color-${color}-500)`,
      ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-white)`,
      ["--color-primary-higher-contrast" as keyof React.CSSProperties]: `var(--color-${color}-500)`,
    } as React.CSSProperties
  }

  if (color === "foreground") {
    return {
      ["--color-primary" as keyof React.CSSProperties]: `var(--color-foreground)`,
      ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-background)`,
      ["--color-primary-higher-contrast" as keyof React.CSSProperties]: `var(--color-foreground)`,
    } as React.CSSProperties
  }

  if (color === "background") {
    return {
      ["--color-primary" as keyof React.CSSProperties]: `var(--color-background)`,
      ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-foreground)`,
      ["--color-primary-higher-contrast" as keyof React.CSSProperties]: `var(--color-background)`,
    } as React.CSSProperties
  }

  if (color === "white") {
    return {
      ["--color-primary" as keyof React.CSSProperties]: `var(--color-white)`,
      ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-black)`,
      ["--color-primary-higher-contrast" as keyof React.CSSProperties]: `var(--color-white)`,
    } as React.CSSProperties
  }

  if (color === "black") {
    return {
      ["--color-primary" as keyof React.CSSProperties]: `var(--color-black)`,
      ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-white)`,
      ["--color-primary-higher-contrast" as keyof React.CSSProperties]: `var(--color-black)`,
    } as React.CSSProperties
  }

  if (color === "foreground-inverse") {
    return {
      ["--color-primary" as keyof React.CSSProperties]: `var(--color-foreground-inverse)`,
      ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-background-inverse)`,
      ["--color-primary-higher-contrast" as keyof React.CSSProperties]: `var(--color-foreground-inverse)`,
    } as React.CSSProperties
  }

  if (color === "background-inverse") {
    return {
      ["--color-primary" as keyof React.CSSProperties]: `var(--color-background-inverse)`,
      ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-foreground-inverse)`,
      ["--color-primary-higher-contrast" as keyof React.CSSProperties]: `var(--color-background-inverse)`,
    } as React.CSSProperties
  }

  return {
    ["--color-primary" as keyof React.CSSProperties]: `var(--color-${color})`,
    ["--color-primary-foreground" as keyof React.CSSProperties]: `var(--color-${color}-foreground)`,
  } as React.CSSProperties
}