'use client'
import * as React from "react"

import { Card, Header, Code, VStack, IconInfo, Text, List, TextWithLabel, Sidebar, Alert, LayoutSidebar } from "@uikit"
import { HomeIcon, SettingsIcon, UsersIcon } from "lucide-react"


function DemoSidebarMenu() {
  return (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Demo Navigation</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <SettingsIcon className="h-4 w-4" />
              <span>Settings</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <UsersIcon className="h-4 w-4" />
              <span>Users</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  )
}

export default function SidebarDocsPage() {

  return (
    <LayoutSidebar
      id="demo"
      side="right"
      triggerTooltip={<Code>Demo Sidebar</Code>}
      header={
        <div className="px-2 py-2">
          <h3 className="font-semibold text-sm">Demo Sidebar</h3>
        </div>
      }
      content={<DemoSidebarMenu />}
    >
      <div className="px-6 py-12 space-y-12">

        <Header
          variant="main"
          title={<><Code includeTag textSize="4xl">Sidebar</Code> Component</>}
          subtitle="Collapsible navigation sidebar with mobile support"
          description="Comprehensive sidebar system with Provider, Root, Content and many primitives for building navigation layouts."
        />

        <VStack gap="lg">


          <Card
            variant="secondary"
            title="Sidebar Layout"
            align="center"
            Icon={<IconInfo className="bg-transparent" textColor="info" />}
          >
            Wrap your content in a <Code includeTag>LayoutSidebar</Code> component and provide:
            <div className="space-y-6">
              <div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Prop</th>
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">header?</Text></td>
                      <td className="py-2">React.ReactNode</td>
                      <td className="py-2">Header of the sidebar</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">content</Text></td>
                      <td className="py-2">React.ReactNode</td>
                      <td className="py-2">Content of the sidebar</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">footer?</Text></td>
                      <td className="py-2">React.ReactNode</td>
                      <td className="py-2">Footer of the sidebar</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">children</Text></td>
                      <td className="py-2">React.ReactNode</td>
                      <td className="py-2">Main content of the page</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">side?</Text></td>
                      <td className="py-2">"left" | "right"</td>
                      <td className="py-2">Side of the sidebar (default: "left")</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">collapsible?</Text></td>
                      <td className="py-2">"offcanvas" | "icon" | "none"</td>
                      <td className="py-2">Collapsible mode (default: "offcanvas")</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">defaultOpen?</Text></td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">Default open state (default: true)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">showTrigger?</Text></td>
                      <td className="py-2">boolean</td>
                      <td className="py-2">Show trigger with tooltip (default: true)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">triggerTooltip?</Text></td>
                      <td className="py-2">React.ReactNode</td>
                      <td className="py-2">Text of the trigger tooltip (default: "Ctrl/Cmd + B")</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">className?</Text></td>
                      <td className="py-2">string</td>
                      <td className="py-2">Additional props for the main container</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Header variant="section" title="Primitives Composition" description="Build your own Sidebar with primitives" />


          {/* Primitives Reference */}
          <Alert
            surface="subtle-outline"
            variant="info"
            title="Primitives API"
            subtitle="Complete list of sidebar building blocks"
            Icon={<IconInfo textColor="info" />}
            className="max-w-2xl mx-auto"
          >
            <VStack gap>
              <Text textSize="sm">Each primitive plays a specific role in building sidebar layouts.</Text>
              <List>
                <List.Item><TextWithLabel label="Sidebar.Provider">Context provider for sidebar state management</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Root">Main sidebar container with collapsible behavior</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Content">Scrollable content area of the sidebar</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Header">Top section for branding/title</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Footer">Bottom section for user actions</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Group">Container for grouping menu items</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.GroupLabel">Label for a group of menu items</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Menu">List container for menu items</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.MenuItem">Individual menu item wrapper</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.MenuButton">Clickable menu button with variants</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Trigger">Button to toggle sidebar open/closed</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Inset">Main content area next to sidebar</TextWithLabel></List.Item>
                <List.Item><TextWithLabel label="Sidebar.Separator">Visual separator between groups</TextWithLabel></List.Item>
              </List>
            </VStack>
          </Alert>

          <Alert
            variant="warning"
            title="@container/main"
            surface="subtle-outline"
            subtitle="Do not forget to wrap your main content in a @container/main class"
            className="max-w-2xl mx-auto"
          >
            <Text textSize="sm">
              The <Code>@container/main</Code> class is used to ensure that the main content is properly sized.<br />
              Never need on any docs, but seen on the code of Shadcn/ui.
            </Text>
          </Alert>

          {/* Props Reference */}
          <Card
            title="Props Reference"
            subtitle="Key properties for main sidebar components"
            Icon={<IconInfo textColor="info" />}
          >
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Core Components</h4>
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
                      <td className="py-2"><Text className="font-mono text-sm">Sidebar.Provider</Text></td>
                      <td className="py-2">defaultOpen, open, onOpenChange</td>
                      <td className="py-2">Manages sidebar state and provides context</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">Sidebar.Root</Text></td>
                      <td className="py-2">side, variant, collapsible</td>
                      <td className="py-2">Main container with side: "left"|"right", collapsible: "offcanvas"|"icon"|"none"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">Sidebar.MenuButton</Text></td>
                      <td className="py-2">variant, size, isActive, tooltip</td>
                      <td className="py-2">Interactive menu button with variants and tooltip support</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2"><Text className="font-mono text-sm">Sidebar.GroupLabel</Text></td>
                      <td className="py-2">asChild</td>
                      <td className="py-2">Group label with optional polymorphic rendering</td>
                    </tr>
                    <tr>
                      <td className="py-2"><Text className="font-mono text-sm">Sidebar.Trigger</Text></td>
                      <td className="py-2">All Button props</td>
                      <td className="py-2">Toggle button for sidebar visibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card title="Code Examples" description="How to build sidebar layouts">
            <div className="h-64 w-full border rounded-md overflow-auto">
              <pre className="p-4 text-xs font-mono">
                {`import { Sidebar } from "@uikit"

// Basic sidebar structure
<Sidebar.Provider defaultOpen={true}>
  <div className="flex h-screen">
    <Sidebar.Root side="left" collapsible="offcanvas">
      <Sidebar.Header>
        {/* Your branding */}
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton isActive={true}>
                  <HomeIcon />
                  <span>Dashboard</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer>
        {/* User actions */}
      </Sidebar.Footer>
    </Sidebar.Root>

    <Sidebar.Inset>
      <Sidebar.Trigger />
      {/* Main content */}
    </Sidebar.Inset>
  </div>
</Sidebar.Provider>

// Collapsed sidebar with tooltips
<Sidebar.Root collapsible="icon">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton tooltip="Dashboard">
          <HomeIcon />
          <span>Dashboard</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>

// Menu button variants
<Sidebar.MenuButton variant="outline" size="sm" isActive={true}>
  <Icon />
  <span>Menu Item</span>
</Sidebar.MenuButton>`}
              </pre>
            </div>
          </Card>

          <Card title="Keyboard Shortcuts" description="Built-in keyboard navigation">
            <VStack gap="sm">
              <Text textSize="sm">
                <Text className="font-mono bg-muted px-1 rounded">Ctrl/Cmd + B</Text> - Toggle sidebar visibility
              </Text>
              <Text textSize="sm" textColor="muted">
                The sidebar automatically handles keyboard shortcuts and mobile responsiveness.
              </Text>
            </VStack>
          </Card>

        </VStack>
      </div>
    </LayoutSidebar>
  )
}
