import React from "react"
import Link from "next/link"
import { TextWithIcon, Card, VStack, Header, Code, HStack, Text, IconArrowLeft, IconUser, IconArrowRight, IconTrue, IconClose, IconPlus, IconMinus, IconEdit, IconDelete } from "@uikit"

export default function TextWithIconPage() {
  return (
    <div className="space-y-8 p-6">
      <Header variant="main"><Code textSize="4xl" includeTag>TextWithIcon</Code> Component Examples</Header>

      <Card
        title="Deprecated ?"
        titleProps={{
          className: "text-red-800 dark:text-red-200"
        }}
        className="text-red-800 dark:text-red-200 rounded-lg border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-950/50 max-w-lg mx-auto"
      >
        <strong>Hint ! </strong>Create more issue than it helps.
        <br />
        May be removed in the future. Sometime it's more easy to just put an <Code as={Link} href="/uikit-doc/typo/icon" includeTag>Icon</Code>.
      </Card>

      {/* iconPositions */}
      < Card title="Icon positions" >
        <HStack>
          <TextWithIcon icon={IconArrowRight}>Icon on the left (default)</TextWithIcon>
          <TextWithIcon icon={IconArrowLeft} iconPosition="right">Icon on the right</TextWithIcon>
        </HStack>
      </Card >

      {/* Sizes */}
      < Card title="Sizes" >
        <VStack>
          <TextWithIcon icon={IconUser} size="xs">Extra small text</TextWithIcon>
          <TextWithIcon icon={IconUser} size="sm">Small text</TextWithIcon>
          <TextWithIcon icon={IconUser} size="md">Medium text (default)</TextWithIcon>
          <TextWithIcon icon={IconUser} size="lg">Large text</TextWithIcon>
          <TextWithIcon icon={IconUser} size="xl">Extra large text</TextWithIcon>
        </VStack>
      </Card >

      {/* Sizes */}
      < Card title="Alignments with text" >
        <VStack>
          <Text size="xs">Test test test <TextWithIcon bgColor="light" icon={IconUser} size="xs">Extra small text</TextWithIcon> Test test test </Text>
          <Text size="sm">Test test test <TextWithIcon bgColor="light" icon={IconUser} size="sm">Small text</TextWithIcon> Test test test </Text>
          <Text size="md">Test test test <TextWithIcon bgColor="light" icon={IconUser} size="md">Medium text (default)</TextWithIcon> Test test test </Text>
          <Text size="lg">Test test test <TextWithIcon bgColor="light" icon={IconUser} size="lg">Large text</TextWithIcon> Test test test </Text>
          <Text size="xl">Test test test <TextWithIcon bgColor="light" icon={IconUser} size="xl">Extra large text</TextWithIcon> Test test test </Text>

          <div>Test test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test test <TextWithIcon icon={IconUser} bgColor="light" >Text with icon</TextWithIcon> Test test test Test test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testTest test testv </div>
        </VStack>
      </Card >

      {/* Variants */}
      < Card title="Color Variants" >
        <VStack>
          <TextWithIcon icon={IconTrue}>Default variant</TextWithIcon>
          <TextWithIcon icon={IconTrue} textColor="muted">Muted variant</TextWithIcon>
          <TextWithIcon icon={IconTrue} textColor="primary">Primary variant</TextWithIcon>
          <TextWithIcon icon={IconClose} textColor="destructive">Destructive variant</TextWithIcon>
        </VStack>
      </Card >

      {/* Without Icon */}
      < Card title="Without Icon" >
        <TextWithIcon>Text without icon</TextWithIcon>
      </Card >

      {/* Action Examples */}
      < Card title="Action Examples" >
        <VStack>
          <TextWithIcon icon={IconPlus}>Add new item</TextWithIcon>
          <TextWithIcon icon={IconMinus}>Remove item</TextWithIcon>
          <TextWithIcon icon={IconEdit}>Edit item</TextWithIcon>
          <TextWithIcon icon={IconDelete}>Delete item</TextWithIcon>
          <TextWithIcon icon={IconTrue}>Save changes</TextWithIcon>
        </VStack>
      </Card >

      {/* Navigation Examples */}
      < Card title="Navigation Examples" >
        <VStack>
          <TextWithIcon icon={IconArrowRight} iconPosition="right">Next page</TextWithIcon>
          <TextWithIcon icon={IconArrowRight} iconPosition="right">Continue</TextWithIcon>
          <TextWithIcon icon={IconArrowRight} iconPosition="right">View more</TextWithIcon>
        </VStack>
      </Card >

    </div >
  )
}