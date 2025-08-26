import * as React from "react"

import { resolveAtomTokens } from "../../lib"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { Card, type CardProps } from "../molecules/Card"
import { asSmartSlot } from "../core/SmartSlot"
import type { ColorTheme, Surface } from "../../tokens"
import { IconSuccess, IconError, IconWarning, IconInfo, IconBitcoin, IconLNBTC, IconLBTC } from "./IconLibrary"

// =============================================================================
// Alert
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Container]
// -----------------------------------------------------------------------------
// Alert component - semantic wrapper around Card for notifications and messages
// =============================================================================

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

// Get default icon for each variant
const getDefaultIcon = (variant?: ColorTheme) => {
  switch (variant) {
    case "success": return <IconSuccess />
    case "error": return <IconError />
    case "warning": return <IconWarning />
    case "info": return <IconInfo />
    case "bitcoin": return <IconBitcoin />
    case "lightning": return <IconLNBTC />
    case "liquid": return <IconLBTC />
    default: return undefined
  }
}

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

// Alert's own props
type AlertOwnProps = {
  // Use ColorTheme directly for semantic variants
  variant?: ColorTheme
}

// Public API - combines Alert props + Card props (minus conflicting ones)
export type AlertProps = Omit<CardProps, 'variant'> & AlertOwnProps

// Make it polymorphic
export type AlertPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, AlertProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

export const Alert = forwardRefPolymorphic<"div", AlertProps>(
  function Alert<T extends React.ElementType = "div">(
    {
      // Alert's own props
      variant, // ColorTheme or undefined
      surface = "outline",
      // Card props
      // Icon,
      // Polymorphic props
      as, asChild, children,
      // Remaining Card props
      ...props
    }: AlertPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    // Resolve atom tokens from remaining props
    const { ...rest } = resolveAtomTokens(props);

    // Use provided Icon or default icon based on variant
    // const resolvedIcon = Icon !== undefined ? Icon : getDefaultIcon(variant);

    return (
      <Card
        ref={ref}
        as={(as ?? "div") as any}
        data-role="alert"
        variant="alert"
        asChild={asChild}
        surface={surface}
        colorTheme={variant || "low-contrast"}
        Icon={getDefaultIcon(variant)}
        {...rest}
      >
        {children}
      </Card>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartAlert = asSmartSlot(Alert);
