import { cn, resolveAtomTokens } from "../../lib"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { asSmartSlot } from "../core"
import { Atom, type AtomProps } from "../core/Atom"


// =============================================================================
// AutoGrid
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// Layout component for auto-fitting number of columns
// based on available space and content min/max width
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type AutoGridOwnProps = {
  colsMinWidth?: string
  colsMaxWidth?: string
}

export type AutoGridProps = AtomProps & AutoGridOwnProps;

export type AutoGridPolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, AutoGridProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Layout component for auto-fitting number of columns
 * based on available space and content min/max width
 *
 * @param props - AutoGridProps
 * @returns AutoGrid component
 */
export const AutoGrid = forwardRefPolymorphic<"span", AutoGridProps>(
  function AutoGrid<T extends React.ElementType = "span">(
    {
      gap = "md",
      colsMinWidth = "16rem",
      colsMaxWidth = "1fr",
      ...props
    }: AutoGridPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const {
      as,
      className,
      style,
      ...rest
    } = resolveAtomTokens({ ...props, gap });

    // -------------
    // RENDER
    // -------------

    return (
      <Atom
        as={as as any}
        ref={ref}
        className={cn("grid w-full", className)}
        style={{ ...style, gridTemplateColumns: `repeat(auto-fit, minmax(${colsMinWidth}, ${colsMaxWidth}))` }}
        {...rest} // Spread remaining rest (color theme, style, event handlers, etc.)
      />
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartAutoGrid = asSmartSlot(AutoGrid);