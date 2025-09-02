'use client'

import * as React from "react"
import type { Size } from "../../tokens/base/base"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { resolveAtomTokens } from "../../lib/core/atom"
import { cn } from "../../lib"
import { SimpleGrid, SimpleGridProps } from "../atoms/SimpleGrid"
import {
  type Breakpoint,
} from "./layout"

// =============================================================================
// LayoutGrid
// -----------------------------------------------------------------------------
// [Atomic] [Layout]
// -----------------------------------------------------------------------------
// LayoutGrid is the same as LayoutMultiCol but with a SimpleGrid component instead of a VStack per column.
// This component wrap directly a list of components (probably Card) and separate them in columns (as a grid, not a stack of columns)
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------


export type LayoutGridProps = Omit<SimpleGridProps, "cols" | "size"> & {

  // Simplified cols props: {base:1, [breakpointCollapse]:cols}
  cols?: number | string,
  breakpointCollapse?: Breakpoint,

  // Cols size
  size?: Size | "full",
}

type LayoutGridPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, LayoutGridProps>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * SimpleGrid component to specify responsive the number of columns
 */
export const LayoutGrid = forwardRefPolymorphic<"div", LayoutGridProps>(
  function LayoutGrid<T extends React.ElementType = "div">(
    {
      gap = "md",
      cols,
      breakpointCollapse = "xl",
      size = "md",
      ...props
    }: LayoutGridPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const {
      as, className, style,
      ...rest
    } = resolveAtomTokens({ ...props });

    return (
      <SimpleGrid
        // Polymorphic
        ref={ref}
        as={as as any}

        // Grid props
        size={size !== 'full' ? size : undefined} // full isn' a Size and act the same as no size
        cols={{ base: 1, [breakpointCollapse as string]: cols }}
        gap={gap}

        // Atomic tokens
        className={cn("justify-center", className)} // For alignement center
        style={{
          // "grid-template-columns": `repeat(${cols}, var(--container-${size}))`,
          ...style
        } as React.CSSProperties}

        // Rest props (not resolved by atom)
        {...rest}
      />
    )
  }
)
