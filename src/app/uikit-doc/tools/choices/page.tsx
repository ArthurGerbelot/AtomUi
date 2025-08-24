"use client"

import React from "react"
import { Card, Header, Code, ChoiceBadge, IconCheckboxChecked, Choice, SimpleSelect, HStack, VStack, Text, Separator, List, surfaceVariants, Surface } from "@uikit"
import { CardExample } from "../../components/CardExample"

const trueChoice: Choice<boolean> = {
  value: true,
  label: "True",
  colorTheme: "success",
  icon: IconCheckboxChecked,
  iconProps: { textColor: "success" },
  descriptionProps: { textColor: "success" },
  badgeProps: { radius: "full", surface: "subtle" },
}

const colorChoices: Choice<string>[] = [
  { value: "red", label: "Red", colorTheme: "error", icon: IconCheckboxChecked },
  { value: "green", label: "Green", colorTheme: "success", icon: IconCheckboxChecked },
  { value: "blue", label: "Blue", colorTheme: "info", icon: IconCheckboxChecked },
]

export default function ChoicePage() {
  const [value, setValue] = React.useState<string | undefined>(undefined)
  const [surface, setSurface] = React.useState<string | undefined>(undefined)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      <Header
        variant="main"
        title={<>Choice Concept</>}
        subtitle="A typed value + display metadata"
        description={
          <>A Choice combines a typed <em>value</em> with display metadata (label, colorTheme, icon, badges...).
            It can feed a Select, render as a Badge, or be reused in tables and read-only fields.</>
        }
      />

      {/* What is a Choice */}
      <Card title="What is a Choice?" description="Shape and purpose">
        <VStack gap>
          <Text>
            <Code>Choice&lt;T&gt;</Code> holds:
          </Text>
          <List className="list-disc pl-6 text-muted-foreground">
            <List.Item><strong>value</strong>: the business value (T:string | number | boolean | enum)</List.Item>
            <List.Item><strong>label</strong>: human readable label (string | JSX)</List.Item>
            <List.Item><strong>colorTheme</strong>: quick theming hook for both icon and text</List.Item>
            <List.Item><strong>icon</strong> (SmartSlot): optional visual cue</List.Item>
            <List.Item><strong>badge</strong> (SmartSlot): optional badge styling when displayed alone</List.Item>
            <List.Item><strong>group</strong>, <strong>disabled</strong>: helpers for lists</List.Item>
          </List>
          <Separator />
          <Text>Inline example: <ChoiceBadge choice={trueChoice} /></Text>
        </VStack>
      </Card>

      {/* As Select options */}
      <CardExample
        title="Use with SimpleSelect"
        description="Provide Choice[] to render options with grouping, icons and disabled items"
        code={`
const colorChoices: Choice<string>[] = [
  { value: "red", label: "Red", colorTheme: "error", icon: IconCheckboxChecked },
  { value: "green", label: "Green", colorTheme: "success", icon: IconCheckboxChecked },
  { value: "blue", label: "Blue", colorTheme: "info", icon: IconCheckboxChecked },
]

// Usage
<SimpleSelect
  placeholder="Pick a color"
  value={value}
  onValueChange={setValue}
  choices={colorChoices}
/>
        `}>
        <HStack gap>
          <SimpleSelect
            placeholder="Pick a color"
            value={value}
            onValueChange={setValue}
            choices={colorChoices}
          />
          <Text className="text-muted-foreground">value: {String(value ?? "-")}</Text>
        </HStack>
        <Separator className="my-3" />
        <Text className="text-muted-foreground text-sm">Choices can include group and disabled fields to control the list rendering.</Text>
      </CardExample>

      {/* As a standalone visual value */}
      <Card title="Display as a Badge" description="Use ChoiceBadge to render a read-only visual value">
        <VStack>
          <label className="flex items-center gap-2">
            <span className="min-w-20 text-foreground">Surface</span>
            <SimpleSelect
              size="sm"
              placeholder="Select surface"
              choices={[
                ...Object.entries(surfaceVariants).map(([key]) => ({ value: key }))
              ]}
              onValueChange={(v) => setSurface(v as Surface)}
            />
          </label>

          <HStack gap>
            {colorChoices.map((c) => (
              <ChoiceBadge key={String(c instanceof Object ? c.value : c)} choice={c} surface={surface as Surface} />
            ))}
          </HStack>

        </VStack>
      </Card>

    </div>
  )
}