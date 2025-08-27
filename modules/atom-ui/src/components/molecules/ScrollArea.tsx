"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "../../lib"


// =============================================================================
// ScrollArea
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// ScrollArea component for scrollable content with modular primitives
// =============================================================================


// =============================================================================
// ScrollAreaComposed - simple composition that mixes everything together
// =============================================================================

const ScrollAreaComposed = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ children, ...props }, ref) => {
  return (
    <ScrollAreaRoot
      {...props}
    >
      <ScrollAreaViewport ref={ref}>
        {children}
      </ScrollAreaViewport>
      <ScrollBar />
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
})
ScrollAreaComposed.displayName = "ScrollAreaComposed"

// =============================================================================
// Primitives
// =============================================================================

const ScrollAreaRoot = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </ScrollAreaPrimitive.Root>
  )
})
ScrollAreaRoot.displayName = "ScrollAreaRoot"
const ScrollAreaViewport = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ children, className, ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      data-slot="scroll-area-viewport"
      className={cn(
        "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
        className
      )}
      {...props}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
  )
})
ScrollAreaViewport.displayName = "ScrollAreaViewport"

const ScrollAreaCorner = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Corner>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Corner>
>((props, ref) => {
  return <ScrollAreaPrimitive.Corner ref={ref} {...props} />
})
ScrollAreaCorner.displayName = "ScrollAreaCorner"



const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
})
ScrollBar.displayName = "ScrollBar"


// =============================================================================
// Exports
// =============================================================================

export const ScrollArea = Object.assign(ScrollAreaComposed, {
  Root: ScrollAreaRoot,
  Bar: ScrollBar,
  Viewport: ScrollAreaViewport,
  Corner: ScrollAreaCorner
})
