'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ColorModeButton } from "@uikit/nextjs"
import { Sidebar, ScrollArea } from "@uikit"


export default function UIKitDocLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <Sidebar.Provider defaultOpen={true}>
      <div className="flex h-screen">

        <Sidebar.Root side="left" collapsible="offcanvas">
        </Sidebar.Root>

        <Sidebar.Inset>
          <div className="relative h-full w-full">
            <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
              <Sidebar.Trigger />
            </div>
            <div className="min-w-0 @container/main">
              {children}
            </div>
          </div>
        </Sidebar.Inset>

      </div>
    </Sidebar.Provider >
  )
}