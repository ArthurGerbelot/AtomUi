'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar } from "@uikit"
import { useUrl } from "@/lib/url"

export function ApiDocMenu() {
  const pathname = usePathname()
  const { getUrl } = useUrl()

  const MenuItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const _url = getUrl(href);
    return (
      <Sidebar.MenuItem>
        <Sidebar.MenuButton asChild isActive={pathname == _url || pathname + "/" == _url}>
          <Link href={_url}>{children}</Link>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    )
  }

  return (
    <>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Getting Started</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <MenuItem href="/">Introduction</MenuItem>
            <MenuItem href="/core/quickstart">Quick Start</MenuItem>
            <MenuItem href="/core/json-rpc">JSON-RPC Req & Res</MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group >

      <Sidebar.Group>
        <Sidebar.GroupLabel>Authentication</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <MenuItem href="/auth/cookie-vs-api-key">Cookie-Based vs API Key</MenuItem>
            <MenuItem href="/auth/groups-permissions">Groups & Permissions</MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Account Setup</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rpc/wallet"}>
                <Link href="/api-doc/rpc/wallet">Wallet Methods</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rpc/transactions"}>
                <Link href="/api-doc/rpc/transactions">Transaction Methods</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rpc/lightning"}>
                <Link href="/api-doc/rpc/lightning">Lightning Methods</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rpc/blockchain"}>
                <Link href="/api-doc/rpc/blockchain">Blockchain Methods</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>REST API</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rest/users"}>
                <Link href="/api-doc/rest/users">Users</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rest/accounts"}>
                <Link href="/api-doc/rest/accounts">Accounts</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rest/orders"}>
                <Link href="/api-doc/rest/orders">Orders</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rest/payments"}>
                <Link href="/api-doc/rest/payments">Payments</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/rest/webhooks"}>
                <Link href="/api-doc/rest/webhooks">Webhooks</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>WebSocket API</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/websocket/overview"}>
                <Link href="/api-doc/websocket/overview">WebSocket Overview</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/websocket/events"}>
                <Link href="/api-doc/websocket/events">Real-time Events</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton asChild isActive={pathname === "/api-doc/websocket/subscriptions"}>
                <Link href="/api-doc/websocket/subscriptions">Subscriptions</Link>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Resources</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <MenuItem href="/resources/sdks">SDKs</MenuItem>
            <MenuItem href="/resources/samples">Code Samples</MenuItem>
            <MenuItem href="/resources/errors">Error Codes</MenuItem>
            <MenuItem href="/resources/changelog">Changelog</MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </>
  )
}