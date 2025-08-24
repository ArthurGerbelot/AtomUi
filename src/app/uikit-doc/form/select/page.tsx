'use client'

import * as React from 'react'
import Link from 'next/link'

import { Header, Text, Button, IconBug, IconSettings, Choice, Select, Code, Card, IconInfo, AutoGrid, Fieldset, Label, Size, ChoiceValue } from '@uikit'
import { CardExample } from '../../components/CardExample'
import { VariantsSelect } from '../../components/VariantsSelect'


export default function SelectDocsPage() {

  const [size, setSize] = React.useState<Size | undefined>(undefined)

  const [value, setValue] = React.useState<string>('')
  const [color, setColor] = React.useState<string>('')

  const colors: Choice<string>[] = [

    { value: 'black', label: 'Black', icon: IconBug, colorTheme: 'full-contrast', keywords: ['bug'] },
    { value: 'red', label: 'Red', group: 'Warm', icon: IconBug, colorTheme: 'red', keywords: ['bug', 'warm'] },
    { value: 'orange', label: 'Orange', group: 'Warm', icon: IconSettings, colorTheme: 'orange', keywords: ['settings', 'warm'] },
    { value: 'yellow', label: 'Yellow', group: 'Warm', icon: IconSettings, colorTheme: 'yellow', keywords: ['settings', 'warm'], badgeProps: { surface: 'outline' } },
    { value: 'blue', label: 'Blue', group: 'Cold', icon: IconBug, colorTheme: 'blue', keywords: ['bug', 'cold'] },
    { value: 'green', label: 'Green', group: 'Cold', icon: IconSettings, colorTheme: 'green', keywords: ['settings', 'cold'] },
    { value: 'emerald', label: 'Emerald', group: 'Cold', icon: IconBug, colorTheme: 'emerald', keywords: ['bug', 'cold'] },
  ]

  const frameworks: Choice<string>[] = [
    { value: 'next', label: 'Next.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'nuxt', label: 'Nuxt.js' },
    { value: 'sveltekit', label: 'SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit SvelteKit' },
    { value: 'astro', label: 'Astro' },
  ]

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      <Header
        variant="main"
        title={<>Select (Combobox)</>}
        subtitle="Search, groups and controlled selection"
        description={
          <>
            This component provides a Combobox (Popover + Command) with a simple API inspired by <code>SimpleSelect</code>.
            It accepts typed <code>choices</code>, supports search, and both controlled/uncontrolled usage.
          </>
        }
      />

      {/* Controls */}
      <VariantsSelect
        size={size} setSize={setSize} defaultSize={undefined}
      />


      <Header
        variant="section"
        title={<>Composed <Code includeTag textSize="xl">Select</Code></>}
        subtitle="An easy version aleady composed to quickly use Select."
        description={<>Use the Composed version with <Text as={Link} href="/uikit-doc/tools/choices" typo="link">Choice[]</Text> to render grouped lists, disabled items, and icons.</>}
      />


      <Card
        title={<>Composed API is the same as <Code as={Link} href="/uikit-doc/form/simple-select" includeTag textSize="md">SimpleSelect</Code></>}
        Icon={<IconInfo textColor="info" />}
        textColor="info"
        className="border-info bg-blue-50 dark:bg-blue-900/50 max-w-md mx-auto"
      >
        Everything defined on the section Composed Component of <Code as={Link} href="/uikit-doc/form/simple-select" includeTag textSize="md">SimpleSelect</Code> is also available on <Code includeTag textSize="md">Select</Code>
      </Card>


      <CardExample
        title="Quick Demo/Test"
        subtitle={<>Everything available on <Code as={Link} href="/uikit-doc/form/simple-select" includeTag textSize="md">SimpleSelect</Code> must works here too</>}
        code={null}
      >
        <AutoGrid>

          <Fieldset flex>
            <Label>Atomic update</Label>
            <Select
              // surface="subtle"
              // colorTheme="info"
              // radius="full"
              className="hover:bg-info/20"

              size={size}
              choices={[1, 2, 3]}
            />
          </Fieldset>

        </AutoGrid>
      </CardExample>




      {/* Basic */}
      <Header variant="section" title={<>Basic</>} subtitle="Simple selector" />
      <CardExample title="Basic" description="Pick an option from a short list.">
        <div className="flex items-center gap-4">
          <Select choices={frameworks} placeholder="Select…" searchable={false} />
        </div>
      </CardExample>

      {/* Controlled */}
      <Header variant="section" title={<>Controlled</>} subtitle="Manage value from React state" />
      <CardExample title="Controlled" description="The value lives in parent state.">
        <div className="flex items-center gap-4">
          <Select
            choices={frameworks}
            placeholder="Pick a framework"
            value={value}
            onValueChange={setValue}
          />
          <Text className="text-muted-foreground">value: {value || '-'}</Text>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => setValue('next')}>Set Next</Button>
            <Button size="sm" variant="secondary" onClick={() => setValue('')}>Clear</Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select
            choices={colors}
            placeholder="Pick a color"
            value={color}
            onValueChange={setColor}
          />
          <Text className="text-muted-foreground">value: {color || '-'}</Text>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => setColor('green')}>Set Green</Button>
            <Button size="sm" variant="secondary" onClick={() => setColor('')}>Clear</Button>
          </div>pcomponents/molecules/index.ts
        </div>
      </CardExample>

      {/* Groups & labels */}
      <Header variant="section" title={<>Groups & labels</>} subtitle="Organize options logically" />
      <CardExample title="Groups" description="Automatically groups by the choice's group field.">
        <div className="flex items-center gap-4">
          <Select
            choices={colors}
            placeholder="Color"
            searchPlaceholder="Search a color…"
            groupLabels={{ Warm: 'Warm colors', Cold: 'Cold colors' }}
          />
        </div>
      </CardExample>

      {/* Badges */}
      <Header variant="section" title={<>Badges (colored)</>} subtitle="Render choices and selected value as badges" />
      <CardExample title="Badges" description="Display warm/cold colors as badges in the trigger and dropdown.">
        <div className="flex items-center gap-4">
          <Select
            choices={colors}
            placeholder="Pick a color"
            searchPlaceholder="Search colors…"
            groupLabels={{ Warm: 'Warm colors', Cold: 'Cold colors' }}
          />
          <Select
            choices={colors}
            placeholder="Pick a color"
            searchPlaceholder="Search colors…"
            groupLabels={{ Warm: 'Warm colors', Cold: 'Cold colors' }}
            choiceBadgeProps={{
              surface: 'subtle',
              // colorTheme: 'low-contrast',
            }}
          />
          <Select
            choices={colors}
            placeholder="Pick a color"
            searchPlaceholder="Search colors…"
            groupLabels={{ Warm: 'Warm colors', Cold: 'Cold colors' }}
            overrideChoiceBadgeProps={{
              surface: 'solid',
              // colorTheme: 'low-contrast',
            }}
          />
        </div>
      </CardExample>

      {/* Sizes */}
      <Header variant="section" title={<>Sizes</>} subtitle="Aligns with Input sizes" />
      <CardExample title="Sizes" description="XS → XL.">
        <div className="flex flex-wrap items-center gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
            <div key={s} className="flex items-center gap-2">
              <Text className="text-muted-foreground text-sm w-10">{s}</Text>
              <Select choices={frameworks} placeholder={`${s} size`} size={s} />
            </div>
          ))}
        </div>
      </CardExample>

      {/* Search */}
      <Header variant="section" title={<>Search</>} subtitle="Filter as you type" />
      <CardExample title="Built-in search" description="The input filters the list.">
        <div className="flex items-center gap-4">
          <Select
            choices={frameworks}
            placeholder="Select…"
            searchPlaceholder="Search…"
          />
        </div>
      </CardExample>

      {/* Notes */}
      <Header variant="sub-section" title={<>Notes</>} subtitle="Best practices" description={
        <>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Use <code>value</code>/<code>onValueChange</code> for controlled integration (form state).</li>
            <li><code>choices</code> can include a <code>group</code> to visually group options.</li>
            <li>The trigger uses tokens (surface, size) for consistency with <code>Input</code>.</li>
            <li>For a classic Radix Select (non-Combobox), see <Text as={Link} href="/uikit-doc/form/select" typo="link">SimpleSelect</Text>.</li>
          </ul>
        </>
      } />
    </div>
  )
}
