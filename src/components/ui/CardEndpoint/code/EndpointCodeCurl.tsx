import { CodeHighlighter, Heading, VStack } from "@uikit";
import { EndpointCodeProps } from "./type";
import { getEndpointUrl } from "../EndpointUrl";
import { useApiSettingsStore } from "@/store/ApiSettingsProvider";
import { formatJsonIndentation } from "./formatJsonIndentation";
import { EndpointCodeResponse } from "./EndpointCodeResponse";

// (exampleIdx isn't used but we do not want to propagate it to the props)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EndpointCodeCurl({ endpoint, example, exampleIdx, space = 6, ...props }: EndpointCodeProps & { space?: number }) {

  const { env, authType } = useApiSettingsStore()

  return (
    <VStack {...props}>
      <VStack noGap>
        <Heading as="h5">CURL Request</Heading>
        <CodeHighlighter language="bash">{`curl -X POST ${getEndpointUrl({ endpoint, env, authType })} \\
  -H "Content-Type: application/json" \\
  ${authType === 'cookie' ? '-H "Cookie: bb_session=SESSION_ID"' : '-H "X-API-Key: API_KEY"'} \\
  -d '{
    "id": "123",
    "jsonrpc":"2.0",
    "method":"${endpoint.method}"${example.request ? `,
    "params":${formatJsonIndentation(example.request, space)}` : ''}
  }'`}
        </CodeHighlighter>
      </VStack>

      <EndpointCodeResponse response={example.response} />
    </VStack>
  )
}