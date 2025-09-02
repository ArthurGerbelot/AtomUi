import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib"
import { resolveAtomTokens } from "../../lib/core/atom"
import { sizeVariants } from "../../tokens/base/base"
import { asSmartSlot, Atom, AtomProps, createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot } from "../core"
import { Text, SmartText, TextProps } from "./Text"

// =============================================================================
// TEXT WITH LABEL
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography]
// -----------------------------------------------------------------------------
// Text with label component (for inline text with label)
// =============================================================================

// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

const textWithLabelVariants = cva("inline", {
  variants: {
    size: sizeVariants, //
  },
  defaultVariants: {
  },
})

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

// Smart Slot types
// ------------------------------

type TextWithLabelTextPart = SmartSlot<TextProps, "text">
type TextWithLabelLabelPart = SmartSlot<TextProps, "label">

// Component types
// ------------------------------

export type TextWithLabelOwnProps = VariantProps<typeof textWithLabelVariants>
  & TextWithLabelTextPart
  & TextWithLabelLabelPart
  & {
    separator?: "arrow" | "colon" | "dash" | "space" | "none" | string
  }

type TextWithLabelProps = AtomProps & TextWithLabelOwnProps

type TextWithLabelPolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, TextWithLabelProps>

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

const getSeparatorContent = (separator: TextWithLabelOwnProps["separator"]) => {
  switch (separator) {
    case "arrow":
      return " → "
    case "colon":
      return ": "
    case "dash":
      return " - "
    case "space":
      return " "
    case "none":
      return ""
    default:
      return separator
  }
}

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Text with label component (for inline text with label)
 */
export const TextWithLabel = forwardRefPolymorphic<"span", TextWithLabelProps>(
  function TextWithLabel<T extends React.ElementType = "span">(
    props: TextWithLabelPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      label, labelProps, Label,
      text, textProps, Text: TextSlot,
      children,
      separator = "arrow",
      size = "md",
      ...restProps
    } = props;

    const { as, asChild, className, ...rest } = resolveAtomTokens(restProps)

    const textSpecs = createSmartSlotSpecs<TextProps>(text || children, textProps, TextSlot);
    const labelSpecs = createSmartSlotSpecs<TextProps>(label, labelProps, Label);

    const separatorContent = getSeparatorContent(separator);

    return (
      <Atom
        display="inline"
        ref={ref}
        as={(as ?? "span") as any}
        asChild={asChild}
        className={cn(textWithLabelVariants({ size }), className)}
        {...rest}
      >
        <SmartText display="inline-block" typo="label" size={size} specs={labelSpecs} />
        {separatorContent && (
          <Text
            className="mx-1"
            style={separator == "arrow" ? { transform: "translateY(-0.15em)" } : {}}
            textSize={size}
          >
            {separatorContent}
          </Text>
        )}
        <SmartText size={size} specs={textSpecs} />
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartTextWithLabel = asSmartSlot(TextWithLabel);
