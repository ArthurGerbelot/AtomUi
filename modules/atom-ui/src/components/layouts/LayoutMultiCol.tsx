'use client'

import * as React from "react"
import type { Size } from "../../tokens/base/base" // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
import { Stack, type StackProps } from "../atoms/Stack"
import { cn } from "../../lib"
import { Breakpoint, fixedWidthAtOrAbove, stackUntil } from "./layout"
import { ContainerSize } from "../../tokens/layout/layout"
import { Atom, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core"
import { LayoutGrid, LayoutGridProps } from "./LayoutGrid"

// =============================================================================
// LayoutMultiCol
// -----------------------------------------------------------------------------
// [Atomic] [Layout]
// -----------------------------------------------------------------------------
// This Component is EXACTLY the same as LayoutGrid, but with a different name to avoid confusion.
// The role of this one is to handle cards as columns (and do not reoganise them when breakpoint collapse)
//
// Use this one with a list of VStacks as children instead of directly putting cards.
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export interface LayoutMultiColProps extends LayoutGridProps {
  children: React.ReactNode
}
type LayoutMultiColPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, LayoutMultiColProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * LayoutMultiCol
 * - Stacks to 1 column below `breakpointCollapse`, then switches to fixed-width columns in a centered row.
 * - Width per column follows the same Size → container mapping as LayoutOneCol.
 * - Only Tailwind classes; no inline style.
 */
export const LayoutMultiCol = forwardRefPolymorphic<"div", LayoutMultiColProps>(
  function LayoutMultiCol<T extends React.ElementType = "div">(
    props: LayoutMultiColPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return (
      <LayoutGrid ref={ref} {...props} />
    )
  }
)