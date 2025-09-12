'use client'

import React from "react"
import Link from "next/link"

import { HStack, LayoutSidebar, VStack } from "@uikit"
import { ColorModeButton } from "@uikit/nextjs"

import Logo from "@/components/ui/Logo"
import { useUrl } from "@/lib/url"
import { VersionSelect } from "@/components/ui/nav/VersionSelect"

import { ApiDocMenu } from "./menu"
import { ApiSettingsHoverCard } from "@/components/ui/settings/ApiSettingsHoverCard"

export default function ApiDocLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUrl } = useUrl()

  return (
    <LayoutSidebar
      header={
        <VStack>
          <HStack>
            <Link href={getUrl()}>
              <Logo />
            </Link>
            <ColorModeButton />
          </HStack>

          {/* Do not display it on the "Apple quick version" */}
          <HStack align="center">
            <VersionSelect />
            <ApiSettingsHoverCard contentProps={{ side: "right" }} />
          </HStack>
        </VStack>
      }
      // footer={
      //   <div className="text-xs text-muted-foreground">
      //     <p>API Beta</p>
      //     <p>JSON-RPC</p>
      //   </div>
      // }
      content={<ApiDocMenu />}
    >
      {children}
    </LayoutSidebar>
  )
}
