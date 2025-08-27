'use client'

import React from "react"
import { ColorModeButton } from "@uikit/nextjs"
import { LayoutSidebar } from "@uikit"
import { Menu } from "./menu"


export default function UIKitDocLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutSidebar
      header={
        <div className="flex items-center justify-between px-2">
          <a href="/uikit-doc">
            <h1 className="text-lg font-bold">Bull Bitcoin<br />UIKit Doc.</h1>
          </a>
          <ColorModeButton />
        </div>
      }
      footer={
        <div className="text-xs text-muted-foreground">
          <p>React UIKit</p>
          <p>Component Library</p>
        </div>
      }
      content={<Menu />}
    >
      {children}
    </LayoutSidebar>
  )
}