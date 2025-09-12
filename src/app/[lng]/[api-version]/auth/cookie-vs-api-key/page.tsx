'use client'

import NextLink from "next/link"

import { LayoutPage } from "@/components/layout/LayoutPage"
import { Badge, Button, Card, Center, Code, Fieldset, Header, HStack, Label, Link, Text, VStack } from "@uikit"
import { useUrl } from "@/lib/url"
import { ApiAuthTypeInput } from "@/components/ui/settings/ApiAuthTypeInput"

export default function AuthOverviewPage() {
  const { getUrl } = useUrl()

  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="Authentication Overview"
        description="Choose the authentication method that best fits your application needs."
      />

      {/* Authentication Methods */}
      <VStack gap={8}>

        {/* Method 1: Cookie-based Authentication */}
        <Card>
          <VStack>
            <HStack className="items-start justify-between">
              <VStack gap={2} className="flex-1">
                <HStack>
                  <Badge colorTheme="info">Method 1</Badge>
                  <Text typo="card-title" className="font-semibold">Cookie-based Authentication</Text>
                </HStack>
                <Text colorTheme="low-contrast">
                  Allow users to login with their Bull Bitcoin account on your client application
                </Text>
              </VStack>
            </HStack>

            <VStack gap={3} className="mt-4">
              <Text typo="body" className="font-medium">Implementation Steps:</Text>

              <VStack gap={3} className="ml-4">
                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">1</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Contact us for domain whitelisting</Text>
                    <Text colorTheme="low-contrast" typo="caption">
                      We need to whitelist your domain on our authentication service
                    </Text>
                  </VStack>
                </HStack>

                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">2</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Add login redirect link</Text>
                    <Text colorTheme="low-contrast" typo="caption">
                      Redirect users to our login page with your return URL
                    </Text>
                    <Code className="text-xs">
                      https://accounts.bullbitcoin.com/en/login?return_to_app=YOUR_APP_URL
                    </Code>
                  </VStack>
                </HStack>

                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">3</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Handle user redirect</Text>
                    <Text colorTheme="low-contrast" typo="caption">
                      User will be redirected back with a <Code>bb_session=SESSION_COOKIE</Code> cookie
                    </Text>
                  </VStack>
                </HStack>

                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">4</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Use cookie in API requests</Text>
                    <Code className="text-xs">
                      -H "Cookie: bb_session=SESSION_COOKIE"
                    </Code>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>

            <HStack center>
              <Button secondary asChild>
                <NextLink href={getUrl('core/json-rpc')}>
                  View Request Format
                </NextLink>
              </Button>
            </HStack>
          </VStack>
        </Card>

        {/* Method 2: API Key Authentication */}
        <Card>
          <VStack>
            <HStack className="items-start justify-between">
              <VStack gap={2} className="flex-1">
                <HStack>
                  <Badge colorTheme="success">Method 2</Badge>
                  <Text typo="card-title" className="font-semibold">API Key Authentication</Text>
                </HStack>
                <Text colorTheme="low-contrast">
                  Use your own account to make requests on behalf of your server application
                </Text>
              </VStack>
            </HStack>

            <VStack gap={3} className="mt-4">
              <Text typo="body" className="font-medium">Implementation Steps:</Text>

              <VStack gap={3} className="ml-4">
                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">1</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Create a Bull Bitcoin account</Text>
                    <Text colorTheme="low-contrast" typo="caption">
                      If you don't already have one, sign up at bullbitcoin.com
                    </Text>
                  </VStack>
                </HStack>

                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">2</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Generate API key</Text>
                    <Text colorTheme="low-contrast" typo="caption">
                      Get your API key from your account settings page
                    </Text>
                  </VStack>
                </HStack>

                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">3</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Add <Code>/ap</Code> to your request URL. <Link href={getUrl('core/json-rpc')}>View Request Format</Link></Text>
                    <Text colorTheme="low-contrast" typo="caption">
                      This will ensure that your requests are authenticated using API key
                    </Text>
                  </VStack>
                </HStack>
                <HStack className="items-start gap-3">
                  <Badge colorTheme="low-contrast" className="mt-1 min-w-[24px] text-center">4</Badge>
                  <VStack gap={1} className="flex-1">
                    <Text className="font-medium">Use API key in requests</Text>
                    <Text colorTheme="low-contrast" typo="caption">
                      Include your API key in the request headers
                    </Text>
                    <Code className="text-xs">
                      -H "X-API-Key: YOUR_API_KEY"
                    </Code>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>

            <HStack center>
              <Button secondary asChild>
                <NextLink href={getUrl('core/json-rpc')}>
                  View Request Format
                </NextLink>
              </Button>
            </HStack>
          </VStack>
        </Card>

        <Center className="text-center">
          <Fieldset className="max-w-[225px]">
            <Label>Authentication Type</Label>
            <Text typo="caption">Choose the authentication type you want to use on the documentation.</Text>
            <Center><ApiAuthTypeInput /></Center>
          </Fieldset>
        </Center>

        {/* Comparison Table */}
        <Card>
          <VStack>
            <Text typo="card-title" className="font-semibold">Which method should you choose?</Text>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Aspect</th>
                    <th className="text-left p-3 font-medium">Cookie-based</th>
                    <th className="text-left p-3 font-medium">API Key</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Use Case</td>
                    <td className="p-3">User acts on their own behalf</td>
                    <td className="p-3">Your app acts on your behalf</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">User Experience</td>
                    <td className="p-3">Users login with their own accounts</td>
                    <td className="p-3">No user login required</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Security</td>
                    <td className="p-3">User-specific permissions</td>
                    <td className="p-3">Your account permissions only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VStack>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 text-center">
          <VStack gap={4}>
            <Text typo="card-title" className="font-semibold">Ready to get started?</Text>
            <Text colorTheme="low-contrast">
              Learn more about the JSON-RPC request format and start building your integration
            </Text>
            <HStack className="justify-center" gap={3}>
              <Button secondary asChild>
                <NextLink href={getUrl('core/quickstart')}>
                  Quick Start Guide
                </NextLink>
              </Button>
            </HStack>
          </VStack>
        </Card>
      </VStack >

    </LayoutPage >
  )
}
