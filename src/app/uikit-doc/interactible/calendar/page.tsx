'use client'

import * as React from "react"
import { Calendar } from "@uikit/components/molecules/Calendar"
import { Card, VStack, Header, Text, SimpleGrid, SimpleSelect, IconInfo, List } from "@uikit"
import { CardExample } from "../../components/CardExample"
import { DateRange } from "react-day-picker"

export default function CalendarDocsPage() {
  const [mode, setMode] = React.useState<"single" | "multiple" | "range">("single")
  const [captionLayout, setCaptionLayout] = React.useState<"label" | "dropdown">("label")
  const [showOutsideDays, setShowOutsideDays] = React.useState<boolean>(true)
  const [weekStartsOn, setWeekStartsOn] = React.useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(1)
  const [numberOfMonths, setNumberOfMonths] = React.useState<number>(1)

  // State for different modes
  const [selectedSingle, setSelectedSingle] = React.useState<Date | undefined>(new Date())
  const [selectedMultiple, setSelectedMultiple] = React.useState<Date[]>([])
  const [selectedRange, setSelectedRange] = React.useState<DateRange>({ from: new Date(), to: new Date() })

  const getSelectedValue = () => {
    switch (mode) {
      case "single": return selectedSingle
      case "multiple": return selectedMultiple
      case "range": return selectedRange
      default: return undefined
    }
  }

  const handleSelectionChange = (selection: Date | Date[] | DateRange) => {
    switch (mode) {
      case "single": setSelectedSingle(selection as Date); break
      case "multiple": setSelectedMultiple(selection as Date[]); break
      case "range": setSelectedRange(selection as DateRange); break
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* Header */}
      <Header
        variant="main"
        title="Calendar Component"
        subtitle="Date picker and calendar interface"
        description="A flexible calendar component built with react-day-picker, styled with UIKit tokens for date selection, ranges, and navigation."
        align="center"
      />

      {/* Interactive Playground */}
      <Card title="Interactive Playground" description="Test Calendar configurations in real-time">
        <VStack gap="lg">
          {/* Controls */}
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
            <VStack gap="sm">
              <Text typo="label">Selection Mode</Text>
              <SimpleSelect
                choices={[
                  { value: "single", label: "Single Date" },
                  { value: "multiple", label: "Multiple Dates" },
                  { value: "range", label: "Date Range" }
                ]}
                value={mode}
                onValueChange={(v) => setMode(v as "single" | "multiple" | "range")}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Caption Layout</Text>
              <SimpleSelect
                choices={[
                  { value: "label", label: "Label" },
                  { value: "dropdown", label: "Dropdown" }
                ]}
                value={captionLayout}
                onValueChange={(v) => setCaptionLayout(v)}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Week Starts On</Text>
              <SimpleSelect
                choices={[
                  { value: 0, label: "Sunday" },
                  { value: 1, label: "Monday" },
                  { value: 2, label: "Tuesday" },
                  { value: 3, label: "Wednesday" },
                  { value: 4, label: "Thursday" },
                  { value: 5, label: "Friday" },
                  { value: 6, label: "Saturday" }
                ]}
                value={weekStartsOn}
                onValueChange={(v) => setWeekStartsOn(v)}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Number of Months</Text>
              <SimpleSelect
                choices={[
                  { value: 1, label: "1 Month" },
                  { value: 2, label: "2 Months" },
                  { value: 3, label: "3 Months" }
                ]}
                value={numberOfMonths}
                onValueChange={(v) => setNumberOfMonths(v)}
              />
            </VStack>

            <VStack gap="sm">
              <Text typo="label">Options</Text>
              <VStack gap="sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showOutsideDays}
                    onChange={(e) => setShowOutsideDays(e.target.checked)}
                  />
                  <Text size="sm">Show Outside Days</Text>
                </label>
              </VStack>
            </VStack>
          </SimpleGrid>

          {/* Live Preview */}
          <VStack gap="md">
            <Text typo="label">Live Preview</Text>

            {/* @ts-expect-error: Dynamic mode switching not supported by react-day-picker types */}
            <Calendar
              mode={mode}
              selected={getSelectedValue()}
              onSelect={handleSelectionChange}
              captionLayout={captionLayout}
              showOutsideDays={showOutsideDays}
              weekStartsOn={weekStartsOn}
              numberOfMonths={numberOfMonths}
              className="border rounded-md"
            />

            {/* Selection Info */}
            <Card surface="outline" className="p-3">
              <VStack gap="sm">
                <Text typo="label">Current Selection</Text>
                <Text className="font-mono text-sm">
                  {mode === "single" && selectedSingle
                    ? `Selected: ${selectedSingle.toLocaleDateString()}`
                    : mode === "multiple"
                      ? `Selected: [${selectedMultiple.map(d => d.toLocaleDateString()).join(", ")}]`
                      : mode === "range"
                        ? `Range: ${selectedRange.from?.toLocaleDateString() || 'none'} → ${selectedRange.to?.toLocaleDateString() || 'none'}`
                        : "No selection"
                  }
                </Text>
              </VStack>
            </Card>

            {/* Generated Code */}
            <VStack gap="sm">
              <Text typo="label">Generated JSX</Text>
              <Card surface="outline" className="p-3 font-mono text-sm">
                <Text as="pre" className="whitespace-pre-wrap">{`<Calendar
  mode="${mode}"${captionLayout !== "label" ? `\n  captionLayout="${captionLayout}"` : ''}${!showOutsideDays ? `\n  showOutsideDays={false}` : ''}${weekStartsOn !== 1 ? `\n  weekStartsOn={${weekStartsOn}}` : ''}${numberOfMonths !== 1 ? `\n  numberOfMonths={${numberOfMonths}}` : ''}
  selected={${mode === "single" ? "selectedDate" : mode === "multiple" ? "selectedDates" : "selectedRange"}}
  onSelect={handle${mode.charAt(0).toUpperCase() + mode.slice(1)}Change}
/>`}</Text>
              </Card>
            </VStack>
          </VStack>
        </VStack>
      </Card>

      {/* Basic Examples */}
      <Card title="Basic Examples" description="Common calendar configurations">
        <VStack gap="lg">
          <VStack gap="md">
            <Text typo="label">Single Date Selection</Text>
            <Calendar
              mode="single"
              selected={new Date()}
              className="border rounded-md"
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Date Range Selection</Text>
            <Calendar
              mode="range"
              selected={{ from: new Date(), to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }}
              className="border rounded-md"
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Multiple Date Selection</Text>
            <Calendar
              mode="multiple"
              selected={[new Date(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)]}
              className="border rounded-md"
            />
          </VStack>
        </VStack>
      </Card>

      {/* Advanced Examples */}
      <Card title="Advanced Examples" description="Customized calendar configurations">
        <VStack gap="lg">
          <VStack gap="md">
            <Text typo="label">Multiple Months with Dropdown Navigation</Text>
            <Calendar
              mode="single"
              captionLayout="dropdown"
              numberOfMonths={2}
              className="border rounded-md"
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Week Starting on Sunday</Text>
            <Calendar
              mode="single"
              weekStartsOn={0}
              className="border rounded-md"
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Without Outside Days</Text>
            <Calendar
              mode="single"
              showOutsideDays={false}
              className="border rounded-md"
            />
          </VStack>
        </VStack>
      </Card>

      {/* With Disabled Dates */}
      <Card title="With Constraints" description="Calendars with disabled dates and restrictions">
        <VStack gap="lg">
          <VStack gap="md">
            <Text typo="label">Disabled Past Dates</Text>
            <Calendar
              mode="single"
              disabled={{ before: new Date() }}
              className="border rounded-md"
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Disabled Future Dates</Text>
            <Calendar
              mode="single"
              disabled={{ after: new Date() }}
              className="border rounded-md"
            />
          </VStack>

          <VStack gap="md">
            <Text typo="label">Disabled Weekends</Text>
            <Calendar
              mode="single"
              disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
              className="border rounded-md"
            />
          </VStack>
        </VStack>
      </Card>

      {/* Basic Usage */}
      <CardExample
        title="Basic Usage"
        description="Simple calendar with single date selection"
        code={`import { Calendar } from "@uikit"
import { useState } from "react"

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="border rounded-md"
    />
  )
}`}
      >
        <Calendar
          mode="single"
          selected={new Date()}
          className="border rounded-md"
        />
      </CardExample>

      {/* Range Selection */}
      <CardExample
        title="Range Selection"
        description="Calendar for selecting date ranges"
        code={`import { Calendar } from "@uikit"
import { useState } from "react"

function DateRangePicker() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({})

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="border rounded-md"
    />
  )
}`}
      >
        <Calendar
          mode="range"
          numberOfMonths={2}
          className="border rounded-md"
        />
      </CardExample>

      {/* Props Reference */}
      <Card
        title="Props Reference"
        subtitle="Complete list of Calendar component properties"
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
              <td className="py-2"><Text className="font-mono text-sm">mode</Text></td>
              <td className="py-2">"single" | "multiple" | "range"</td>
              <td className="py-2">Selection mode for the calendar</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">selected</Text></td>
              <td className="py-2">Date | Date[] | DateRange</td>
              <td className="py-2">Selected date(s) or range</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">onSelect</Text></td>
              <td className="py-2">Function</td>
              <td className="py-2">Callback when selection changes</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">captionLayout</Text></td>
              <td className="py-2">"label" | "dropdown"</td>
              <td className="py-2">Layout for month/year navigation</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">numberOfMonths</Text></td>
              <td className="py-2">number</td>
              <td className="py-2">Number of months to display</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">showOutsideDays</Text></td>
              <td className="py-2">boolean</td>
              <td className="py-2">Show days outside current month</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">weekStartsOn</Text></td>
              <td className="py-2">0-6</td>
              <td className="py-2">First day of week (0=Sunday, 1=Monday)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">disabled</Text></td>
              <td className="py-2">Date | DateRange | Function</td>
              <td className="py-2">Disabled dates or matcher function</td>
            </tr>
            <tr className="border-b">
              <td className="py-2"><Text className="font-mono text-sm">className</Text></td>
              <td className="py-2">string</td>
              <td className="py-2">Additional CSS classes</td>
            </tr>
            <tr>
              <td className="py-2"><Text className="font-mono text-sm">formatters</Text></td>
              <td className="py-2">Formatters</td>
              <td className="py-2">Custom date formatting functions</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Best Practices */}
      <Card title="Best Practices" description="Guidelines for effective Calendar usage">
        <VStack gap="lg">
          <VStack gap="md">
            <Text typo="label">Selection Modes</Text>
            <List>
              <Text>• Use <Text className="font-mono text-sm">single</Text> for simple date selection</Text>
              <Text>• Use <Text className="font-mono text-sm">range</Text> for date ranges (bookings, reports)</Text>
              <Text>• Use <Text className="font-mono text-sm">multiple</Text> for selecting multiple individual dates</Text>
            </List>
          </VStack>

          <VStack gap="md">
            <Text typo="label">User Experience</Text>
            <List>
              <Text>• Use <Text className="font-mono text-sm">numberOfMonths={2}</Text> for range selection</Text>
              <Text>• Consider <Text className="font-mono text-sm">captionLayout="dropdown"</Text> for year/month navigation</Text>
              <Text>• Disable invalid dates to guide user selection</Text>
              <Text>• Provide clear visual feedback for selections</Text>
            </List>
          </VStack>

          <VStack gap="md">
            <Text typo="label">Accessibility</Text>
            <List>
              <Text>• Calendar includes keyboard navigation by default</Text>
              <Text>• Use semantic date ranges for screen readers</Text>
              <Text>• Provide alternative text input for complex selections</Text>
              <Text>• Test with keyboard-only navigation</Text>
            </List>
          </VStack>
        </VStack>
      </Card>

    </div>
  )
}
