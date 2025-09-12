import { CodeHighlighter, Heading, VStack } from "@uikit";
import { EndpointCodeProps } from "./type";
import { formatJsonIndentation } from "./formatJsonIndentation";
import { EndpointCodeResponse } from "./EndpointCodeResponse";

// (exampleIdx isn't used but we do not want to propagate it to the props)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EndpointCodeTsSdk({ endpoint, example, exampleIdx, ...props }: EndpointCodeProps) {

  const sdk = endpoint?.sdks?.find(sdk => sdk.language === 'ts')
  if (!sdk) return null

  return (
    <VStack {...props}>
      <VStack noGap>
        <Heading as="h5">TypeScript Function Call</Heading>
        <CodeHighlighter language="typescript">{`


import { ${sdk.functionName} } from '@bullbitcoin/sdk'

/* .. */

const response = await ${sdk.functionName}(${example.request ? formatJsonIndentation(example.request, 4) : ''})
console.log(response)`}
        </CodeHighlighter>
      </VStack>

      <EndpointCodeResponse response={example.response} wrapRpcResult={false} />
    </VStack>
  )
}