'use client'

import * as React from "react"
import {
  Accordion,
  Header,
  Card,
  VStack,
  HStack,
  Text,
  Code,
  Button,
  Badge,
  List,
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  TextWithLabel
} from "@uikit"
import { CardExample } from "../../components/CardExample"

export default function AccordionPage() {
  const [accordionType, setAccordionType] = React.useState<"single" | "multiple">("single")
  const [collapsible, setCollapsible] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-16">

      {/* Header */}
      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Accordion</Code> Component</>}
        titleProps={{ className: "text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent" }}
        subtitle="Collapsible content sections with smooth animations"
        description={<>
          A vertically stacked set of interactive headings that each reveal a section of content.
          Built on top of Radix UI Accordion with smooth animations and accessible keyboard navigation.
        </>}
        align="center"
      />

      {/* Overview */}
      <section className="space-y-6">
        <Header
          title="When to Use Accordion"
          subtitle="Best practices and use cases"
          align="center"
        />
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title="Good Use Cases"
            Icon={<IconSuccess textColor="success" />}
            textColor="success"
            className="border-green-200 bg-green-50 dark:bg-green-900/20"
          >
            <List className="text-sm space-y-2">
              <List.Item>FAQ sections</List.Item>
              <List.Item>Help documentation</List.Item>
              <List.Item>Settings panels</List.Item>
              <List.Item>Feature comparisons</List.Item>
              <List.Item>Mobile navigation menus</List.Item>
              <List.Item>Progressive disclosure of information</List.Item>
            </List>
          </Card>
          <Card
            title="Avoid When"
            Icon={<IconWarning textColor="warning" />}
            textColor="warning"
            className="border-amber-200 bg-amber-50 dark:bg-amber-900/20"
          >
            <List className="text-sm space-y-2">
              <List.Item>Content needs to be visible at all times</List.Item>
              <List.Item>You have only 2-3 sections (consider tabs)</List.Item>
              <List.Item>Users need to compare content across sections</List.Item>
              <List.Item>The content is critical for user tasks</List.Item>
              <List.Item>Mobile screens with limited vertical space</List.Item>
            </List>
          </Card>
        </div>
      </section>

      {/* Component Architecture */}
      <Card
        title="Component Architecture"
        subtitle="Understanding the accordion structure"
        Icon={<IconInfo textColor="info" />}
        textColor="info"
        className="border-blue-200 bg-blue-50 dark:bg-blue-900/20"
      >
        <VStack gap="md" className="text-sm">
          <div>
            <Text weight="medium">Composition Pattern:</Text>
            <Text textColor="muted">
              The Accordion uses a compound component pattern with <Code>Object.assign</Code>
              to group related components together.
            </Text>
          </div>
          <div className="bg-muted p-4 rounded-lg font-mono text-xs space-y-1">
            <div><TextWithLabel labelProps={{ className: "w-[150px]" }} label="Accordion"> Root container (manages state)</TextWithLabel></div>
            <div><TextWithLabel labelProps={{ className: "w-[150px]" }} label="Accordion.Item">  Individual collapsible section</TextWithLabel></div>
            <div><TextWithLabel labelProps={{ className: "w-[150px]" }} label="Accordion.Trigger">  Clickable header with built-in icon</TextWithLabel></div>
            <div><TextWithLabel labelProps={{ className: "w-[150px]" }} label="Accordion.Content">  Collapsible content area</TextWithLabel></div >
          </div >
        </VStack >
      </Card >

      {/* Basic Usage */}
      < CardExample
        title="Basic Usage"
        description="Simple accordion with multiple items"
        code={`<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>What is React?</Accordion.Trigger>
    <Accordion.Content>
      React is a JavaScript library for building user interfaces. It lets you compose
      complex UIs from small and isolated pieces of code called "components".
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Trigger>What is Tailwind CSS?</Accordion.Trigger>
    <Accordion.Content>
      Tailwind CSS is a utility-first CSS framework that provides low-level utility
      classes to build custom designs without ever leaving your HTML.
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-3">
    <Accordion.Trigger>What is TypeScript?</Accordion.Trigger>
    <Accordion.Content>
      TypeScript is a strongly typed programming language that builds on JavaScript,
      giving you better tooling at any scale.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
      >
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>What is React?</Accordion.Trigger>
            <Accordion.Content>
              React is a JavaScript library for building user interfaces. It lets you compose
              complex UIs from small and isolated pieces of code called "components".
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-2">
            <Accordion.Trigger>What is Tailwind CSS?</Accordion.Trigger>
            <Accordion.Content>
              Tailwind CSS is a utility-first CSS framework that provides low-level utility
              classes to build custom designs without ever leaving your HTML.
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-3">
            <Accordion.Trigger>What is TypeScript?</Accordion.Trigger>
            <Accordion.Content>
              TypeScript is a strongly typed programming language that builds on JavaScript,
              giving you better tooling at any scale.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </CardExample >

      {/* Interactive Controls */}
      < CardExample
        title="Interactive Accordion Playground"
        description="Experiment with different accordion configurations"
        code={`<Accordion
  type="${accordionType}"
  ${collapsible ? 'collapsible' : ''}
  ${disabled ? 'disabled' : ''}
>
  {/* ... accordion items ... */}
</Accordion>`}
      >
        {/* Controls */}
        < div className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4" >
          <Text weight="medium">Configuration Controls:</Text>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <Text textSize="sm">Type:</Text>
              <select
                className="rounded border bg-background px-2 py-1 text-sm"
                value={accordionType}
                onChange={(e) => setAccordionType(e.target.value as "single" | "multiple")}
              >
                <option value="single">single</option>
                <option value="multiple">multiple</option>
              </select>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={collapsible}
                onChange={(e) => setCollapsible(e.target.checked)}
                disabled={accordionType === "multiple"}
              />
              <Text textSize="sm">Collapsible {accordionType === "multiple" && "(auto for multiple)"}</Text>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              <Text textSize="sm">Disabled</Text>
            </label>
          </div>
        </div >

        {/* Demo */}
        {
          accordionType === "single" ? (
            <Accordion
              type="single"
              collapsible={collapsible}
              disabled={disabled}
              defaultValue="feature-1"
            >
              <Accordion.Item value="feature-1">
                <Accordion.Trigger>🎨 Design System Features</Accordion.Trigger>
                <Accordion.Content>
                  <VStack gap="sm">
                    <Text>Our design system includes:</Text>
                    <List>
                      <List.Item>Atomic design principles</List.Item>
                      <List.Item>Polymorphic components with <Code>as</Code> prop</List.Item>
                      <List.Item>Smart slots for flexible composition</List.Item>
                      <List.Item>Consistent token-based styling</List.Item>
                    </List>
                  </VStack>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="feature-2">
                <Accordion.Trigger>⚡ Performance Optimizations</Accordion.Trigger>
                <Accordion.Content>
                  <VStack gap="sm">
                    <Text>Built for performance:</Text>
                    <HStack wrap gap="sm">
                      <Badge>Tree shaking</Badge>
                      <Badge>CSS-in-CSS</Badge>
                      <Badge>Minimal bundle</Badge>
                      <Badge>No runtime styles</Badge>
                    </HStack>
                  </VStack>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="feature-3">
                <Accordion.Trigger>♿ Accessibility Features</Accordion.Trigger>
                <Accordion.Content>
                  <Text>
                    Full keyboard navigation, screen reader support, and focus management.
                    Follows WAI-ARIA accordion patterns with proper ARIA attributes.
                  </Text>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="feature-4" disabled={disabled}>
                <Accordion.Trigger>🔧 Developer Experience</Accordion.Trigger>
                <Accordion.Content>
                  <VStack gap="sm">
                    <Text>Enhanced DX features:</Text>
                    <List>
                      <List.Item>TypeScript-first with full type safety</List.Item>
                      <List.Item>IntelliSense autocompletion</List.Item>
                      <List.Item>Consistent API across all components</List.Item>
                      <List.Item>Extensive documentation and examples</List.Item>
                    </List>
                  </VStack>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          ) : (
            <Accordion
              type="multiple"
              disabled={disabled}
              defaultValue={["feature-1"]}
            >
              <Accordion.Item value="feature-1">
                <Accordion.Trigger>🎨 Design System Features</Accordion.Trigger>
                <Accordion.Content>
                  <VStack gap="sm">
                    <Text>Our design system includes:</Text>
                    <List>
                      <List.Item>Atomic design principles</List.Item>
                      <List.Item>Polymorphic components with <Code>as</Code> prop</List.Item>
                      <List.Item>Smart slots for flexible composition</List.Item>
                      <List.Item>Consistent token-based styling</List.Item>
                    </List>
                  </VStack>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="feature-2">
                <Accordion.Trigger>⚡ Performance Optimizations</Accordion.Trigger>
                <Accordion.Content>
                  <VStack gap="sm">
                    <Text>Built for performance:</Text>
                    <HStack wrap gap="sm">
                      <Badge>Tree shaking</Badge>
                      <Badge>CSS-in-CSS</Badge>
                      <Badge>Minimal bundle</Badge>
                      <Badge>No runtime styles</Badge>
                    </HStack>
                  </VStack>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="feature-3">
                <Accordion.Trigger>♿ Accessibility Features</Accordion.Trigger>
                <Accordion.Content>
                  <Text>
                    Full keyboard navigation, screen reader support, and focus management.
                    Follows WAI-ARIA accordion patterns with proper ARIA attributes.
                  </Text>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="feature-4" disabled={disabled}>
                <Accordion.Trigger>🔧 Developer Experience</Accordion.Trigger>
                <Accordion.Content>
                  <VStack gap="sm">
                    <Text>Enhanced DX features:</Text>
                    <List>
                      <List.Item>TypeScript-first with full type safety</List.Item>
                      <List.Item>IntelliSense autocompletion</List.Item>
                      <List.Item>Consistent API across all components</List.Item>
                      <List.Item>Extensive documentation and examples</List.Item>
                    </List>
                  </VStack>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          )
        }
      </CardExample >

      {/* Multiple Type */}
      < CardExample
        title="Multiple Selection"
        description="Allow multiple items to be open simultaneously"
        code={`<Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Frontend Technologies</Accordion.Trigger>
    <Accordion.Content>React, TypeScript, Tailwind CSS</Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Trigger>Backend Technologies</Accordion.Trigger>
    <Accordion.Content>Node.js, PostgreSQL, Redis</Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-3">
    <Accordion.Trigger>DevOps & Tools</Accordion.Trigger>
    <Accordion.Content>Docker, GitHub Actions, Vercel</Accordion.Content>
  </Accordion.Item>
</Accordion>`}
      >
        <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Frontend Technologies</Accordion.Trigger>
            <Accordion.Content>
              <HStack wrap gap="sm">
                <Badge>React</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Tailwind CSS</Badge>
                <Badge>Next.js</Badge>
              </HStack>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-2">
            <Accordion.Trigger>Backend Technologies</Accordion.Trigger>
            <Accordion.Content>
              <HStack wrap gap="sm">
                <Badge>Node.js</Badge>
                <Badge>PostgreSQL</Badge>
                <Badge>Redis</Badge>
                <Badge>GraphQL</Badge>
              </HStack>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-3">
            <Accordion.Trigger>DevOps & Tools</Accordion.Trigger>
            <Accordion.Content>
              <HStack wrap gap="sm">
                <Badge>Docker</Badge>
                <Badge>GitHub Actions</Badge>
                <Badge>Vercel</Badge>
                <Badge>Terraform</Badge>
              </HStack>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </CardExample >

      {/* Custom Styling */}
      < CardExample
        title="Custom Styling"
        description="Override default styles with className props"
        code={`<Accordion type="single" collapsible className="space-y-2">
  <Accordion.Item value="item-1" className="border rounded-lg">
    <Accordion.Trigger className="px-4 py-3 hover:bg-muted">
      Custom Styled Item
    </Accordion.Trigger>
    <Accordion.Content className="px-4 pb-4">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded">
        This content has custom styling with a gradient background.
      </div>
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2" className="border rounded-lg">
    <Accordion.Trigger className="px-4 py-3 hover:bg-muted">
      Another Custom Item
    </Accordion.Trigger>
    <Accordion.Content className="px-4 pb-4">
      <Card className="m-0">
        <Text>Content can contain other components like this Card.</Text>
      </Card>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
      >
        <Accordion type="single" collapsible className="space-y-2">
          <Accordion.Item value="item-1" className="rounded-lg shadow-sm bg-card">
            <Accordion.Trigger className="px-4 py-3 hover:bg-muted border border-border rounded-t-lg data-[state=open]:rounded-b-none data-[state=closed]:rounded-b-lg">
              Custom Styled Item
            </Accordion.Trigger>
            <Accordion.Content className="px-4 pb-5 border-x border-b border-border rounded-b-lg border-t-0">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded mt-2">
                This content has custom styling with a gradient background.
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-2" className="rounded-lg shadow-sm bg-card">
            <Accordion.Trigger className="px-4 py-3 hover:bg-muted border border-border rounded-t-lg data-[state=open]:rounded-b-none data-[state=closed]:rounded-b-lg">
              Another Custom Item
            </Accordion.Trigger>
            <Accordion.Content className="px-4 pb-5 border-x border-b border-border rounded-b-lg border-t-0">
              <div className="mt-2">
                <Card className="m-0">
                  <Text>Content can contain other components like this Card.</Text>
                </Card>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>

      </CardExample >

      {/* Rich Content */}
      < CardExample
        title="Rich Content Examples"
        description="Accordions can contain any React content"
        code={`<Accordion type="single" collapsible>
  <Accordion.Item value="cards">
    <Accordion.Trigger>Card Gallery</Accordion.Trigger>
    <Accordion.Content>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cards... */}
      </div>
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="interactive">
    <Accordion.Trigger>Interactive Content</Accordion.Trigger>
    <Accordion.Content>
      {/* Buttons, forms, etc... */}
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`}
      >
        <Accordion type="single" collapsible>
          <Accordion.Item value="cards">
            <Accordion.Trigger>Card Gallery</Accordion.Trigger>
            <Accordion.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card title="Feature A" className="m-0">
                  <Text textSize="sm">Complete feature description with all the details.</Text>
                </Card>
                <Card title="Feature B" className="m-0">
                  <Text textSize="sm">Another feature with comprehensive information.</Text>
                </Card>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="interactive">
            <Accordion.Trigger>Interactive Content</Accordion.Trigger>
            <Accordion.Content>
              <VStack gap="md">
                <Text>This accordion contains interactive elements:</Text>
                <HStack gap="sm">
                  <Button variant="outline" size="sm">Action 1</Button>
                  <Button variant="outline" size="sm">Action 2</Button>
                  <Button variant="outline" size="sm">Action 3</Button>
                </HStack>
                <div className="p-3 border rounded bg-muted/30">
                  <Text textSize="sm" textColor="muted">
                    💡 Tip: Interactive elements inside accordions maintain their functionality
                  </Text>
                </div>
              </VStack>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="status">
            <Accordion.Trigger>Status Indicators</Accordion.Trigger>
            <Accordion.Content>
              <VStack gap="sm">
                <HStack gap="sm">
                  <IconSuccess className="text-green-500" />
                  <Text textSize="sm">All systems operational</Text>
                </HStack>
                <HStack gap="sm">
                  <IconWarning className="text-amber-500" />
                  <Text textSize="sm">Minor issues detected</Text>
                </HStack>
                <HStack gap="sm">
                  <IconError className="text-red-500" />
                  <Text textSize="sm">Service unavailable</Text>
                </HStack>
              </VStack>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </CardExample >

      {/* API Reference */}
      < section className="space-y-8" >
        <Header
          variant="section"
          title="API Reference"
          subtitle="Props and configuration options"
        />

        <div className="grid gap-6">
          <Card title="Accordion (Root)" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Prop</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Default</th>
                    <th className="text-left p-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-2"><Code>type</Code></td>
                    <td className="p-2">"single" | "multiple"</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Whether one or multiple items can be opened</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><Code>collapsible</Code></td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">false</td>
                    <td className="p-2">When type="single", allow closing the open item</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><Code>defaultValue</Code></td>
                    <td className="p-2">string | string[]</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Initial open item(s)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><Code>value</Code></td>
                    <td className="p-2">string | string[]</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Controlled open item(s)</td>
                  </tr>
                  <tr>
                    <td className="p-2"><Code>onValueChange</Code></td>
                    <td className="p-2">function</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Callback when value changes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Accordion.Item, Accordion.Trigger, Accordion.Content">
            <Text textSize="sm" textColor="muted">
              These components accept all standard HTML props plus <Code>className</Code> for custom styling.
              The <Code>Accordion.Item</Code> requires a unique <Code>value</Code> prop for identification.
            </Text>
          </Card>
        </div>
      </section >

      {/* Accessibility */}
      < Card
        title="Accessibility Features"
        Icon={< IconSuccess textColor="success" />}
        textColor="success"
        className="border-green-200 bg-green-50 dark:bg-green-900/20"
      >
        <VStack gap="md">
          <Text textSize="sm">
            The Accordion component follows WAI-ARIA patterns and includes:
          </Text>
          <List className="text-sm space-y-1">
            <List.Item><strong>Keyboard Navigation:</strong> Arrow keys to move between triggers, Enter/Space to toggle</List.Item>
            <List.Item><strong>Screen Reader Support:</strong> Proper ARIA attributes for state and relationships</List.Item>
            <List.Item><strong>Focus Management:</strong> Clear focus indicators and logical tab order</List.Item>
            <List.Item><strong>State Announcement:</strong> Screen readers announce expanded/collapsed state</List.Item>
          </List>
        </VStack>
      </Card >

    </div >
  )
}
