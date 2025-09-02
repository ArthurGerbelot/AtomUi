"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../../lib"
import { surfaceVariants } from "../../tokens/surface/surface"

// =============================================================================
// Popover
// -----------------------------------------------------------------------------
// [Molecule] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// Popover component built with Radix UI primitives for floating content
// =============================================================================


// =============================================================================
// Composed API
// =============================================================================

function PopoverComposed({
  children,
  content,
  trigger = "click",
  openDelay = 50,
  closeDelay = 150,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root> & {
  children: React.ReactNode, // Trigger
  content: React.ReactNode,  // Popover content
  trigger?: "click" | "hover", // Trigger behavior
  openDelay?: number, // (hover mode)
  closeDelay?: number, // (hover mode)
}) {
  const [hoverOpen, setHoverOpen] = React.useState(false)

  // For hover trigger, use controlled state with hover area management
  if (trigger === "hover") {
    const isControlled = "open" in props
    const open = isControlled ? props.open : hoverOpen
    const onOpenChange = isControlled ? props.onOpenChange : setHoverOpen

    const openTimeoutRef = React.useRef<any>(null)
    const closeTimeoutRef = React.useRef<any>(null)

    const handleMouseEnter = () => {
      // Clear any pending close
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }

      // Open with delay if specified
      if (openDelay > 0) {
        openTimeoutRef.current = setTimeout(() => {
          onOpenChange && onOpenChange(true)
          openTimeoutRef.current = null
        }, openDelay)
      } else {
        onOpenChange && onOpenChange(true)
      }
    }

    const handleMouseLeave = () => {
      // Clear any pending open
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current)
        openTimeoutRef.current = null
      }

      // Close with delay
      closeTimeoutRef.current = setTimeout(() => {
        onOpenChange && onOpenChange(false)
        closeTimeoutRef.current = null
      }, closeDelay)
    }

    React.useEffect(() => {
      return () => {
        if (openTimeoutRef.current) {
          clearTimeout(openTimeoutRef.current)
        }
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
        }
      }
    }, [])

    return (
      <PopoverPrimitive.Root
        data-slot="popover"
        {...props}
        open={open}
        onOpenChange={onOpenChange}
      >
        <PopoverTrigger
          asChild
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {content}
        </PopoverContent>
      </PopoverPrimitive.Root>
    )
  }

  // Default click trigger behavior
  return (
    <PopoverPrimitive.Root data-slot="popover" {...props}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        {content}
      </PopoverContent>
    </PopoverPrimitive.Root>
  )
}



// =============================================================================
// Primitives
// =============================================================================


function PopoverRoot({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          surfaceVariants.popover + " data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

// =============================================================================
// EXPORT
// =============================================================================

export const Popover = Object.assign(PopoverComposed, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Anchor: PopoverAnchor
});
