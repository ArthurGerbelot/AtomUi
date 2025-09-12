'use client'

import { LayoutPage } from "@/components/layout/LayoutPage"
import { useUrl } from "@/lib/url"
import { Button, Card, Code, Header, Heading, HStack, Text, VStack } from "@uikit"
import Link from "next/link"

export default function QuickstartPage() {
  const { getUrl } = useUrl()


  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="Get Started in Minutes"
        description="Follow these examples to make your first API calls to Bull Bitcoin."
      />

      <HStack className="justify-center">
        <Card flex title="JSON-RPC" className="max-w-md border-l-4 border-l-info">
          See <Text as={Link} typo="link" href={getUrl('core/json-rpc')}>JSON-RPC Doc</Text> to get more information about URL and Request/Response formats
        </Card>
      </HStack>


      {/* API Examples */}
      <VStack gap={6}>
        <Heading as="h2" typo="section-title">API Examples</Heading>

        <Card title={"Public method"} description={"Get the current price of Bitcoin in CAD"}>
          <VStack>
            <div>
              <Text typo="caption" className="font-medium">CURL Command</Text>
              <Code block>{`curl -X POST https://api.bullbitcoin.com/public/price  \\
  -H "Content-Type: application/json" \\
  -d '{ \\
    "id":"1", \\
    "jsonrpc":"2.0", \\
    "method":"getRate", \\
    "params":{"element":{"fromCurrency":"BTC","toCurrency":"CAD"}} \\
  }'`}</Code>
            </div>

            <div>
              <Text typo="caption" className="font-medium">Response</Text>
              <Code block>{JSON.stringify({ "jsonrpc": "2.0", "id": "1", "result": { "element": { "fromCurrency": "BTC", "toCurrency": "CAD", "price": 15400362, "priceCurrency": "CAD", "precision": 2, "indexPrice": 15769615, "createdAt": "2025-09-10T18:14:27.584Z" } } }, null, 2)}</Code>
            </div>
          </VStack>
        </Card>
      </VStack>


      <HStack className="justify-center">
        <Card flex title="API Key" className="max-w-md">
          See <Text as={Link} typo="link" href={getUrl('core/authentication')}>Authentication Doc</Text> to get more information about how to get an API key.
        </Card>
      </HStack>


      <VStack gap={6}>

        <Card title={"Get User Data"} description={"Get information about the logged-in user"}>
          <VStack>
            <div>
              <Text typo="caption" className="font-medium">CURL Command</Text>
              <Code block>{`curl -X POST https://api.bullbitcoin.com/ak/users  \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -d '{ \\
    "id":"1", \\
    "jsonrpc":"2.0", \\
    "method":"getUser", \\
  }'`}</Code>
            </div>

            <div>
              <Text typo="caption" className="font-medium">Response</Text>
              <Code block>{JSON.stringify({
                "userId": "afc6bd64-fcfe-4d19-8cdb-b4eec10efa31",
                "userNbr": "11110000",
                // Kycs
                email: 'example@bullbitcoin.com',
                profile: {
                  firstName: 'John',
                  lastName: 'Doe',
                },
                language: 'en',
                currency: 'CAD',
              }, null, 2)}</Code>
            </div>
          </VStack>
        </Card>
      </VStack>


      {/* CTA */}
      < Card className="p-6 text-center" >
        <VStack gap={4}>
          <Heading as="h3" typo="card-title">Ready to Build?</Heading>
          <Text colorTheme="low-contrast">
            Check out our comprehensive API reference and start building your Bitcoin application
          </Text>
          <HStack className="justify-center" gap={3}>
            <Button>API Reference</Button>
            <Button surface="outline">Code Examples</Button>
          </HStack>
        </VStack>
      </Card >
    </LayoutPage >
  )
}
