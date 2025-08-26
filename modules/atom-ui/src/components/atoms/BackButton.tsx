import React from "react"
import { IconButton, IconButtonPolymorphicProps, IconButtonProps } from "./IconButton"
import { IconArrowLeft } from "./IconLibrary"
import { asSmartSlot, forwardRefPolymorphic, PolymorphicRef } from "../core"


// =============================================================================
// BackButton
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Interactive]
// -----------------------------------------------------------------------------
// IconButton variant for back navigation
// =============================================================================


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * IconButton variant for back navigation
 *
 * @param props - IconButtonProps
 */
export const BackButton = forwardRefPolymorphic<"button", IconButtonProps>(
  function BackButton<T extends React.ElementType = "button">(
    { size, icon, ...props }: IconButtonPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return <IconButton
      size={size ?? "xs"}

      ref={ref as any}
      icon={icon ?? <IconArrowLeft />}
      {...props as any}
    />
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartBackButton = asSmartSlot(BackButton);