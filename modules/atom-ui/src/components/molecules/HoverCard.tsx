"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "../../lib"
import { surfaceVariants } from "../../tokens/surface/surface"

// =============================================================================
// HoverCard
// -----------------------------------------------------------------------------
// [Molecule] [Polymorphic] [Layout]
// -----------------------------------------------------------------------------
// HoverCard component built with Radix UI primitives for hover interactions
// =============================================================================


// =============================================================================
// Composed API
// =============================================================================

function HoverCardComposed({
  children,
  content,
  openDelay = 100, // Plus rapide que défaut (700ms)
  closeDelay,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root> & {
  children: React.ReactNode, // Trigger
  content: React.ReactNode,  // HoverCard content
  openDelay?: number,        // Délai d'ouverture en ms
  closeDelay?: number,       // Délai de fermeture en ms
}) {
  return (
    <HoverCardPrimitive.Root
      data-slot="hover-card"
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    >
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        {content}
      </HoverCardContent>
    </HoverCardPrimitive.Root>
  )
}



// =============================================================================
// Primitives
// =============================================================================


function HoverCardRoot({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          surfaceVariants.popover,
          " data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

// =============================================================================
// EXPORT
// =============================================================================

export const HoverCard = Object.assign(HoverCardComposed, {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
});
