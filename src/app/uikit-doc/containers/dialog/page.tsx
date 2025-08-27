// app/docs/dialog/page.tsx
"use client"

import * as React from "react"
import Link from "next/link"

// Import from your UI Kit alias (shadcn re-exports via @uikit)
import {
  Dialog,
  Button,
  Input,
  Text,
  Header,
  IconButton,
  IconInfo,
  IconClose,
  BackButton,
  Code,
  Separator,
} from "@uikit"

import { CardExample } from "../../components/CardExample"

export default function DialogDocsPage() {
  const [controlledOpen, setControlledOpen] = React.useState(false)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* =============================================================================
          MAIN HEADER
      ============================================================================= */}
      <Header
        variant="main"
        title={<>Dialog</>}
        subtitle="Full a11y/ARIA support modal dialog built on Radix primitives."
        description={
          <>
            <code>Dialog</code> displays content on top of the page and traps focus until closed.
            Use it for focused tasks like editing a record, confirming actions, or showing details
            that shouldn't be lost in page scroll.
          </>
        }
      />


      {/* =============================================================================
          COMPOSED HELPERS
      ============================================================================= */}
      <Header
        variant="section"
        title={<>Composed Helpers</>}
        subtitle="Useful helpers to build dialogs"
      />



      <CardExample title="Composed Helpers" description={<>A simple modal using Composed <Code includeTag>Dialog</Code></>}>
        <Dialog
          trigger={<Button>Open Dialog</Button>}
          title="Edit profile"
          description="Make changes to your profile here. Click save when you're done."
          avoidContent
          footer={
            <>
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button>Save</Button>
              </Dialog.Close>
            </>
          }
        >
          <Dialog.Content>
            <div className="grid grid-cols-4 items-center gap-4">
              <Text typo="label" className="text-right">Name</Text>
              <Input id="name" defaultValue="Jane Doe" className="col-span-3" />
            </div>
          </Dialog.Content>
          <Separator />
          <Dialog.Content>
            <div className="grid grid-cols-4 items-center gap-4">
              <Text typo="label" className="text-right">Username</Text>
              <Input id="username" defaultValue="@jane" className="col-span-3" />
            </div>
          </Dialog.Content>
        </Dialog>
      </CardExample>






      {/* =============================================================================
          BASIC
      ============================================================================= */}
      <Header
        variant="section"
        title={<>Use Primitive Dialog.*</>}
        subtitle="Compose your own dialog"
        description={
          <>
            Use the <Code includeTag>Dialog.*</Code> primitive to create a dialog.
          </>
        }
      />
      <CardExample title="Basic Dialog" description="A simple modal with a title and actions.">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Open Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Box>
            <Dialog.CloseIcon />
            <Dialog.Header title="Edit profile" description="Make changes to your profile here. Click save when you're done." />
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Text typo="label" className="text-right">Name</Text>
                <Input id="name" defaultValue="Jane Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Text typo="label" className="text-right">Username</Text>
                <Input id="username" defaultValue="@jane" className="col-span-3" />
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button>Save</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Box>
        </Dialog.Root>
      </CardExample>

      {/* =============================================================================
          SIZES & LAYOUT
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Sizes & layout</>}
        subtitle="Control max-width and responsive spacing"
        description={
          <>
            Tweak width via className (<code>max-w-sm</code>, <code>max-w-lg</code>, <code>max-w-2xl</code>…) and use container padding for breathing room.
          </>
        }
      />
      <CardExample title="Sizing" description="Same content with different max widths.">
        <div className="flex flex-wrap gap-4">

          <Dialog.Root>
            <Dialog.Trigger asChild><Button variant="outline">Small</Button></Dialog.Trigger>
            <Dialog.Box className="max-w-sm">
              <Dialog.Header title="Small" description="Small modal content" />
            </Dialog.Box>
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger asChild><Button variant="outline">Default</Button></Dialog.Trigger>
            <Dialog.Box className="max-w-2xl">
              <Dialog.Header title="Default" description="Default modal content" />
            </Dialog.Box>
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger asChild><Button variant="outline">Full</Button></Dialog.Trigger>
            <Dialog.Box className="max-w-[calc(100%-5rem)]">
              <Dialog.Header title="Full" description="Full modal content" />
            </Dialog.Box>
          </Dialog.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          FORM FLOW
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Form inside dialog</>}
        subtitle="Submit and close"
        description={
          <>
            Use <code>DialogClose asChild</code> on buttons to close after an action, or control via state for async flows.
          </>
        }
      />
      <CardExample title="Inline form" description="Submit and close the dialog.">
        <Dialog.Root>
          <Dialog.Trigger asChild><Button variant="outline">Rename Item</Button></Dialog.Trigger>
          <Dialog.Box className="max-w-md">
            <Dialog.Header title="Rename item" description="Pick a clear, searchable name." />

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                alert(`Renamed to: ${data.get("name")}`)
              }}
              className="space-y-3"
            >
              <Dialog.Content>
                <Text typo="label">New name</Text>
                <Input id="rename" name="name" placeholder="Type a new name…" />
              </Dialog.Content>
              <Dialog.Footer className="pt-2">
                <Dialog.Close asChild><Button variant="ghost" type="button">Cancel</Button></Dialog.Close>
                <Dialog.Close asChild><Button type="submit">Save</Button></Dialog.Close>
              </Dialog.Footer>
            </form>
          </Dialog.Box>
        </Dialog.Root>
      </CardExample>

      {/* =============================================================================
          CONTROLLED STATE
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Controlled state</>}
        subtitle="Open/close managed by React state"
        description={
          <>
            Useful when syncing with URL, analytics, or multi-step wizards. Use <code>open</code> / <code>onOpenChange</code>.
          </>
        }
      />
      <CardExample title="Controlled Dialog" description="Parent component owns the open state.">
        <div className="flex items-center gap-3">
          <Button onClick={() => setControlledOpen(true)}>Open controlled</Button>
          <Dialog.Root open={controlledOpen} onOpenChange={setControlledOpen}>
            <Dialog.Box className="max-w-md">
              <Dialog.Header title="Controlled dialog" description="Close via button or ESC." />
              <Dialog.Content>
                <Text className="text-muted-foreground text-sm">
                  Open state is stored in the parent component.
                </Text>
              </Dialog.Content>
              <Dialog.Footer>
                <Button onClick={() => setControlledOpen(false)} variant="outline" size="sm">Close</Button>
              </Dialog.Footer>
            </Dialog.Box>
          </Dialog.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          ASCHILD / CUSTOM TRIGGERS
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Custom triggers with asChild</>}
        subtitle="Use any element/component as the trigger"
        description={
          <>
            <code>asChild</code> merges trigger props with your element. Ensure your custom component forwards refs to a DOM node.
          </>
        }
      />
      <CardExample title="asChild trigger" description="Anchor or ghost button as trigger.">
        <div className="flex flex-wrap gap-4">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <a className="underline cursor-pointer text-primary">Open via link</a>
            </Dialog.Trigger>
            <Dialog.Box className="max-w-sm">
              <Dialog.Header title="From link" description="Opened by an anchor element." />
            </Dialog.Box>
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="ghost">Ghost trigger</Button>
            </Dialog.Trigger>
            <Dialog.Box className="max-w-sm">
              <Dialog.Header title="From ghost button" description="Opened by a custom button." />
            </Dialog.Box>
          </Dialog.Root>
        </div>
      </CardExample>

      {/* =============================================================================
          HEADER VARIANTS (ICON, CENTER ALIGN, CUSTOM ACTION)
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Header variants</>}
        subtitle="Centered header with icon and custom close action"
        description={
          <>
            Combine <code>Dialog.Header</code> props to render an icon, center alignment, and a custom action.
            The action below is a <code>Dialog.Close</code> wrapping an <code>IconButton</code>.
          </>
        }
      />
      <CardExample title="Centered header with icon & action" description="Header manages title/description; Action renders a custom Close button.">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Box className="max-w-md">
            <Dialog.Header
              title="Account details"
              description="View or update your account information."
              align="center"
              Icon={IconInfo}
              iconProps={{ textColor: "info", variant: "mini", className: "bg-transparent" }}
              BackLink={<Dialog.Close asChild><BackButton /></Dialog.Close>}
              Action={
                <Dialog.Close asChild>
                  <IconButton aria-label="Close dialog">
                    <IconClose />
                  </IconButton>
                </Dialog.Close>
              }
            />
            <Dialog.Content>
              <div className="space-y-2">
                <Text className="text-muted-foreground text-sm">This is a centered header with an info icon and a custom close action.</Text>
                <div className="h-20 rounded bg-muted" />
              </div>
            </Dialog.Content>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Dismiss</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button>Done</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Box>
        </Dialog.Root>
      </CardExample>

      {/* =============================================================================
          SCROLLABLE CONTENT
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Scrollable content</>}
        subtitle="Long modals with internal scroll"
        description={
          <>
            Keep the modal usable by constraining height and allowing internal scroll. Avoid locking the page when not needed.
          </>
        }
      />
      <CardExample title="Long content" description="Constrain height, scroll inside the modal.">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline">Open long modal</Button>
          </Dialog.Trigger>

          {/* Make the content a 3-row grid and cap its height */}
          <Dialog.Box className="grid w-full max-w-lg gap-4 max-h-[80vh] grid-rows-[auto_1fr_auto]">
            <Dialog.Header title="Release notes" description="Scrollable content inside the dialog." />

            {/* This row (1fr) is the scroller. Needs min-h-0 to actually scroll. */}
            <div className="px-6 min-h-0 overflow-y-auto pr-2 space-y-3">
              {Array.from({ length: 16 }).map((_, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  • Change #{i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                </p>
              ))}
            </div>

            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="outline">Close</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Box>
        </Dialog.Root>
      </CardExample>


      {/* =============================================================================
          BEST PRACTICES
      ============================================================================= */}
      <Header
        variant="sub-section"
        title={<>Best practices</>}
        subtitle="Clarity, focus, and escape hatches"
        description={
          <>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use for focused tasks; avoid nesting dialogs.</li>
              <li>Keep titles clear and actions explicit (primary on the right).</li>
              <li>Support keyboard: <kbd>Esc</kbd> to close, <kbd>Tab</kbd> loops inside.</li>
              <li>For complex flows, consider a Drawer/Sheet or a full page.</li>
              <li>Ensure your custom trigger forwards refs when using <code>asChild</code>.</li>
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
            <Text as={Link} typo="link" className="text-primary hover:underline" href="/uikit-doc/containers/popover">
              Popover
            </Text>{" "}
            - lightweight overlays anchored to a trigger.
          </li>
          <li>
            <Text as={Link} typo="link" className="text-primary hover:underline" href="/uikit-doc/containers/command">
              Command
            </Text>{" "}
            - searchable list pattern often used inside dialogs or popovers.
          </li>
        </ul>
      </div>

    </div >
  )
}
