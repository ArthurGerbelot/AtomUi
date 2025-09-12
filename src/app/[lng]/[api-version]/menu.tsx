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
            <MenuItem href="/account/user">User</MenuItem>
            <MenuItem href="/account/kyc">KYC</MenuItem>
            <MenuItem href="/account/transactions">Transactions</MenuItem>
            <MenuItem href="/account/settings">Settings</MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Orders</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <MenuItem href="/orders/overview">Overview</MenuItem>
            <MenuItem href="/orders/fund">Fund Account</MenuItem>
            <MenuItem href="/orders/withdraw">Withdraw Funds</MenuItem>
            <MenuItem href="/orders/buy-bitcoin">Buy Bitcoin</MenuItem>
            <MenuItem href="/orders/sell-bitcoin">Sell Bitcoin</MenuItem>
            <MenuItem href="/orders/pay-bills">Pay Bills with Bitcoin</MenuItem>
            <MenuItem href="/orders/dca">Recurring Buy - DCA</MenuItem>
            <MenuItem href="/orders/limit-order">Limit Order</MenuItem>
            <MenuItem href="/orders/auto-buy">Auto-Buy</MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>Misc.</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <MenuItem href="/misc/currency-and-rate">Currency & Rate</MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel>WebSocket API</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            <MenuItem href="/websocket/overview">WebSocket Overview</MenuItem>
            <MenuItem href="/websocket/events">Real-time Events</MenuItem>
            <MenuItem href="/websocket/subscriptions">Subscriptions</MenuItem>
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