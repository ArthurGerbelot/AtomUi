'use client'

import * as React from "react"
import { cn } from "../../lib"
import { ContainerSize } from "../../tokens/layout/layout"

// =============================================================================
// LayoutHeaderFooter
// -----------------------------------------------------------------------------
// [Layout] [Responsive]
// -----------------------------------------------------------------------------
// Layout component with header (left/right content) and footer sections
// =============================================================================

export interface LayoutHeaderFooterProps {
  children: React.ReactNode
  headerLeftContent?: React.ReactNode
  headerRightContent?: React.ReactNode
  footerContent?: React.ReactNode
  className?: string
  headerClassName?: string
  footerClassName?: string
  contentClassName?: string
  sticky?: boolean // Header collé en haut
  size?: ContainerSize | "full" // Taille du container (défaut: "full" = pleine largeur)
}

export function LayoutHeaderFooter({
  children,
  headerLeftContent,
  headerRightContent,
  footerContent,
  className,
  headerClassName,
  footerClassName,
  contentClassName,
  sticky = false,
  size = "full",
}: LayoutHeaderFooterProps) {
  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      className
    )}>
      {/* Header */}
      {(headerLeftContent || headerRightContent) && (
        <header className={cn(
          "bg-background border-b",
          sticky && "sticky top-0 z-40",
          headerClassName
        )}>
          <div className={cn(
            "px-4 py-3",
            size !== "full" ? `max-w-${size} mx-auto` : ""
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {headerLeftContent}
              </div>
              <div className="flex items-center">
                {headerRightContent}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1",
        contentClassName
      )}>
        {children}
      </main>

      {/* Footer */}
      {footerContent && (
        <footer className={cn(
          "bg-background mt-auto",
          footerClassName
        )}>
          <div className={cn(
            "px-4 py-6",
            size !== "full" ? `max-w-${size} mx-auto` : ""
          )}>
            {footerContent}
          </div>
        </footer>
      )}
    </div>
  )
}