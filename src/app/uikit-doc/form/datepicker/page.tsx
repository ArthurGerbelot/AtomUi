'use client'

import * as React from "react"
import { DatePicker } from "@uikit/components/molecules/DatePicker"
import { Card, VStack, HStack, Header, Text, Button, SimpleGrid, SimpleSelect, IconInfo, List, Input } from "@uikit"
import { CardExample } from "../../components/CardExample"

export default function DatePickerDocsPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
  const [dateFormat, setDateFormat] = React.useState<string>("PPP")
  const [placeholder, setPlaceholder] = React.useState<string>("Pick a date")
  const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl">("md")
  const [colorTheme, setColorTheme] = React.useState<string>("primary")
  const [disabled, setDisabled] = React.useState<boolean>(false)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* Header */}
      <Header
        variant="main"
        title="DatePicker Component"
        subtitle="Date selection with calendar popup"
        description="A polymorphic date picker component with calendar popup, styled with UIKit tokens for consistent form interactions."
        align="center"
      />

      {/* Interactive Playground */}
      <Card title="Interactive Playground" description="Test DatePicker configurations in real-time">
        <VStack gap="lg">
          {/* Controls */}
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
            <VStack gap="sm">
              <Text typo="label">Size</Text>
              <SimpleSelect
                choices={[
                  { value: "xs", label: "Extra Small" },
                  { value: "sm", label: "Small" },
                  { value: "md", label: "Medium" },
                  { value: "lg", label: "Large" },
                  { value: "xl", label: "Extra Large" }
                ]}
                value={size}
                onValueChange={(v) => setSize(v as any)}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Date Format</Text>
              <SimpleSelect
                choices={[
                  { value: "PPP", label: "Jan 1, 2024" },
                  { value: "PP", label: "Jan 1, 2024" },
                  { value: "P", label: "01/01/2024" },
                  { value: "dd/MM/yyyy", label: "01/01/2024" },
                  { value: "yyyy-MM-dd", label: "2024-01-01" },
                  { value: "dd MMM yyyy", label: "01 Jan 2024" }
                ]}
                value={dateFormat}
                onValueChange={(v) => setDateFormat(v as string)}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Placeholder</Text>
              <Input
                value={placeholder}
                onChange={(e) => setPlaceholder((e.target as HTMLInputElement).value)}
              />
            </VStack>

            <VStack gap="sm" >
              <Text typo="label">Options</Text>
              <VStack gap="sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                  />
                  <Text size="sm">Disabled</Text>
                </label>

              </VStack>
            </VStack>
          </SimpleGrid>

          {/* Live Preview */}
          <VStack gap="md" stretch full>
            <Text typo="label">Live Preview</Text>

            <DatePicker
              value={selectedDate}
              onValueChange={setSelectedDate}
              placeholder={placeholder}
              dateFormat={dateFormat}
              size={size}
              colorTheme={colorTheme as any}
              disabled={disabled}
            />

          </VStack>
        </VStack>
      </Card>

      {/* Basic Examples */}
      <Card title="Basic Examples" description="Common DatePicker configurations">
        <VStack gap="lg" stretch>
          <VStack gap="md">
            <Text typo="label">Default DatePicker</Text>
            <DatePicker placeholder="Select a date" />
          </VStack>

          <VStack gap="md">
            <Text typo="label">With Default Value</Text>
            <DatePicker defaultValue={new Date() as any} placeholder="Select a date" />
          </VStack>


          <VStack gap="md">
            <Text typo="label">Controlled DatePicker</Text>
            <HStack gap="md">
              <DatePicker
                value={selectedDate}
                onValueChange={setSelectedDate}
                placeholder="Select a date"
              />
              <Button secondary onClick={() => setSelectedDate(new Date())}>Set Now</Button>
            </HStack>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Custom Date Format</Text>
            <DatePicker
              placeholder="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Disabled DatePicker</Text>
            <DatePicker
              disabled
              value={new Date()}
              placeholder="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
            />
          </VStack>
        </VStack>
      </Card>



      {/* Size Variants */}
      <Card title="Size Variants" description="Different DatePicker sizes">
        <VStack gap="lg" stretch>
          <VStack gap="md">
            <Text typo="label">Extra Small</Text>
            <DatePicker size="xs" placeholder="Extra small datepicker" />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Small</Text>
            <DatePicker size="sm" placeholder="Small datepicker" />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Medium (Default)</Text>
            <DatePicker size="md" placeholder="Medium datepicker" />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Large</Text>
            <DatePicker size="lg" placeholder="Large datepicker" />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Extra Large</Text>
            <DatePicker size="xl" placeholder="Extra large datepicker" />
          </VStack>
        </VStack>
      </Card>


      {/* Advanced Examples */}
      <Card title="Advanced Examples" description="Advanced DatePicker configurations">
        <VStack gap="lg" stretch>
          <VStack gap="md">
            <Text typo="label">With Custom Calendar Props</Text>
            <DatePicker
              placeholder="Multi-month calendar"
              calendarProps={{
                numberOfMonths: 2,
                captionLayout: "dropdown"
              }}
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Disabled Past Dates</Text>
            <DatePicker
              placeholder="Future dates only"
              calendarProps={{
                disabled: { before: new Date() }
              }}
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">With Custom Styling</Text>
            <DatePicker
              placeholder="Custom styled"
              className="border-2 border-dashed border-info bg-info/10"
              textColor="info"
            />
          </VStack>
        </VStack>
      </Card>

      {/* Props Reference */}
      <Card
        title="Props Reference"
        subtitle="Complete list of DatePicker component properties"
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
              <td className="py-2"><Text className="font-mono text-sm">value</Text></td>
              <td className="py-2">Date | undefined</td>
              <td className="py-2">undefined</td>
              <td className="py-2">Controlled selected date value</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">defaultValue</Text></td>
              <td className="py-2">Date | undefined</td>
              <td className="py-2">undefined</td>
              <td className="py-2">Default selected date for uncontrolled usage</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">onValueChange</Text></td>
              <td className="py-2">Function</td>
              <td className="py-2">undefined</td>
              <td className="py-2">Callback when date selection changes</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">placeholder</Text></td>
              <td className="py-2">string</td>
              <td className="py-2">"Pick a date"</td>
              <td className="py-2">Placeholder text when no date selected</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">dateFormat</Text></td>
              <td className="py-2">string</td>
              <td className="py-2">"PPP"</td>
              <td className="py-2">Date format for display (date-fns format)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">size</Text></td>
              <td className="py-2">Size</td>
              <td className="py-2">"md"</td>
              <td className="py-2">Input size variant</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">colorTheme</Text></td>
              <td className="py-2">ColorTheme</td>
              <td className="py-2">undefined</td>
              <td className="py-2">Color theme for styling</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">disabled</Text></td>
              <td className="py-2">boolean</td>
              <td className="py-2">false</td>
              <td className="py-2">Disable the input</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">calendarProps</Text></td>
              <td className="py-2">CalendarProps</td>
              <td className="py-2">{ }</td>
              <td className="py-2">Props to pass to the Calendar component</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">inputProps</Text></td>
              <td className="py-2">InputProps</td>
              <td className="py-2">{ }</td>
              <td className="py-2">Props to pass to the Input component</td>
            </tr>
            <tr>
              <td className="py-2"><Text className="font-mono text-sm">...AtomProps</Text></td>
              <td className="py-2">AtomProps</td>
              <td className="py-2">-</td>
              <td className="py-2">All Atom styling props (size, colors, spacing, etc.)</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Best Practices */}
      <Card title="Best Practices" description="Guidelines for effective DatePicker usage">
        <VStack gap="lg">
          <VStack gap="md">
            <Text typo="label">Date Formats</Text>
            <List>
              <Text>• Use <Text className="font-mono text-sm">"PPP"</Text> for readable dates (January 1, 2024)</Text>
              <Text>• Use <Text className="font-mono text-sm">"P"</Text> for short format (01/01/2024)</Text>
              <Text>• Use <Text className="font-mono text-sm">"yyyy-MM-dd"</Text> for ISO format</Text>
              <Text>• Use <Text className="font-mono text-sm">"dd/MM/yyyy"</Text> for European format</Text>
            </List>
          </VStack>

          <VStack gap="md">
            <Text typo="label">User Experience</Text>
            <List>
              <Text>• Provide clear placeholder text indicating expected format</Text>
              <Text>• Use appropriate size variants for form context</Text>
              <Text>• Disable invalid dates using <Text className="font-mono text-sm">calendarProps.disabled</Text></Text>
              <Text>• Consider multi-month view for date ranges</Text>
            </List>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Form Integration</Text>
            <List>
              <Text>• Use controlled components with proper state management</Text>
              <Text>• Validate date selections on change</Text>
              <Text>• Handle empty states gracefully</Text>
              <Text>• Provide error styling for invalid selections</Text>
            </List>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Accessibility</Text>
            <List>
              <Text>• DatePicker includes proper ARIA labels by default</Text>
              <Text>• Calendar supports keyboard navigation</Text>
              <Text>• Provide clear error messages for validation</Text>
              <Text>• Test with screen readers</Text>
            </List>
          </VStack>
        </VStack>
      </Card>

    </div>
  )
}
