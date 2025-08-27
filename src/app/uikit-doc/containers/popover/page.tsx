// app/docs/popover/page.tsx
"use client"

import * as React from "react"
import Link from "next/link"

// Import from your UI Kit alias (shadcn re-export via @uikit)
import {
  Button,
  Input,
  Text,
  Header,
  Card,
  List,
  Popover,
} from "@uikit"


import * as PopoverPrimitive from "@radix-ui/react-popover"

import { CardExample } from "../../components/CardExample"

export default function PopoverDocsPage() {
  // Controlled examples
  const [controlledOpen, setControlledOpen] = React.useState(false)
  const [formOpen, setFormOpen] = React.useState(false)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* =============================================================================
          MAIN HEADER
      ============================================================================= */}
      <Header
        variant="main"
        title={<>Popover</>}
        subtitle="Small overlay content positioned relative to a trigger."
        description={
          <>
            <code>Popover</code> displays contextual content next to a trigger without leaving the current view.
            It's perfect for lightweight menus, pickers, or quick forms. Built on Radix primitives via shadcn/ui.
          </>
        }
      />

      {/* =============================================================================
          BASIC
      ============================================================================= */}
      <Header
        variant="section"
        title={<>Composed API</>}
        subtitle="Trigger + content with safe defaults"
        description={
          <>
            Click the button to toggle the popover. Clicking outside will close it.
          </>
        }
      />
      <CardExample title="Basic Popover" description="Simple trigger/content pattern.">
        <Popover
          content={
            <div className="space-y-2">
              <Text className="font-semibold block">Hello there 👋</Text>
              <Text className="text-muted-foreground block">
                This is a small piece of contextual content.
              </Text>
              <div className="pt-2">
                <Link className="text-primary text-sm hover:underline" href="#">
                  Learn more
                </Link>
              </div>
            </div>
          }
        >
          <Button>Open Popover</Button>
        </Popover>
      </CardExample>

      {/* =============================================================================
          POSITIONING
      ============================================================================= */}
      <Header
        variant="section"
        title="Primitives"
        subtitle={<>Build your own</>}
        description={
          <>
            Use <code>side</code>, <code>align</code>, and <code>sideOffset</code> on <code>PopoverContent</code>.
          </>
        }
      />

      <Header
        variant="sub-section"
        title={<>Positioning</>}
        subtitle="Control side, align, and offsets"
        description={
          <>
            Use <code>side</code>, <code>align</code>, and <code>sideOffset</code> on <code>PopoverContent</code>.
          </>
        }
      />
      <CardExample title="Side & Align" description="Try different sides and alignments.">
        <div className="flex flex-wrap gap-4">
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button>Top / center</Button>
            </Popover.Trigger>
            <Popover.Content side="top" align="center" sideOffset={8}>
              <Text>Top aligned content</Text>
            </Popover.Content>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button>Right / start</Button>
            </Popover.Trigger>
            <Popover.Content side="right" align="start" sideOffset={8}>
              <Text>Right-start content</Text>
            </Popover.Content>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button>Bottom / end</Button>
            </Popover.Trigger>
            <Popover.Content side="bottom" align="end" sideOffset={8}>
              <Text>Bottom-end content</Text>
            </Popover.Content>
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <Button>Left / center</Button>
            </Popover.Trigger>
            <Popover.Content side="left" align="center" sideOffset={8}>
              <Text>Left centered content</Text>
            </Popover.Content>
          </Popover.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          INTERACTIVE CONTENT (FORM)
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Interactive content</>}
        subtitle="Use forms or pickers inside the popover"
        description={
          <>
            For closing from inside, switch to a <strong>controlled</strong> popover and set <code>open</code> via state.
          </>
        }
      />
      <CardExample
        title="Quick Form in Popover (controlled)"
        description="Inline rename form; closes on Save/Cancel by updating state."
      >
        <Popover.Root open={formOpen} onOpenChange={setFormOpen}>
          <Popover.Trigger asChild>
            <Button variant="outline">{formOpen ? "Close" : "Rename Item"}</Button>
          </Popover.Trigger>
          <Popover.Content className="w-72">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                alert(`Renamed to: ${data.get("name")}`)
                setFormOpen(false) // close after submit
              }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <Text typo="label">New name</Text>
                <Input id="name" name="name" placeholder="Type a new name…" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Popover.Content>
        </Popover.Root>
      </CardExample>

      {/* =============================================================================
          CONTROLLED STATE (BASIC)
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Controlled state</>}
        subtitle="Manage open/close with React state"
        description={
          <>
            Useful to sync state with URL, analytics, or other UI. You can also close the popover from internal actions.
          </>
        }
      />
      <CardExample
        title="Controlled Popover"
        description="Parent owns the open state; buttons can toggle or close explicitly."
      >
        <Popover.Root open={controlledOpen} onOpenChange={setControlledOpen}>
          <Popover.Trigger asChild>
            <Button variant={controlledOpen ? "secondary" : undefined}>
              {controlledOpen ? "Close" : "Open"} Controlled
            </Button>
          </Popover.Trigger>
          <Popover.Content className="w-64">
            <div className="space-y-2">
              <Text className="font-semibold block">Controlled popover</Text>
              <Text className="text-muted-foreground block">
                State is managed by the parent via <code>open</code> / <code>onOpenChange</code>.
              </Text>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => setControlledOpen(false)}>
                  Close
                </Button>
                <Button size="sm" onClick={() => alert("Action!")}>Action</Button>
              </div>
            </div>
          </Popover.Content>
        </Popover.Root>
      </CardExample>

      {/* =============================================================================
          ASCHILD & CUSTOM TRIGGERS
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Custom triggers with asChild</>}
        subtitle="Use any element/component as the trigger"
        description={
          <>
            Compose with your own components (anchor, icon button, etc.) while preserving styling and semantics.
          </>
        }
      />
      <CardExample title="asChild Trigger" description="Compose with your own links or buttons.">
        <Popover
          content={
            <Text>Triggered by an anchor via <code>asChild</code>.</Text>
          }
        >
          <a className="underline cursor-pointer text-primary">Open via link</a>
        </Popover>

        <Popover
          content={
            <Text>Custom Button trigger using asChild.</Text>
          }
        >
          <Button variant="ghost">Ghost Button Trigger</Button>
        </Popover>
      </CardExample>

      {/* =============================================================================
    ANCHORING
============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Anchoring</>}
        subtitle="Position relative to a non-trigger element"
        description={
          <>
            Wrap the target element with <code>PopoverAnchor asChild</code> so the popover
            measures it (not the trigger). The trigger can be anywhere inside the same
            <code>&lt;Popover&gt;</code>.
          </>
        }
      />

      <Card className="border-yellow-500/40 bg-yellow-500/10"
        title="🚨 Known Issue: Radix + Shadcn PopoverAnchor"

      >
        <div className="text-sm text-yellow-900">
          There's a bug when trying to use PopoverAnchor different from the trigger.
          We tried multiple approaches (with asChild, portals, nested providers, even manual anchors) and all ended up returning null or empty arrays.
          <br />
          <br />
          <Text weight="semibold">For now:</Text>

          <List>
            <List.Item>If you stick to the default trigger-as-anchor, everything works fine.</List.Item>
            <List.Item>If you need a custom anchor, it's broken — looks like a mismatch between Radix's expectations and how Shadcn wraps components.</List.Item>
          </List>
          <br />

          <Text>Since we don't currently rely on this pattern, it's not blocking.</Text>
        </div>
      </Card>

      <CardExample
        status="not-working"
        title="PopoverAnchor (correct usage)"
        description="Popover is anchored to the box, not the button."
      >
        <div className="p-6">
          <PopoverPrimitive.Root>
            {/* 1) L’élément de référence (anchor) DOIT exister et avoir une taille */}
            <PopoverPrimitive.Anchor asChild>
              <span className="inline-block px-3 py-2 rounded border">
                Anchor Box
              </span>
            </PopoverPrimitive.Anchor>

            {/* 2) Le trigger peut être n’importe où dans le même Root */}
            <div className="inline-flex ml-3 align-middle">
              <PopoverPrimitive.Trigger asChild>
                <Button size="sm" variant="outline">Toggle</Button>
              </PopoverPrimitive.Trigger>
            </div>

            {/* 3) Le contenu se positionne RELATIF à l’Anchor ci-dessus */}
            <PopoverPrimitive.Content side="bottom" align="center" sideOffset={6} className="rounded border bg-background p-3 shadow">
              <div>Anchored below the box (Radix direct)</div>
              <PopoverPrimitive.Arrow className="fill-border" />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Root>
        </div>
      </CardExample>


      {/* =============================================================================
          NOTES
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Notes</>}
        subtitle="About closing from inside"
        description={
          <>
            <strong>shadcn/ui</strong> does not export <code>PopoverClose</code>. If you prefer a declarative close
            button, import <code>Popover.Close</code> directly from <code>@radix-ui/react-popover</code>, or keep things
            controlled via React state like above.
          </>
        }
      />
    </div >
  )
}
