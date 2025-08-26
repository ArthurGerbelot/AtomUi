'use client'

// app/docs/typo/code/page.tsx
import * as React from "react"

// Import from your UI Kit alias
import { Code, Card, VStack, HStack, Header, Text, Button, SimpleGrid, Separator, List, IconInfo, SimpleSelect } from "@uikit"
import { sizes, Size, surfaceVariants, surfaces, Surface } from "@uikit/tokens"
import { VariantsSelect } from "../../components/VariantsSelect"
import { CardExample } from "../../components/CardExample"

export default function CodeDocsPage() {
  const [size, setSize] = React.useState<Size | undefined>(undefined)
  const [textScale, setTextScale] = React.useState<number>(0.875)
  const [includeTag, setIncludeTag] = React.useState<boolean>(false)
  const [includeSelfClosingTag, setIncludeSelfClosingTag] = React.useState<boolean>(false)
  const [includeBrace, setIncludeBrace] = React.useState<boolean>(false)
  const [surface, setSurface] = React.useState<Surface | undefined>(undefined)
  const [colorTheme, setColorTheme] = React.useState<string | undefined>(undefined)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* Header */}
      <Header
        variant="main"
        title={<><Code includeTag>Code</Code> Component</>}
        subtitle="Syntax-highlighted code snippets with automatic tokenization"
        description="A flexible code component built over Atom, supporting inline and block modes, automatic syntax highlighting, and customizable scaling."
        align="center"
      />

      {/* Interactive Playground */}
      <Card title="Interactive Playground" description="Test all Code props in real-time">
        <VStack gap="lg">
          {/* Controls */}
          <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} gap="md">
            <VStack gap="sm">
              <Text typo="label">Text Scale</Text>
              <HStack align="center" gap="sm">
                <input
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={textScale}
                  onChange={(e) => setTextScale(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <Text size="sm" className="w-12 text-right">{textScale}</Text>
              </HStack>
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Surface</Text>
              <SimpleSelect
                placeholder="Surface"
                choices={[...surfaces]}
                value={surface}
                onValueChange={(v) => setSurface(v as any)}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Color Theme</Text>
              <SimpleSelect
                placeholder="Color Theme"
                choices={[
                  { value: "default", label: "Default" },
                  { value: "success", label: "Success" },
                  { value: "error", label: "Error" },
                  { value: "warning", label: "Warning" },
                  { value: "info", label: "Info" },
                  { value: "bitcoin", label: "Bitcoin" },
                  { value: "lightning", label: "Lightning" },
                  { value: "brand", label: "Brand" },
                  { value: "high-contrast", label: "High Contrast" },
                  { value: "low-contrast", label: "Low Contrast" },
                ]}
                value={colorTheme}
                onValueChange={(v) => setColorTheme(v === "default" ? undefined : v as any)}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Size Context</Text>
              <SimpleSelect
                placeholder="Inherit size"
                choices={[
                  { value: "default", label: "Default" },
                  ...sizes.map(s => ({ value: s, label: s }))
                ]}
                value={size || "default"}
                onValueChange={(v) => setSize(v === "default" ? undefined : v as Size)}
              />
            </VStack>
          </SimpleGrid>

          {/* Checkboxes */}
          <SimpleGrid cols={{ base: 2, md: 3 }} gap="md">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeTag}
                onChange={(e) => setIncludeTag(e.target.checked)}
              />
              <Text size="sm">Include Tag <Code textScale={0.7}>{"<>"}</Code></Text>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeSelfClosingTag}
                onChange={(e) => setIncludeSelfClosingTag(e.target.checked)}
              />
              <Text size="sm">Self-closing <Code textScale={0.7}>{"</>"}</Code></Text>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeBrace}
                onChange={(e) => setIncludeBrace(e.target.checked)}
              />
              <Text size="sm">Include Brace <Code textScale={0.7}>{"{}"}</Code></Text>
            </label>
          </SimpleGrid>

          {/* Live Preview */}
          <VStack gap="md">
            <Text typo="label">Live Preview</Text>

            <div className="p-4 bg-muted rounded-lg">
              <Text size={size}>
                This is some text with{" "}
                <Code
                  textScale={textScale}
                  surface={surface}
                  colorTheme={colorTheme as any}
                  includeTag={includeTag}
                  includeSelfClosingTag={includeSelfClosingTag}
                  includeBrace={includeBrace}
                >
                  inline code
                </Code>
                {" "}in the middle of a sentence.
              </Text>
            </div>

            <Code
              as="pre"
              textScale={textScale}
              surface={surface}
              colorTheme={colorTheme as any}
              includeTag={includeTag}
              includeSelfClosingTag={includeSelfClosingTag}
              includeBrace={includeBrace}
              className="p-4"
            >
              {`const playground = {
  textScale: ${textScale},
  surface: "${surface}",
  colorTheme: "${colorTheme || 'default'}",
  includeTag: ${includeTag},
  includeSelfClosingTag: ${includeSelfClosingTag},
  includeBrace: ${includeBrace}
}`}
            </Code>

            {/* Generated Code */}
            <VStack gap="sm">
              <Text typo="label">Generated JSX</Text>
              <Code as="pre" surface="outline" className="p-3 text-sm">
                {`<Code
  textScale={${textScale}}
  surface="${surface}"${colorTheme ? `\n  colorTheme="${colorTheme}"` : ''}${includeTag ? '\n  includeTag' : ''}${includeSelfClosingTag ? '\n  includeSelfClosingTag' : ''}${includeBrace ? '\n  includeBrace' : ''}
>
  your code here
</Code>`}
              </Code>
            </VStack>
          </VStack>
        </VStack>
      </Card>

      {/* Basic Variants */}
      <Card title="Basic Variants" description="Different ways to style and format code">
        <SimpleGrid cols={{ base: 1, md: 2 }} gap="lg">
          <VStack gap="md">
            <Text typo="label">Default inline code</Text>
            <Text>Install with <Code>npm install</Code> command</Text>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Block code</Text>
            <Code as="pre" className="p-4">
              {`import { Code } from "@uikit"`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">With tag wrapper</Text>
            <Text>Use <Code includeTag>Button</Code> component</Text>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Self-closing tag</Text>
            <Text>Add <Code includeSelfClosingTag>input</Code> field</Text>
          </VStack>

          <VStack gap="md">
            <Text typo="label">With braces</Text>
            <Text>Pass <Code includeBrace>value</Code> prop</Text>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Custom text scale</Text>
            <Text>Small code: <Code textScale={0.75}>tiny text</Code></Text>
          </VStack>
        </SimpleGrid>
      </Card>

      {/* Surface Variants */}
      <Card title="Surface Variants" description="Different background and border styles">
        <SimpleGrid cols={{ base: 1, md: 3 }} gap="lg">
          <VStack gap="md">
            <Text typo="label">Subtle (default)</Text>
            <Text>Use <Code surface="subtle">subtle background</Code> for normal text</Text>
            <Code as="pre" surface="subtle" className="p-4">
              {`// Subtle code block
const example = "subtle"`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Outline</Text>
            <Text>Use <Code surface="outline">outlined style</Code> for emphasis</Text>
            <Code as="pre" surface="outline" className="p-4">
              {`// Outlined code block
const example = "outline"`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Solid</Text>
            <Text>Use <Code surface="solid">solid background</Code> for contrast</Text>
            <Code as="pre" surface="solid" className="p-4">
              {`// Solid code block
const example = "solid"`}
            </Code>
          </VStack>
        </SimpleGrid>
      </Card>

      {/* Color Theme Variants */}
      <Card title="Color Theme Variants" description="Code with different semantic colors">
        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
          <VStack gap="md">
            <Text typo="label">Success theme</Text>
            <Text>Command: <Code colorTheme="success" surface="outline">npm start</Code></Text>
            <Code as="pre" colorTheme="success" surface="subtle" className="p-3">
              {`✓ Build successful`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Error theme</Text>
            <Text>Error: <Code colorTheme="error" surface="outline">404 Not Found</Code></Text>
            <Code as="pre" colorTheme="error" surface="subtle" className="p-3">
              {`✗ Build failed`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Warning theme</Text>
            <Text>Warning: <Code colorTheme="warning" surface="outline">deprecated</Code></Text>
            <Code as="pre" colorTheme="warning" surface="subtle" className="p-3">
              {`⚠ Deprecated API`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Info theme</Text>
            <Text>Info: <Code colorTheme="info" surface="outline">v2.0.0</Code></Text>
            <Code as="pre" colorTheme="info" surface="subtle" className="p-3">
              {`ℹ New version available`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Bitcoin theme</Text>
            <Text>Address: <Code colorTheme="bitcoin" surface="outline">bc1q...</Code></Text>
            <Code as="pre" colorTheme="bitcoin" surface="subtle" className="p-3">
              {`₿ Bitcoin transaction`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Lightning theme</Text>
            <Text>Invoice: <Code colorTheme="lightning" surface="outline">lnbc...</Code></Text>
            <Code as="pre" colorTheme="lightning" surface="subtle" className="p-3">
              {`⚡ Lightning payment`}
            </Code>
          </VStack>
        </SimpleGrid>
      </Card>

      {/* Combined Examples */}
      <Card title="Combined Examples" description="Mixing different props for various use cases">
        <VStack gap="lg">
          <VStack gap="md">
            <Text typo="label">API Documentation</Text>
            <Text>
              Call <Code includeTag surface="outline" colorTheme="info">POST</Code> to{" "}
              <Code surface="solid" colorTheme="brand">/api/users</Code> with payload{" "}
              <Code includeBrace colorTheme="success">userData</Code>
            </Text>
          </VStack>

          <VStack gap="md">
            <Text typo="label">React Component Usage</Text>
            <Text>
              Import <Code includeTag colorTheme="info">Button</Code> and render{" "}
              <Code includeSelfClosingTag colorTheme="success">Input</Code> with{" "}
              <Code includeBrace colorTheme="warning">disabled</Code> prop
            </Text>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Terminal Commands</Text>
            <Code as="pre" surface="solid" colorTheme="high-contrast" className="p-4">
              {`$ npm create next-app@latest my-app
$ cd my-app
$ npm run dev`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Configuration File</Text>
            <Code as="pre" surface="outline" colorTheme="low-contrast" className="p-4">
              {`{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`}
            </Code>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Different Text Scales</Text>
            <HStack gap="md" align="center">
              <Code textScale={0.6} surface="outline">tiny</Code>
              <Code textScale={0.8} surface="outline">small</Code>
              <Code textScale={1.0} surface="outline">normal</Code>
              <Code textScale={1.2} surface="outline">large</Code>
              <Code textScale={1.5} surface="outline">huge</Code>
            </HStack>
          </VStack>
        </VStack>
      </Card>

      {/* Basic Usage */}
      <CardExample
        title="Basic Usage"
        description="Inline code within text and block code snippets"
        code={`
<Code>
  {\`import { Code } from "@uikit"\`}
</Code>`}
      >
        <VStack gap="md">
          <Code>
            {`import { Code } from "@uikit"`}
          </Code>
        </VStack>
      </CardExample>

      {/* Text Scaling */}
      <CardExample
        title="Text Scaling"
        description="Code automatically scales relative to its context, but you can override with textScale"
        code={`<VStack>
  <Text size="sm">Small context: <Code>small code</Code></Text>
  <Text size="md">Medium context: <Code>normal code</Code></Text>
  <Text size="lg">Large context: <Code>large code</Code></Text>
  <Text size="xl">Custom scale (based on parent text size): <Code textScale={0.5}>tiny code</Code></Text>
  <Text size="xl">Custom scale (based on parent text size): <Code textScale={2.5}>big code</Code></Text>
</VStack>`}
      >
        <VStack gap="md">
          <Text size="sm">Small context: <Code>small code</Code></Text>
          <Text size="md">Medium context: <Code>normal code</Code></Text>
          <Text size="lg">Large context: <Code>large code</Code></Text>
          <Text size="xl">Custom scale (based on parent text size): <Code textScale={0.5}>tiny code</Code></Text>
          <Text size="xl">Custom scale (based on parent text size): <Code textScale={2.5}>big code</Code></Text>
        </VStack>
      </CardExample>

      {/* Syntax Highlighting */}
      <CardExample
        title="Automatic Tokenization"
        description="Special characters are automatically highlighted"
        code={`<Code as="pre" className="p-4">
  {\`function Component({ prop = "default" }) {
    return <div className="example">Hello</div>
  }\`}
</Code>`}
      >
        <Code as="pre" className="p-4">
          {`function Component({ prop = "default" }) {
  return <div className="example">Hello</div>
}`}
        </Code>
      </CardExample>

      {/* Tag and Brace Wrappers */}
      <CardExample
        title="Tag and Brace Wrappers"
        description="Automatically wrap content with tags or braces"
        code={`<VStack>
  <Code includeTag>ComponentName</Code>
  <Code includeSelfClosingTag>input</Code>
  <Code includeBrace>propValue</Code>
</VStack>`}
      >
        <VStack gap="md">
          <Text>JSX element: <Code includeTag>ComponentName</Code></Text>
          <Text>Self-closing: <Code includeSelfClosingTag>input</Code></Text>
          <Text>JavaScript: <Code includeBrace>propValue</Code></Text>
        </VStack>
      </CardExample>

      {/* Sizes in Context */}
      <Card title="Sizes in Context" description="Code inherits size from its parent context">
        <VStack gap="md">
          {sizes.map((s) => (
            <HStack key={s} align="center" gap="md">
              <Text size={s} className="w-16">{s}:</Text>
              <Text size={s}>
                Run <Code>npm start</Code> to begin development
              </Text>
              <Button size={s}>Button</Button>
            </HStack>
          ))}
        </VStack>
      </Card>

      {/* Surface Variants */}
      <Card title="Surface Variants" description="Different background styles">
        <SimpleGrid cols={{ base: 1, md: 3 }} gap="lg">
          <VStack gap="sm">
            <Text typo="label">Subtle</Text>
            <Text>Use <Code surface="subtle">subtle background</Code> for normal text</Text>
          </VStack>

          <VStack gap="sm">
            <Text typo="label">Outline</Text>
            <Text>Use <Code surface="outline">outlined style</Code> for emphasis</Text>
          </VStack>

          <VStack gap="sm">
            <Text typo="label">Solid</Text>
            <Text>Use <Code surface="solid">solid background</Code> for contrast</Text>
          </VStack>
        </SimpleGrid>
      </Card>

      {/* Advanced Examples */}
      <CardExample
        title="Advanced Examples"
        description="Combining different features for various use cases"
        code={`// API documentation
<Text>
  Call <Code includeTag surface="outline">POST</Code> to
  <Code surface="solid">/api/users</Code> with payload
  <Code includeBrace>userData</Code>
</Text>

// Command line
<Code as="pre" surface="solid" className="p-4">
  $ npm create next-app@latest my-app
  $ cd my-app
  $ npm run dev
</Code>`}
      >
        <VStack gap="lg">
          <Text>
            Call <Code includeTag surface="outline">POST</Code> to{" "}
            <Code surface="solid">/api/users</Code> with payload{" "}
            <Code includeBrace>userData</Code>
          </Text>

          <Code as="pre" surface="solid" className="p-4">
            {`$ npm create next-app@latest my-app
$ cd my-app
$ npm run dev`}
          </Code>
        </VStack>
      </CardExample>

      {/* Props Reference */}
      <Card
        title="Props Reference"
        subtitle="Complete list of Code component properties"
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
              <td className="py-2"><Code>textScale</Code></td>
              <td className="py-2">number | string</td>
              <td className="py-2">Controls the relative size (default: 0.875)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Code>includeTag</Code></td>
              <td className="py-2">boolean</td>
              <td className="py-2">Wraps content with <Code textScale={0.8}>{"<>"}</Code> tags</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Code>includeSelfClosingTag</Code></td>
              <td className="py-2">boolean</td>
              <td className="py-2">Wraps content with <Code textScale={0.8}>{"</>"}</Code> self-closing tags</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Code>includeBrace</Code></td>
              <td className="py-2">boolean</td>
              <td className="py-2">Wraps content with <Code textScale={0.8}>{"{}"}</Code> braces</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Code>surface</Code></td>
              <td className="py-2">"subtle" | "outline" | "solid"</td>
              <td className="py-2">Background style (from Atom)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Code>as</Code></td>
              <td className="py-2">"span" | "pre" | "code"</td>
              <td className="py-2">Element type (defaults to "span" for inline, "pre" for block)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Code>asChild</Code></td>
              <td className="py-2">boolean</td>
              <td className="py-2">Render as child component for custom elements</td>
            </tr>
            <tr>
              <td className="py-2"><Code>AtomProps</Code></td>
              <td className="py-2">-</td>
              <td className="py-2">colorTheme, className, style, event handlers, etc.</td>
            </tr>
          </tbody>
        </table>
      </Card>




    </div >
  )
}
