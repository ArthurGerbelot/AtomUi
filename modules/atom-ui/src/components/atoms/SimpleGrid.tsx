

import { cn, resolveAtomTokens } from "../../lib"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { asSmartSlot } from "../core"
import { Size, ContainerSize } from "../../tokens"
import { asResponsiveObject, Responsive } from "@uikit/lib/typescript"

/*
 * =============================================================================
 * SimpleGrid
 * -----------------------------------------------------------------------------
 * [Atomic] [Layout]
 * -----------------------------------------------------------------------------
 * This component is a simple grid system that uses allow to set the number of columns responsivly and the size of each columns (or not: full)
 * Will also reduce cols size if container is smaller than the grid.
 *
 * HOW IT WORKS:
 * - Need the setup on layout.layer.css to works
 * - Uses one static formula class `.simplegrid-formula`
 * - Variables are set with utility classes (to be able to use them on formula calc)
 *     - sg-cols-* (1..6, responsive-safe)  - can set dynamicly "sg-cols-1 sm:sg-cols-2"
 *     - sg-size-* (5xs..7xl)
 *     - sg-gap-* (xs..xl)
 * NOTE:
 * - Size and Gap are not responsive-safe using props BUT you can setup manually using className:
 *   <SimpleGrid className="sg-size-xs md:sg-size-xl" />
 * =============================================================================
 */

type CountCol = 1 | 2 | 3 | 4 | 5 | 6 | "1" | "2" | "3" | "4" | "5" | "6"

type SimpleGridOwnProps = {
  cols?: Responsive<CountCol>
  size?: ContainerSize
  gap?: Size
}

export type SimpleGridProps = Omit<AtomProps, "size"> & SimpleGridOwnProps

export type SimpleGridPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, SimpleGridProps>

export const SimpleGrid = forwardRefPolymorphic<"div", SimpleGridProps>(
  function SimpleGrid<T extends React.ElementType = "div">(
    { cols = 1, size = "md", gap = "md", ...props }: SimpleGridPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { as, className, style, ...rest } = resolveAtomTokens({ ...props, gap })


    cols = asResponsiveObject(cols);
    const colClass = Object.entries(cols).map(([bp, col]) => {
      return bp === "base" ? `sg-cols-${col}` : `${bp}:sg-cols-${col}`
    }).join(" ")

    return (
      <Atom
        as={(as ?? "div") as any}
        ref={ref}
        // Use the new tokens for size and gap defined on layout.layer.css
        className={cn(`simplegrid-formula sg-size-${size} sg-gap-${gap}`, colClass, className)}
        style={style}
        {...rest}
      />
    )
  }
)

export const SmartSimpleGrid = asSmartSlot(SimpleGrid)
