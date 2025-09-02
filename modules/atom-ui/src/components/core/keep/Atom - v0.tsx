


//
//
// Une version qui etait prete de fonctionner
// A garder au cas ou.
//
//
// Tout fonctionne bien. TS inject les bon types, connait les fields (button type = "button" | "submit" | ...)
//  => PROBLEME: Atom accepte tous les fields (et va les typer selon la valeur au runtime)
//
//
//




import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"


import { cn } from "../../../lib"
import { getPrimaryColorStyle } from "../../../lib/core/colors"
import { ColorTheme } from "../../../tokens/colors/colors"
import { resolveAtomTokens } from "../../../lib/core/atom"





// =============================================================================
// CVA: atomVariants
// -----------------------------------------------------------------------------
// - Composite variants: presets that affect multiple atomic concerns (e.g., size)
// - Atomic variants: one concern per prop (predictable overrides)
// - No defaultVariants: Atom is neutral by default
// ===========================================================================

export const atomVariants = cva("", {
  variants: {
    // Atom variants {}
  },
  defaultVariants: {},
})

/* =============================================================================
 * Polymorphic typings
 * -----------------------------------------------------------------------------
 * - ElementType: "button" | "a" | "div" | custom React component, etc.
 * - We expose native props of the rendered element via React’s utility types
 * - as/asChild:
 *     - `as`: choose the rendered element/component
 *     - `asChild`: Radix Slot pattern (use child as the rendered element)
 * =========================================================================== */




export type ElementType = React.ElementType

export type ComponentWithAs<P, DefaultTag extends React.ElementType> = {
  <T extends React.ElementType = DefaultTag>(
    props: P & { as?: T } & Omit<React.ComponentPropsWithRef<T>, keyof P>
    // props: P & { as?: T } & (T extends keyof React.JSX.IntrinsicElements
    //   ? Omit<React.ComponentPropsWithRef<T>, keyof P>
    //   : {})
  ): React.ReactElement | null
}

/* =============================================================================
 * AtomProps (public API)
 * -----------------------------------------------------------------------------
 * - colorTheme                         → injects CSS variables for theming (via getPrimaryColorStyle)
 * - className/style                    → final overrides (merged after CVA)
 * - VariantProps<typeof atomVariants>  → all composite + atomic knobs
 * =========================================================================== */

export type AtomProps = {

  colorTheme?: ColorTheme
  // ...atomVariantProps: VariantProps<typeof atomVariants>

  className?: string
  style?: React.CSSProperties

  asChild?: boolean
  as?: ElementType
  children?: React.ReactNode

} & VariantProps<typeof atomVariants>

/* =============================================================================
 * Implementation detail:
 * -----------------------------------------------------------------------------
 * We implement with forwardRef<any, any> to avoid React’s generic inference trap,
 * then cast to a clean polymorphic signature for consumers.
 * - Order of class merging:
 *     CVA(atom variants) → className (consumer overrides last)
 * - asChild uses Radix Slot (child becomes the rendered element)
 * =========================================================================== */

const AtomImpl = React.forwardRef<HTMLDivElement, AtomProps>(function Atom(
  props,
  ref
) {
  // const {

  //   // ... atomVariantProps



  //   // ------------------------ Theming & overriding style--------------------
  //   // =======================================================================
  //   colorTheme,
  //   className,
  //   style,

  //   // ----------------------------- Polymorphism ----------------------------
  //   // =======================================================================
  //   as,
  //   asChild = false,

  //   // ------------------- Native props of the chosen element ----------------
  //   // =======================================================================
  //   ...props
  // } = props;


  const {
    // ----------- Resolved tokens: Theming & overriding style----------------
    // =======================================================================
    className, style,
    colorTheme,

    // ----------------------------- Polymorphism ----------------------------
    // =======================================================================
    as,
    asChild = false,

    // ---------------------------- Rest of the props ------------------------
    // =======================================================================
    ...rest
  } = resolveAtomTokens(props);

  const classes = cn(
    atomVariants({

      // ...atomVariantProps
    }),

    // --------------------- Consumer overrides (last) -----------------------
    // =======================================================================
    className // consumer overrides last
  )

  const Comp = asChild ? Slot : (as ?? "div")

  /* Merge theme CSS variables with inline style */
  const mergedStyle = React.useMemo<React.CSSProperties | undefined>(() => {
    if (!colorTheme && !style) return style
    return {
      ...(colorTheme ? getPrimaryColorStyle(colorTheme) : undefined),
      ...style,
    }
  }, [colorTheme, style])



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

AtomImpl.displayName = "Atom"

export const Atom = AtomImpl as ComponentWithAs<AtomProps, "div">