// components/ThemedLogo.tsx
"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const mode = mounted && resolvedTheme === "dark" ? "dark" : "light"

  return (
    <Image
      src={`/bullbitcoin-logo-${mode}.webp`}
      alt="Bull Bitcoin"
      width={500}
      height={100}
      priority
    />
  )
}