import * as React from "react"
import { cva } from "class-variance-authority"

import { SmartIcon } from "../atoms"
import { cn } from "../../lib/tailwind-utils"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core"
import { BaseButton, type BaseButtonProps } from "../base/BaseButton"
import { asSmartSlot, createSmartSlotSpecs, type SmartSlot } from "../core/SmartSlot"
import { IconProps } from "../atoms"
import { Size } from "../../tokens/base/base"

// =============================================================================
// IconButton
// -----------------------------------------------------------------------------
// {Atomic} {Polymorphic} {SmartSlot} {Interactive}
// -----------------------------------------------------------------------------
// Button component composed only of an icon
// =============================================================================


// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

export const iconSizeVariants: Record<Size, string> = {
  xs: "text-xs p-1",
  sm: "text-sm p-1.5",
  md: "text-md p-2",
  lg: "text-lg p-3",
  xl: "text-xl p-4",
};
/* Local variants specific to IconButton */
const iconButtonVariants = cva("shrink-0 aspect-square gap-0 px-0 py-0 [&_svg]:block [&_svg]:align-text-bottom", {
  variants: {
    size: iconSizeVariants,
  },
})

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type IconButtonIconPart = SmartSlot<IconProps, "icon">

export type IconButtonOwnProps = {
  iconPosition?: "start" | "end"
}
  & IconButtonIconPart


export type IconButtonProps = BaseButtonProps & IconButtonOwnProps // BaseButtonProps already extends AtomProps

export type IconButtonPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, IconButtonProps>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------


/**
 * Button component composed only of an icon
 *
 * @param props - IconButtonProps
 * @returns IconButton component
 */
export const IconButton = forwardRefPolymorphic<"button", IconButtonProps>(
  function IconButton<T extends React.ElementType = "button">(
    props: IconButtonPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      icon, iconProps, Icon,
      className,
      children,

      size = "md", // Also get variant to be able to propagate it (to Text and Icon)

      variant = "ghost",
      colorTheme = "high-contrast",


      ...rest
    } = props;


    const iconSpecs = createSmartSlotSpecs<IconProps>(icon || children, iconProps, Icon);

    return (
      <BaseButton
        size={size}

        variant={variant}
        colorTheme={colorTheme}

        className={cn(iconButtonVariants({ size }), className)}
        ref={ref as any}
        {...rest as any}
      >
        <SmartIcon size={size} specs={iconSpecs} />
      </BaseButton>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartIconButton = asSmartSlot(IconButton);