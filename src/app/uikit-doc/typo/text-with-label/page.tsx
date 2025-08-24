import React from "react"
import { TextWithLabel, Card, VStack, Header, Code } from "@uikit"

export default function TextWithPage() {
  return (
    <div className="space-y-8 p-6">
      <Header variant="main"><Code textSize="4xl" includeTag>TextWithLabel</Code> Component Examples</Header>

      <Card title="Separator">
        <VStack>
          <TextWithLabel label="Label" text="Text" />
          <TextWithLabel label="Label" text="Text" separator="colon" />
          <TextWithLabel label="Label" text="Text" separator="dash" />
          <TextWithLabel label="Label" text="Text" separator="space" />
          <TextWithLabel label="Label" text="Text" separator="none" />
        </VStack>
      </Card>

      <Card title="Size">
        <VStack>
          <TextWithLabel label="Label" text="Text" size="xs" />
          <TextWithLabel label="Label" text="Text" size="sm" />
          <TextWithLabel label="Label" text="Text" size="md" />
          <TextWithLabel label="Label" text="Text" size="lg" />
          <TextWithLabel label="Label" text="Text" size="xl" />
        </VStack>
      </Card>

      <Card title="Long text">
        <VStack>
          <TextWithLabel label="Label" size="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </TextWithLabel>
        </VStack>
      </Card>
    </div>
  )
}