import { Endpoint } from "@/lib/endpoints";
import { CodeHighlighter, Heading, VStack, StackProps } from "@uikit";


export function EndpointCodeStructure({ endpoint, ...props }: { endpoint: Endpoint } & StackProps) {
  return (
    <VStack {...props}>
      <VStack noGap>
        <Heading as="h5">Request Structure</Heading>
        <CodeHighlighter language="typescript">
          {endpoint.request ?? "// none"}
        </CodeHighlighter>
      </VStack>
      <VStack noGap>
        <Heading as="h5">Response Structure</Heading>
        <CodeHighlighter language="typescript">
          {endpoint.response ?? "null"}
        </CodeHighlighter>
      </VStack>
    </VStack>
  )
}