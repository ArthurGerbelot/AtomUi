// app/debug/popover-anchor-fixed/page.tsx
"use client"

import * as React from "react"
import * as Popover from "@radix-ui/react-popover"

export default function DebugPopoverAnchorFixed() {
  const scopeRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="p-64">

      {/* Scope DOM: tout le portal sera rendu ici */}
      <div ref={scopeRef} className="relative min-h-[200px] border rounded p-6">
        <div className="mb-4 text-sm text-gray-500">
          Le portal Radix est <strong>scopé</strong> dans ce bloc.
        </div>

        <Popover.Root>
          {/* Anchor MESURABLE (asChild + inline-block) */}
          <Popover.Anchor asChild>
            <span className="inline-block px-3 py-2 rounded border bg-white">
              Anchor Box
            </span>
          </Popover.Anchor>

          {/* Trigger (même Root) */}
          <Popover.Trigger asChild>
            <button className="ml-3 px-3 py-2 rounded border bg-white">
              Toggle
            </button>
          </Popover.Trigger>

          {/* Portal SCOPÉ dans scopeRef (évite le <body> si global CSS casse tout) */}
          <Popover.Portal container={scopeRef.current ?? undefined}>
            <Popover.Content
              side="bottom"
              align="center"
              sideOffset={8}
              // 👇 Ajoute un style inline pour neutraliser un reset agressif éventuel
              style={{ position: "fixed" }}
              className="rounded border bg-white text-black shadow p-3 z-[9999]"
            >
              Anchored below the box (scoped portal)
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  )
}
