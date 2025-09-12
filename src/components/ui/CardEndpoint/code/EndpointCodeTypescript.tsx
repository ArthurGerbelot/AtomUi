import { CodeHighlighter, Heading, VStack } from "@uikit";
import { EndpointCodeProps } from "./type";
import { useApiSettingsStore } from "@/store/ApiSettingsProvider";
import { formatJsonIndentation } from "./formatJsonIndentation";
import { EndpointCodeResponse } from "./EndpointCodeResponse";
import { getEndpointUrl } from "../EndpointUrl";
import { toVersionString } from "@/lib/versions";
import { useVersionStore } from "@/store/NavigationProvider";

// (exampleIdx isn't used but we do not want to propagate it to the props)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EndpointCodeTypescript({ endpoint, example, exampleIdx, ...props }: EndpointCodeProps) {
  const { version } = useVersionStore()
  const { env, authType } = useApiSettingsStore()

  const generateFetchCode = () => {

    const sharedHeaders = `'Content-Type': 'application/json',
    'X-API-Version': '${toVersionString(version, true)}',`;

    const headers = endpoint.requireAuth ? (authType === 'cookie'
      ? `{
    ${sharedHeaders}
    'Cookie': 'bb_session=SESSION_ID'
  }`
      : `{
    ${sharedHeaders}
    'X-API-Key': 'API_KEY'
  }`
    ) : `{
    ${sharedHeaders}
  }`

    const requestBody = example.request
      ? `{
    id: "123",
    jsonrpc: "2.0",
    method: "${endpoint.method}",
    params: ${formatJsonIndentation(example.request, 4)}
  }`
      : `{
    id: "123",
    jsonrpc: "2.0",
    method: "${endpoint.method}"
  }`

    return `const response = await fetch('${getEndpointUrl({ endpoint, env, authType })}', {
  method: 'POST',
  headers: ${headers},
  body: JSON.stringify(${requestBody})
});

const data = await response.json();
console.log(data);`
  }

  return (
    <VStack {...props}>
      <VStack noGap>
        <Heading as="h5">TypeScript Request</Heading>
        <CodeHighlighter language="typescript">
          {generateFetchCode()}
        </CodeHighlighter>
      </VStack>

      <EndpointCodeResponse response={example.response} />
    </VStack>
  )
}