// 'use client' // because of use memo

// Atom.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { cn, getPrimaryColorStyle, ColorTheme, resolveAtomTokens, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "@uikit"

export const atomVariants = cva("", { variants: {}, defaultVariants: {} })

export type AtomOwnProps = {
  colorTheme?: ColorTheme
  className?: string
  style?: React.CSSProperties
  asChild?: boolean
  children?: React.ReactNode
} & VariantProps<typeof atomVariants>

export type AtomProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, AtomOwnProps>

export const Atom = forwardRefPolymorphic<"div", AtomOwnProps>(function Atom<
  T extends React.ElementType = "div"
>(raw: AtomProps<T>, ref: PolymorphicRef<T>) {
  const {
    className, style, colorTheme,
    as, asChild = false,
    ...rest
  } = resolveAtomTokens(raw)

  const Comp: React.ElementType = asChild ? Slot : (as ?? "div")


  // Are we sure to need that ?
  // force to be `use client`
  // Optimize later..

  // const mergedStyle = React.useMemo<React.CSSProperties | undefined>(() => {
  //   if (!colorTheme && !style) return style
  //   return { ...(colorTheme ? getPrimaryColorStyle(colorTheme) : undefined), ...style }
  // }, [colorTheme, style])
  const mergedStyle = (!colorTheme && !style)
    ? style
    : { ...(colorTheme ? getPrimaryColorStyle(colorTheme) : undefined), ...style }

  const classes = cn(atomVariants({}), className)

  return (
    <Comp
      ref={ref}
      className={classes}
      style={mergedStyle}
      data-atom="Atom"
      {...rest}
    />
  )
})
