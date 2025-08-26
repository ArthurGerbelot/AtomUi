"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"

import { Header, Card, HStack, VStack, Text, Code, Separator, SimpleSelect, TextWithLabel, Button, TextWithIcon, IconError, IconInfo, IconCheckboxChecked, List, IconSuccess, Fieldset, Label, ChoiceBadge, IconWarning, ChoiceObject, sizes, Size, Accordion, IconMap, UNGROUPED_GROUP_KEY } from "@uikit"

import { VariantsSelect } from "../../components/VariantsSelect"
import { CodeRenderer } from "../../components/CardExample"
import { colorChoices, countryChoices, longList } from "../utils"

export default function SelectPage() {
  const [size, setSize] = useState<Size | undefined>(undefined)
  const [value, setValue] = useState<string | undefined>(undefined)
  const [valueNumber, setValueNumber] = useState<string | undefined>(undefined)
  const [valueLongList, setValueLongList] = useState<string | undefined>(undefined)



  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      {/* Header */}
      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">SimpleSelect</Code> Component</>}
        subtitle="Accessible select built with Radix UI and styled via Atom tokens"
        description="Composable API: Trigger/Content/Item with size variants, labels and groups."
      />

      <Card
        surface="subtle-outline"
        colorTheme="yellow"
        title="Heads up"
        subtitle={<>This page focuses <Code includeTag>SimpleSelect</Code> for basic single-value selections</>}
        className="max-w-md mx-auto"
      >
        <VStack gap>
          <Text textSize="sm" textColor="foreground">
            For advanced features like multi-select and searchable lists, check out the <Text textColor="brand" as={Link} href="/uikit-doc/form/select" typo="link">Select</Text> and <Text textColor="brand" as={Link} href="/uikit-doc/form/multiselect" typo="link">MultiSelect</Text> components.
          </Text>
          <Text textSize="sm" textColor="foreground">
            Note that all prop specifications available in the Composed version are shared across all Composed Select components, as they use the same base props.
          </Text>
        </VStack>
      </Card>


      <Card
        title="Quick Demo"
        subtitle="A quick demo of the SimpleSelect"
        Icon={<IconCheckboxChecked textColor="success" />}
      >
        <HStack gap>
          <Fieldset flex>
            <Label>Colored</Label>
            <SimpleSelect
              placeholder="Choose a color"
              size={size}
              choices={colorChoices}
              defaultValue="info"
              overrideChoiceBadgeProps={{
                surface: "subtle-accent",
              }}
            />
          </Fieldset>

          <Fieldset flex>
            <Label>Groups</Label>
            <SimpleSelect
              placeholder="Choose a counry"
              size={size}
              choices={countryChoices}
            />
          </Fieldset>
        </HStack>
      </Card>

      {/* Controls */}
      <VariantsSelect
        size={size} setSize={setSize} defaultSize={undefined}
      />

      <Header
        variant="section"
        title={<>Composed SimpleSelect</>}
        subtitle="An easy version aleady composed to quickly use Select."
        description={<>Use the Composed version with <Text as={Link} href="/uikit-doc/tools/choices" typo="link">Choice[]</Text> to render grouped lists, disabled items, and icons.</>}
      />

      <Card
        title="Concern all Selects"
        subtitle="SimpleSelect, Select, MultiSelect"
        Icon={<IconInfo textColor="info" />}
        textColor="info"
        className="border-info bg-blue-50 dark:bg-blue-900/50 max-w-md mx-auto"
      >
        <VStack gap>
          <Text>
            All the Composed Specs are the sames for all Composed Selects (<Code includeTag as={Link} href="/uikit-doc/form/select">Select</Code> and <Code includeTag as={Link} href="/uikit-doc/form/multiselect">MultiSelect</Code> components) who only add new features on top of <Code includeTag>SimpleSelect</Code><br />
          </Text>
        </VStack>
      </Card>

      <Header
        variant="sub-section"
        title={<>Polymorphic Atomic Component</>}
        subtitle="Ref + Atomic tokens are propagated"
      />

      <Card
        title="SimpleSelect is customizable"
        subtitle="Use the Atomic tokens to customize the SimpleSelect.Trigger, the visual part of the Form Input"
        Icon={<IconCheckboxChecked textColor="success" />}
      >
        <Fieldset flex>
          <Label>Atomic update</Label>
          <SimpleSelect
            surface="subtle"
            colorTheme="info"
            radius="full"
            className="hover:bg-info/20"

            size={size}
            choices={[1, 2, 3]}
          />
        </Fieldset>
      </Card>


      <Header
        variant="sub-section"
        title={<>Value Rendering</>}
        subtitle="How to customize the rendering of the values"
      />


      {/* Composed version with Choice system */}
      <Card
        title="A choice can be a simple value"
        subtitle="(String, Number, Boolean, etc.)"
        description={`By default Choice will be displayed using surface="text-accent" + colorTheme="high-contrast`}
        Icon={<IconCheckboxChecked textColor="success" />}
        avoidContent
      >
        <VStack noGap full stretch>

          <Card.Content>
            <CodeRenderer
              code={`<SimpleSelect choices={[1, 2, 3]} />`}
            >
              <Fieldset flex>
                <Label>Simpler version</Label>
                <SimpleSelect
                  size={size}
                  choices={[1, 2, 3]}
                />
              </Fieldset>
            </CodeRenderer>
          </Card.Content>


          {/* ------------------------------------------------ */}
          <Card.Separator />
          {/* ------------------------------------------------ */}

          <Card.Header
            Icon={<IconCheckboxChecked textColor="success" />}
            title="Or use Choice to handle rendering"
          />
          <Card.Content>

            <CodeRenderer
              code={`<SimpleSelect choices={[{value: "info"}, {value: "success"}, {value: "error"}]} />`}
            >
              <Fieldset flex>
                <Label>Using ChoiceObject[]</Label>
                <SimpleSelect
                  size={size}
                  choices={[{ value: "info" }, { value: "success" }, { value: "error" }]}
                />
              </Fieldset>
            </CodeRenderer>
          </Card.Content>

          {/* ------------------------------------------------ */}
          <Card.Separator />
          {/* ------------------------------------------------ */}

          <Card.Header
            Icon={<IconCheckboxChecked textColor="success" />}
            title="Choice provide advanced rendering options"
            subtitle={<>See <Text as={Link} href="/uikit-doc/tools/choices" typo="link">Choice</Text> for more details</>}
            description="Add label, icon, colorTheme, surface, etc."
          />
          <Card.Content>

            <CodeRenderer
              code={`<SimpleSelect
  choices={[
    {value: "info", label: "Info + icon", icon: IconInfo},
    {value: "success", label: "Success + color", colorTheme: "success"},
    {value: "error", label: "Error + surface", surface: "outline"}
  ]}
/>`}
            >
              <Fieldset flex>
                <Label>With Choice visual props</Label>
                <SimpleSelect
                  size={size}
                  choices={[
                    { value: "info", label: "Info + icon", icon: IconInfo },
                    { value: "success", label: "Success + color", colorTheme: "success" },
                    { value: "error", label: "Error + surface", surface: "outline" }
                  ]} />
              </Fieldset>
            </CodeRenderer>
          </Card.Content>


          {/* ------------------------------------------------ */}
          <Card.Separator />
          {/* ------------------------------------------------ */}

          <Card.Header
            Icon={<IconCheckboxChecked textColor="success" />}
            title="Customize default rendering"
            subtitle={<>Use <Code includeBrace>choiceBadgeProps</Code> to customize the rendering</>}
            description="The SmartSlot props on ChoiceBadge have lower priority than the ChoiceObject props. This allows you to add rendering configuration without overriding the settings defined in the choices."
          />
          <Card.Content>

            <CodeRenderer
              code={`<SimpleSelect
  choices={ /* ... */}
  choiceBadgeProps={{
    surface: "subtle",
    colorTheme: "info",
  }}
/>`}
            >
              <Fieldset flex>
                <Label>Use <Code includeBrace>choiceBadgeProps</Code> props</Label>
                <SimpleSelect
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
            </CodeRenderer>
          </Card.Content>

          {/* ------------------------------------------------ */}
          <Card.Separator />
          {/* ------------------------------------------------ */}

          <Card.Header
            Icon={<IconCheckboxChecked textColor="success" />}
            title="Force rendering"
            subtitle={<>Use <Code includeBrace>overrideChoiceBadgeProps</Code> to force the rendering</>}
            description={`If you want to force the rendering of a ChoiceObject, you can use the <Code includeBrace>overrideChoiceBadgeProps</Code> prop.`}
          />
          <Card.Content>

            <CodeRenderer
              code={`<SimpleSelect
  choices={ /* ... */}
  overrideChoiceBadgeProps={{
    surface: "subtle",
    colorTheme: "info",
  }}
/>`}
            >
              <Fieldset flex>
                <Label>Use <Code includeBrace>overrideChoiceBadgeProps</Code> props</Label>
                <SimpleSelect
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
            </CodeRenderer>
          </Card.Content>
        </VStack>
      </Card>


      <Card
        Icon={<IconCheckboxChecked textColor="success" />}
        title="Disabled"
        subtitle="Use the disabled prop to disable the SimpleSelect"
      >

        <Fieldset flex>
          <Label>Disabled</Label>
          <SimpleSelect
            disabled
            placeholder="Disabled"
            size={size}
            choices={[{ value: "x", label: "Not selectable", disabled: true }]}
          />
        </Fieldset>
      </Card>


      <Card
        Icon={<IconCheckboxChecked textColor="success" />}
        title="Inferred type"
        subtitle="SimpleSelect must infer the type of the value based on the type of the choices"
      >
        <Fieldset flex>
          <Label>Inferred type</Label>
          <SimpleSelect
            placeholder="Inferred type"
            size={size}
            choices={colorChoices}
            onValueChange={(_value) => console.log("value must be a ColorChoices", value)}
          />
        </Fieldset>
      </Card>

      <Card
        Icon={<IconCheckboxChecked textColor="success" />}
        title="Long list of choices"
        subtitle="Automatically handle long list of choices (Radix)"
      >
        <Fieldset flex>
          <Label>Long list of choices</Label>
          <SimpleSelect
            placeholder="Handle long list of choices"
            size={size}
            choices={longList}
          />
        </Fieldset>
      </Card>
      <Separator />


      <Card
        Icon={<IconCheckboxChecked textColor="success" />}
        title="Groups"
        subtitle="Automatically handle groups using choice.group"
        description="Will be sorted by first group found on the choices list. Use the groupLabels prop to customize the labels of the groups"
      >
        <HStack>
          <Fieldset flex>
            <Label>Groups are sorted by first group found</Label>
            <SimpleSelect
              placeholder="Handle groups"
              size={size}
              choices={countryChoices}
            />
          </Fieldset>

          <Fieldset flex>
            <Label>Use the <Code includeBrace>groupLabels</Code> prop to customize</Label>
            <SimpleSelect
              placeholder="Handle groups"
              size={size}
              choices={countryChoices}
              groupLabels={{
                Europe: <Text><IconMap /> Europe</Text>,
                [UNGROUPED_GROUP_KEY]: "Other",
              }}
            />
            <Text typo="hint" display="block">Use the <Code>UNGROUPED_GROUP_KEY</Code> (from @uikit) prop to customize thoses without group</Text>
          </Fieldset>
        </HStack>
      </Card>
      <Separator />

      <Card
        Icon={<IconCheckboxChecked textColor="success" />}
        title="Controlled"
        subtitle="Manage value via state with onValueChange."
      >
        <VStack gap>
          <Text>Controlled (Choice[])</Text>
          <HStack gap>
            <SimpleSelect
              value={value}
              onValueChange={setValue}
              placeholder="Pick a color"
              size={size}
              choices={colorChoices}
            />

            <TextWithLabel label="Value">{value}</TextWithLabel>

            <Button size="sm" variant="ghost-accent" colorTheme="info" onClick={() => setValue("info")}>Set Info</Button>
            <Button size="sm" variant="ghost-accent" colorTheme="success" onClick={() => setValue("success")}>Set Success</Button>
            <Button size="sm" variant="ghost-accent" colorTheme="error" onClick={() => setValue("error")}>Set Error</Button>

          </HStack>
        </VStack>
      </Card>

      <Header
        variant="section"
        title={<>Build your own using Primitive</>}
        subtitle="Use the primitives to build your own Select."
      />

      <Card
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
      </Card>

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
            <List.Item><TextWithLabel label="SimpleSelect.Root">Stateful container (Radix Root) handling a11y and value</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.Trigger">Button that opens/closes the menu</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.Value">Default value renderer (mirrors the selected Item)</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.CustomValue">Custom value renderer (you control the text/content)</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.Content">Popover container with viewport</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.Group">Logical grouping for items</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.Label">Group title (must be inside Group)</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.Item">Selectable option</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="SimpleSelect.Separator">Visual divider between groups/sections</TextWithLabel></List.Item>
          </List>
        </VStack>
      </Card>

      {/* Basic */}
      <Card title="Basic" description="Default select with placeholder and a few options">
        <HStack className="flex-wrap" gap>
          <Fieldset>
            <Label>Simpler</Label>
            <SimpleSelect.Root>
              <SimpleSelect.Trigger size={size}>
                <SimpleSelect.Value placeholder="Select a fruit" />
              </SimpleSelect.Trigger>
              <SimpleSelect.Content>
                <SimpleSelect.Item value="apple"><Text size={size}>Apple</Text></SimpleSelect.Item>
                <SimpleSelect.Item value="banana"><Text size={size}>Banana</Text></SimpleSelect.Item>
                <SimpleSelect.Item value="orange"><Text size={size}>Orange</Text></SimpleSelect.Item>
              </SimpleSelect.Content>
            </SimpleSelect.Root>
          </Fieldset>

          <Fieldset>
            <Label>Custom rendering</Label>
            <SimpleSelect.Root defaultValue="success">
              <SimpleSelect.Trigger size={size}>
                <SimpleSelect.Value />
              </SimpleSelect.Trigger>
              <SimpleSelect.Content>
                <SimpleSelect.Item value="error"><TextWithIcon size={size} textColor="error" icon={IconError}>Error</TextWithIcon></SimpleSelect.Item>
                <SimpleSelect.Item value="success"><TextWithIcon size={size} textColor="success" icon={IconSuccess}>Success</TextWithIcon></SimpleSelect.Item>
                <SimpleSelect.Item value="info"><TextWithIcon size={size} textColor="info" icon={IconInfo}>Info</TextWithIcon></SimpleSelect.Item>
              </SimpleSelect.Content>
            </SimpleSelect.Root>
          </Fieldset>


          <Fieldset>
            <Label>Choices + ChoiceBadge rendering</Label>
            <SimpleSelect.Root defaultValue="success">
              <SimpleSelect.Trigger size={size}>
                <SimpleSelect.Value />
              </SimpleSelect.Trigger>
              <SimpleSelect.Content>
                {colorChoices.map((c) => (
                  <SimpleSelect.Item key={String(c.value)} value={String(c.value)}>
                    <ChoiceBadge choice={c} />
                  </SimpleSelect.Item>
                ))}
              </SimpleSelect.Content>
            </SimpleSelect.Root>
          </Fieldset>
        </HStack>
      </Card>

      {/* Sizes */}
      <Card
        title="Sizes"
        subtitle={<>All available sizes for the <Code includeTag>SimpleSelect.Trigger</Code></>}
        description={<><IconWarning textColor="warning" />  As <Code includeTag>SelectValue</Code> re-use the display of <Code includeTag>SimpleSelect.Item</Code>, to size the value you MUST size the popover items too (or see <Code includeTag as={Link} href="#custom-value">Custom Value</Code>)</>}
      >
        <div className="flex flex-wrap items-center gap-4">
          {sizes.map((s) => (
            <VStack key={s} gap="sm">
              <Text textSize="sm" textColor="muted">{s}</Text>
              <SimpleSelect.Root>
                <SimpleSelect.Trigger size={s}>
                  <SimpleSelect.Value placeholder={`${s} size`} />
                </SimpleSelect.Trigger>
                <SimpleSelect.Content>
                  <SimpleSelect.Item value="1"><Text size={s}>One</Text></SimpleSelect.Item>
                  <SimpleSelect.Item value="2"><Text size={s}>Two</Text></SimpleSelect.Item>
                  <SimpleSelect.Item value="3"><Text size={s}>Three</Text></SimpleSelect.Item>
                </SimpleSelect.Content>
              </SimpleSelect.Root>
            </VStack>
          ))}
        </div>
      </Card>

      <Card
        title="Custom Value"
        id="custom-value"
        subtitle="Override the default SelectValue using {children}"
        description={
          <>
            By default, render the value, the <Code includeTag>SimpleSelect.Value</Code> use the "display" value of <Code includeTag>SimpleSelect.Item</Code><br />
            To override it, you can use the <Code includeBrace>children</Code> prop.<br />
            <IconWarning textColor="warning" /> You need to store the value yourself to display it.
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-4">
          {sizes.map((s) => (
            <VStack key={s} gap="sm">
              <Text typo="placeholder">{s}</Text>
              <SimpleSelect.Root value={valueNumber} onValueChange={setValueNumber} >
                <SimpleSelect.Trigger size={s}>
                  <SimpleSelect.CustomValue value={valueNumber} placeholder={`${s} size`}>
                    {<Text size={s}>{valueNumber}</Text>}
                  </SimpleSelect.CustomValue>
                </SimpleSelect.Trigger>
                <SimpleSelect.Content>
                  <SimpleSelect.Item value="1">One</SimpleSelect.Item>
                  <SimpleSelect.Item value="2">Two</SimpleSelect.Item>
                  <SimpleSelect.Item value="3">Three</SimpleSelect.Item>
                </SimpleSelect.Content>
              </SimpleSelect.Root>
            </VStack>
          ))}
        </div>
      </Card >

      {/* Groups & Labels */}
      < Card title="Groups & Labels" description="Organize options with labels and logical groups" >
        <SimpleSelect.Root>
          <SimpleSelect.Trigger size={size}>
            <SimpleSelect.Value placeholder="Choose a country" />
          </SimpleSelect.Trigger>
          <SimpleSelect.Content>
            <SimpleSelect.Group>
              <SimpleSelect.Label>Europe</SimpleSelect.Label>
              <SimpleSelect.Item value="fr">France</SimpleSelect.Item>
              <SimpleSelect.Item value="de">Germany</SimpleSelect.Item>
              <SimpleSelect.Item value="es">Spain</SimpleSelect.Item>
            </SimpleSelect.Group>
            <SimpleSelect.Separator />
            <SimpleSelect.Group>
              <SimpleSelect.Label>North America</SimpleSelect.Label>
              <SimpleSelect.Item value="ca">Canada</SimpleSelect.Item>
              <SimpleSelect.Item value="us">United States</SimpleSelect.Item>
              <SimpleSelect.Item value="mx">Mexico</SimpleSelect.Item>
            </SimpleSelect.Group>
            <SimpleSelect.Separator />
            <SimpleSelect.Group>
              <SimpleSelect.Item value="jp">Japan</SimpleSelect.Item>
            </SimpleSelect.Group>
          </SimpleSelect.Content>
        </SimpleSelect.Root>
      </Card >

      {/* Controlled */}
      < Card title="Controlled" description="Manage value via state with onValueChange." >
        <VStack gap>

          <HStack gap align="stretch">
            <Fieldset>
              <Label><TextWithLabel label={"Value"} >{value} </TextWithLabel></Label>
              <SimpleSelect.Root value={value} onValueChange={setValue}>
                <SimpleSelect.Trigger size={size}>
                  <SimpleSelect.Value placeholder="Pick a color" />
                </SimpleSelect.Trigger>
                <SimpleSelect.Content>
                  <SimpleSelect.Item value="error"><TextWithIcon textColor="error" icon={IconError}>Error</TextWithIcon></SimpleSelect.Item>
                  <SimpleSelect.Item value="success"><TextWithIcon textColor="success" icon={IconSuccess}>Success</TextWithIcon></SimpleSelect.Item>
                  <SimpleSelect.Item value="info"><TextWithIcon textColor="info" icon={IconInfo}>Info</TextWithIcon></SimpleSelect.Item>
                </SimpleSelect.Content>
              </SimpleSelect.Root>
            </Fieldset>
          </HStack>


          <HStack gap align="stretch">
            <Button size="sm" variant="ghost-accent" colorTheme="info" onClick={() => setValue("info")}>Set Info</Button>
            <Button size="sm" variant="ghost-accent" colorTheme="success" onClick={() => setValue("success")}>Set Success</Button>
            <Button size="sm" variant="ghost-accent" colorTheme="error" onClick={() => setValue("error")}>Set Error</Button>
          </HStack>
        </VStack>
      </Card >


      {/* Long list (scrollable) */}
      < Card title="Scrollable content" description="Large lists are virtualized by Radix viewport" >

        <HStack gap>
          <Fieldset flex>
            <Label>Scrollable content</Label>
            <SimpleSelect.Root>
              <SimpleSelect.Trigger size={size}>
                <SimpleSelect.Value placeholder="Select an item" />
              </SimpleSelect.Trigger>
              <SimpleSelect.Content>
                {Array.from({ length: 100 }).map((_, i) => (
                  <SimpleSelect.Item key={i} value={`item-${i + 1}`}>Item {i + 1}</SimpleSelect.Item>
                ))}
              </SimpleSelect.Content>
            </SimpleSelect.Root>
          </Fieldset>

          <Fieldset flex>
            <Label>Accordion grouping (by tens)</Label>
            <VStack>
              <SimpleSelect.Root onValueChange={setValueLongList}>
                <SimpleSelect.Trigger size={size}>
                  <SimpleSelect.CustomValue placeholder="Select an item" value={valueLongList} />
                </SimpleSelect.Trigger>
                <SimpleSelect.Content>
                  <Accordion type="multiple" className="w-full">
                    {Array.from({ length: Math.ceil(longList.length / 10) }).map((_, gi) => {
                      const start = gi * 10 + 1;
                      const end = Math.min((gi + 1) * 10, longList.length);
                      const chunk = longList.slice(gi * 10, gi * 10 + 10);
                      return (
                        <SimpleSelect.Group key={`grp-${gi}`} >
                          {gi > 0 && <SimpleSelect.Separator />}
                          <Accordion.Item value={`grp-${gi}`}>
                            <Accordion.Trigger>
                              <SimpleSelect.Label>{start}-{end}</SimpleSelect.Label>
                            </Accordion.Trigger>
                            <Accordion.Content>
                              {chunk.map((c) => (
                                <SimpleSelect.Item key={String(c.value)} value={String(c.value)}>
                                  <Text size={size}>{c.label ?? c.value}</Text>
                                </SimpleSelect.Item>
                              ))}
                            </Accordion.Content>
                          </Accordion.Item>
                        </SimpleSelect.Group>
                      )
                    })}
                  </Accordion>
                </SimpleSelect.Content>
              </SimpleSelect.Root>
              <Text><IconWarning textColor="warning" /> You <Text display="inline" textColor="warning" weight="semibold">MUST</Text> use <Code includeTag>BaseSelect.Value</Code> to override the default value, since the default Value cannot be displayed when the Accordion containing the selected value is collapsed</Text>
              <Text textColor="error"><IconError /> FUN ! But this implementation has accessibility/ARIA issues that need to be addressed before production use</Text>
            </VStack>
          </Fieldset>
        </HStack>
      </Card >

    </div >
  )
}

