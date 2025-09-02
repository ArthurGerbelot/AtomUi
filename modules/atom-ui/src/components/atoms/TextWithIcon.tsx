import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib"
import { resolveAtomTokens } from "../../lib/core/atom"
import { sizeWithGapVariants } from "../../tokens/base/base"
import { asSmartSlot, Atom, AtomProps, createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot } from "../core"
import { SmartText, TextProps } from "./Text"
import { IconProps, SmartIcon } from "./Icon"

// =============================================================================
// TEXT WITH ICON
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography]
// -----------------------------------------------------------------------------
// Text with icon component (for inline text with icon)
// =============================================================================

// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

const textWithIconVariants = cva("inline whitespace-nowrap", {
  variants: {
    iconPosition: {
      left: "",
      right: "",
    },
    size: sizeWithGapVariants, // text-size still applies; gap is inert in inline context
  },
  defaultVariants: {
    iconPosition: "left",
    size: "md",
  },
})

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

// Smart Slot types
// ------------------------------

type TextWithIconTextPart = SmartSlot<TextProps, "text">
type TextWithIconIconPart = SmartSlot<IconProps, "icon">

// Component types
// ------------------------------

export type TextWithIconOwnProps = VariantProps<typeof textWithIconVariants>
  & TextWithIconTextPart
  & TextWithIconIconPart

type TextWithIconProps = AtomProps & TextWithIconOwnProps

type TextWithIconPolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, TextWithIconProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Text with icon component (for inline text with icon)
 */
export const TextWithIcon = forwardRefPolymorphic<"span", TextWithIconProps>(
  function TextWithIcon<T extends React.ElementType = "span">(
    props: TextWithIconPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      icon, iconProps, Icon,
      text, textProps, Text,
      iconPosition = "left",
      children,
      size = "md",
      ...restProps
    } = props;

    const { as, asChild, className, ...rest } = resolveAtomTokens(restProps)

    const textSpecs = createSmartSlotSpecs<TextProps>(text || children, textProps, Text);
    const iconSpecs = createSmartSlotSpecs<IconProps>(icon, iconProps, Icon);

    // Ensure inner text renders inline (span) to avoid line breaks inside sentences
    textSpecs.props = {
      ...(textSpecs.props as any),
      inline: true,
      as: (textSpecs.props as any)?.as ?? 'span',
    } as any;

    // Inline layout: compute icon margin based on position/size
    const marginMap: Record<NonNullable<typeof size>, { left: string; right: string }> = {
      xs: { left: "mr-1", right: "ml-1" },
      sm: { left: "mr-1.5", right: "ml-1.5" },
      md: { left: "mr-2", right: "ml-2" },
      lg: { left: "mr-2.5", right: "ml-2.5" },
      xl: { left: "mr-3", right: "ml-3" },
    } as const

    const resolvedSize = (size ?? 'md') as keyof typeof marginMap

    iconSpecs.props = {
      ...(iconSpecs.props as any),
      className: cn(
        iconPosition === "left" ? marginMap[resolvedSize].left : marginMap[resolvedSize].right,
        "inline-block align-middle",
        (iconSpecs.props as any)?.className
      ),
    } as any

    const contentLeft = (
      <>
        <SmartIcon size={size} specs={iconSpecs} />
        <SmartText size={size} specs={textSpecs} />
      </>
    )
    const contentRight = (
      <>
        <SmartText size={size} specs={textSpecs} />
        <SmartIcon size={size} specs={iconSpecs} />
      </>
    )

    return (
      <Atom
        ref={ref}
        as={(as ?? "span") as any}
        asChild={asChild}
        className={cn("inline-flex items-center", textWithIconVariants({ iconPosition, size }), className)}
        {...rest}
      >
        {iconPosition === "right" ? contentRight : contentLeft}
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartTextWithIcon = asSmartSlot(TextWithIcon);