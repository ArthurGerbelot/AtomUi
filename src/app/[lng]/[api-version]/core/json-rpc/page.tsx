'use client'

import { LayoutPage } from "@/components/layout/LayoutPage"
import NextLink from "next/link"
import { Link, Card, Code, Header, List, Text, TextWithLabel, VStack, HStack, Button, Center } from "@uikit"


export default function QuickstartPage() {


  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="Structure of Request and Response"
        description={<>We're using <Link href="https://www.jsonrpc.org/specification" target="_blank">JSON-RPC</Link> standard to communicate with the API.</>}
      />


      {/* API Examples */}
      <VStack gap={6} stretch>
        <Header variant="section" title="Request" />

        <Card title={"Every Request follows the same format"}>
          <VStack stretch>
            <div>
              <Text typo="caption" className="font-medium">CURL Command</Text>
              <Code block>{[`curl -X POST `, <Text key="url" textColor="brand">URL</Text>, `  \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: `, <Text key="apiKey" textColor="brand">API_KEY</Text>, `" \\
  -H "Cookie: bb_session=`, <Text key="sessionId" textColor="brand">SESSION_ID</Text>, `" \\
  -d '{ \\
    "id": `, <Text key="id" textColor="brand">ID</Text>, `, \\
    "jsonrpc":"2.0", \\
    "method":`, <Text key="method" textColor="brand">METHOD</Text>, `, \\
    "params":`, <Text key="params" textColor="brand">PARAMS</Text>, ` \\
  }'`]}</Code>
            </div>
          </VStack>
        </Card>

        <Header variant="sub-section" title="Explanation" />


        <Card title={"URL"} description={"Compose the URL of the method you want to call"}>
          Base:
          <List>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="Prod"><Code>https://api.bullbitcoin.com</Code></TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="Preprod (env 04)"><Code>https://api04.bullbitcoin.dev</Code></TextWithLabel></List.Item>
          </List>
          <br />
          Prefix:
          <List>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="Public"><Code>/public</Code></TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="Auth by API key"><Code>/ak</Code></TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="Auth by Cookie"><Text textColor="light">none</Text></TextWithLabel></List.Item>
          </List>
          <br />
          Service: <Text typo="caption">(Every method will inform you what service you need to use.)</Text>
          <List>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="Users"><Code>/users</Code></TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="KYCs"><Code>/kycs</Code></TextWithLabel></List.Item>
            <List.Item><TextWithLabel labelProps={{ className: "min-w-[150px]" }} label="Orders"><Code>/orders</Code></TextWithLabel></List.Item>
          </List>
        </Card>

        <Card title={"Auth"} description={"API key or Cookies"}>
          Based on the choice you made to authenticate, send one (and only one) of the headers below:

          <HStack stretch>
            <Card surface="none" title={"X-API-Key"} flex>
              Your API Key. See <Link href="/core/api-key">API Key</Link>.
            </Card>
            <Card surface="none" title={"Cookie"} flex>
              Your session cookie you received using the authentication process. See <Link href="/core/cookie">Cookie</Link>.
            </Card>
          </HStack>

          <Center>
            <Button secondary asChild>
              <NextLink href="/auth/overview">
                Explore authentication
              </NextLink>
            </Button>
          </Center>
        </Card>


        <Card title="Content">
          <HStack stretch>
            <Card surface="none" title={"ID"} flex>
              Any string you want, it will be returned in the response.
            </Card>

            <Card surface="none" title={"Method"} flex>
              The name of the method you want to call.
            </Card>

            <Card surface="none" title={"Params"} flex>
              JSON object containing the parameters defined by the method.
            </Card>
          </HStack>
        </Card>

        <Header variant="section" title="Response" />

        <Card title="JSON-RPC Response">
          <Text typo="caption" className="font-medium">JSON response format</Text>
          <Code block>{[`{
  "jsonrpc": "2.0",
  "id": `, <Text key="id" textColor="brand">ID</Text>, `,
  "result": {
    `, <Text key="result" textColor="brand">RESPONSE</Text>, `
  }
}`]}</Code>
        </Card>

        <Card title="Content">
          <HStack stretch>
            <Card surface="none" title={"ID"} flex>
              The same ID you sent in the request.
            </Card>

            <Card surface="none" title={"Result"} flex>
              JSON data based on the method you called.
            </Card>
          </HStack>
        </Card>


        <Card title="Error">
          <HStack stretch>
            <Card surface="none" title={"JSON-RPC Error"} flex>
              If the request you made is not valid in the transfer protocol, you will receive an <Link href="https://www.jsonrpc.org/specification#error_object" target="_blank">RPC error</Link>.
            </Card>

            <Card surface="none" title={"API Error"} flex>
              In case your request hits the API but has an error, you will receive a 200 status code with no JSON-RPC Error (because the request is valid) but inside the JSON response, you will have an error key with the error message.
            </Card>
          </HStack>

          <HStack stretch className="justify-center">
            <Button asChild>
              <NextLink href="/core/errors">
                Explore errors
              </NextLink>
            </Button>
          </HStack>
        </Card>

      </VStack >


    </LayoutPage >
  )
}
