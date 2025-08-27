"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib"
import { asSmartSlot, createSmartSlotSpecs, extractSmartSlotSpecs, SmartSlot } from "../core/SmartSlot"

// =============================================================================
// TOOLTIP
// -----------------------------------------------------------------------------
// [Molecule] [Polymorphic] [SmartSlot] [Container]
// -----------------------------------------------------------------------------
// Tooltip component
// =============================================================================



// =============================================================================
// TOOLTIP PROVIDER
// =============================================================================

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

// =============================================================================
// TOOLTIP COMPOSED
// =============================================================================

type ContentProps = SmartSlot<TooltipContentProps, "tooltip">;

type TooltipComposedProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
  children: React.ReactNode, // Trigger
} & ContentProps; // {tooltip, tooltipContent, TooltipContent}

function TooltipComposed({ children, ...props }: TooltipComposedProps) {
  const [specs, rest] = extractSmartSlotSpecs(props, "tooltip")

  return (
    <TooltipPrimitive.Root data-slot="tooltip" {...rest}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <SmartTooltipContent specs={specs} />
    </TooltipPrimitive.Root>
  )
}




// =============================================================================
// TOOLTIP PRIMITIVES
// =============================================================================



function TooltipRoot({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    // <TooltipProvider>
    <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    // </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}




// TooltipContent
// -----------------------------------------------------------------------------

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-background-inverse text-foreground-inverse animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-background-inverse fill-background-inverse z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

const SmartTooltipContent = asSmartSlot(TooltipContent);



export const Tooltip = Object.assign(TooltipComposed, {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
})

export { TooltipProvider }
