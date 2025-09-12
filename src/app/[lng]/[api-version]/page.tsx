'use client'

import React from "react"
import Link from "next/link"
import { Header, Card, VStack, HStack, Text, Button, List, TextWithLabel, Center } from "@uikit"
import { useUrl } from "@/lib/url"
import { LayoutPage } from "@/components/layout/LayoutPage"

export default function ApiDocHomePage() {
  const { getUrl } = useUrl()

  return (
    <LayoutPage>

      <Header
        variant="main"
        title="Bull Bitcoin API Documentation"
        subtitle="Complete JSON-RPC and WebSocket API Reference"
        description="Build powerful Bitcoin and Lightning applications with our comprehensive API. Get started in minutes with our SDKs and detailed guides."
      />



      {/* Quick Start */}
      <Card
        align="center"
        title="Quick Start"
        subtitle="Get up and running in 5 minutes"
        className="max-w-md mx-auto"
      >
        <HStack gap="sm" className="justify-center">
          <Button asChild>
            <Link href="/core/quickstart">Full Quick Start Guide</Link>
          </Button>
          <Button secondary asChild>
            <Link href="/core/auth/api-keys">API Key Setup</Link>
          </Button>
        </HStack>
      </Card>



      {/* Quick Overview */}
      <Header
        variant="section"
        title="Core Concepts"
        subtitle="Understand the core concepts of the Bull Bitcoin API"
      />

      <HStack noStretch>
        <Card
          flex
          title="JSON-RPC"
          description="All methods are available through JSON-RPC"
          className="border-l-4 border-l-orange-500"
        >
          <VStack gap="sm">
            <List>
              <List.Item>URL must point the right services (api-users, api-orders, ...)</List.Item>
              <List.Item>Method is specified in the JSON-RPC body request with params, ..</List.Item>
            </List>
            <Center>
              <Button secondary asChild>
                <Link href={getUrl('core/json-rpc')}>Explore JSON-RPC Doc</Link>
              </Button>
            </Center>
          </VStack>
        </Card>

        <Card
          flex
          title="WebSocket"
          subtitle="Real-time updates"
          description="Live notifications for transactions, chat messages, ..."
          className="border-l-4 border-l-green-500"
        >
          <VStack gap="sm">

            <Center>
              <Button secondary asChild>
                <Link href={getUrl('core/websocket')}>Explore WebSocket</Link>
              </Button>
            </Center>
          </VStack>
        </Card>
      </HStack>


      <Header
        variant="section"
        title="Authentication"
        subtitle="Understand the authentification process the Bull Bitcoin API"
        description="Authentication can be done by Cookie or API Key"
      />

      <HStack>
        <Card
          flex
          title="By Cookie"
          className="border-l-4 border-l-orange-500"
        >
          Register your app and redirect user to our auth url, you'll be redirected to your app with a cookie injected on it. Send this cookie on api call heders
        </Card>
        <Card
          flex
          title="By API Key"
          className="border-l-4 border-l-orange-500"
        >
          Generate manually an API key for your app, and send it on api call headers
        </Card>
      </HStack>

      <HStack className="justify-center">
        <Button secondary asChild>
          <Link href={getUrl('core/auth')}>Explore Auth Doc</Link>
        </Button>
      </HStack>


      <Header
        variant="section"
        title="Authorization"
        subtitle="Understand the authorization process the Bull Bitcoin API"
        description="User's groups are used like flags to define what an user can do or don't."
      />

      <HStack>
        <Card
          flex
          title="Flags"
          description={<><>Some are public and can be retrived with user data (see <Link href={getUrl('users/GetUser')}>GetUser</Link>) to know what to render on the client app.</></>}
          className="border-l-4 border-l-orange-500"
        >
          <List>
            <List.Item><TextWithLabel label="KYC Status">Some groups are here to inform the KYC Status for the user.</TextWithLabel> </List.Item>
            <List.Item><TextWithLabel label="Missionary programs">IS the user part of Missionary program, or as been referred ?</TextWithLabel> </List.Item>
            <List.Item><TextWithLabel label="Activated Features">Groups are also here to inform the client that the user can do a certains action or not..</TextWithLabel> </List.Item>
          </List>
        </Card>

        <Card
          flex
          title="Permissions & Limits"
          description={<>Internally groups are also related to given rights and limits to the user.</>}
          className="border-l-4 border-l-orange-500"
        >
          <List>
            <List.Item><TextWithLabel label="Permissions"> can be given OR DENIED to the user.</TextWithLabel> </List.Item>
            <List.Item><TextWithLabel label="Limits"> are affected by your groups.</TextWithLabel> </List.Item>
          </List>
        </Card>
      </HStack>

      <HStack className="justify-center">
        <Button secondary asChild>
          <Link href={getUrl('permissions/groups')}>Explore Groups Doc</Link>
        </Button>
        <Button secondary asChild>
          <Link href={getUrl('orders/limits')}>Explore Limits Doc</Link>
        </Button>
      </HStack>


      {/* API Features */}
      <Card title="API Features" subtitle="What you can build with our API">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <VStack gap="md">
            <Text weight="semibold" textColor="brand">User Management</Text>
            <List>
              <List.Item>User registration</List.Item>
              <List.Item>Account verification</List.Item>
              <List.Item>Settings management</List.Item>
            </List>
          </VStack>

          <VStack gap="md">
            <Text weight="semibold" textColor="brand">Trading & Orders</Text>
            <List>
              <List.Item>Buy and sell Bitcoin</List.Item>
              <List.Item>Market and limit orders</List.Item>
              <List.Item>Order history and tracking</List.Item>
              <List.Item>DCA, Limit Orders, Auto-Buy, ..</List.Item>
            </List>
          </VStack>
        </div>
      </Card>

      {/* SDKs */}
      <Card title="Official SDKs" subtitle="Get started faster with our official libraries">
        <HStack center>

          <Card className="w-5xs">
            <HStack gap="sm" align="center">
              <div className="w-8 h-8 bg-[#3178C6] rounded flex items-center justify-center text-white text-xs font-bold">TS</div>
              <Text weight="semibold">TypeScript</Text>
            </HStack>
            <Text textSize="sm" textColor="muted">Coming soon</Text>
            {/* <Code className="text-xs">npm install @bullbitcoin/ts-sdk</Code>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/sdks/javascript">View SDK →</Link>
            </Button> */}
          </Card>


          <Card className="w-5xs">
            <HStack gap="sm" align="center">
              <div className="w-8 h-8 bg-[#0468d7] rounded flex items-center justify-center text-white text-xs font-bold">GO</div>
              <Text weight="semibold">Flutter</Text>
            </HStack>
            <Text textSize="sm" textColor="muted">Coming soon</Text>
            {/* <Code className="text-xs">flutter pub add bullbitcoin_flutter_sdk</Code>
            <Button size="sm" variant="ghost" asChild>
              <Link href="/sdks/flutter">View SDK →</Link>
            </Button> */}
          </Card>
        </HStack>
      </Card>

      {/* Support */}
      <Card title="Need Help?" subtitle="We're here to support your integration">
        <HStack gap="lg" className="grid grid-cols-1 md:grid-cols-2">

          <VStack gap="sm">
            <Text weight="semibold">Developer Support</Text>
            <Text textSize="sm" textColor="muted">
              Get help from our developer team.
            </Text>
            <Button secondary asChild>
              <Link href="mailto:contact@bullbitcoin.com">Contact Support</Link>
            </Button>
          </VStack>

          <VStack gap="sm">
            <Text weight="semibold">Resources</Text>
            <List textSize="sm">
              <List.Item>
                <Link href="/api-doc/errors" className="text-primary hover:underline">Error Code Reference</Link>
              </List.Item>
              <List.Item>
                <Link href="/api-doc/changelog" className="text-primary hover:underline">API Changelog</Link>
              </List.Item>
              <List.Item>
                <Link href="https://github.com/bullbitcoin/api-examples" target="_blank" className="text-primary hover:underline">Code Examples</Link>
              </List.Item>
            </List>
          </VStack>
        </HStack>
      </Card>

    </LayoutPage>
  )
}
