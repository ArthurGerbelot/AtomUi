'use client'

import { LayoutPage } from "@/components/layout/LayoutPage"
import { Center, Header, Text } from "@uikit"

export default function QuickstartPage() {


  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="Error Codes"
        description="List of error codes."
      />

      <Center className="h-[calc(100vh-200px)]">
        <Text typo="main-title" textColor="low-contrast">@TODO</Text>
      </Center>

    </LayoutPage >
  )
}
