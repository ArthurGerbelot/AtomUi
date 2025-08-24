// =============================================================================
// ATOM COMPONENT - The foundational polymorphic building block
// =============================================================================
//
// This is the base component that all other components extend from.
// It provides:
// - Polymorphic rendering (can be any HTML element or component)
// - Color theming system
// - Style merging capabilities
// - Radix Slot support for composition
//
// Usage:
//   <Atom as="button" colorTheme="brand">Click me</Atom>
//   <Atom asChild><Link href="/home">Home</Link></Atom>
//
// =============================================================================

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import {
  cn,
  ColorTheme,
  resolveAtomTokens,
  AtomicTokenProps,
} from "@uikit"

import { asSmartSlot } from "./SmartSlot"

import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"

// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

/**
 * Base variants for Atom component
 * Currently empty but can be extended with common variants like size, etc.
 */
export const atomVariants = cva("", {
  variants: {},
  defaultVariants: {}
})

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * Own props that belong specifically to Atom
 * These are the component's "knobs" - what makes Atom unique
 */
export type AtomProps = {
  id?: string,
  /** Theme color that applies consistent color tokens */
  colorTheme?: ColorTheme
  /** CSS classes to apply */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** When true, renders children through Radix Slot (composition pattern) */
  asChild?: boolean
  /** React children */
  children?: React.ReactNode
} & AtomicTokenProps

/**
 * Complete polymorphic props for Atom
 * Combines own props with polymorphic capabilities
 */
export type AtomPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, AtomProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Atom - The foundational polymorphic component
 *
 * @template T - The element type to render as (div, button, a, etc.)
 */
export const Atom = forwardRefPolymorphic<"div", AtomProps>(function Atom<
  T extends React.ElementType = "div"
>(raw: AtomPolymorphicProps<T>, ref: PolymorphicRef<T>) {

  // ---------------------------------------------------------------------------
  // PROPS PROCESSING
  // ---------------------------------------------------------------------------

  // Resolve any token-based props (e.g., spacing tokens, etc.)
  const {
    // Resolved own props
    className,
    style,
    // Own props
    as,
    asChild = false,
    // Rest to propagate
    ...rest
  } = resolveAtomTokens(raw)

  // ---------------------------------------------------------------------------
  // COMPONENT SELECTION
  // ---------------------------------------------------------------------------

  /**
   * Determine what component/element to render:
   * 1. If asChild=true, use Radix Slot for composition
   * 2. If 'as' prop provided, use that element
   * 3. Default to 'div'
   */
  const Comp: React.ElementType = asChild ? Slot : (as ?? "div")

  // Apply variant classes and custom classes
  const classes = cn(atomVariants({}), className)

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <Comp
      ref={ref}
      className={classes}
      style={style}
      data-atom="Atom" // Debug attribute to identify Atom components in DOM
      {...rest} // Spread remaining props (native HTML props, event handlers, etc.)
    />
  )
})


// Also provide a SmartSlot version
export const SmartAtom = asSmartSlot(Atom);