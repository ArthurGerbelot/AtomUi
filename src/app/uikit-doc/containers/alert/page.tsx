'use client'

import * as React from "react"
import { Alert, Card, VStack, HStack, Header, Text, Button, SimpleGrid, IconInfo, SimpleSelect, IconClose, IconButton, AlertProps } from "@uikit"
import { colorThemes, Surface, surfaces } from "@uikit/tokens"
import { CardExample } from "../../components/CardExample"
import { Fragment } from "react"

export default function AlertDocsPage() {
  const [selectedVariant, setSelectedVariant] = React.useState<string | undefined>(undefined)
  const [selectedSurface, setSelectedSurface] = React.useState<string | undefined>(undefined)

  // Available semantic variants for examples
  const semanticVariants = [
    { value: "success", label: "Success", description: "Operation completed successfully" },
    { value: "error", label: "Error", description: "Something went wrong" },
    { value: "warning", label: "Warning", description: "Please review before proceeding" },
    { value: "info", label: "Info", description: "Here's some helpful information" },
    { value: "bitcoin", label: "Bitcoin", description: "Bitcoin transaction completed" },
    { value: "lightning", label: "Lightning", description: "Lightning payment received" },
  ]

  const selectedVariantData = semanticVariants.find(v => v.value === selectedVariant) || semanticVariants[0]

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* Header */}
      <Header
        variant="main"
        title="Alert Component"
        subtitle="Semantic notifications and messages built on Card"
        description="A polymorphic Alert component that extends Card with semantic variants for displaying notifications, status messages, and contextual information."
        align="center"
      />

      {/* Interactive Playground */}
      <Card title="Interactive Playground" description="Test Alert variants and surfaces">
        <VStack gap="lg">
          {/* Controls */}
          <SimpleGrid cols={{ base: 1, md: 2 }} gap="md">
            <VStack gap="sm">
              <Text typo="label">Variant</Text>
              <SimpleSelect
                placeholder="Select variant"
                choices={[...colorThemes]}
                value={selectedVariant}
                onValueChange={setSelectedVariant}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Surface</Text>
              <SimpleSelect
                placeholder="Surface"
                choices={[...surfaces]}
                value={selectedSurface}
                onValueChange={setSelectedSurface}
              />
            </VStack>
          </SimpleGrid>

          {/* Live Preview */}
          <VStack gap="md">
            <Text typo="label">Live Preview</Text>
            <Alert
              variant={selectedVariant as AlertProps['variant']}
              surface={selectedSurface as Surface}
              title={selectedVariantData.label}
              description={selectedVariantData.description}
            />

            {/* Generated Code */}
            <Card surface="outline" className="p-3 font-mono text-sm">
              <Text as="pre">{`<Alert
  variant="${selectedVariant}"
  surface="${selectedSurface}"
  title="${selectedVariantData.label}"
  description="${selectedVariantData.description}"
/>`}</Text>
            </Card>
          </VStack>
        </VStack>
      </Card>

      {/* Basic Variants */}
      <Card title="Semantic Variants" description="Common alert types with semantic meaning">
        <SimpleGrid cols={{ base: 1, lg: 3 }} gap="md">
          <Alert
            title={"Default"}
            description={"No variant"}
          />
          <Alert
            title={"Default"}
            description={"No variant"}
          />
          <Card
            surface="subtle-outline"
            colorTheme={"low-contrast"}
            title={"Card version"}
            description={"Or redo using Card..."}
          />
          {semanticVariants.map((variant) => (
            <Fragment key={variant.value}>
              <Alert
                variant={variant.value as AlertProps['variant']}
                title={variant.label}
                description={variant.description}
              />
              <Alert
                variant={variant.value as AlertProps['variant']}
                surface="subtle-outline"
                title={variant.label}
                description={variant.description}
              />
              <Card
                surface="subtle-outline"
                colorTheme={"low-contrast"}
                headerProps={{
                  textColor: variant.value as AlertProps['variant'],
                }}
                title={"Card version"}
                description={"Or redo using Card..."}
              />
            </Fragment>
          ))}
        </SimpleGrid>
      </Card>

      {/* Surface Variants */}
      <Card title="Surface Variants" description="Different background and border styles">
        <VStack gap="lg">
          <VStack gap="md">
            <Text typo="label">Success variant with different surfaces</Text>
            <SimpleGrid cols={{ base: 1, md: 2 }} gap="md">
              <Alert
                variant="success"
                surface="subtle"
                title="Subtle Surface"
                description="Background with transparency"
              />
              <Alert
                variant="success"
                surface="subtle-outline"
                title="Subtle Outline"
                description="With border for emphasis"
              />
              <Alert
                variant="success"
                surface="outline"
                title="Outline Surface"
                description="Clear border, no background"
              />
              <Alert
                variant="success"
                surface="solid"
                title="Solid Surface"
                description="Full color background"
              />
            </SimpleGrid>
          </VStack>
        </VStack>
      </Card>

      {/* With Actions */}
      <Card title="With Actions" description="Alerts with interactive elements">
        <VStack gap="lg">
          <Alert
            variant="warning"
            surface="subtle-outline"
            title="Confirmation Required"
            description="This action cannot be undone. Are you sure you want to continue?"
          >
            <HStack gap="sm" className="justify-end">
              <Button size="sm" surface="outline">Cancel</Button>
              <Button size="sm" colorTheme="warning">Confirm</Button>
            </HStack>
          </Alert>

          <Alert
            variant="info"
            title="New Feature Available"
            description="We've added new functionality to improve your experience."
            Action={
              <IconButton icon={IconClose} />
            }
          >
            <HStack gap="sm" className="justify-end">
              <Button size="sm" surface="text-accent">Learn More</Button>
              <Button size="sm">Try Now</Button>
            </HStack>
          </Alert>
        </VStack>
      </Card>

      {/* Basic Usage Example */}
      <CardExample
        title="Basic Usage"
        description="Simple alert with automatic icon selection"
        code={`import { Alert } from "@uikit"

// Icons are automatically selected based on variant
<Alert
  variant="success"
  title="Success!"
  description="Your action was completed successfully."
/>

// You can also override the icon
<Alert
  variant="success"
  Icon={<CustomIcon />}
  title="Custom Icon"
  description="Override the default icon if needed."
/>`}
      >
        <VStack gap="md">
          <Alert
            variant="success"
            title="Success!"
            description="Your action was completed successfully."
          />
          <Alert
            variant="success"
            Icon={<IconInfo />}
            title="Custom Icon"
            description="Override the default icon if needed."
          />
        </VStack>
      </CardExample>

      {/* Extended Color Themes */}
      <Card title="Extended Color Themes" description="Using additional ColorTheme values">
        <SimpleGrid cols={{ base: 1, md: 2 }} gap="lg">
          <Alert
            variant="brand"
            surface="subtle-outline"
            title="Brand Alert"
            description="Using brand color theme"
          />

          <Alert
            variant="high-contrast"
            surface="outline"
            title="High Contrast"
            description="For accessibility needs"
          />

          <Alert
            variant="purple"
            surface="subtle"
            title="Purple Theme"
            description="Using Tailwind color"
          />

          <Alert
            variant="emerald"
            surface="solid"
            title="Emerald Theme"
            description="Solid emerald background"
          />
        </SimpleGrid>
      </Card>

      {/* Props Reference */}
      <Card
        title="Props Reference"
        subtitle="Complete list of Alert component properties"
        Icon={<IconInfo textColor="info" />}
      >
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
              <td className="py-2"><Text className="font-mono text-sm">variant</Text></td>
              <td className="py-2">ColorTheme</td>
              <td className="py-2">Semantic color theme (success, error, warning, info, etc.)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">surface</Text></td>
              <td className="py-2">Surface</td>
              <td className="py-2">Background style (default: "subtle-outline")</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">title</Text></td>
              <td className="py-2">ReactNode</td>
              <td className="py-2">Alert title content</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">description</Text></td>
              <td className="py-2">ReactNode</td>
              <td className="py-2">Alert description/body content</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">Icon</Text></td>
              <td className="py-2">ReactNode</td>
              <td className="py-2">Optional icon override. Auto-selected by variant if not provided.</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">Actions</Text></td>
              <td className="py-2">ReactNode</td>
              <td className="py-2">Optional action buttons or elements</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">as</Text></td>
              <td className="py-2">ElementType</td>
              <td className="py-2">HTML element to render as (default: "div")</td>
            </tr>
            <tr>
              <td className="py-2"><Text className="font-mono text-sm">CardProps</Text></td>
              <td className="py-2">-</td>
              <td className="py-2">All Card component props (className, style, etc.)</td>
            </tr>
          </tbody>
        </table>
      </Card>


    </div>
  )
}
