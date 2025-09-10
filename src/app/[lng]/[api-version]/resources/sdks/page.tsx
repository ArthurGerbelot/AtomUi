'use client'

import { LayoutPage } from "@/components/layout/LayoutPage"
import { Center, Header, Text } from "@uikit"

export default function QuickstartPage() {
  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="SDKs"
        description="TypeScript and Flutter SDKs (at least)."
      />

      <Center className="h-[calc(100vh-200px)]">
        <Text typo="main-title" textColor="low-contrast">@TODO</Text>
        <Text typo="main-subtitle" textColor="low-contrast">Tell us you wants it to prioritize it ;)</Text>
      </Center>

    </LayoutPage >
  )
}
