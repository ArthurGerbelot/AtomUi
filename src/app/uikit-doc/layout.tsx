'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ColorModeButton } from "@uikit/nextjs"


export default function UIKitDocLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <a href="/uikit-doc">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Bull Bitcoin<br />UIKit Doc.</h1>
            </a>
            <ColorModeButton />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-6 overflow-y-auto no-scrollbar">
          {/* Core Components */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Core Components
            </h3>
            <div className="space-y-1">
              <NavLink href="/uikit-doc/core/atom" isActive={pathname === "/uikit-doc/core/atom"}>
                Atom
              </NavLink>
              <NavLink href="/uikit-doc/core/atom-tokens" isActive={pathname === "/uikit-doc/core/atom-tokens"}>
                Atom Tokens
              </NavLink>
              <NavLink href="/uikit-doc/core/atom-polymorphism" isActive={pathname === "/uikit-doc/core/atom-polymorphism"}>
                Atom Polymorphism
              </NavLink>
              <NavLink href="/uikit-doc/core/how-to-extend-atom" isActive={pathname === "/uikit-doc/core/how-to-extend-atom"}>
                How to extend Atom
              </NavLink>
              <NavLink href="/uikit-doc/core/slot-and-smartslot" isActive={pathname === "/uikit-doc/core/slot-and-smartslot"}>
                Slot & SmartSlot
              </NavLink>
              <NavLink href="/uikit-doc/core/advanced-smartslot" isActive={pathname === "/uikit-doc/core/advanced-smartslot"}>
                Advanced SmartSlot
              </NavLink>
            </div>
          </div>

          {/* Content & Typography */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Theme
            </h3>
            <div className="space-y-1">
              <NavLink href="/uikit-doc/theme/colors" isActive={pathname === "/uikit-doc/theme/colors"}>
                Colors
              </NavLink>
              <NavLink href="/uikit-doc/theme/surfaces" isActive={pathname === "/uikit-doc/theme/surfaces"}>
                Surfaces
              </NavLink>
            </div>
          </div>


          {/* Content & Typography */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Content & Typography
            </h3>
            <div className="space-y-1">
              <NavLink href="/uikit-doc/typo/text" isActive={pathname === "/uikit-doc/typo/text"}>
                Typography
              </NavLink>
              <NavLink href="/uikit-doc/typo/header" isActive={pathname === "/uikit-doc/typo/header"}>
                Heading & Header
              </NavLink>
              <NavLink href="/uikit-doc/typo/icon" isActive={pathname === "/uikit-doc/typo/icon"}>
                Icons
              </NavLink>
              <NavLink href="/uikit-doc/typo/text-with-icon" isActive={pathname === "/uikit-doc/typo/text-with-icon"}>
                Text with Icon
              </NavLink>
              <NavLink href="/uikit-doc/typo/text-with-label" isActive={pathname === "/uikit-doc/typo/text-with-label"}>
                Text with Label
              </NavLink>
              <NavLink href="/uikit-doc/typo/badge" isActive={pathname === "/uikit-doc/typo/badge"}>
                Badge
              </NavLink>
              <NavLink href="/uikit-doc/typo/list" isActive={pathname === "/uikit-doc/typo/list"}>
                List
              </NavLink>
              <NavLink href="/uikit-doc/typo/code" isActive={pathname === "/uikit-doc/typo/code"}>
                Code
              </NavLink>
            </div>
          </div>

          {/* Interactive Elements */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Interactive Elements
            </h3>
            <div className="space-y-1">
              <NavLink href="/uikit-doc/interactible/button" isActive={pathname === "/uikit-doc/interactible/button"}>
                Button
              </NavLink>
              <NavLink href="/uikit-doc/interactible/icon-button" isActive={pathname === "/uikit-doc/interactible/icon-button"}>
                Icon Button
              </NavLink>
              <NavLink href="/uikit-doc/interactible/calendar" isActive={pathname === "/uikit-doc/interactible/calendar"}>
                Calendar
              </NavLink>
            </div>
          </div>

          {/* Forms */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Forms
            </h3>
            <div className="space-y-1">
              <NavLink href="/uikit-doc/form/input" isActive={pathname === "/uikit-doc/form/input"}>
                Input
              </NavLink>
              <NavLink href="/uikit-doc/form/checkbox" isActive={pathname === "/uikit-doc/form/checkbox"}>
                Checkbox
              </NavLink>
              <NavLink href="/uikit-doc/form/radio" isActive={pathname === "/uikit-doc/form/radio"}>
                Radio
              </NavLink>
              <NavLink href="/uikit-doc/form/simple-select" isActive={pathname === "/uikit-doc/form/simple-select"}>
                SimpleSelect
              </NavLink>
              <NavLink href="/uikit-doc/form/select" isActive={pathname === "/uikit-doc/form/select"}>
                Select
              </NavLink>
              <NavLink href="/uikit-doc/form/multi-select" isActive={pathname === "/uikit-doc/form/multi-select"}>
                MultiSelect
              </NavLink>
              <NavLink href="/uikit-doc/form/datepicker" isActive={pathname === "/uikit-doc/form/datepicker"}>
                DatePicker
              </NavLink>
            </div>
          </div>

          {/* Layout & Structure */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Layout & Structure
            </h3>
            <div className="space-y-1">
              <NavLink href="/uikit-doc/layout" isActive={pathname === "/uikit-doc/layout"}>
                Layout
              </NavLink>
              <NavLink href="/uikit-doc/layout/accordion" isActive={pathname === "/uikit-doc/layout/accordion"}>
                Accordion
              </NavLink>
            </div>
          </div>

          {/* Complex Components */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Containers
            </h3>
            <div className="space-y-1">
              <NavLink href="/uikit-doc/containers/card" isActive={pathname === "/uikit-doc/containers/card"}>
                Card
              </NavLink>
              <NavLink href="/uikit-doc/containers/popover" isActive={pathname === "/uikit-doc/containers/popover"}>
                Popover
              </NavLink>
              <NavLink href="/uikit-doc/containers/dialog" isActive={pathname === "/uikit-doc/containers/dialog"}>
                Dialog
              </NavLink>
              <NavLink href="/uikit-doc/containers/command" isActive={pathname === "/uikit-doc/containers/command"}>
                Command
              </NavLink>
            </div>
          </div>

          {/* Utilities & Tools */}
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider mb-3">
              Utilities & Tools
            </h3>
            <div className="space-y-1">
              <div className="space-y-1">
                <NavLink href="/uikit-doc/tools/choices" isActive={pathname === "/uikit-doc/tools/choices"}>
                  Choices
                </NavLink>
                <NavLink href="/uikit-doc/tools/confirm-action" isActive={pathname === "/uikit-doc/tools/confirm-action"}>
                  Confirm Action
                </NavLink>
              </div>
              <NavLink href="/uikit-doc/test" isActive={pathname === "/uikit-doc/test"}>
                Test
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-400 dark:text-gray-600">
            <p>React UIKit</p>
            <p>Component Library</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-full">
          {children}
        </div>
      </div>
      {/*
      <div className="w-64 bg-sidebar flex flex-col">
        On this page:
      </div> */}
    </div>
  )
}

// NavLink component for consistent styling
function NavLink({
  href,
  isActive,
  children
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`
        block py text-sm font-medium transition-colors relative px-4
        ${isActive
          ? 'bg-accent text-accent-foreground after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-0.5 after:h-5 after:bg-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 dark:after:bg-zinc-100'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
        }
      `}
    >
      <div className="font-medium">{children}</div>
    </Link>
  )
}