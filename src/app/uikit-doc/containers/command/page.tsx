// app/docs/command/page.tsx
"use client"

import * as React from "react"
import Link from "next/link"

// Import from your UI Kit alias (shadcn re-exports via @uikit)
import {
  Command,
  Header,
  Button,
  Text,
  Popover,
  Code,
} from "@uikit"

import { CardExample } from "../../components/CardExample"

export default function CommandDocsPage() {
  const [lastAction, setLastAction] = React.useState<string | null>(null)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* =============================================================================
          MAIN HEADER
      ============================================================================= */}
      <Header
        variant="main"
        title={<>Command</>}
        subtitle="Searchable command palette and filterable list with awesome a11y."
        description={
          <>
            <Code includeTag>Command</Code> provides a ready-made palette pattern: an input to filter,
            a list with keyboard navigation, optional groups, and shortcuts.
            It's the building block behind Combobox-like UIs (often wrapped in a <Code includeTag>Popover</Code>) to build <Text typo="link" as={Link} href="/uikit-doc/form/select">Select</Text> or <Text typo="link" as={Link} href="/uikit-doc/form/multiselect">MultiSelect</Text> components.
            <br />
            <Text weight="semibold">Built with accessibility in mind - full a11y/ARIA support, keyboard navigation, and screen reader announcements.</Text>
          </>
        }
      />

      {/* =============================================================================
          BASIC
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Basic usage</>}
        subtitle="Input + list with built-in filtering and keyboard nav"
        description={
          <>
            Type to filter; use <kbd>↑</kbd>/<kbd>↓</kbd> to navigate and <kbd>Enter</kbd> to select.
          </>
        }
      />
      <CardExample title="Basic Command" description="Minimal palette with a few actions.">
        <div className="max-w-md">
          <Command.Root className="rounded-lg border shadow-sm">
            <Command.Input placeholder="Type a command…" />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group heading="General">
                <Command.Item onSelect={() => alert("New File")}>
                  New File
                  <Command.Shortcut>⌘N</Command.Shortcut>
                </Command.Item>
                <Command.Item onSelect={() => alert("Open…")}>
                  Open…
                  <Command.Shortcut>⌘O</Command.Shortcut>
                </Command.Item>
                <Command.Item onSelect={() => alert("Save")}>
                  Save
                  <Command.Shortcut>⌘S</Command.Shortcut>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          GROUPS & SEPARATORS
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Groups & separators</>}
        subtitle="Organize commands by context"
        description={
          <>
            Use <Code includeTag>CommandGroup</Code> and <Code includeTag>CommandSeparator</Code> to structure large palettes.
          </>
        }
      />
      <CardExample title="Grouped commands" description="Logical sections with headings and a separator.">
        <div className="max-w-md">
          <Command.Root className="rounded-lg border shadow-sm">
            <Command.Input placeholder="Search settings…" />
            <Command.List>
              <Command.Empty>Nothing here.</Command.Empty>

              <Command.Group heading="Profile">
                <Command.Item onSelect={() => alert("Edit profile")}>Edit profile</Command.Item>
                <Command.Item onSelect={() => alert("Change avatar")}>Change avatar</Command.Item>
              </Command.Group>

              <Command.Separator />

              <Command.Group heading="Notifications">
                <Command.Item onSelect={() => alert("Enable notifications")}>Enable</Command.Item>
                <Command.Item onSelect={() => alert("Disable notifications")}>Disable</Command.Item>
              </Command.Group>
            </Command.List>
          </Command.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          EMPTY STATE & HINTS
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Empty state</>}
        subtitle="Custom message when no results match"
        description={
          <>
            <Code includeTag>CommandEmpty</Code> renders automatically when the filter yields no items.
          </>
        }
      />
      <CardExample title="Empty state" description="Try typing something that does not exist.">
        <div className="max-w-md">
          <Command.Root className="rounded-lg border shadow-sm">
            <Command.Input placeholder="Filter fruits…" />
            <Command.List>
              <Command.Empty>No fruit found. Try “apple”.</Command.Empty>
              <Command.Group heading="Fruits">
                <Command.Item>Apple</Command.Item>
                <Command.Item>Banana</Command.Item>
                <Command.Item>Cherry</Command.Item>
              </Command.Group>
            </Command.List>
          </Command.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          KEYBOARD SHORTCUTS
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Shortcuts</>}
        subtitle="Display and handle keyboard combos"
        description={
          <>
            Visual hints via <Code includeTag>CommandShortcut</Code>. Actual key handling is up to you (e.g., global <kbd>⌘K</kbd> to open a palette).
          </>
        }
      />
      <CardExample title="Shortcuts UI" description="Show familiar shortcuts on items.">
        <div className="max-w-md">
          <Command.Root className="rounded-lg border shadow-sm">
            <Command.Input placeholder="Type to filter…" />
            <Command.List>
              <Command.Group heading="Files">
                <Command.Item onSelect={() => alert("New file")}>
                  New file <Command.Shortcut>⌘N</Command.Shortcut>
                </Command.Item>
                <Command.Item onSelect={() => alert("Open file")}>
                  Open… <Command.Shortcut>⌘O</Command.Shortcut>
                </Command.Item>
                <Command.Item onSelect={() => alert("Save file")}>
                  Save <Command.Shortcut>⌘S</Command.Shortcut>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          SELECTION HANDLING
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Selection handling</>}
        subtitle="Use onSelect to update outside state"
        description={
          <>
            Items call <Code includeTag>onSelect</Code> with their text value; update your state and close a surrounding Popover/ Dialog if needed.
          </>
        }
      />
      <CardExample
        title="Capture selection"
        description="Click an item to update external state."
      >
        <div className="max-w-md space-y-3">
          <Command.Root className="rounded-lg border shadow-sm">
            <Command.Input placeholder="Pick a color…" />
            <Command.List>
              <Command.Empty>No color found.</Command.Empty>
              <Command.Group heading="Colors">
                {["Red", "Green", "Blue", "Violet"].map((c) => (
                  <Command.Item key={c} onSelect={() => setLastAction(`Selected: ${c}`)}>
                    {c}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command.Root>

          <Text className="text-sm text-muted-foreground">
            {lastAction ?? "No selection yet."}
          </Text>
        </div>
      </CardExample>

      {/* =============================================================================
          ASYNC / LOADING MOCK
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Async data (mock)</>}
        subtitle="Populate items after an async fetch"
        description={
          <>
            Load options asynchronously and render them into the list; the input keeps filtering as items arrive.
          </>
        }
      />
      <CardExample title="Async load" description="Simulated fetch with a loading placeholder.">
        <AsyncCommandDemo />
      </CardExample>

      {/* =============================================================================
        USAGE WITH POPOVER (Combobox-style)
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Usage with Popover</>}
        subtitle="Build a Combobox-style dropdown"
        description={
          <>
            Wrap <Code includeTag>Command</Code> in a <Code includeTag>Popover</Code> to create a searchable dropdown.
            The trigger opens the popover; <Code includeTag>CommandInput</Code> filters items; selecting an
            item updates state and closes the popover.
          </>
        }
      />

      <CardExample
        title="Combobox (Popover + Command)"
        description="A minimal searchable dropdown using Command inside a Popover."
        note={
          <div className="text-sm">
            <strong>Notes:</strong> keep <Code includeTag>CommandList</Code> capped (e.g. <Code>max-h-60</Code>), and make sure your
            trigger component forwards its ref when using <Code>asChild</Code>. Avoid using a separate <Code includeTag>PopoverAnchor</Code>
            from the trigger in this setup.
          </div>
        }
      >
        <ComboboxDemo />
      </CardExample>

      {/* =============================================================================
          BEST PRACTICES
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Best practices</>}
        subtitle="Keep it fast, accessible, predictable"
        description={
          <>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prefer short, searchable labels; support keyboard from the start.</li>
              <li>Keep groups small; use separators and headings for clarity.</li>
              <li>For Combobox UIs, wrap <Code includeTag>Command</Code> in a <Code includeTag>Popover</Code> triggered by a button or input.</li>
              <li>Use <Code includeTag>CommandEmpty</Code> for helpful “no results” hints.</li>
            </ul>
          </>
        }
      />

      {/* =============================================================================
          RELATED
      ============================================================================= */}
      <div className="rounded-lg border p-6">
        <h3 className="font-semibold mb-2">Related</h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>
            <Link className="text-primary hover:underline" href="/docs/popover">
              Popover
            </Link>{" "}
            – wrap Command to build a Combobox-like dropdown.
          </li>
          <li>
            <Link className="text-primary hover:underline" href="/docs/combobox">
              Combobox
            </Link>{" "}
            – a composition that uses Popover + Command.
          </li>
        </ul>
      </div>

    </div>
  )
}

