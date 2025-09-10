'use client'

import React from "react"
import { ColorModeButton } from "@uikit/nextjs"
import { HStack, LayoutSidebar, VStack } from "@uikit"
import { ApiDocMenu } from "./menu"
import Logo from "@/components/ui/Logo"
import Link from "next/link"
import { useUrl } from "@/lib/url"

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
          {/* <VersionSelect /> */}
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
