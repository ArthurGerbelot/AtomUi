'use client'

import { LayoutPage } from "@/components/layout/LayoutPage"
import { Center, Header, Text } from "@uikit"

export default function AuthOverviewPage() {

  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="Groups & Permissions"
        description="Overview of the groups and permissions system."
      />

      <Center className="h-[calc(100vh-200px)]">
        <Text typo="main-title" textColor="low-contrast">@TODO</Text>
      </Center>

    </LayoutPage >
  )
}
