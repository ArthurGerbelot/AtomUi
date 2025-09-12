import React from "react"
import { IconButton, IconButtonPolymorphicProps, IconButtonProps } from "./IconButton"
import { IconArrowLeft, IconCopy } from "./IconLibrary"
import { asSmartSlot, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core"
import { clipboardCopy } from "@uikit/lib"
import { Tooltip } from "../molecules"


// =============================================================================
// CopyButton
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Interactive]
// -----------------------------------------------------------------------------
// IconButton variant for copy to clipboard
// =============================================================================

export type CopyButtonProps = IconButtonProps & {
  copy: string,
  tooltipMessage?: string,
  successMessage?: string
}

export type CopyButtonPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, CopyButtonProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * IconButton variant for copy to clipboard
 *
 * @param props - CopyButtonProps
 */
export const CopyButton = forwardRefPolymorphic<"button", CopyButtonProps>(
  function CopyButton<T extends React.ElementType = "button">(
    {
      size, icon,
      copy,
      tooltipMessage = "Copy to clipboard",
      successMessage = "Copied to clipboard",
      onClick,
      ...props
    }: CopyButtonPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return (
      <Tooltip tooltip={tooltipMessage}>

        <IconButton
          size={size ?? "sm"}

          ref={ref as any}
          icon={icon ?? IconCopy}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            clipboardCopy(copy);
            // TODO
            // toast.success(successMessage);
            onClick?.(e);
          }}
          {...props as any}
        />
      </Tooltip>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartCopyButton = asSmartSlot(CopyButton);