/* =============================================================================
   ASYNC DEMO COMPONENT
============================================================================= */

function AsyncCommandDemo() {
  const [loading, setLoading] = React.useState(true)
  const [items, setItems] = React.useState<string[]>([])

  React.useEffect(() => {
    const t = setTimeout(() => {
      setItems(["Amsterdam", "Berlin", "Copenhagen", "Dublin", "Edinburgh", "Florence"])
      setLoading(false)
    }, 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="max-w-md">
      <Command.Root className="rounded-lg border shadow-sm">
        <Command.Input placeholder="Search cities…" />
        <Command.List>
          {loading ? (
            <div className="p-3 text-sm text-muted-foreground">Loading…</div>
          ) : (
            <>
              <Command.Empty>No city found.</Command.Empty>
              <Command.Group heading="Cities">
                {items.map((city) => (
                  <Command.Item key={city} onSelect={() => alert(city)}>
                    {city}
                  </Command.Item>
                ))}
              </Command.Group>
            </>
          )}
        </Command.List>
      </Command.Root>
    </div>
  )
}


/* =============================================================================
   Combobox Demo (Popover + Command) with ⌘K / Ctrl+K hotkey
============================================================================= */

function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string | null>(null)

  // ⌘K / Ctrl+K toggles the popover
  React.useEffect(() => {
    const isTypingElement = (el: EventTarget | null) => {
      const node = el as HTMLElement | null
      if (!node) return false
      const tag = node.tagName?.toLowerCase()
      return node.isContentEditable || tag === "input" || tag === "textarea" || tag === "select"
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        if (isTypingElement(e.target)) return
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const isMac = true //typeof window !== "undefined" && /Mac|iP(hone|ad|od)/.test(navigator.platform)

  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Dragonfruit", value: "dragonfruit" },
    { label: "Grapes", value: "grapes" },
    { label: "Orange", value: "orange" },
  ]
  const selected = options.find(o => o.value === value)?.label ?? "Select a fruit…"

  return (
    <div className="w-full max-w-md">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button role="combobox" aria-expanded={open} className="w-full justify-between" variant="outline">
            {selected}
            <span aria-hidden className="ml-2 text-muted-foreground">{isMac ? "⌘K" : "Ctrl K"}</span>
          </Button>
        </Popover.Trigger>

        <Popover.Content className="p-0 w-[--popover-width] min-w-[14rem]" align="start" sideOffset={6}>
          <Command.Root className="w-[--popover-width] [--popover-width:14rem]">
            <Command.Input placeholder="Search fruits…" />
            <Command.List className="max-h-60 overflow-auto">
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group heading="Fruits">
                {options.map((opt) => (
                  <Command.Item
                    selected={opt.value === value}
                    key={opt.value}
                    onSelect={() => {
                      setValue(opt.value)
                      setOpen(false)
                    }}
                    aria-selected={value === opt.value}
                  >
                    {opt.label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command.Root>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}
