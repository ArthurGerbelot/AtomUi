import { Endpoint } from "@/lib/endpoints";
import { Tabs, TabsList, TabsTrigger } from "@uikit";



export function EndpointExampleTabs({
  endpoint,
  exampleIdx,
  setExampleIdx,
}: {
  endpoint: Endpoint,
  exampleIdx: number,
  setExampleIdx: (idx: number) => void
}) {

  // Debug: Log pour voir ce qui se passe
  console.log('EndpointExampleTabs:', {
    hasExamples: !!endpoint.examples,
    examplesLength: endpoint.examples?.length,
    examples: endpoint.examples
  })

  if (!endpoint.examples || endpoint.examples.length < 2) {
    return null
  }

  return (
    <Tabs
      value={exampleIdx.toString()}
      onValueChange={(value) => setExampleIdx(parseInt(value))}
    >
      <TabsList variant="solid" mt="md">
        {endpoint.examples.map((example, index) => (
          <TabsTrigger variant="solid" key={index} value={index.toString()}>
            {example.label || `Example ${index + 1}`}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}