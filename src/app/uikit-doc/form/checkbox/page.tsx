'use client'

import { Alert, Button, Card, Checkbox, HStack, Label, Header, Code, VStack, IconInfo, Text, List, TextWithLabel } from "@uikit"
import Link from "next/link"
import * as React from "react"


export default function CheckboxDocsPage() {

  const [checked, setChecked] = React.useState(true)
  const [disabled, setDisabled] = React.useState(true)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Checkbox</Code> Component</>}
        subtitle="Modular checkbox component with Choice integration"
        description="Primitives: Input, Layout, Content, Card + Composed API for one-shot usage."
      />


      <Header variant="section" title="Composed API" description="Composed Component to easily set a checkbox" />

      <VStack>

        {/* Basic Usage */}
        <Card title="Simpler usage" description="string choice and label">
          <VStack gap="sm">
            <Checkbox choice="newsletter" label="Newsletter subscription" />
            <Checkbox choice="accept-terms" label="Accept terms and conditions" />
          </VStack>
        </Card>

        <Card title="Using a Choice object" description="Using a Choice object to set the checkbox">
          <VStack gap="sm">
            <Checkbox choice={{
              value: "newsletter-2",
              label: "Newsletter subscription",
              description: "Receive weekly updates"
            }} />

            <Checkbox choice={{
              value: "accept-terms-2",
              label: "Accept terms and conditions",
              description: <>Read and agree to the <Text typo="link" as={Link} href="#">terms and conditions</Text></>
            }} />
          </VStack>
        </Card>

        <Card title="withCard" description="Wrap everything in a Card component">
          <VStack gap="sm">
            <Checkbox
              choice={{
                value: "newsletter-3",
                label: "Newsletter subscription",
                description: "Receive weekly updates"
              }}
              withCard
            />
            <Checkbox
              choice={{
                value: "foo-3",
                label: <>Add a small 1₿  donation</>,
                // description: "Receive weekly updates"
              }}
              withCard
            />
            <Checkbox
              choice={{
                value: "accept-terms-3",
                label: "Accept terms and conditions",
                description: <>Read and agree to the <Text typo="link" as={Link} href="#">terms and conditions</Text></>
              }}
              withCard
            />
          </VStack>
        </Card>


        <Card
          title="Customize the Card"
          description={<>Customize the Card component with <Code includeBrace>checkedCardProps</Code> and <Code includeBrace>uncheckedCardProps</Code></>}
        >
          <Checkbox
            choice={{
              value: "newsletter-4",
              label: "Newsletter subscription",
              description: "Receive weekly updates"
            }}
            withCard
            checkedCardProps={{
              surface: "outline",
              colorTheme: "success"
            }}
            uncheckedCardProps={{
              surface: "outline",
              colorTheme: "error",
              className: "border-dashed"
            }}
          />
        </Card>

        <Card title="Controlled" description="Controlled component">
          <Checkbox
            choice={{
              value: "newsletter-6",
              label: "Newsletter subscription",
              description: "Receive weekly updates"
            }}

            checked={checked}
            onCheckedChange={(checked) => setChecked(!!checked)}

            checkedCardProps={{
              surface: "outline",
              colorTheme: "brand"
            }}
          />
          <HStack className="mt-4">
            <Button surface="subtle" colorTheme="success" size="sm" onClick={() => setChecked(true)}>Check</Button>
            <Button surface="subtle" colorTheme="error" size="sm" onClick={() => setChecked(false)}>Uncheck</Button>
          </HStack>
        </Card>


        <Card title="Disabled Card" description="Disabled Card component">
          <Checkbox
            choice={{
              value: "newsletter-6",
              label: "Newsletter subscription",
              description: "Receive weekly updates"
            }}

            disabled={disabled}
            checked={checked}
            onCheckedChange={(checked) => setChecked(!!checked)}

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
          subtitle="Complete list of Checkbox component properties"
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
                <td className="py-2"><Text className="font-mono text-sm">choice</Text></td>
                <td className="py-2">Choice | string</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Choice object or string for label/description</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">checked</Text></td>
                <td className="py-2">boolean</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Controlled checked state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">defaultChecked</Text></td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Default checked state for uncontrolled usage</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">onCheckedChange</Text></td>
                <td className="py-2">Function</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Callback when checked state changes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">disabled</Text></td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Disable the checkbox</td>
              </tr>
              <tr className="border-b">
                <td className="py-2"><Text className="font-mono text-sm">withCard</Text></td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Wrap everything in a Card component</td>
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
                <td className="py-2">Card styling when checked</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">uncheckedCard</td>
                <td className="py-2"><Text className="font-mono text-sm">SmartSlot&lt;Card&gt;</Text></td>
                <td className="py-2">-</td>
                <td className="py-2">Card styling when unchecked</td>
              </tr>
              <tr>
                <td className="py-2"><Text className="font-mono text-sm">...CheckboxProps</Text></td>
                <td className="py-2">CheckboxProps</td>
                <td className="py-2">-</td>
                <td className="py-2">All Radix Checkbox props (id, name, value, etc.)</td>
              </tr>
            </tbody>
          </table>
        </Card>


        <Header variant="section" title="Primitives Composition" description="Build your own checkbox with primitives" />


        <Card
          surface="subtle-outline"
          colorTheme="info"
          title="Primitives API"
          subtitle="Compose your own select with fine-grained building blocks"
          Icon={<IconInfo textColor="info" />}
          className="max-w-2xl mx-auto"
        >
          <VStack gap>
            <Text textSize="sm">Each subcomponent plays a specific role. Combine them to build any Checkbox UX.</Text>
            <List>
              <List.Item><TextWithLabel label="Checkbox.Card">Card component that acts as label</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Checkbox.Layout">Container for positioning input and content</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Checkbox.Input">Input element (receives the ref)</TextWithLabel></List.Item>
              <List.Item><TextWithLabel label="Checkbox.Content">Smart text component for label and description</TextWithLabel></List.Item>
            </List>
          </VStack>
        </Card>

        <Card title="Manual composition with primitives" description="How to build your own using primitives">
          <VStack gap="md">
            <div className="flex items-baseline gap-3">
              <Checkbox.Input id="manual1" />
              <Label htmlFor="manual1">Manual composition example</Label>
            </div>

            <Checkbox.Layout>
              <Checkbox.Input id="manual2" defaultChecked />
              <Checkbox.Content
                label="Custom layout example"
                description="Using Layout + Content primitives"
              />
            </Checkbox.Layout>

            <Alert variant={checked ? "success" : "red"} icon={null}>
              <Label className="flex items-baseline gap-3">
                <Checkbox.Input
                  id="manual3"
                  checked={checked}
                  onCheckedChange={(_checked) => {
                    setChecked(!!_checked)
                  }}
                />
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">
                    Enable notifications
                  </p>
                  <p className="text-muted-foreground text-sm">
                    You can enable or disable notifications at any time.
                  </p>
                </div>
              </Label>
            </Alert>
          </VStack>
        </Card>

        <HStack>
          <Button secondary size="sm" onClick={() => setChecked(true)}>Enable</Button>
          <Button secondary size="sm" onClick={() => setChecked(false)}>Disable</Button>
        </HStack>
      </VStack >
    </div >
  )
}
