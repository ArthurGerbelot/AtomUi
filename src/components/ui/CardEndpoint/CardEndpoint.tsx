import { EndpointVersions, getVersionedEndpoint } from "@/lib/endpoints";
import { Badge, Card, Center, HStack, Label, Tabs, TabsContent, TabsList, TabsTrigger, VStack } from "@uikit";
import { useVersionStore } from "../../../store/NavigationProvider";
import { CardEndpointNoVersion } from "./CardEndpointNoVersion";
import { BadgeRequireAuth } from "./BadgeRequireAuth";
import { EndpointCodeStructure } from "./code/EndpointCodeStructure";
import { EndpointCodeCurl } from "./code/EndpointCodeCurl";
import { useEffect, useState } from "react";
import { EndpointExampleTabs } from "./EndpointExampleTabs";
import { EndpointUrl } from "./EndpointUrl";
import { EndpointVersionBadge } from "./EndpointVersions";
import { EndpointCodeTypescript } from "./code/EndpointCodeTypescript";
import { EndpointCodeTsSdk } from "./code/EndpointCodeTsSdk";


export type CardEndpointProps = {
  endpoints: EndpointVersions
}

export function CardEndpoint({ endpoints }: CardEndpointProps) {

  const { version } = useVersionStore();
  const endpoint = getVersionedEndpoint(endpoints, version);

  const [exampleIdx, setExampleIdx] = useState(0);

  // Reset to first example when endpoint or version changes
  useEffect(() => {
    setExampleIdx(0)
  }, [endpoint, version])

  if (!endpoint) return <CardEndpointNoVersion endpoints={endpoints} />

  const hasTsSdk = endpoint.sdks?.some(sdk => sdk.language === 'ts')
  const hasFlutterSdk = endpoint.sdks?.some(sdk => sdk.language === 'flutter')

  return (
    <Card
      title={<HStack align="baseline">
        {endpoint.method}
        <EndpointVersionBadge endpoint={endpoint} endpoints={endpoints} />
      </HStack>
      }
      description={endpoint.description}
      Action={
        <BadgeRequireAuth requireAuth={endpoint.requireAuth || false} />
      }
    >
      <VStack>
        <VStack gap={1}>
          <HStack align="baseline">
            <Label className="min-w-[65px]">Method</Label>
            <Badge>{endpoint.method}</Badge>
          </HStack>
          <HStack align="baseline">
            <Label className="min-w-[65px]">Service</Label>
            <Badge>{endpoint.service}</Badge>
          </HStack>
          <HStack align="baseline" className="max-w-full">
            <Label className="min-w-[65px]">URL</Label>
            <EndpointUrl endpoint={endpoint} />
          </HStack>
        </VStack>

        <Tabs defaultValue="structure">
          <TabsList>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            {endpoint.examples && endpoint.examples.length > 0 && (
              <>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                {hasTsSdk && <TabsTrigger value="ts-sdk">TypeScript SDK</TabsTrigger>}
                <TabsTrigger value="flutter">Flutter</TabsTrigger>
                {hasFlutterSdk && <TabsTrigger value="flutter-sdk">Flutter SDK</TabsTrigger>}
              </>
            )}
          </TabsList>

          <TabsContent value="structure">
            <EndpointCodeStructure mt="md" endpoint={endpoint} />
          </TabsContent>
          {endpoint.examples && endpoint.examples.length >= exampleIdx && (
            <>
              <TabsContent value="curl">
                <EndpointExampleTabs endpoint={endpoint} exampleIdx={exampleIdx} setExampleIdx={setExampleIdx} />
                <EndpointCodeCurl mt="md" endpoint={endpoint} example={endpoint.examples[exampleIdx]} exampleIdx={exampleIdx} />
              </TabsContent>
              <TabsContent value="typescript">
                <EndpointExampleTabs endpoint={endpoint} exampleIdx={exampleIdx} setExampleIdx={setExampleIdx} />
                <EndpointCodeTypescript mt="md" endpoint={endpoint} example={endpoint.examples[exampleIdx]} exampleIdx={exampleIdx} />
              </TabsContent>
              {hasTsSdk && (
                <TabsContent value="ts-sdk">
                  <EndpointCodeTsSdk mt="md" endpoint={endpoint} example={endpoint.examples[exampleIdx]} exampleIdx={exampleIdx} />
                </TabsContent>
              )}
              <TabsContent value="flutter">
                <EndpointExampleTabs endpoint={endpoint} exampleIdx={exampleIdx} setExampleIdx={setExampleIdx} />
                <Center className="h-[200px]" mt="md" typo="caption">@TODO</Center >
                {/* <EndpointCodeFlutter endpoint={endpoint} /> */}
              </TabsContent>
              {hasFlutterSdk && (
                <TabsContent value="flutter-sdk">
                  <Center className="h-[200px]" mt="md" typo="caption">@TODO</Center >
                  {/* <EndpointCodeFlutterSdk mt="md" endpoint={endpoint} example={endpoint.examples[exampleIdx]} exampleIdx={exampleIdx} /> */}
                </TabsContent>
              )}
            </>
          )}
        </Tabs>

      </VStack>
    </Card>
  )


}