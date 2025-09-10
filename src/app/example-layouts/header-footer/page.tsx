'use client'

import { LayoutHeaderFooter, Button, Text, Badge, Card, VStack } from "@uikit"
import { useState } from "react"

export default function HeaderFooterExamplePage() {

  const [sticky, setSticky] = useState(false)
  const [fullWidth, setFullWidth] = useState(true)

  return (
    <LayoutHeaderFooter
      size={fullWidth ? "full" : "5xl"}
      sticky={sticky}
      headerLeftContent={
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
            <Text textColor="background" weight="bold" textSize="sm">🏗️</Text>
          </div>
          <Text weight="bold" textSize="lg">UIKit Demo</Text>
        </div>
      }
      headerRightContent={
        <div className="flex items-center gap-3">
          <Button size="sm" variant="subtle" colorTheme={fullWidth ? "success" : "light"} onClick={() => setFullWidth(!fullWidth)}>size = {fullWidth ? "full" : "5xl"}</Button>
          <Button size="sm" variant="subtle" colorTheme={sticky ? "success" : "light"} onClick={() => setSticky(!sticky)}>Sticky = {sticky ? "true" : "false"}</Button>
          <Button size="sm" variant="outline">
            Documentation
          </Button>
        </div>
      }
      footerContent={
        <div className="flex flex-col items-center gap-4">
          <Text textSize="sm" textColor="muted" className="text-center">
            Complete implementation example of LayoutHeader with <Badge>fullWidth={true}</Badge>
          </Text>
          <div className="flex items-center gap-6">
            <Text as="a" href="#" textSize="sm" textColor="muted" className="hover:text-foreground">
              Documentation
            </Text>
            <Text as="a" href="#" textSize="sm" textColor="muted" className="hover:text-foreground">
              Components
            </Text>
            <Text as="a" href="#" textSize="sm" textColor="muted" className="hover:text-foreground">
              GitHub
            </Text>
          </div>
        </div>
      }
      headerClassName="bg-white shadow-sm"
      footerClassName="bg-gray-50"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              LayoutHeader Full Width Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's a complete implementation of the LayoutHeader component
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card
              title="Container Mode (default)"
              subtitle="fullWidth={false}"
              description="Header and footer centered with maximum width"
            >
              <VStack gap="sm">
                <Text textSize="sm">✅ Centered content with limited width</Text>
                <Text textSize="sm">✅ Optimal responsive design</Text>
                <Text textSize="sm">✅ Comfortable reading</Text>
              </VStack>
            </Card>

            <Card
              title="Full Width Mode"
              subtitle="fullWidth={true}"
              description="Header and footer use full width"
            >
              <VStack gap="sm">
                <Text textSize="sm">🎯 Uses all available width</Text>
                <Text textSize="sm">🎯 Perfect for apps and dashboards</Text>
                <Text textSize="sm">🎯 Maximum space for navigation</Text>
              </VStack>
            </Card>
          </div>

          <Card
            title="Code Example"
            description="Implementation of this page"
          >
            <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
              {`<LayoutHeader
  size="full"
  sticky={true}
  headerLeftContent={<Logo />}
  headerRightContent={<Menu />}
  footerContent={<FooterLinks />}
  headerClassName="bg-white shadow-sm"
  footerClassName="bg-gray-50"
>
  <YourMainContent />
</LayoutHeader>`}
            </pre>
          </Card>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
            <div className="text-center space-y-4">

              <Button as="a" href="/uikit-doc/layout-structure/layout-header-footer">
                View full documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutHeaderFooter>
  )
}