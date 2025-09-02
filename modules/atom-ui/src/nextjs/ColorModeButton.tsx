"use client"

import React from "react"
import { useTheme } from "next-themes"
import { IconSun, IconMoon, IconBitcoin } from "../components/atoms/IconLibrary"
import { IconButton } from "../components/atoms/IconButton"


export interface ColorModeButtonProps {
  // size?: ButtonProps["size"]
  // variant?: ButtonProps["variant"]
  // color?: ButtonProps["color"]
  // radius?: ButtonProps["radius"]
  className?: string
}

export function ColorModeButton({
  // size = "md",
  // variant = "ghost",
  // color = "gray",
  // radius = "full",
  className,
  ...props
}: ColorModeButtonProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        // size={size}
        // variant={variant}
        // radius={radius}
        className={className}
        {...props}
      />
    )
  }

  const isDark = theme === "dark"

  const handleThemeToggle = () => {
    const newTheme = isDark ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <IconButton
      // size={size || "md"}
      // variant={variant}
      // radius={radius}
      className={className}
      icon={isDark ? IconSun : IconMoon}
      onClick={handleThemeToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      {...props}
    />
  )
}