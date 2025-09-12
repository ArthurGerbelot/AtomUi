'use client'

import { Button, Card, HStack, Header, Code, VStack, IconInfo, Text, List, TextWithLabel, Sheet, Input, Label } from "@uikit"
import * as React from "react"


export default function SheetDocsPage() {

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Sheet</Code> Component</>}
        subtitle="Modal overlay that slides in from screen edges"
        description="Primitives: Root, Trigger, Content, Header, Footer, Title, Description + Close for building slide-out panels."
      />


      <Header variant="section" title="Primitives API" description="Build your own sheet with primitives" />

      <VStack>

        {/* Basic Sheet */}
        <Card title="Basic Sheet" description="Simple sheet that slides in from the right">
          <Sheet.Root>
            <Sheet.Trigger asChild>
              <Button>Open Sheet</Button>
            </Sheet.Trigger>
            <Sheet.Content>
              <Sheet.Header>
                <Sheet.Title>Sheet Title</Sheet.Title>
                <Sheet.Description>
                  This is a basic sheet that slides in from the right side of the screen.
                </Sheet.Description>
              </Sheet.Header>

              <div className="flex-1 px-4">
                <p className="text-sm">
                  Sheet content goes here. You can put any content you want inside the sheet.
                </p>
              </div>

              <Sheet.Footer>
                <Sheet.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Sheet.Close>
                <Button>Save changes</Button>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet.Root>
        </Card>

        {/* Different Sides */}
        <Card title="Different Sides" description="Sheets can slide in from any side">
          <HStack wrap>
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Sheet.Root key={side}>
                <Sheet.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    From {side}
                  </Button>
                </Sheet.Trigger>
                <Sheet.Content side={side}>
                  <Sheet.Header>
                    <Sheet.Title>Sheet from {side}</Sheet.Title>
                    <Sheet.Description>
                      This sheet slides in from the {side} side.
                    </Sheet.Description>
                  </Sheet.Header>

                  <div className="flex-1 px-4">
                    <p className="text-sm">
                      Content for {side} sheet. Different sides have different layouts and animations.
                    </p>
                  </div>

                  <Sheet.Footer>
                    <Sheet.Close asChild>
                      <Button size="sm">Close</Button>
                    </Sheet.Close>
                  </Sheet.Footer>
                </Sheet.Content>
              </Sheet.Root>
            ))}
          </HStack>
        </Card>

        {/* Form Example */}
        <Card title="Form in Sheet" description="Sheet with form inputs and validation">
          <Sheet.Root>
            <Sheet.Trigger asChild>
              <Button>Edit Profile</Button>
            </Sheet.Trigger>
            <Sheet.Content>
              <Sheet.Header>
                <Sheet.Title>Edit Profile</Sheet.Title>
                <Sheet.Description>
                  Make changes to your profile here. Click save when you're done.
                </Sheet.Description>
              </Sheet.Header>

              <div className="flex-1 px-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself" />
                </div>
              </div>

              <Sheet.Footer>
                <Sheet.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Sheet.Close>
                <Button>Save changes</Button>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet.Root>
        </Card>

        {/* Controlled Example */}
        <Card title="Controlled Sheet" description="Programmatically control sheet open/close state">
          <VStack gap="md">
            <Sheet.Root open={isOpen} onOpenChange={setIsOpen}>
              <div className="space-y-4">
                <HStack>
                  <Button onClick={() => setIsOpen(true)}>
                    Open Controlled Sheet
                  </Button>
                  <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Close from Outside
                  </Button>
                </HStack>

                <Text textSize="sm" textColor="muted">
                  Current state: {isOpen ? "Open" : "Closed"}
                </Text>
              </div>

              <Sheet.Content>
                <Sheet.Header>
                  <Sheet.Title>Controlled Sheet</Sheet.Title>
                  <Sheet.Description>
                    This sheet's open state is controlled programmatically.
                  </Sheet.Description>
                </Sheet.Header>

                <div className="flex-1 px-4">
                  <p className="text-sm">
                    You can control this sheet from outside components using state management.
                  </p>
                </div>

                <Sheet.Footer>
                  <Button onClick={() => setIsOpen(false)}>
                    Close from Inside
                  </Button>
                </Sheet.Footer>
              </Sheet.Content>
            </Sheet.Root>
          </VStack>
        </Card>

        {/* Manual Composition */}
        <Card title="Manual Composition" description="Build custom sheet layouts with primitives">
          <Sheet.Root>
            <Sheet.Trigger asChild>
              <Button variant="outline">Custom Layout</Button>
            </Sheet.Trigger>
            <Sheet.Content side="left">
              {/* Custom layout without Header/Footer */}
              <div className="p-6 space-y-6">
                <div>
                  <Sheet.Title className="text-2xl font-bold">Custom Layout</Sheet.Title>
                  <Sheet.Description className="mt-2">
                    This sheet uses manual composition without the standard Header/Footer components.
                  </Sheet.Description>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Section 1</h4>
                    <p className="text-sm text-muted-foreground">
                      Custom content section with border and padding.
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">Section 2</h4>
                    <p className="text-sm">
                      Another content section with different styling.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Sheet.Close asChild>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </Sheet.Close>
                  <Button size="sm">Confirm</Button>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Root>
        </Card>

        {/* Props Reference */}
        <Card
          title="Props Reference"
          subtitle="Complete list of Sheet component properties"
          Icon={<IconInfo textColor="info" />}
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Primitives Props</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Component</th>
                    <th className="text-left py-2">Key Props</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Root</Text></td>
                    <td className="py-2">open, onOpenChange, modal</td>
                    <td className="py-2">Root container that manages sheet state</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Trigger</Text></td>
                    <td className="py-2">asChild</td>
                    <td className="py-2">Button or element that opens the sheet</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Content</Text></td>
                    <td className="py-2">side, className</td>
                    <td className="py-2">Main sheet content with side: "top" | "right" | "bottom" | "left"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Header</Text></td>
                    <td className="py-2">className</td>
                    <td className="py-2">Header section with padding and flex layout</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Footer</Text></td>
                    <td className="py-2">className</td>
                    <td className="py-2">Footer section with auto margin and flex layout</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Title</Text></td>
                    <td className="py-2">className</td>
                    <td className="py-2">Accessible title for screen readers</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Description</Text></td>
                    <td className="py-2">className</td>
                    <td className="py-2">Accessible description for screen readers</td>
                  </tr>
                  <tr>
                    <td className="py-2"><Text className="font-mono text-sm">Sheet.Close</Text></td>
                    <td className="py-2">asChild</td>
                    <td className="py-2">Button or element that closes the sheet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card
          surface="subtle-outline"
          colorTheme="info"
          title="Primitives API"
          subtitle="Compose your own sheet with fine-grained building blocks"
          Icon={<IconInfo textColor="info" />}
          className="max-w-2xl mx-auto"
        >
          <VStack gap>
            <Text textSize="sm">Each subcomponent plays a specific role. Combine them to build any Sheet UX.</Text>
            <List>
              <List.Item><TextWithLabel label="Sheet.Root">State management and context provider</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Sheet.Trigger">Element that opens the sheet (with asChild)</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Sheet.Content">Main container with side animations</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Sheet.Header">Header section with title and description</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Sheet.Footer">Footer section for actions</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Sheet.Title">Accessible title element</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Sheet.Description">Accessible description element</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Sheet.Close">Element that closes the sheet (with asChild)</TextWithLabel></List.Item>
            </List>
          </VStack>
        </Card>

        <Card title="Code Examples" description="How to implement Sheet component">
          <div className="h-56 w-full border rounded-md overflow-auto">
            <pre className="p-4 text-xs font-mono">
              {`import { Sheet, Button } from "@uikit"

// Basic sheet
<Sheet.Root>
  <Sheet.Trigger asChild>
    <Button>Open Sheet</Button>
  </Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Sheet Title</Sheet.Title>
      <Sheet.Description>Description text</Sheet.Description>
    </Sheet.Header>

    <div className="flex-1 px-4">
      {/* Your content */}
    </div>

    <Sheet.Footer>
      <Sheet.Close asChild>
        <Button variant="secondary">Cancel</Button>
      </Sheet.Close>
      <Button>Save</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>

// Controlled sheet
const [open, setOpen] = useState(false)

<Sheet.Root open={open} onOpenChange={setOpen}>
  <Sheet.Content side="left">
    {/* Content */}
  </Sheet.Content>
</Sheet.Root>

// Different sides: "top" | "right" | "bottom" | "left"
<Sheet.Content side="bottom">
  {/* Content */}
</Sheet.Content>`}
            </pre>
          </div>
        </Card>

      </VStack >
    </div >
  )
}
