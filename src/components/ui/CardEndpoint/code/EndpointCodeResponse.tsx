import { EndpointExample } from "@/lib/endpoints";
import { CodeHighlighter, Heading, VStack } from "@uikit";
import { formatJsonIndentation } from "./formatJsonIndentation";

export const EndpointCodeResponse = ({ response, wrapRpcResult = true }: { response: EndpointExample['response'], wrapRpcResult?: boolean }) => {
  return (
    <VStack noGap>
      <Heading as="h5">Response</Heading>
      <CodeHighlighter language="typescript">
        {!wrapRpcResult ? (
          response ? JSON.stringify(response, null, 2) : "null"
        ) : (
          response
            ? `{
  "jsonrpc": "2.0",
  "id": "123",
  "result": ${formatJsonIndentation(response, 2)}
}` : `{
  "jsonrpc": "2.0",
  "id": "123",
  "result": null
}`)}
      </CodeHighlighter>
    </VStack>
  )
}