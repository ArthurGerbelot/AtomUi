'use client'

import { Alert, Button, Card, Radio, HStack, Label, Header, Code, VStack, IconInfo, Text, List, TextWithLabel } from "@uikit"
import * as React from "react"


export default function RadioDocsPage() {

  const [selectedValue, setSelectedValue] = React.useState("newsletter")
  const [disabled, setDisabled] = React.useState(false)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Radio</Code> Component</>}
        subtitle="Modular radio group component with Choice integration"
        description="Primitives: Group, Input, Layout, Content, Card + Composed API for one-shot usage."
      />


      <Header variant="section" title="Composed API" description="Composed Component to easily set a radio group" />

      <VStack>

        {/* Basic Usage */}
        <Card title="Simple usage" description="Radio group with multiple choices">
          <Radio
            idPrefix="simple-usage"
            choices={[
              "newsletter",
              "promotions",
              "updates"
            ]}
            defaultValue="newsletter"
          />
        </Card>

        <Card title="Using Choice objects" description="Radio group with rich Choice objects">
          <Radio
            choices={[
              {
                value: "newsletter",
                label: "Newsletter subscription",
                // description: "Receive weekly updates"
              },
              {
                value: "promotions",
                label: "Promotional emails",
                description: "Get notified about special offers"
              },
              {
                value: "none",
                label: "No emails",
                description: <>Unsubscribe from all communications</>
              }
            ]}
            defaultValue="newsletter"
          />
        </Card>

        <Card title="Custom IDs" description="Using custom HTML ids for form controls">
          <Radio
            idPrefix="custom-ids"
            choices={[
              {
                value: "daily",
                label: "Daily Digest",
                description: "Get updates once per day"
              },
              {
                value: "weekly",
                label: "Weekly Summary",
                description: "Get updates once per week"
              },
              {
                value: "monthly",
                label: "Monthly Report",
                description: "Get updates once per month"
              }
            ]}
            defaultValue="weekly"
          />
        </Card>

        <Card title="Disabled Choices" description="Individual choices can be disabled">
          <Radio
            choices={[
              {
                value: "basic",
                label: "Basic Plan",
                description: "Perfect for individuals"
              },
              {
                value: "pro",
                label: "Pro Plan",
                description: "Best for teams",
                disabled: true  // Individual choice disabled
              },
              {
                value: "enterprise",
                label: "Enterprise Plan",
                description: "For large organizations"
              }
            ]}
            defaultValue="basic"
          />
        </Card>

        <Card title="Disabled Group" description="The entire group can be disabled">
          <Radio

            choices={[
              {
                value: "basic",
                label: "Basic Plan",
                description: "Perfect for individuals"
              },
              {
                value: "pro",
                label: "Pro Plan",
                description: "Best for teams",
              },
              {
                value: "enterprise",
                label: "Enterprise Plan",
                description: "For large organizations"
              }
            ]}
            disabled
            defaultValue="basic"
          />
        </Card>

        <Card title="withCard" description="Wrap every choice in a Card component">
          <Radio
            choices={[
              {
                value: "plan-basic",
                label: "Basic Plan",
              },
              {
                value: "plan-pro",
                label: "Pro Plan",
                description: "Best for teams",
                disabled: true
              },
              {
                value: "plan-enterprise",
                label: "Enterprise Plan",
                description: "For large organizations",
              }
            ]}
            withCard
            defaultValue="plan-pro"
          />
        </Card>


        <Card
          title="Customize the Card"
          description={<>Customize the Card component with <Code includeBrace>checkedCardProps</Code> and <Code includeBrace>uncheckedCardProps</Code></>}
        >
          <Radio
            choices={[
              {
                value: "priority-low",
                label: "Low Priority",
                description: "Standard processing time"
              },
              {
                value: "priority-high",
                label: "High Priority",
                description: "Faster processing"
              },
              {
                value: "priority-urgent",
                label: "Urgent",
                description: "Immediate attention"
              }
            ]}
            withCard
            checkedCardProps={{
              surface: "outline",
              colorTheme: "success"
            }}
            uncheckedCardProps={{
              surface: "outline",
              colorTheme: "low-contrast",
              className: "border-dashed"
            }}
            defaultValue="priority-high"
          />
        </Card>

        <Card title="Controlled" description="Controlled component">
          <Radio
            choices={[
              {
                value: "theme-light",
                label: "Light Theme",
                description: "Clean and bright interface"
              },
              {
                value: "theme-dark",
                label: "Dark Theme",
                description: "Easy on the eyes"
              },
              {
                value: "theme-auto",
                label: "Auto Theme",
                description: "Follows system preference"
              }
            ]}
            value={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
            checkedCardProps={{
              surface: "outline",
              colorTheme: "brand"
            }}
          />
          <HStack className="mt-4">
            <Button surface="subtle" colorTheme="brand" size="sm" onClick={() => setSelectedValue("theme-light")}>Light</Button>
            <Button surface="subtle" colorTheme="brand" size="sm" onClick={() => setSelectedValue("theme-dark")}>Dark</Button>
            <Button surface="subtle" colorTheme="brand" size="sm" onClick={() => setSelectedValue("theme-auto")}>Auto</Button>
          </HStack>
        </Card>


        <Card title="Disabled Radio" description="Disabled Radio component">
          <Radio
            choices={[
              {
                value: "size-small",
                label: "Small Size",
                description: "Compact layout"
              },
              {
                value: "size-medium",
                label: "Medium Size",
                description: "Standard layout"
              },
              {
                value: "size-large",
                label: "Large Size",
                description: "Spacious layout"
              }
            ]}
            disabled={disabled}
            value={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
            checkedCardProps={{
              surface: "subtle-outline",
              colorTheme: "success"
            }}
          />
          <HStack className="mt-4">
            <Button surface="subtle" colorTheme="success" size="sm" onClick={() => setDisabled(false)}>Enable</Button>
            <Button surface="subtle" colorTheme="error" size="sm" onClick={() => setDisabled(true)}>Disable</Button>
          </HStack>
        </Card>



        {/* Props Reference */}
        <Card
          title="Props Reference"
          subtitle="Complete list of Radio component properties"
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
                <td className="py-2"><Text className="font-mono text-sm">choices</Text></td>
                <td className="py-2">Choice[] | string[]</td>
                <td className="py-2">[]</td>
                <td className="py-2">Array of choices for the radio group. Choice objects can include <Text className="font-mono text-xs">disabled: boolean</Text> and custom <Text className="font-mono text-xs">id</Text> fields.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">value</Text></td>
                <td className="py-2">string</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Controlled selected value</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">defaultValue</Text></td>
                <td className="py-2">string</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Default selected value for uncontrolled usage</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">onValueChange</Text></td>
                <td className="py-2">Function</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Callback when selected value changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">disabled</Text></td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Disable the entire radio group</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">withCard</Text></td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Wrap each radio in a Card component</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">idPrefix</Text></td>
                <td className="py-2">string</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Prefix for generated radio input ids (e.g., "my-radio-{`{value}`}")</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">label</td>
                <td className="py-2"><Text className="font-mono text-sm">SmartSlot&lt;Text&gt;</Text></td>
                <td className="py-2">(choice.label)</td>
                <td className="py-2">Text for the main label</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">description</td>
                <td className="py-2"><Text className="font-mono text-sm">SmartSlot&lt;Text&gt;</Text></td>
                <td className="py-2">(choice.description)</td>
                <td className="py-2">Hint text below label</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">checkedCard</td>
                <td className="py-2"><Text className="font-mono text-sm">SmartSlot&lt;Card&gt;</Text></td>
                <td className="py-2">-</td>
                <td className="py-2">Card styling when selected</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">uncheckedCard</td>
                <td className="py-2"><Text className="font-mono text-sm">SmartSlot&lt;Card&gt;</Text></td>
                <td className="py-2">-</td>
                <td className="py-2">Card styling when not selected</td>
              </tr>
              <tr>
                <td className="py-2"><Text className="font-mono text-sm">...RadioGroupProps</Text></td>
                <td className="py-2">RadioGroupProps</td>
                <td className="py-2">-</td>
                <td className="py-2">All Radix RadioGroup props (name, required, etc.)</td>
              </tr>
            </tbody>
          </table>
        </Card>


        <Header variant="section" title="Primitives Composition" description="Build your own radio with primitives" />


        <Card
          surface="subtle-outline"
          colorTheme="info"
          title="Primitives API"
          subtitle="Compose your own radio with fine-grained building blocks"
          Icon={<IconInfo textColor="info" />}
          className="max-w-2xl mx-auto"
        >
          <VStack gap>
            <Text textSize="sm">Each subcomponent plays a specific role. Combine them to build any Radio UX.</Text>
            <List>
              <List.Item><TextWithLabel label="Radio.Group">Root container for the radio group</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Radio.Card">Card component that acts as label</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Radio.Layout">Container for positioning input and content</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Radio.Input">Input element (receives the ref)</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Radio.Content">Smart text component for label and description</TextWithLabel></List.Item>
            </List>
          </VStack>
        </Card>

        <Card title="Manual composition with primitives" description="How to build your own using primitives">
          <VStack gap="md">
            <Radio.Group value={selectedValue} onValueChange={setSelectedValue}>
              <div className="flex items-baseline gap-3">
                <Radio.Input value="option1" />
                <Label htmlFor="option1">Manual composition example</Label>
              </div>

              <Radio.Layout>
                <Radio.Input value="option2" />
                <Radio.Content
                  label="Custom layout example"
                  description="Using Layout + Content primitives"
                />
              </Radio.Layout>

              <Alert variant={selectedValue === "option3" ? "success" : "error"} icon={null}>
                <Label className="flex items-baseline gap-3">
                  <Radio.Input value="option3" />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Enable notifications
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Select this option to enable notifications.
                    </p>
                  </div>
                </Label>
              </Alert>
            </Radio.Group>
          </VStack>
        </Card>

        <HStack>
          <Button secondary size="sm" onClick={() => setSelectedValue("option1")}>Option 1</Button>
          <Button secondary size="sm" onClick={() => setSelectedValue("option2")}>Option 2</Button>
          <Button secondary size="sm" onClick={() => setSelectedValue("option3")}>Option 3</Button>
        </HStack>
      </VStack >
    </div >
  )
}
