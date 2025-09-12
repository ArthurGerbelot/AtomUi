'use client'

import * as React from "react"

import { Atom, Header, Text, Code, Card, VStack, HStack, Badge, SimpleSelect, List } from "@uikit"
import { Size, sizes } from "@uikit/tokens/base/base"
import { CardExample } from "../../components/CardExample"

export default function ThemeSpacingPage() {
  const [selectedSize, setSelectedSize] = React.useState<Size>("md")
  const [numericalValue, setNumericalValue] = React.useState("16")

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <Header
        variant="main"
        title="Spacing"
        subtitle="Gap, Margin & Padding atomic tokens"
        description="Complete spacing system with Size tokens, numerical values, and directional variants for precise layout control."
      />

      {/* Controls */}
      <Card title="Interactive Controls" className="max-w-md mx-auto">
        <HStack gap="md">
          <VStack gap="xs">
            <Text textSize="sm" weight="medium">Size Token</Text>
            <SimpleSelect
              choices={[...sizes]}
              value={selectedSize}
              onValueChange={(v) => setSelectedSize(v as Size)}
            />
          </VStack>
          <VStack gap="xs">
            <Text textSize="sm" weight="medium">Numerical (px)</Text>
            <SimpleSelect
              choices={["8", "12", "16", "20", "24", "32", "98"]}
              value={numericalValue}
              onValueChange={setNumericalValue}
            />
          </VStack>
        </HStack>
      </Card>

      {/* Gap */}
      <CardExample
        title="Gap"
        description="Controls spacing between grid/flex children"
        code={`<Atom gap="${selectedSize}">
  <div>Item 1</div>
  <div>Item 2</div>
</Atom>`}
      >
        <VStack gap="lg">
          {/* Size tokens */}
          <VStack gap="sm">
            <Text weight="semibold">Size Tokens</Text>
            <HStack gap="md" wrap>
              <Atom display="flex" gap={selectedSize} className="border rounded p-3">
                <Badge colorTheme={"brand"}>Item 1</Badge>
                <Badge colorTheme={"brand"}>Item 2</Badge>
              </Atom>
            </HStack>
          </VStack>

          {/* Numerical */}
          <VStack gap="sm">
            <Text weight="semibold">Numerical Values</Text>
            <Atom
              display="flex"
              gap={Number(numericalValue)}
              className="border rounded p-3"
            >
              <Badge colorTheme="info">Item 1</Badge>
              <Badge colorTheme="info">Item 2</Badge>
            </Atom>
          </VStack>
        </VStack>
      </CardExample>

      {/* Margin */}
      <CardExample
        title="Margin"
        description="Controls external spacing around elements"
        code={`<Atom m="${selectedSize}">Content</Atom>
<Atom mx="${selectedSize}" my="sm">Content</Atom>
<Atom mt="${selectedSize}" mb="xs">Content</Atom>`}
      >
        <VStack gap="lg">
          {/* All sides */}
          <VStack gap="sm">
            <Text weight="semibold">All Sides (m)</Text>
            <div className="border-2 border-dashed border-muted p-4">
              <Atom m={selectedSize} className="bg-primary/10 p-4 border border-primary/20">
                <Text>Margin: {selectedSize}</Text>
              </Atom>
            </div>
          </VStack>

          {/* Horizontal/Vertical */}
          <VStack gap="sm">
            <Text weight="semibold">Horizontal & Vertical (mx, my)</Text>
            <HStack gap="md">
              <div className="border-2 border-dashed border-muted p-4">
                <Atom mx={selectedSize} className="bg-blue-100 p-3 border border-blue-300">
                  <Text textSize="sm">mx="{selectedSize}"</Text>
                </Atom>
              </div>
              <div className="border-2 border-dashed border-muted p-4">
                <Atom my={selectedSize} className="bg-green-100 p-3 border border-green-300">
                  <Text textSize="sm">my="{selectedSize}"</Text>
                </Atom>
              </div>
            </HStack>
          </VStack>

          {/* Individual sides */}
          <VStack gap="sm">
            <Text weight="semibold">Individual Sides</Text>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { prop: "mt", label: "Top" },
                { prop: "mr", label: "Right" },
                { prop: "mb", label: "Bottom" },
                { prop: "ml", label: "Left" }
              ].map(({ prop }) => (
                <div key={prop} className="border-2 border-dashed border-muted p-4">
                  <Atom
                    {...{ [prop]: selectedSize }}
                    className="bg-orange-100 p-3 border border-orange-300"
                  >
                    <Text textSize="sm">{prop}="{selectedSize}"</Text>
                  </Atom>
                </div>
              ))}
            </div>
          </VStack>
        </VStack>
      </CardExample>

      {/* Padding */}
      <CardExample
        title="Padding"
        description="Controls internal spacing within elements"
        code={`<Atom p="${selectedSize}">Content</Atom>
<Atom px="${selectedSize}" py="sm">Content</Atom>
<Atom pt="${selectedSize}" pb="xs">Content</Atom>`}
      >
        <VStack gap="lg">
          {/* All sides */}
          <VStack gap="sm">
            <Text weight="semibold">All Sides (p)</Text>
            <Atom p={selectedSize} className="bg-purple-100 border border-purple-300">
              <Text>Padding: {selectedSize}</Text>
            </Atom>
          </VStack>

          {/* Horizontal/Vertical */}
          <VStack gap="sm">
            <Text weight="semibold">Horizontal & Vertical (px, py)</Text>
            <HStack gap="md">
              <Atom px={selectedSize} py="xs" className="bg-blue-100 border border-blue-300">
                <Text textSize="sm">px="{selectedSize}" py="xs"</Text>
              </Atom>
              <Atom px="xs" py={selectedSize} className="bg-green-100 border border-green-300">
                <Text textSize="sm">px="xs" py="{selectedSize}"</Text>
              </Atom>
            </HStack>
          </VStack>

          {/* Individual sides */}
          <VStack gap="sm">
            <Text weight="semibold">Individual Sides</Text>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { prop: "pt", label: "Top", color: "red" },
                { prop: "pr", label: "Right", color: "blue" },
                { prop: "pb", label: "Bottom", color: "green" },
                { prop: "pl", label: "Left", color: "yellow" }
              ].map(({ prop, color }) => (
                <Atom
                  key={prop}
                  {...{ [prop]: selectedSize }}
                  className={`bg-${color}-100 border border-${color}-300`}
                >
                  <Text textSize="sm">{prop}="{selectedSize}"</Text>
                </Atom>
              ))}
            </div>
          </VStack>
        </VStack>
      </CardExample>

      {/* Size Scale Reference */}
      <CardExample
        title="Size Scale Reference"
        description="Visual reference for all Size tokens"
        code={null}
      >
        <VStack gap="md">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {sizes.map((size) => (
              <VStack key={size} gap="xs" align="center">
                <Text textSize="sm" weight="medium">{size}</Text>
                <div
                  className={`bg-primary h-4 gap-${size}`}
                  style={{ width: `var(--spacing-${size})` }}
                />
                <Code textSize="xs">var(--spacing-{size})</Code>
              </VStack>
            ))}
          </div>
        </VStack>
      </CardExample>


      {/* API Reference */}
      <Card title="API Reference" subtitle="All spacing props accept the same values">
        <VStack>

          {/* All spacing props */}
          <VStack>
            <Text weight="semibold" textColor="brand">Available Props</Text>
            <Text textSize="sm" textColor="muted">All these spacing props accept the same value types:</Text>

            <VStack gap="xs">
              <Text textSize="sm" weight="medium">Gap:</Text>
              <Text textSize="sm" textColor="muted" className="ml-4">
                <Code className="text-xs">gap</Code>
              </Text>

              <Text textSize="sm" weight="medium">Margin:</Text>
              <Text textSize="sm" textColor="muted" className="ml-4">
                <Code className="text-xs">m</Code>, <Code className="text-xs">mx</Code>, <Code className="text-xs">my</Code>, <Code className="text-xs">mt</Code>, <Code className="text-xs">mr</Code>, <Code className="text-xs">mb</Code>, <Code className="text-xs">ml</Code>
              </Text>

              <Text textSize="sm" weight="medium">Padding:</Text>
              <Text textSize="sm" textColor="muted" className="ml-4">
                <Code className="text-xs">p</Code>, <Code className="text-xs">px</Code>, <Code className="text-xs">py</Code>, <Code className="text-xs">pt</Code>, <Code className="text-xs">pr</Code>, <Code className="text-xs">pb</Code>, <Code className="text-xs">pl</Code>
              </Text>
            </VStack>
          </VStack>

          {/* Accepted Values */}
          <VStack>
            <Text weight="semibold" textColor="brand">Accepted Values</Text>
            <Text textSize="sm" textColor="muted">All spacing props accept these value types:</Text>

            <div className="bg-muted/30 p-4 rounded-lg">
              <Text textSize="sm">
                <strong>Values:</strong> {sizes.join(", ")}, 1-8, true, false, [numerical]
              </Text>
              <List textSize="xs" textColor="muted" className="mt-2">
                <List.Item><strong>Size tokens</strong>: xs, sm, md, lg, xl</List.Item>
                <List.Item><strong>Tailwind scale</strong>: 1-8 (maps to Tailwind spacing)</List.Item>
                <List.Item><strong>Boolean</strong>: true=md, false=0</List.Item>
                <List.Item><strong>Numerical</strong>: Any number (uses calc with --spacing base)</List.Item>
              </List>
            </div>
          </VStack>

          {/* Examples */}
          <VStack>
            <Text weight="semibold" textColor="brand">Usage Examples</Text>
            <Code as="pre" className="p-4 bg-muted/50 rounded text-sm">
              {`// All equivalent ways to set spacing
<Atom gap="md" />        // Size token
<Atom gap={4} />         // Numerical (4 × 0.25rem = 1rem)
<Atom gap={true} />      // Boolean (md)
<Atom gap={false} />     // Boolean (0)

// Directional spacing
<Atom mx="lg" my={6} />  // Mixed: mx=lg, my=6×0.25rem
<Atom mt={2} mb="xl" />  // Mixed: mt=2×0.25rem, mb=xl

// Custom values
<Atom gap={24} p={12} /> // 24×0.25rem=6rem, 12×0.25rem=3rem`}
            </Code>
          </VStack>
        </VStack>
      </Card>







    </div>
  )
}
