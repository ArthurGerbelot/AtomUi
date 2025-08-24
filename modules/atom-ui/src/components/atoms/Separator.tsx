import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "../../lib"

// =============================================================================
// Separator
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// Separator component (for Divider, etc.)
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  my?: number,
}

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------


/**
 * Separator component (for Divider, etc.)
 */
function Separator({
  orientation = "horizontal",
  decorative = true,

  // mx = 1,
  my = 4,

  className,
  style,

  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      style={{
        ...{
          "--separator-my": `${my}`,
          // "--separator-mx": `${mx}`,
        } as React.CSSProperties,
        ...style,
      }}
      className={
        cn(
          "bg-border shrink-0 " +
          "data-[orientation=horizontal]:my-[calc(var(--separator-my)*0.25rem)] data-[orientation=horizontal]:mx-auto " +
          "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full " +
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
          className
        )}
      {...props}
    />
  )
}

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export { Separator }
