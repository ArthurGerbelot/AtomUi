import { cva, VariantProps } from "class-variance-authority"

import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { sizeWithSmallPaddingVariants } from "../../tokens"
import { cn, resolveAtomTokens } from "../../lib"
import { asSmartSlot } from "../core"
import { CSSProperties } from "react"



// =============================================================================
// Badge
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography]
// -----------------------------------------------------------------------------
// Badge component for displaying small amounts of information
// =============================================================================


// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

/**
 * Typography variants for Text component
 * Each variant defines both visual styling and semantic meaning
 */
const badgeVariants = cva("inline-flex items-baseline align-baseline "
  + "min-w-0 max-w-full overflow-hidden" // For ellipsis
  , {
    variants: {
      size: sizeWithSmallPaddingVariants,
    },
  })




// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type BadgeOwnProps = VariantProps<typeof badgeVariants> & {
  textScale?: number | string
}

export type BadgeProps = AtomProps & BadgeOwnProps;

export type BadgePolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, BadgeProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------


export const Badge = forwardRefPolymorphic<"span", BadgeProps>(
  function Badge<T extends React.ElementType = "span">(
    {
      // Extract size to avoid resolving
      size = "md",

      // Extract for default values
      surface = "subtle",
      colorTheme = "low-contrast",
      radius = "sm",

      textScale = .9,

      children,
      ...props
    }: BadgePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const {
      as = "span", asChild, className, style,
      ...rest
    } = resolveAtomTokens({ ...props, surface, colorTheme, radius });

    return (
      <Atom
        ref={ref}
        as={as as any} // Type assertion needed for polymorphic inference
        asChild={asChild}

        className={cn(badgeVariants({ size }), className)} // Use size + padding
        style={{
          ...style,
          // transform: `translateY(-.01em)`,  // VERY SMALL ADJUSTMENT TO FIT THE BADGE TO THE TEXT )
          "--text-scale": textScale,
        } as CSSProperties}

        {...rest} // Spread remaining props
      >
        <span
          // VERY SMALL ADJUSTMENT TO FIT THE BADGE TO THE TEXT
          // Since the badge is smaller, baseline alignment is still optimal but we add a slight ~2px offset
          // to vertically center it with standard text
          style={{ transform: `translateY(-.025em)` }}
          className="inline-block align-baseline leading-[inherit] text-[calc(1em*var(--text-scale,1))] min-w-0 flex-1 truncate"
        >
          {children}
        </span>
      </Atom >
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartBadge = asSmartSlot(Badge);