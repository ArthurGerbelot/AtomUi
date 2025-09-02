


//
//
// Une version qui etait prete de fonctionner avec Atom - legacy close to work version
// A garder au cas ou.
//
//




import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Atom, type AtomProps, ComponentWithAs } from "./Atom - v0"
import { cn } from "../../../lib"

/* =============================================================================
 * CVA: Text variants Custom variants
 * - Keep structural/flow variants here (inline, block, p, blockquote, etc.)
 *
 * Atom:
 * - Typography (size/color/weight/leading...) should come from Atom props,
 * - className override everything (Atom handle it)
 * =========================================================================== */

const textVariants = cva("leading-normal m-0 p-0", {
  variants: {
    variant: {
      // Structural (could be removed and use "display" Atom token: inline, block, etc.)
      inline: "inline",
      inlineBlock: "inline-block",
      block: "block",

      // Typography (style should be moved to "typo" Atom token)
      // Text.Variant is only used to define HTML tag (p, blockquote, span, ..) and call the right "typo" Atom props
      number: "text-[32px] text-",
      p: "leading-relaxed [&:not(:first-child)]:mt-6 block",
      blockquote: "border-l-2 border-gray pl-4 my-2 py-2 italic block",
    },
  },
  defaultVariants: { variant: "inline" },
})

/* =============================================================================
 * Typings
 * - Inherit all Atom props + our own CVA variants
 * =========================================================================== */

export type TextProps =
  AtomProps &                // polymorphic base from Atom (as/asChild + atom tokens)
  VariantProps<typeof textVariants> & {
    // put Text-specific props here if you add some later
  }

/* =============================================================================
 * Implementation
 * - Bridge with forwardRef<any, any>, then cast to a clean polymorphic signature
 * - Decide default element from `variant` if `as` is not provided
 * - Merge: CVA → className (user overrides last)
 * =========================================================================== */

const TextImpl = React.forwardRef<any, any>(function Text(
  { className, variant = "inline", as, asChild, ...props },
  ref
) {
  // Pick default HTML tag if `as` is not provided
  const inferred = !as
    ? variant === "p"
      ? "p"
      : variant === "blockquote"
        ? "blockquote"
        : variant === "inline" || variant === "inlineBlock"
          ? "span"
          : "div"
    : undefined

  const element = (as ?? inferred) as React.ElementType

  return (
    <Atom
      ref={ref}
      as={element}
      asChild={asChild}
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  )
})

TextImpl.displayName = "Text"

// export with typing (polymorphic + native props)
export const Text = TextImpl as ComponentWithAs<TextProps, "span">