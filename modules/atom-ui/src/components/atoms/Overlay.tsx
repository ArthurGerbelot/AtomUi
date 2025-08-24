import { cn, resolveAtomTokens } from "../../lib"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"

// =============================================================================
// Overlay
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Interactive]
// -----------------------------------------------------------------------------
// Overlay component (for Dialog, Popover, etc.)
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export type OverlayProps = AtomProps

export type OverlayPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, OverlayProps>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Overlay component (for Dialog, Popover, etc.)
 */
export const Overlay = forwardRefPolymorphic<"div", OverlayProps>(
  function Overlay<T extends React.ElementType = "div">(
    props: OverlayPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const { as, asChild, className, ...rest } = resolveAtomTokens(props);

    // RENDER
    // ------------------

    return (
      <Atom
        ref={ref}
        as={as as any} // Type assertion needed for polymorphic inference
        asChild={asChild}

        className={cn(
          "data-[state=open]:animate-in " +
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
          "fixed inset-0 z-50 bg-overlay",
          className)}

        {...rest} // Spread remaining rest (color theme, style, event handlers, etc.)
      />
    )
  }
)
