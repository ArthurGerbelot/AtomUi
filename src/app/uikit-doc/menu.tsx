'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar } from "@uikit"

export function Menu() {
  const pathname = usePathname()

  return (
    <>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Core Components</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/core/atom"}>
                <Link href="/uikit-doc/core/atom">Atom</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/core/atom-tokens"}>
                <Link href="/uikit-doc/core/atom-tokens">Atom Tokens</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/core/atom-polymorphism"}>
                <Link href="/uikit-doc/core/atom-polymorphism">Atom Polymorphism</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/core/how-to-extend-atom"}>
                <Link href="/uikit-doc/core/how-to-extend-atom">How to extend Atom</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/core/slot-and-smartslot"}>
                <Link href="/uikit-doc/core/slot-and-smartslot">Slot & SmartSlot</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/core/advanced-smartslot"}>
                <Link href="/uikit-doc/core/advanced-smartslot">Advanced SmartSlot</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Theme</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/theme/colors"}>
                <Link href="/uikit-doc/theme/colors">Colors</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/theme/surfaces"}>
                <Link href="/uikit-doc/theme/surfaces">Surfaces</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/theme/spacing"}>
                <Link href="/uikit-doc/theme/spacing">Spacing</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Content & Typography</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/text"}>
                <Link href="/uikit-doc/typo/text">Typography</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/header"}>
                <Link href="/uikit-doc/typo/header">Heading & Header</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/icon"}>
                <Link href="/uikit-doc/typo/icon">Icons</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/text-with-icon"}>
                <Link href="/uikit-doc/typo/text-with-icon">Text with Icon</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/text-with-label"}>
                <Link href="/uikit-doc/typo/text-with-label">Text with Label</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/badge"}>
                <Link href="/uikit-doc/typo/badge">Badge</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/list"}>
                <Link href="/uikit-doc/typo/list">List</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/typo/code"}>
                <Link href="/uikit-doc/typo/code">Code</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Interactive Elements</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/interactible/button"}>
                <Link href="/uikit-doc/interactible/button">Button</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/interactible/icon-button"}>
                <Link href="/uikit-doc/interactible/icon-button">Icon Button</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/interactible/calendar"}>
                <Link href="/uikit-doc/interactible/calendar">Calendar</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Forms</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/form/input"}>
                <Link href="/uikit-doc/form/input">Input</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/form/checkbox"}>
                <Link href="/uikit-doc/form/checkbox">Checkbox</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/form/radio"}>
                <Link href="/uikit-doc/form/radio">Radio</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/form/simple-select"}>
                <Link href="/uikit-doc/form/simple-select">SimpleSelect</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/form/select"}>
                <Link href="/uikit-doc/form/select">Select</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/form/multi-select"}>
                <Link href="/uikit-doc/form/multi-select">MultiSelect</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/form/datepicker"}>
                <Link href="/uikit-doc/form/datepicker">DatePicker</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Containers</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/containers/card"}>
                <Link href="/uikit-doc/containers/card">Card</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/containers/popover"}>
                <Link href="/uikit-doc/containers/popover">Popover</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>

            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/containers/tooltip"}>
                <Link href="/uikit-doc/containers/tooltip">Tooltip & Rich Tooltip</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/containers/dialog"}>
                <Link href="/uikit-doc/containers/dialog">Dialog</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/containers/command"}>
                <Link href="/uikit-doc/containers/command">Command</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Content Layout</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-content"}>
                <Link href="/uikit-doc/layout-content">Stack & Grid</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-content/accordion"}>
                <Link href="/uikit-doc/layout-content/accordion">Accordion</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-content/tabs"}>
                <Link href="/uikit-doc/layout-content/tabs">Tabs</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-content/scroll-area"}>
                <Link href="/uikit-doc/layout-content/scroll-area">ScrollArea</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Page Structure</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-structure/sidebar"}>
                <Link href="/uikit-doc/layout-structure/sidebar">Sidebar Layout</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-structure/layout-header-footer"}>
                <Link href="/uikit-doc/layout-structure/layout-header-footer">LayoutHeaderFooter</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-structure/cards-layout"}>
                <Link href="/uikit-doc/layout-structure/cards-layout">Cards Columns Layout</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-structure/sheet"}>
                <Link href="/uikit-doc/layout-structure/sheet">Sheet</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/layout-structure/test"}>
                <Link href="/uikit-doc/layout-structure/test">Test Page Structure</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Utilities & Tools</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/tools/choices"}>
                <Link href="/uikit-doc/tools/choices">Choices</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/tools/confirm-action"}>
                <Link href="/uikit-doc/tools/confirm-action">Confirm Action</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/tools/skeleton"}>
                <Link href="/uikit-doc/tools/skeleton">Skeleton</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/uikit-doc/test"}>
                <Link href="/uikit-doc/test">Test</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </>
  )
}