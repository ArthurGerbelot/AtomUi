'use client'

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
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
  TextWithLabel,
} from "@uikit"
import { CardExample } from "../../components/CardExample"
import Link from "next/link"

export default function TabsPage() {

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-16">

      {/* Header */}
      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Tabs</Code> Component</>}
        titleProps={{ className: "text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent" }}
        subtitle="Organize content in tabbed sections with smooth navigation"
        description={<>
          A set of layered sections of content—known as tab panels—that are displayed one at a time.
          Built on top of Radix UI Tabs with Button-based triggers and accessible keyboard navigation.
        </>}
        align="center"
      />

      {/* Overview */}
      <section className="space-y-6">
        <Header
          title="When to Use Tabs"
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
              <List.Item>Settings panels with categories</List.Item>
              <List.Item>Product information sections</List.Item>
              <List.Item>Dashboard views</List.Item>
              <List.Item>Form wizards with steps</List.Item>
              <List.Item>Documentation sections</List.Item>
              <List.Item>Content that users switch between frequently</List.Item>
            </List>
          </Card>
          <Card
            title="Avoid When"
            Icon={<IconWarning textColor="warning" />}
            textColor="warning"
            className="border-amber-200 bg-amber-50 dark:bg-amber-900/20"
          >
            <List className="text-sm space-y-2">
              <List.Item>Users need to see multiple sections at once</List.Item>
              <List.Item>Content is sequential (use stepper instead)</List.Item>
              <List.Item>You have more than 7-8 tabs</List.Item>
              <List.Item>Mobile screens with limited horizontal space</List.Item>
              <List.Item>Content in tabs is very short</List.Item>
            </List>
          </Card>
        </div>
      </section>

      {/* Component Architecture */}
      <Card
        title="Component Architecture"
        subtitle="Understanding the tabs structure"
        Icon={<IconInfo textColor="info" />}
        textColor="info"
        className="border-blue-200 bg-blue-50 dark:bg-blue-900/20"
      >
        <VStack gap="md" className="text-sm">
          <div>
            <Text weight="medium">Composition Pattern:</Text>
            <Text textColor="muted">
              The Tabs use a compound component pattern with Button-based triggers
              for consistent styling and behavior.
            </Text>
          </div>
          <List>
            <List.Item><TextWithLabel labelProps={{ className: "w-[150px]" }} label="Tabs"> Root container (manages state)</TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "w-[150px]" }} label="TabsList">  Container for tab triggers</TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "w-[150px]" }} label="TabsTrigger">  Button-based tab trigger</TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "w-[150px]" }} label="TabsContent">  Tab panel content area</TextWithLabel></List.Item>
          </List>
        </VStack>
      </Card>

      {/* Line Style (Default) */}
      <CardExample
        title="Line Style (Default)"
        description="Modern line-based tabs with underline active state">
        <Tabs defaultValue="overview" variant="line">

          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <VStack gap="sm" pt="md">
              <Text weight="medium">Product Overview</Text>
              <Text textColor="muted">
                Our platform provides comprehensive Bitcoin trading and management tools
                designed for both beginners and advanced users.
              </Text>
              <HStack wrap gap="sm">
                <Badge>Secure</Badge>
                <Badge>Fast</Badge>
                <Badge>Reliable</Badge>
              </HStack>
            </VStack>
          </TabsContent>

          <TabsContent value="features">
            <VStack gap="sm" pt="md">
              <Text weight="medium">Key Features</Text>
              <List>
                <List.Item>Real-time Bitcoin price tracking</List.Item>
                <List.Item>Secure wallet management</List.Item>
                <List.Item>Advanced trading tools</List.Item>
                <List.Item>Multi-currency support</List.Item>
              </List>
            </VStack>
          </TabsContent>

          <TabsContent value="pricing">
            <VStack gap="sm" pt="md">
              <Text weight="medium">Pricing Plans</Text>
              <HStack center gap="md">
                <div className="p-3 border rounded">
                  <Text block weight="medium">Basic - Free</Text>
                  <Text textSize="sm" textColor="muted">Perfect for getting started</Text>
                </div>
                <div className="p-3 border rounded">
                  <Text block weight="medium">Pro - $29/mo</Text>
                  <Text textSize="sm" textColor="muted">Advanced features</Text>
                </div>
              </HStack>
            </VStack>
          </TabsContent>
        </Tabs>
      </CardExample>

      {/* Classic Style */}
      <CardExample
        title="Classic Style"
        description="Traditional capsule-style tabs like original shadcn"
        code={`<Tabs defaultValue="general" variant="classic">
  <TabsList variant="classic">
    <TabsTrigger variant="classic" value="general">General</TabsTrigger>
    <TabsTrigger variant="classic" value="advanced">Advanced</TabsTrigger>
    <TabsTrigger variant="classic" value="danger">Danger</TabsTrigger>
  </TabsList>

  <TabsContent value="general">
    <Card>General settings content...</Card>
  </TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="general" variant="solid">
          <TabsList variant="solid">
            <TabsTrigger variant="solid" value="general">⚙️ General</TabsTrigger>
            <TabsTrigger variant="solid" value="advanced">🔧 Advanced</TabsTrigger>
            <TabsTrigger variant="solid" value="danger">⚠️ Danger</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <VStack gap="sm">
                <Text weight="medium">General Settings</Text>
                <Text textColor="muted">Configure basic application preferences.</Text>
                <HStack gap="sm">
                  <Button size="sm">Save Changes</Button>
                  <Button size="sm" surface="outline">Reset</Button>
                </HStack>
              </VStack>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <VStack gap="sm">
                <Text weight="medium">Advanced Configuration</Text>
                <Text textColor="muted">Fine-tune advanced settings and performance options.</Text>
                <Badge>Requires admin privileges</Badge>
              </VStack>
            </Card>
          </TabsContent>

          <TabsContent value="danger">
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <VStack gap="sm">
                <Text weight="medium">Danger Zone</Text>
                <Text textColor="muted">Irreversible actions that affect your account.</Text>
                <Button size="sm" colorTheme="error">Delete Account</Button>
              </VStack>
            </Card>
          </TabsContent>
        </Tabs>
      </CardExample>

      {/* Outline Style */}
      <CardExample
        title="Outline Style"
        description="Capsule-style tabs with border only (no background fill)"
        code={`<Tabs defaultValue="overview" variant="outline">
  <TabsList variant="outline">
    <TabsTrigger variant="outline" value="overview">Overview</TabsTrigger>
    <TabsTrigger variant="outline" value="details">Details</TabsTrigger>
    <TabsTrigger variant="outline" value="settings">Settings</TabsTrigger>
  </TabsList>

  <TabsContent value="overview">
    <Card>Overview content...</Card>
  </TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="overview" variant="outline">
          <TabsList variant="outline">
            <TabsTrigger variant="outline" value="overview">📋 Overview</TabsTrigger>
            <TabsTrigger variant="outline" value="details">📄 Details</TabsTrigger>
            <TabsTrigger variant="outline" value="settings">⚙️ Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <VStack gap="sm">
                <Text weight="medium">Project Overview</Text>
                <Text textColor="muted">
                  High-level summary and key metrics. Notice how the active tab has a border but no background.
                </Text>
                <HStack wrap gap="sm">
                  <Badge>Outline Style</Badge>
                  <Badge>Border Only</Badge>
                  <Badge>No Background</Badge>
                </HStack>
              </VStack>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <VStack gap="sm">
                <Text weight="medium">Detailed Information</Text>
                <Text textColor="muted">
                  The outline variant keeps the capsule shape but uses borders instead of backgrounds.
                </Text>
                <List>
                  <List.Item>Inactive tabs have muted text</List.Item>
                  <List.Item>Active tab has border and normal text</List.Item>
                  <List.Item>No background fill for cleaner look</List.Item>
                </List>
              </VStack>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <VStack gap="sm">
                <Text weight="medium">Settings Panel</Text>
                <Text textColor="muted">
                  Perfect for settings where you want a subtle tab appearance.
                </Text>
                <HStack gap="sm">
                  <Button size="sm" surface="outline">Configure</Button>
                  <Button size="sm" surface="outline">Reset</Button>
                </HStack>
              </VStack>
            </Card>
          </TabsContent>
        </Tabs>
      </CardExample>

      {/* Distribution Options */}
      <CardExample
        title="Tab Distribution"
        description="TabList is a Stack components, and TabsTrigger is an Atom. So you can use any flex props to distribute them."
      >
        <VStack gap={6}>
          <div>
            <Text weight="medium" className="mb-2">Fit Content (Natural width)</Text>
            <Tabs defaultValue="tab1" variant="line">
              <TabsList>
                <TabsTrigger value="tab1">Short</TabsTrigger>
                <TabsTrigger value="tab2">Medium Length</TabsTrigger>
                <TabsTrigger value="tab3">Very Long Tab Name</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><div className="p-4">Content 1</div></TabsContent>
              <TabsContent value="tab2"><div className="p-4">Content 2</div></TabsContent>
              <TabsContent value="tab3"><div className="p-4">Content 3</div></TabsContent>
            </Tabs>
          </div>

          <div>
            <Text weight="medium" className="mb-2">Fill Width</Text>
            <Tabs defaultValue="tab1" variant="line">
              <TabsList full>
                <TabsTrigger value="tab1">Short</TabsTrigger>
                <TabsTrigger value="tab2">Medium</TabsTrigger>
                <TabsTrigger value="tab3">Long</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><div className="p-4">Content 1</div></TabsContent>
              <TabsContent value="tab2"><div className="p-4">Content 2</div></TabsContent>
              <TabsContent value="tab3"><div className="p-4">Content 3</div></TabsContent>
            </Tabs>
          </div>

          <div>
            <Text weight="medium" className="mb-2">Centered Tabs</Text>
            <Tabs defaultValue="tab1" variant="line">
              <TabsList center>
                <TabsTrigger value="tab1">A</TabsTrigger>
                <TabsTrigger value="tab2">B</TabsTrigger>
                <TabsTrigger value="tab3">C</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><div className="p-4">Content 1</div></TabsContent>
              <TabsContent value="tab2"><div className="p-4">Content 2</div></TabsContent>
              <TabsContent value="tab3"><div className="p-4">Content 3</div></TabsContent>
            </Tabs>
          </div>

          <div>
            <Text weight="medium" className="mb-2">Flex Tabs</Text>
            <Tabs defaultValue="tab1" variant="line">
              <TabsList>
                <TabsTrigger flex value="tab1">A</TabsTrigger>
                <TabsTrigger flex value="tab2">B</TabsTrigger>
                <TabsTrigger flex value="tab3">C</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><div className="p-4">Content 1</div></TabsContent>
              <TabsContent value="tab2"><div className="p-4">Content 2</div></TabsContent>
              <TabsContent value="tab3"><div className="p-4">Content 3</div></TabsContent>
            </Tabs>
          </div>
        </VStack>
      </CardExample>

      {/* Link Integration */}
      <CardExample
        title="Controlled Link-based Navigation Tabs"
        description="Tabs that work as navigation links with URL-based selection"
      >
        <Tabs value={"examples"}>
          <TabsList>
            <TabsTrigger
              isActive={false}
              as={Link}
              href="#documentation"
              value="documentation"
            >
              📖 Documentation
            </TabsTrigger>
            <TabsTrigger
              isActive={true}
              as={Link}
              href="#examples"
              value="examples"
            >
              🚀 Examples
            </TabsTrigger>
            <TabsTrigger
              isActive={false}
              as={Link}
              href="#api-reference"
              value="api-reference"
            >
              🔧 API Reference
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documentation">
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
              <HStack gap="sm">
                <IconInfo textColor="info" />
                <Text>Controlled version to use Link component.</Text>
              </HStack>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
              <HStack gap="sm">
                <IconWarning textColor="warning" />
                <Text>This is a warning message that requires attention.</Text>
              </HStack>
            </Card>
          </TabsContent>

          <TabsContent value="api-reference">
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <HStack gap="sm">
                <IconError textColor="error" />
                <Text>This is an error message indicating a problem.</Text>
              </HStack>
            </Card>
          </TabsContent>
        </Tabs>

      </CardExample>

      {/* Border Directions */}
      <CardExample
        title="Border Directions"
        description="Control where the active border appears"
        code={`// Bottom border (default)
<TabsList borderDirection="bottom">...</TabsList>

// Right border (vertical)
<TabsList borderDirection="right">...</TabsList>

// Top border
<TabsList borderDirection="top">...</TabsList>

// Left border
<TabsList borderDirection="left">...</TabsList>`}
      >
        <VStack gap={6}>
          <div>
            <Text weight="medium" className="mb-2">Bottom Border (Default)</Text>
            <Tabs defaultValue="tab1" variant="line">
              <TabsList borderDirection="bottom">
                <TabsTrigger borderDirection="bottom" value="tab1">Home</TabsTrigger>
                <TabsTrigger borderDirection="bottom" value="tab2">About</TabsTrigger>
                <TabsTrigger borderDirection="bottom" value="tab3">Contact</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><div className="p-4 border rounded mt-2">Home Content</div></TabsContent>
              <TabsContent value="tab2"><div className="p-4 border rounded mt-2">About Content</div></TabsContent>
              <TabsContent value="tab3"><div className="p-4 border rounded mt-2">Contact Content</div></TabsContent>
            </Tabs>
          </div>

          <div>
            <Text weight="medium" className="mb-2">Right Border (Vertical)</Text>
            <HStack gap={4}>
              <Tabs defaultValue="tab1" variant="line">
                <TabsList borderDirection="right">
                  <TabsTrigger borderDirection="right" value="tab1">Profile</TabsTrigger>
                  <TabsTrigger borderDirection="right" value="tab2">Settings</TabsTrigger>
                  <TabsTrigger borderDirection="right" value="tab3">Security</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex-1">
                <Tabs defaultValue="tab1" variant="line">
                  <TabsContent value="tab1"><div className="p-4 border rounded">Profile Content</div></TabsContent>
                  <TabsContent value="tab2"><div className="p-4 border rounded">Settings Content</div></TabsContent>
                  <TabsContent value="tab3"><div className="p-4 border rounded">Security Content</div></TabsContent>
                </Tabs>
              </div>
            </HStack>
          </div>

          <div>
            <Text weight="medium" className="mb-2">Top Border</Text>
            <Tabs defaultValue="tab1" variant="line">
              <TabsContent value="tab1"><div className="p-4 border rounded mb-2">Content above tabs</div></TabsContent>
              <TabsContent value="tab2"><div className="p-4 border rounded mb-2">Different content</div></TabsContent>
              <TabsContent value="tab3"><div className="p-4 border rounded mb-2">More content</div></TabsContent>
              <TabsList borderDirection="top">
                <TabsTrigger borderDirection="top" value="tab1">First</TabsTrigger>
                <TabsTrigger borderDirection="top" value="tab2">Second</TabsTrigger>
                <TabsTrigger borderDirection="top" value="tab3">Third</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </VStack>
      </CardExample>

      {/* API Reference */}
      <section className="space-y-8">
        <Header
          variant="section"
          title="API Reference"
          subtitle="Props and configuration options"
        />

        <div className="grid gap-6">
          <Card title="Tabs (Root)" className="space-y-4">
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
                    <td className="p-2"><Code>defaultValue</Code></td>
                    <td className="p-2">string</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Initial active tab</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><Code>value</Code></td>
                    <td className="p-2">string</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Controlled active tab</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><Code>onValueChange</Code></td>
                    <td className="p-2">function</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Callback when tab changes</td>
                  </tr>
                  <tr>
                    <td className="p-2"><Code>borderDirection</Code></td>
                    <td className="p-2">"bottom" | "top" | "left" | "right"</td>
                    <td className="p-2">"bottom"</td>
                    <td className="p-2">Only for <Code>variant="line"</Code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </section>

      {/* Accessibility */}
      <Card
        title="Accessibility Features"
        Icon={<IconSuccess textColor="success" />}
        textColor="success"
        className="border-green-200 bg-green-50 dark:bg-green-900/20"
      >
        <VStack gap="md">
          <Text textSize="sm">
            The Tabs component follows WAI-ARIA patterns and includes:
          </Text>
          <List className="text-sm space-y-1">
            <List.Item><strong>Keyboard Navigation:</strong> Arrow keys to move between tabs, Enter/Space to activate</List.Item>
            <List.Item><strong>Screen Reader Support:</strong> Proper ARIA attributes for tab relationships</List.Item>
            <List.Item><strong>Focus Management:</strong> Clear focus indicators and logical tab order</List.Item>
            <List.Item><strong>State Announcement:</strong> Screen readers announce active tab state</List.Item>
            <List.Item><strong>Button Integration:</strong> Inherits Button accessibility features</List.Item>
          </List>
        </VStack>
      </Card>

    </div>
  )
}
