'use client'

import React from "react"
import { Card, Code, Header, Text, VStack, HStack, SimpleGrid, Button, IconInfo, IconCheck, IconClose } from "@uikit"
import { CardExample } from "../../components/CardExample"

export default function PageStructureTestPage() {
  const [test1Enabled, setTest1Enabled] = React.useState(true)
  const [test2Enabled, setTest2Enabled] = React.useState(false)
  const [test3Enabled, setTest3Enabled] = React.useState(false)
  const [test4Enabled, setTest4Enabled] = React.useState(false)
  const [test5Enabled, setTest5Enabled] = React.useState(false)
  const [test6Enabled, setTest6Enabled] = React.useState(false)
  const [test7Enabled, setTest7Enabled] = React.useState(false)

  const toggleAllTests = (enabled: boolean) => {
    setTest1Enabled(enabled)
    setTest2Enabled(enabled)
    setTest3Enabled(enabled)
    setTest4Enabled(enabled)
    setTest5Enabled(enabled)
    setTest6Enabled(enabled)
    setTest7Enabled(enabled)
  }

  return (
    <div className="px-6 py-12 space-y-12">

      {/* Header */}
      <Header
        variant="main"
        title="Page Structure & Container Tests"
        subtitle="Verify responsive behavior and overflow handling"
        description="This page tests various scenarios that could break responsive layout: long content, wide tables, code blocks, and edge cases."
        align="center"
      />

      {/* Debug Control Panel */}
      <Card title="Debug Controls" description="Enable/disable each test individually to identify issues" variant="alert">
        <VStack gap="md">

          {/* Global controls */}
          <HStack gap="sm" className="flex-wrap">
            <Button icon={IconCheck} size="sm" variant="outline" onClick={() => toggleAllTests(true)}>
              Enable All
            </Button>
            <Button icon={IconClose} size="sm" variant="outline" onClick={() => toggleAllTests(false)}>
              Disable All
            </Button>
          </HStack>

          {/* Individual checkboxes */}
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} gap="sm">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={test1Enabled}
                onChange={(e) => setTest1Enabled(e.target.checked)}
                className="rounded"
              />
              <Text size="sm">Test 1: Long Text Content</Text>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={test2Enabled}
                onChange={(e) => setTest2Enabled(e.target.checked)}
                className="rounded"
              />
              <Text size="sm">Test 2: Wide Table</Text>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={test3Enabled}
                onChange={(e) => setTest3Enabled(e.target.checked)}
                className="rounded"
              />
              <Text size="sm">Test 3: Long Code Content</Text>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={test4Enabled}
                onChange={(e) => setTest4Enabled(e.target.checked)}
                className="rounded"
              />
              <Text size="sm">Test 4: Responsive Grids</Text>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={test5Enabled}
                onChange={(e) => setTest5Enabled(e.target.checked)}
                className="rounded"
              />
              <Text size="sm">Test 5: Mixed Content</Text>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={test6Enabled}
                onChange={(e) => setTest6Enabled(e.target.checked)}
                className="rounded"
              />
              <Text size="sm">Test 6: Nested Containers</Text>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={test7Enabled}
                onChange={(e) => setTest7Enabled(e.target.checked)}
                className="rounded"
              />
              <Text size="sm">Test 7: Edge Cases</Text>
            </label>

          </SimpleGrid>

          <Text size="sm" className="text-muted-foreground">
            💡 Tip: Disable all tests, then enable them one by one to identify which one is causing the issue
          </Text>
        </VStack>
      </Card>

      {/* Test 1: Long Text Content */}
      {test1Enabled && <Card title="Test 1: Long Text Content" description="Very long text that should wrap properly" Icon={<IconInfo textColor="success" />}>
        <VStack gap="md">
          <Text>Normal text that should behave properly in all screen sizes.</Text>
          <Text>This is a very long line of text that should automatically wrap when the container becomes too small, demonstrating proper responsive behavior without forcing horizontal scroll on the entire page.</Text>
          <Text>Supercalifragilisticexpialidocious-antidisestablishmentarianism-pneumonoultramicroscopicsilicovolcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacinihilipilificationpneumonoultramicroscopicsilicovolcanoconiosisfloccinaucinihilipilification should break properly.</Text>
        </VStack>
      </Card>}

      {/* Test 2: Wide Table */}

      {test2Enabled && <Card title="Test 2: Wide Table" description="Table with many columns that should scroll internally">
        <table className="w-full text-sm border-collapse" style={{ minWidth: '800px' }}>
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Component</th>
              <th className="text-left py-2 px-4">Very Long Property Name</th>
              <th className="text-left py-2 px-4">Another Super Long Column Header</th>
              <th className="text-left py-2 px-4">Type Information</th>
              <th className="text-left py-2 px-4">Default Value With Long Name</th>
              <th className="text-left py-2 px-4">Description That Could Be Very Long</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4"><Code>Button</Code></td>
              <td className="py-2 px-4">superLongPropertyNameThatShouldNotBreakLayout</td>
              <td className="py-2 px-4">anotherVeryLongValueThatTestsOverflow</td>
              <td className="py-2 px-4">"primary" | "secondary" | "ghost" | "destructive"</td>
              <td className="py-2 px-4">defaultValueWithVeryLongName</td>
              <td className="py-2 px-4">A very long description that explains how this property works and what it does in great detail</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4"><Code>Input</Code></td>
              <td className="py-2 px-4">anotherExtremelyLongPropertyName</td>
              <td className="py-2 px-4">testingHorizontalScrollBehavior</td>
              <td className="py-2 px-4">string | number | boolean | ComplexObjectType</td>
              <td className="py-2 px-4">undefinedButCouldBeReallyLong</td>
              <td className="py-2 px-4">This description is intentionally very long to test how tables handle overflow when content exceeds available space</td>
            </tr>
          </tbody>
        </table>
      </Card>}

      {/* Test 3: Code Blocks with Long Content */}
      {test3Enabled && (
        <CardExample
          title="Test 3: Long Code Content"
          description="Code blocks with very long lines that should wrap or scroll internally"
          code={`// This is a very long comment that demonstrates how code blocks handle extremely long lines of content that exceed the container width
function veryLongFunctionNameThatDemonstratesHowCodeHandlesLongContent(parameterWithExtremelyLongName: VeryLongTypeNameThatShouldWrapProperly) {
  const variableWithSuperLongNameThatTestsCodeWrapping = "This is a very long string that should demonstrate how string content wraps in code blocks when it becomes too wide for the container";

  return someVeryLongMethodNameThatShouldWrapProperly(parameterWithExtremelyLongName, variableWithSuperLongNameThatTestsCodeWrapping);
}`}
        >
          <Code as="pre" className="p-4">
            {`// Long code content test
const reallyLongVariableName = "testing how pre blocks handle very long content that exceeds container width";
const anotherVeryLongLine = { propertyWithVeryLongName: "valueWithVeryLongContent", anotherProperty: "anotherValue" };`}
          </Code>
        </CardExample>
      )}

      {/* Test 4: Grid Layouts */}
      {test4Enabled && (
        <Card title="Test 4: Responsive Grids" description="Grid layouts that should adapt to screen size">
          <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} gap="md">
            <Card variant="secondary" title="Grid Item 1">
              <Text>Content that should fit properly in grid layout.</Text>
            </Card>
            <Card variant="secondary" title="Grid Item with Very Long Title That Tests Wrapping">
              <Text>Testing how grid items handle very long titles and content.</Text>
            </Card>
            <Card variant="secondary" title="Item 3">
              <Code>someCodeContentInGrid()</Code>
            </Card>
            <Card variant="secondary" title="Final Item">
              <Text>Last grid item with normal content.</Text>
            </Card>
          </SimpleGrid>
        </Card>
      )}

      {/* Test 5: Mixed Content Stress Test */}
      {test5Enabled && (
        <CardExample
          title="Test 5: Mixed Content Stress Test"
          description="Combination of different content types that could cause layout issues"
          code={`<VStack>
  <Text>Very long text: Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation</Text>
  <HStack>
    <Button>Normal Button</Button>
    <Button>Button With Very Long Text Content That Should Handle Properly</Button>
  </HStack>
  <Code>veryLongFunctionName(withManyParameters, andVeryLongParameterNames, thatShouldWrapProperly)</Code>
</VStack>`}
        >
          <VStack gap="md">
            <Text>Very long text content: Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>

            <HStack gap="sm" className="flex-wrap">
              <Button size="sm">Normal</Button>
              <Button size="sm">Button With Very Long Text Content</Button>
              <Button size="sm">Another Button</Button>
            </HStack>

            <Code>veryLongFunctionNameThatTestsCodeWrapping(withManyParameters, andVeryLongParameterNames)</Code>

            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-muted rounded text-sm">Tag</span>
              <span className="px-2 py-1 bg-muted rounded text-sm">Very Long Tag Name That Tests Wrapping</span>
              <span className="px-2 py-1 bg-muted rounded text-sm">Another Tag</span>
            </div>
          </VStack>
        </CardExample>
      )}

      {/* Test 6: Nested Container Test */}
      {test6Enabled && (
        <Card title="Test 6: Nested Containers" description="Multiple levels of nesting that should maintain proper constraints">
          <Card variant="secondary" title="Nested Card">
            <VStack gap="sm">
              <Text>This is a nested card inside another card.</Text>
              <Card variant="secondary" title="Deeply Nested Card">
                <Text>Even deeper nesting with very long content that should be constrained properly and not break the parent layout structure regardless of content length.</Text>
                <Code as="pre" className="p-2 text-xs">
                  {`// Nested code block
function deeplyNestedFunction() {
  return "testing nested containers with long content";
}`}
                </Code>
              </Card>
            </VStack>
          </Card>
        </Card>
      )}

      {/* Test 7: Edge Cases */}
      {test7Enabled && (
        <Card title="Test 7: Edge Cases" description="Specific scenarios that commonly break layouts">
          <VStack gap="md">

            {/* Long URLs */}
            <div>
              <Text typo="label">Long URLs:</Text>
              <Text>
                https://example.com/very/long/path/that/could/break/layout/if/not/handled/properly/with/many/segments/and/parameters?param1=value&param2=anothervalue&param3=verylongvalue
              </Text>
            </div>

            {/* Long words without spaces */}
            <div>
              <Text typo="label">Long words without spaces:</Text>
              <Text>
                supercalifragilisticexpialidocious-antidisestablishmentarianism-pneumonoultramicroscopicsilicovolcanoconiosisfloccinaucinihilipilificationpneumonoultramicroscopicsilicovolcanoconiosisfloccinaucinihilipilificationpneumonoultramicroscopicsilicovolcanoconiosisfloccinaucinihilipilification
              </Text>
            </div>

            {/* Code with very long lines */}
            <div>
              <Text typo="label">Inline code with long content:</Text>
              <Text>
                Execute this command: <Code>npm install @very-long-package-name/with-many-segments-and-very-descriptive-names-that-could-break-layout</Code>
              </Text>
            </div>

            {/* JSON-like content */}
            <div>
              <Text typo="label">JSON-like content:</Text>
              <Code as="pre" className="p-3 text-xs">
                {`{
  "veryLongPropertyNameThatCouldCauseHorizontalScrolling": "valueWithVeryLongContentThatShouldWrapProperly",
  "anotherProperty": {
    "nestedPropertyWithVeryLongName": "anotherLongValueThatTestsWrapping",
    "arrayProperty": ["item1", "itemWithVeryLongNameThatShouldWrapInCodeBlocks", "item3"]
  }
}`}
              </Code>
            </div>
          </VStack>
        </Card>
      )}

      {/* Test Results Summary */}
      <Card title="✅ Test Results Summary" description="How to verify these tests passed" variant="alert">
        <VStack gap="sm">
          <Text typo="label">All tests should demonstrate:</Text>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Page width never exceeds viewport (no horizontal page scroll)</li>
            <li>Content wraps or scrolls internally within containers</li>
            <li>Grid layouts adapt to screen size properly</li>
            <li>Nested containers maintain proper constraints</li>
            <li>Long content doesn't break parent layout</li>
            <li>Code blocks wrap or scroll within their containers</li>
            <li>Tables scroll horizontally when needed without affecting page layout</li>
          </ul>

          <Text typo="label" className="mt-4">To test:</Text>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Resize browser window to various widths (mobile to desktop)</li>
            <li>Check that page never has horizontal scroll</li>
            <li>Verify content adapts or scrolls internally as needed</li>
            <li>Test on different devices and screen sizes</li>
          </ol>
        </VStack>
      </Card>

    </div>
  )
}
