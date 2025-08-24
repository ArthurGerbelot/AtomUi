// List Component Documentation
import * as React from "react"
import { List, VStack, HStack, Card, Header, IconSuccess, IconPlus, IconMinus, TextWithLabel, Code } from "@uikit"

export default function ListDocPage() {
  return (
    <VStack stretch gap="xl" className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <Header
        className="mb-8"
        align="left"
        title={<><Code includeTag>List</Code> Component</>}
        subtitle="A flexible list component with multiple variants for different use cases and styling options."
      />

      <Header
        align="center"
        variant="section"
        title="Overview"
        className="max-w-xl mx-auto"
        description="Lists are basic components for displaying collections of items. They support different styles and can include custom icons."
      />

      <Card
        surface="subtle-outline"
        colorTheme="info"
        title="Component Structure"
        description="The List component includes several sub-components:"
        className="max-w-xl mx-auto"
      >
        <List>
          <List.Item><TextWithLabel label="List">Main list container with variant support</TextWithLabel></List.Item>
          {/*
            <List.Item><TextWithLabel label="List.Ordered">Convenience component for ordered lists</TextWithLabel></List.Item>
            <List.Item><TextWithLabel label="List.Custom">Convenience component for custom lists</TextWithLabel></List.Item>
            */}
          <List.Item><TextWithLabel label="List.Item">Individual list item with icon support</TextWithLabel></List.Item>
          <List.Item><TextWithLabel label="List.OrderedItem">Convenience component for ordered list item</TextWithLabel></List.Item>
          <List.Item><TextWithLabel label="List.CheckItem">Convenience component for check list item</TextWithLabel></List.Item>
          <List.Item><TextWithLabel label="List.CustomItem">Convenience component for custom list item</TextWithLabel></List.Item>
        </List>
      </Card>



      <Header
        align="center"
        variant="section"
        title="Basic Examples"
        className="max-w-xl mx-auto"
        description="Basic examples of the List component with different variants and styles."
      />


      {/* Bullet List */}
      <Card title="Bullet List" subtitle="Default bullet list" description={<>Using <Code>List.Item</Code> component</>}>
        <List>
          <List.Item>First item in the list</List.Item>
          <List.Item>Second item with some longer text to demonstrate wrapping</List.Item>
          <List.Item>Third item</List.Item>
        </List>
      </Card>

      {/* Ordered List */}
      <Card title="Ordered List" subtitle="Numbered list with decimal markers" description={<>Using <Code>List.OrderedItem</Code> component</>}>
        <List>
          <List.Item variant="ordered">First step using variant prop <Code>&lt;ListItem variant="ordered"&gt;</Code></List.Item>
          <List.OrderedItem>Second step using convenience component <Code>&lt;OrderedListItem&gt;</Code></List.OrderedItem>
        </List>
      </Card>

      {/* Check List */}
      <Card title="Check List" subtitle="List with check/uncheck icons" description={<>Using <Code>List.CheckItem</Code> component, with checked props</>}>
        <List>
          <List.CheckItem checked>Task completed successfully</List.CheckItem>
          <List.CheckItem>Task still pending</List.CheckItem>
          <List.CheckItem checked>Another completed task</List.CheckItem>
        </List>
      </Card>


      <Header
        align="center"
        variant="section"
        title="Advanced Examples"
        className="max-w-xl mx-auto"
        description="Advanced examples of the List component with different variants and styles."
      />


      {/* Custom List with Icons */}
      <Card title="Custom List with Icons" subtitle="List with custom icons for each item" description={<>Using <Code>List.CustomItem</Code> component</>}>
        <List spacing="loose">
          <List.Item
            bullet={<IconPlus className="text-green-500" />}
            variant="custom"
          >
            Add new feature
          </List.Item>
          <List.Item
            bullet={<IconMinus className="text-red-500" />}
            variant="custom"
          >
            Remove deprecated code
          </List.Item>
          <List.Item
            bullet={<IconSuccess className="text-blue-500" />}
            variant="custom"
          >
            Update documentation
          </List.Item>
        </List>
      </Card>

      {/* Custom List with Icons */}
      <Card title="Mixed List"
        subtitle="List with custom icons for each item"
        description={<>Need to wrapp using <Code includeTag>List.Custom</Code></>}
      >
        <List>
          <List.CustomItem bullet={<IconPlus className="text-green-500" />}> Add new feature </List.CustomItem>
          <List.OrderedItem> Update documentation</List.OrderedItem>
          <List.CheckItem checked>Remove deprecated code</List.CheckItem>
          <List.Item> Update documentation</List.Item>
          <List.CustomItem bullet={<IconMinus className="text-red-500" />} >Remove feature</List.CustomItem>
          <List.OrderedItem>Update documentation</List.OrderedItem>
          <List.CheckItem><TextWithLabel label="Update documentation">Must be done soon</TextWithLabel></List.CheckItem>
        </List>
      </Card>

      {/* List with Labels */}
      <Card title="List with Labels" subtitle="List items with bold labels" description={<>Using <Code>TextWithLabel</Code> component</>}>
        <List>
          <List.Item><TextWithLabel label="CardWrapper" labelProps={{ className: "w-[100px]" }}>The main container with styling and layout</TextWithLabel></List.Item>
          <List.Item><TextWithLabel label="CardHeader" labelProps={{ className: "w-[100px]" }}>Contains title, description, and action</TextWithLabel></List.Item>
          <List.Item><TextWithLabel label="CardContent" labelProps={{ className: "w-[100px]" }}>Main content area for children</TextWithLabel></List.Item>
          <List.Item><TextWithLabel label="CardFooter" labelProps={{ className: "w-[100px]" }}>Optional footer for meta information</TextWithLabel></List.Item >
        </List >
      </Card >

      {/* Different Sizes */}

      < Header
        variant="sub-section"
        title="Different Sizes"
        description="Lists with different text sizes"
      />

      <HStack gap="lg">
        <Card title="sm">
          <List size="sm">
            <List.Item>Small text item</List.Item>
            <List.Item>Another small item</List.Item>
          </List>
        </Card>

        <Card title="md">
          <List size="md">
            <List.Item>Medium text item</List.Item>
            <List.Item>Another medium item</List.Item>
          </List>
        </Card>

        <Card title="lg">
          <List size="lg">
            <List.Item>Large text item</List.Item>
            <List.Item>Another large item</List.Item>
          </List>
        </Card>
      </HStack>


      {/* Different Spacing */}
      <Header
        variant="sub-section"
        title="Different Spacing"
        description="Lists with different spacing between items"
      />

      <HStack gap="lg">
        <Card title="Tight">
          <List spacing="tight">
            <List.Item>Closely spaced item</List.Item>
            <List.Item>Another tight item</List.Item>
            <List.Item>Third tight item</List.Item>
          </List>
        </Card>
        <Card title="Normal">
          <List spacing="normal">
            <List.Item>Normal spaced item</List.Item>
            <List.Item>Another normal item</List.Item>
            <List.Item>Third normal item</List.Item>
          </List>
        </Card>
        <Card title="Loose">
          <List spacing="loose">
            <List.Item>Loosely spaced item</List.Item>
            <List.Item>Another loose item</List.Item>
            <List.Item>Third loose item</List.Item>
          </List>
        </Card>
      </HStack>
    </VStack >
  )
}