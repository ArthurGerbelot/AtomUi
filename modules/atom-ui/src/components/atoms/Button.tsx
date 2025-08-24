import * as React from "react"

import { SmartIcon, SmartText } from "."
import { cn } from "../../lib/tailwind-utils"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core"
import { BaseButton, BaseButtonProps } from "../base/BaseButton"
import { asSmartSlot, createSmartSlotSpecs, type SmartSlot } from "../core/SmartSlot"
import { IconProps, TextProps } from "."


// =============================================================================
// Button
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Interactive]
// -----------------------------------------------------------------------------
// Button component (with text and icon)
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

// SmartSlot types for Button parts

type ButtonTextPart = SmartSlot<TextProps, "text">
type ButtonIconPart = SmartSlot<IconProps, "icon">

// Own / Props / Polymorphic

type ButtonOwnProps = {
  iconPosition?: "left" | "right"
}
  & ButtonTextPart
  & ButtonIconPart

export type ButtonProps = BaseButtonProps & ButtonOwnProps // BaseButtonProps already extends AtomProps

export type ButtonPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, ButtonProps>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------
/**
 * Button component (with text and icon)
 *
 * @param props - ButtonProps
 * @returns Button component
 */
export const Button = forwardRefPolymorphic<"button", ButtonProps>(
  function Button<T extends React.ElementType = "button">(
    props: ButtonPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      icon, iconProps, Icon,
      text, textProps, Text,
      iconPosition = "left",
      className,
      children,

      asChild,

      size = "md", // Also get variant to be able to propagate it (to Text and Icon)

      ...rest
    } = props;


    const textSpecs = createSmartSlotSpecs<TextProps>(text || children, textProps, Text);
    const iconSpecs = createSmartSlotSpecs<IconProps>(icon, iconProps, Icon);

    return (
      <BaseButton
        asChild={asChild}
        size={size}
        className={cn(className)}
        ref={ref as any}
        {...rest as any}
      >
        {asChild ? children : (
          <>
            {iconPosition === "left" && (
              <SmartIcon size={size} specs={iconSpecs} />
            )}
            <SmartText size={size} specs={textSpecs}>{children}</SmartText>
            {iconPosition === "right" && (
              <SmartIcon size={size} specs={iconSpecs} />
            )}
          </>
        )}
      </BaseButton>
    )
  }
)


// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartButton = asSmartSlot(Button)