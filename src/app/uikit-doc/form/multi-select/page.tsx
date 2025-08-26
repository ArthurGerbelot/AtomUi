'use client'

import * as React from 'react'
import Link from 'next/link'

import { Header, Text, Button, MultiSelect, Code, Card, IconInfo, AutoGrid, Fieldset, Label, Size, UNGROUPED_GROUP_KEY, IconMap, HStack, colorThemes, VStack, List, TextWithLabel } from '@uikit'
import { CardExample } from '../../components/CardExample'
import { VariantsSelect } from '../../components/VariantsSelect'
import { colorChoices, countryChoices, frameworksWithLongLabels, longList, temperatureColors } from '../utils'


export default function SelectDocsPage() {

  const [size, setSize] = React.useState<Size | undefined>(undefined)

  const [value, setValue] = React.useState<string>('')
  const [colors, setColors] = React.useState<string[]>([])

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
        <AutoGrid colsMinWidth='200px'>

          <Fieldset flex>
            <Label>Atomic update</Label>
            <MultiSelect
              surface="subtle"
              colorTheme="info"
              radius="full"
              className="hover:bg-info/20"

              size={size}
              choices={[1, 2, 3]}
            />
          </Fieldset>

          <Fieldset flex>
            <Label>Simpler version</Label>
            <MultiSelect
              size={size}
              choices={[1, 2, 3]}
            />
          </Fieldset>


          <Fieldset flex>
            <Label>Using ChoiceObject[]</Label>
            <MultiSelect
              size={size}
              choices={[{ value: "info" }, { value: "success" }, { value: "error" }]}
            />
          </Fieldset>

          <Fieldset flex>
            <Label>With Choice visual props</Label>
            <MultiSelect
              size={size}
              choices={[
                { value: "info", label: "Info + icon", icon: IconInfo },
                { value: "success", label: "Success + color", colorTheme: "success" },
                { value: "error", label: "Error + surface", surface: "outline" }
              ]} />
          </Fieldset>


          <Fieldset flex>
            <Label><Code includeBrace>choiceBadgeProps</Code></Label>
            <MultiSelect
              size={size}
              choices={[
                { value: "info", label: "Info + icon", icon: IconInfo },
                { value: "success", label: "Success + color", colorTheme: "success" },
                { value: "error", label: "Error + surface", surface: "outline" }
              ]}
              choiceBadgeProps={{
                surface: "subtle",
                colorTheme: "info",
              }}
            />
          </Fieldset>


          <Fieldset flex>
            <Label><Code includeBrace>overrideChoiceBadgeProps</Code></Label>
            <MultiSelect
              size={size}
              choices={[
                { value: "info", label: "Info + icon", icon: IconInfo },
                { value: "success", label: "Success + color", colorTheme: "success" },
                { value: "error", label: "Error + surface", surface: "outline" }
              ]}
              overrideChoiceBadgeProps={{
                surface: "subtle",
                colorTheme: "info",
              }}
            />
          </Fieldset>


          <Fieldset flex>
            <Label>Disabled</Label>
            <MultiSelect
              disabled
              placeholder="Disabled"
              size={size}
              choices={[{ value: "x", label: "Not selectable", disabled: true }]}
            />
          </Fieldset>

          <Fieldset flex>
            <Label>Inferred type</Label>
            <MultiSelect
              placeholder="Inferred type"
              size={size}
              choices={colorChoices}
              onValueChange={(_value) => console.log("_value must be a ColorChoices", _value)}
            />
          </Fieldset>

          <Fieldset flex>
            <Label>Long list</Label>
            <MultiSelect
              placeholder="Handle long list"
              size={size}
              choices={longList}
            />
          </Fieldset>

          <Fieldset flex>
            <Label>Groups and <Code includeBrace>groupLabels</Code></Label>
            <MultiSelect
              placeholder="Handle groups"
              size={size}
              choices={countryChoices}
              groupLabels={{
                Europe: <Text><IconMap /> Europe</Text>,
                [UNGROUPED_GROUP_KEY]: "Other",
              }}
            />
          </Fieldset>

        </AutoGrid>
      </CardExample>




      {/* Basic */}
      <Header
        variant="sub-section"
        title={<>Advanced features</>}
        subtitle="On Composed Select"
      />


      <CardExample title="Searchable" description="Handle the search input to the dropdown.">
        <HStack>
          <Fieldset flex>
            <Label>Not searchable</Label>
            <MultiSelect choices={temperatureColors} placeholder="Select…" searchable={false} />
          </Fieldset>

          <Fieldset flex>
            <Label>Too long value</Label>
            <MultiSelect choices={frameworksWithLongLabels} placeholder="Select…" />
          </Fieldset>
        </HStack>
      </CardExample>

      <CardExample
        title="Keywords"
        subtitle="Choices keywords are also filtered by default."
        description="Try warn/cold or bug/cog to filter choices."
        note={<Text typo="hint"><Text weight="semibold">Note:</Text> Filter function is customizable using the <Code includeBrace>filter</Code> prop, and UI-kit also provide the <Code includeBrace>selectFilterDefault</Code> function.</Text>}
      >
        <HStack>
          <Fieldset flex>
            <Label>With keywords</Label>
            <MultiSelect choices={temperatureColors} placeholder="Select…" />
          </Fieldset>
        </HStack>
      </CardExample>

      {/* Controlled */}
      <Header
        variant="sub-section"
        title={<>Controlled</>}
        subtitle="Manage value from React state"
      />

      <CardExample title="Controlled" description="The value lives in parent state.">
        <div className="flex items-center gap-4">
          <MultiSelect
            choices={temperatureColors}
            placeholder="Pick a color"
            value={colors}
            onValueChange={setColors}
          />
          <Text className="text-muted-foreground">value: {colors.join(', ') || '-'}</Text>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => setColors(['green'])}>Set Green</Button>
            <Button size="sm" variant="secondary" onClick={() => setColors([])}>Clear</Button>
          </div>
        </div>
      </CardExample>



      {/* Groups & labels */}
      <Header variant="sub-section" title={<>Groups & labels</>} subtitle="Organize options logically" />
      <CardExample title="Groups" description="Automatically groups by the choice's group field.">
        <div className="flex items-center gap-4">
          <MultiSelect
            choices={temperatureColors}
            placeholder="Color"
            searchPlaceholder="Search a color…"
            groupLabels={{ Warm: 'Warm colors', Cold: 'Cold colors', [UNGROUPED_GROUP_KEY]: 'Other' }}
          />
        </div>
      </CardExample>



      <Header
        variant="section"
        title={<>Build your own using Primitive</>}
        subtitle="Use the primitives to build your own Select."
      />

      {/* <Card
        textColor="warning"
        className="border-warning bg-amber-50 dark:bg-amber-950/50 max-w-md mx-auto"
        title="Only for SimpleSelect"
        subtitle="And NOT for Select, MultiSelect"
        Icon={<IconWarning textColor="warning" />}
      >
        <VStack gap>
          <Text>
            Primitive components are not the same between <Code includeTag>SimpleSelect</Code> and <Code includeTag as={Link} href="/uikit-doc/form/select">Select</Code> or <Code includeTag as={Link} href="/uikit-doc/form/multiselect">MultiSelect</Code> components.
          </Text>
          <Text>
            See <Text as={Link} typo="link" href="/uikit-doc/form/select">Select</Text> and <Text as={Link} typo="link" href="/uikit-doc/form/multiselect">MultiSelect</Text> for more details.
          </Text>
        </VStack>
      </Card> */}

      <Card
        surface="subtle-outline"
        colorTheme="info"
        title="Primitives API"
        subtitle="Compose your own select with fine-grained building blocks"
        Icon={<IconInfo textColor="info" />}
      >
        <VStack gap>
          <Text textSize="sm">Each subcomponent plays a specific role. Combine them to build any Select UX.</Text>
          <List>
            <List.Item><TextWithLabel label="Select.Trigger">Button that opens/closes the combobox (Input surface + tokens)</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="Select.Value">Renders the selected choice (uses ChoiceBadge via SmartSlot)</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="Select.Content">Popover container hosting the Command list</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="Select.Input">Search input (wraps Command.Input; full-width; events wired)</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="Select.Item">Selectable option (renders ChoiceBadge; handles disabled state)</TextWithLabel></List.Item>
          </List>
        </VStack>
      </Card>


    </div>
  )
}
