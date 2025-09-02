// =============================================================================
// TEXT COMPONENT - Typography foundation with semantic variants
// =============================================================================
//
// Text extends Atom to provide typography-specific functionality.
// It automatically selects appropriate HTML tags based on semantic variants
// and applies typography styles.
//
// Features:
// - Semantic variants (p, blockquote, inline, etc.)
// - Automatic HTML tag selection
// - Inherits all Atom capabilities (polymorphism, theming, etc.)
//
// Usage:
//   <Text variant="p">Paragraph text</Text>
//   <Text variant="blockquote">Quote text</Text>
//   <Text as="h1" variant="inline">Custom heading</Text>
//
// =============================================================================

import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../../lib"
import { resolveAtomTokens } from "../../lib/core/atom"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { asSmartSlot } from "../core/SmartSlot"

// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

/**
 * Typography variants for Text component
 * Each variant defines both visual styling and semantic meaning
 */
const textVariants = cva("leading-normal m-0 p-0 break-words", {
  variants: {
    variant: {
      /** Large numbers or emphasis text */
      number: "",
      /** Paragraph text with proper spacing */
      p: "block leading-relaxed [&:not(:first-child)]:mt-6",
      /** Blockquote with visual quote styling */
      blockquote: "block border-l-2 border-gray pl-4 my-2 py-2",
    },
  },
})

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * Own props that belong specifically to Text
 * Currently just the variant selection
 */
type TextOwnProps = VariantProps<typeof textVariants>

/**
 * Complete polymorphic props for Text
 * Combines Atom's props with Text's own props
 * This is the public API that consumers will use
 */
export type TextProps = AtomProps & TextOwnProps

export type TextPolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, TextProps>
// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Text - Typography component with semantic variants
 *
 * Extends Atom to provide:
 * - Automatic HTML tag selection based on variant
 * - Typography-specific styling
 * - Semantic meaning through variants
 *
 * @template T - The element type to render as (defaults based on variant)
 */
export const Text = forwardRefPolymorphic<"span", TextProps>(
  function Text<T extends React.ElementType = "span">(
    { variant, ...props }: TextPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const { as, asChild, className, ...rest } = resolveAtomTokens(props);

    // Automatic tag selection
    // -----------------------------

    /**
     * Determine the HTML element to render based on variant
     * Priority: explicit 'as' prop > variant-based selection > default
     *
     * Mapping:
     * - "p" variant → <p> tag
     * - "blockquote" variant → <blockquote> tag
     * - "inline" | "inlineBlock" variants → <span> tag
     * - all other variants → <div> tag
     */
    const element =
      as ??
      (variant === "p" ? "p"
        : variant === "blockquote" ? "blockquote"
          : "span")
    // Try to check if it's inline by props.. but we cannot be sure (cannot check all classes possible)
    // : (rest.display === "inline" || rest.display === "inlineBlock" || rest.inline === true || rest.inlineBlock === true) ? "span"
    // : "div")

    // Render
    // -----------------------------

    return (
      <Atom
        ref={ref}
        as={element as any} // Type assertion needed for polymorphic inference
        asChild={asChild}

        typo={variant}

        className={cn(textVariants({ variant }), className)}
        {...rest} // Spread remaining rest (color theme, style, event handlers, etc.)
      />
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartText = asSmartSlot(Text);