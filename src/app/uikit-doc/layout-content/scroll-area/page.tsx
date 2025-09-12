'use client'

import { Button, Card, HStack, Header, Code, VStack, IconInfo, Text, List, TextWithLabel, ScrollArea } from "@uikit"
import * as React from "react"


export default function ScrollAreaDocsPage() {

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">ScrollArea</Code> Component</>}
        subtitle="Custom scrollable area with styled scrollbars"
        description="Primitives: ScrollArea, ScrollBar + Composed API for easy scrolling."
      />


      <Header variant="section" title="Composed API" description="Easy-to-use scrollable containers" />

      <VStack>

        {/* Basic Usage */}
        <Card title="Basic ScrollArea" description="Simple scrollable content with custom scrollbars">
          <ScrollArea className="h-64 w-full border rounded-md p-4">
            <div className="space-y-4">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="text-sm">
                  This is line {i + 1} of scrollable content. You can scroll vertically to see more content.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card title="Horizontal Scroll" description="Horizontally scrollable content with explicit horizontal scrollbar">
          <ScrollArea.Root className="h-32 w-full border rounded-md p-4">
            <ScrollArea.Viewport>
              <div className="flex gap-4 w-max">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-48 h-20 bg-muted rounded-md flex items-center justify-center text-sm"
                  >
                    Card {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Bar orientation="horizontal" />
          </ScrollArea.Root>
        </Card>

        <Card title="Fixed Height with Long Content" description="Scrollable area with specific height constraints">
          <ScrollArea className="h-48 w-full border rounded-md p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Long Article Content</h3>
              {Array.from({ length: 30 }, (_, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card title="Custom Scrollbar" description="ScrollArea with custom scrollbar styling">
          <ScrollArea className="h-40 w-full border rounded-md p-4 bg-muted/30">
            <ScrollArea.Bar className="bg-border/80 hover:bg-border transition-colors w-3" />
            <div className="space-y-3">
              <h4 className="font-medium">Custom Styled Scrollbar</h4>
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="p-3 bg-background rounded border text-sm">
                  Item {i + 1} - This content demonstrates custom scrollbar styling with Radix ScrollArea.
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card title="Both Directions Example" description="Scroll horizontally and vertically with both scrollbars">
          <ScrollArea.Root className="h-40 w-full border rounded-md p-4">
            <ScrollArea.Viewport>
              <div className="w-max space-y-2">
                <h4 className="font-medium w-[700px]">Wide and Tall Content</h4>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="w-[700px] p-2 bg-muted rounded text-sm">
                    Item {i + 1} - This content is both wide and tall, demonstrating scrolling in both horizontal and vertical directions.
                    The content extends beyond the container width to trigger horizontal scrolling.
                  </div>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Bar orientation="vertical" />
            <ScrollArea.Bar orientation="horizontal" />
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </Card>

        <Card title="Code Example" description="How to implement ScrollArea component">
          <ScrollArea className="h-56 w-full border rounded-md">
            <pre className="p-4 text-xs font-mono">
              {`import { Scroll } from "@uikit"

// Simple composition (auto scrollbars)
<ScrollArea className="h-64 w-full border rounded-md p-4">
  <div className="space-y-4">
    {Array.from({ length: 20 }, (_, i) => (
      <p key={i}>This is line {i + 1} of scrollable content.</p>
    ))}
  </div>
</ScrollArea>

// With horizontal scrollbar
<ScrollArea className="h-32 w-full border rounded-md p-4">
  <ScrollArea.Bar orientation="horizontal" />
  <div className="flex gap-4 w-max">
    {/* Wide content */}
  </div>
</ScrollArea>

// Manual composition with primitives
<ScrollArea.Root className="h-64 w-full">
  <ScrollArea.Viewport>
    {/* Your content */}
  </ScrollArea.Viewport>
  <ScrollArea.Bar orientation="vertical" />
  <ScrollArea.Bar orientation="horizontal" />
  <ScrollArea.Corner />
</ScrollArea.Root>`}
            </pre>
          </ScrollArea>
        </Card>

        {/* Props Reference */}
        <Card
          title="Props Reference"
          subtitle="Complete list of ScrollArea component properties"
          Icon={<IconInfo textColor="info" />}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Prop</th>
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Default</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">className</Text></td>
                <td className="py-2">string</td>
                <td className="py-2">undefined</td>
                <td className="py-2">CSS classes to apply to the scroll area root</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">children</Text></td>
                <td className="py-2">ReactNode</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Content to be rendered inside the scrollable area</td>
              </tr>
              <tr>
                <td className="py-2"><Text className="font-mono text-sm">...ScrollProps</Text></td>
                <td className="py-2">ScrollAreaProps</td>
                <td className="py-2">-</td>
                <td className="py-2">All Radix ScrollArea props (type, scrollHideDelay, etc.)</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6">
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
                  <td className="py-2"><Text className="font-mono text-sm">Scroll.Root</Text></td>
                  <td className="py-2">className, type, scrollHideDelay</td>
                  <td className="py-2">Base container for scroll area</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2"><Text className="font-mono text-sm">Scroll.Viewport</Text></td>
                  <td className="py-2">className, children</td>
                  <td className="py-2">Content area with focus management</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2"><Text className="font-mono text-sm">Scroll.Bar</Text></td>
                  <td className="py-2">orientation, className</td>
                  <td className="py-2">Scrollbar with "vertical" | "horizontal" orientation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2"><Text className="font-mono text-sm">Scroll.Corner</Text></td>
                  <td className="py-2">className</td>
                  <td className="py-2">Corner element when both scrollbars visible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>


        <Header variant="section" title="Primitives Composition" description="Build your own scroll area with primitives" />


        <Card
          surface="subtle-outline"
          colorTheme="info"
          title="Primitives API"
          subtitle="Compose your own scroll area with fine-grained building blocks"
          Icon={<IconInfo textColor="info" />}
          className="max-w-2xl mx-auto"
        >
          <VStack gap>
            <Text textSize="sm">Each subcomponent plays a specific role. Combine them to build any ScrollArea UX.</Text>
            <List>
              <List.Item><TextWithLabel label="Scroll">Root scroll area container with automatic scrollbars</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Scroll.Root">Base scroll area container</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Scroll.Viewport">Content viewport with focus management</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Scroll.Bar">Customizable scrollbar with orientation support</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Scroll.Corner">Corner element when both scrollbars are visible</TextWithLabel></List.Item>
            </List>
          </VStack>
        </Card>

        <Card title="Manual composition with primitives" description="How to build your own using primitives">
          <VStack gap="md">
            <div>
              <h4 className="font-medium mb-2">Basic Primitive Composition</h4>
              <ScrollArea.Root className="h-32 w-full border rounded p-2">
                <ScrollArea.Viewport>
                  <div className="space-y-2">
                    <p className="text-sm">Manual composition with primitives</p>
                    <p className="text-sm">You can control every aspect of the scroll area</p>
                    <p className="text-sm">Including custom scrollbar styling and behavior</p>
                    <p className="text-sm">This gives you maximum flexibility</p>
                    <p className="text-sm">For complex scrolling interactions</p>
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Bar orientation="vertical" />
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </div>

            <div>
              <h4 className="font-medium mb-2">Both Scrollbars with Corner</h4>
              <ScrollArea.Root className="h-32 w-full border rounded p-2 bg-muted/20">
                <ScrollArea.Viewport>
                  <div className="w-max space-y-2">
                    <p className="text-sm font-medium w-[600px]">Wide content that requires horizontal scrolling</p>
                    {Array.from({ length: 8 }, (_, i) => (
                      <p key={i} className="text-sm py-1 w-[600px]">
                        Line {i + 1} - This content is wider than the container and will scroll horizontally
                      </p>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Bar orientation="vertical" className="bg-primary/20 hover:bg-primary/40 w-3" />
                <ScrollArea.Bar orientation="horizontal" className="bg-secondary/20 hover:bg-secondary/40 h-3" />
                <ScrollArea.Corner />
              </ScrollArea.Root>
            </div>

            <div>
              <h4 className="font-medium mb-2">Custom Scrollbar Styling</h4>
              <ScrollArea.Root className="h-24 w-full border rounded p-2">
                <ScrollArea.Viewport>
                  <div className="space-y-1">
                    {Array.from({ length: 12 }, (_, i) => (
                      <p key={i} className="text-xs py-0.5">
                        Item {i + 1} with custom scrollbar styling
                      </p>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Bar
                  orientation="vertical"
                  className="bg-success/10 hover:bg-success/20 w-4 rounded-full"
                />
              </ScrollArea.Root>
            </div>
          </VStack>
        </Card>

        <HStack>
          <Button secondary size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Scroll to Top
          </Button>
        </HStack>
      </VStack >
    </div >
  )
}
