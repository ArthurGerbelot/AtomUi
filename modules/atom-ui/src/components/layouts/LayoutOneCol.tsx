'use client'

import * as React from "react"
import { VStack, type StackProps } from "../atoms/Stack"

import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core"
import { cn, resolveAtomTokens } from "../../lib"
import { Size } from "../../tokens"

// =============================================================================
// LayoutOneCol
// -----------------------------------------------------------------------------
// [Atomic] [Layout]
// -----------------------------------------------------------------------------
// LayoutOneCol Layout Component to display a single centered column with Stack list of Components (probably Card)
// with a max width driven by Tailwind's `max-w-*` classes (and custom container tokens).
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export interface LayoutOneColProps
  extends Omit<StackProps, "direction" | "size"> {
  children: React.ReactNode
  /** Design size token (or "full" for 100% width) */
  size?: Size | "full"
}

type LayoutOneColPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, LayoutOneColProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------



/**
 * LayoutOneCol
 * A single centered column layout with max width driven by Tailwind's `max-w-*` classes.
 * - No inline style: width is handled entirely with Tailwind classes.
 * - The `gap` prop is passed directly to VStack.
 */
export const LayoutOneCol = forwardRefPolymorphic<"div", LayoutOneColProps>(
  function LayoutOneCol<T extends React.ElementType = "div">(
    {
      gap = "md",
      cols,
      breakpointCollapse = "xl",
      size = "md",
      children,
      ...props
    }: LayoutOneColPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const {
      as, className, style,
      ...rest
    } = resolveAtomTokens({ ...props });

    return (
      <VStack
        ref={ref}
        as={as as any}
        gap={gap}
        stretch
        maxW={size}
        className={cn("mx-auto", className)}
        {...rest}
      >
        {children}
      </VStack>
    )
  }
)