'use client'

import { Button, Card, HStack, Header, Code, VStack, IconInfo, Text, Skeleton } from "@uikit"
import * as React from "react"


export default function SkeletonDocsPage() {

  const [isLoading, setIsLoading] = React.useState(true)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Skeleton</Code> Component</>}
        subtitle="Animated placeholder for loading states"
        description="Simple skeleton component with pulse animation for indicating loading content."
      />

      <VStack>

        {/* Basic Skeletons */}
        <Card title="Basic Skeletons" description="Different shapes and sizes">
          <VStack gap="md">
            <div>
              <Text textSize="sm" className="mb-2 font-medium">Text lines</Text>
              <VStack gap="sm">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </VStack>
            </div>

            <div>
              <Text textSize="sm" className="mb-2 font-medium">Circles</Text>
              <HStack gap="sm">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-20 w-20 rounded-full" />
              </HStack>
            </div>

            <div>
              <Text textSize="sm" className="mb-2 font-medium">Rectangles</Text>
              <HStack gap="sm">
                <Skeleton className="h-24 w-32" />
                <Skeleton className="h-32 w-24" />
                <Skeleton className="h-20 w-40" />
              </HStack>
            </div>
          </VStack>
        </Card>

        {/* Card Layout */}
        <Card title="Card Layout Skeleton" description="Skeleton for card-like content">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-48 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </Card>

        {/* List Items */}
        <Card title="List Items Skeleton" description="Skeleton for list content">
          <VStack gap="md">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </VStack>
        </Card>

        {/* Loading State Toggle */}
        <Card title="Loading State Toggle" description="Toggle between loading and content">
          <VStack gap="md">
            <HStack>
              <Button
                size="sm"
                onClick={() => setIsLoading(true)}
                variant={isLoading ? undefined : "secondary"}
              >
                Show Loading
              </Button>
              <Button
                size="sm"
                onClick={() => setIsLoading(false)}
                variant={!isLoading ? undefined : "secondary"}
              >
                Show Content
              </Button>
            </HStack>

            <div className="border rounded-md p-4">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-1/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                  <Skeleton className="h-32 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-muted-foreground text-sm">Software Engineer</p>
                      <p className="text-muted-foreground text-sm">San Francisco, CA</p>
                    </div>
                  </div>
                  <div className="h-32 w-full bg-muted rounded flex items-center justify-center">
                    <Text textColor="muted">Content Image</Text>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      This is the actual content that appears after loading is complete.
                      The skeleton provides a visual placeholder that maintains layout stability.
                    </p>
                    <p className="text-sm">
                      Skeletons help improve perceived performance by showing users that content is loading.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </VStack>
        </Card>

        {/* Custom Styling */}
        <Card title="Custom Styling" description="Skeletons with custom colors and animations">
          <VStack gap="md">
            <div>
              <Text textSize="sm" className="mb-2 font-medium">Custom colors</Text>
              <VStack gap="sm">
                <Skeleton className="h-4 w-full bg-red-200" />
                <Skeleton className="h-4 w-3/4 bg-blue-200" />
                <Skeleton className="h-4 w-1/2 bg-green-200" />
              </VStack>
            </div>

            <div>
              <Text textSize="sm" className="mb-2 font-medium">No animation</Text>
              <VStack gap="sm">
                <Skeleton className="h-4 w-full animate-none" />
                <Skeleton className="h-4 w-3/4 animate-none" />
                <Skeleton className="h-4 w-1/2 animate-none" />
              </VStack>
            </div>
          </VStack>
        </Card>

        {/* Props Reference */}
        <Card
          title="Props Reference"
          subtitle="Complete list of Skeleton component properties"
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
                <td className="py-2">Custom CSS classes for styling the skeleton</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">children</Text></td>
                <td className="py-2">ReactNode</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Content inside the skeleton (usually empty)</td>
              </tr>
              <tr>
                <td className="py-2"><Text className="font-mono text-sm">...divProps</Text></td>
                <td className="py-2">HTMLDivElement</td>
                <td className="py-2">-</td>
                <td className="py-2">All standard div element props</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card title="Code Examples" description="How to use Skeleton component">
          <div className="h-64 w-full border rounded-md overflow-auto">
            <pre className="p-4 text-xs font-mono">
              {`import { Skeleton } from "@uikit"

// Basic skeleton
<Skeleton className="h-4 w-full" />

// Circle skeleton (avatar)
<Skeleton className="h-12 w-12 rounded-full" />

// Card skeleton layout
<div className="space-y-4">
  <div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
  <Skeleton className="h-48 w-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
</div>

// Custom styling
<Skeleton className="h-4 w-full bg-blue-200 animate-none" />

// Loading state pattern
{isLoading ? (
  <Skeleton className="h-8 w-32" />
) : (
  <h1>Actual Content</h1>
)}

// List of skeletons
{Array.from({ length: 5 }, (_, i) => (
  <div key={i} className="flex items-center space-x-3">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
))}`}
            </pre>
          </div>
        </Card>

      </VStack >
    </div >
  )
}
