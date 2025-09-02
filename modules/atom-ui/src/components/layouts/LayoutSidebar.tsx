'use client'

import * as React from "react"
import { Sidebar } from "../molecules/Sidebar"
import { ScrollArea } from "../molecules/ScrollArea"
import { Code } from "../atoms/Code"
import { Tooltip } from "../molecules/Tooltip"
import { cn } from "../../lib"

// =============================================================================
// LAYOUT SIDEBAR
// -----------------------------------------------------------------------------
// [Layout] [Composition] [Wrapper]
// -----------------------------------------------------------------------------
// Reusable sidebar layout
// =============================================================================

export interface LayoutSidebarProps {
  /** Sidebar content (menu, navigation, etc.) */
  content: React.ReactNode

  /** Optional sidebar header */
  header?: React.ReactNode

  /** Optional sidebar footer */
  footer?: React.ReactNode

  /** Main content of the page */
  children: React.ReactNode

  /** Side of the sidebar - default: "left" */
  side?: "left" | "right"

  /** Collapsible mode - default: "offcanvas" */
  collapsible?: "offcanvas" | "icon" | "none"

  /** Default open state - default: true */
  defaultOpen?: boolean

  /** Show trigger with tooltip - default: true */
  showTrigger?: boolean

  /** Text of the trigger tooltip - default: "Ctrl/Cmd + B" */
  triggerTooltip?: React.ReactNode

  /** Unique ID for this sidebar instance - default: "main" */
  id?: string

  /** Disable keyboard shortcut for this sidebar - default: false */
  disableKeyboardShortcut?: boolean

  /** Additional props for the main container */
  className?: string
}

export function LayoutSidebar({
  content,
  header,
  footer,
  children,
  side = "left",
  collapsible = "offcanvas",
  defaultOpen = true,
  showTrigger = true,
  triggerTooltip = <Code>Ctrl/Cmd + B</Code>,
  id = "main",
  disableKeyboardShortcut = false,
  className,
}: LayoutSidebarProps) {


  const sidebarRoot = (
    <Sidebar.Root key="root" side={side} collapsible={collapsible}>
      {header && (
        <Sidebar.Header>
          {header}
        </Sidebar.Header>
      )}

      <Sidebar.Content>
        <ScrollArea className="h-full">
          <div className="p-2 space-y-2">
            {content}
          </div>
        </ScrollArea>
      </Sidebar.Content>

      {footer && (
        <Sidebar.Footer>
          {footer}
        </Sidebar.Footer>
      )}
    </Sidebar.Root>
  )

  const sidebarInset = (
    <Sidebar.Inset key="inset">
      <div className="relative h-full w-full">
        {showTrigger && (
          <div className={`absolute top-4 ${side === "left" ? "left-4" : "right-4"} z-50 flex items-center gap-2`}>
            <Tooltip tooltip={triggerTooltip} tooltipProps={{ side: side === "left" ? "right" : "left" }}>
              <Sidebar.Trigger side={side} />
            </Tooltip>
          </div>
        )}

        <ScrollArea className="h-full w-full">
          <div className="min-w-0 @container/main">
            {children}
          </div>
        </ScrollArea>
      </div>
    </Sidebar.Inset>
  )

  return (
    <Sidebar.Provider
      defaultOpen={defaultOpen}
      id={id}
      disableKeyboardShortcut={disableKeyboardShortcut}
    >
      <div className={cn(
        "flex h-screen",
        className
      )}>
        {side === "left" ? [sidebarRoot, sidebarInset] : [sidebarInset, sidebarRoot]}
      </div>
    </Sidebar.Provider>
  )
}
