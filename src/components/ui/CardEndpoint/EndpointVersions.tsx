import { Endpoint } from "@/lib/endpoints"
import { isVersionEqual, toVersionString } from "@/lib/versions"
import { useVersionStore } from "@/store/NavigationProvider"
import { Badge, Header, HoverCard, VStack } from "@uikit"


export const EndpointVersionBadge = ({ endpoint, endpoints }: { endpoint: Endpoint, endpoints: Endpoint[] }) => {

  const { setVersion } = useVersionStore()

  return (

    <HoverCard content={
      <VStack noStretch>
        <Header variant="sub-section" title="Endpoint Versions" description="This endpoint as been udpdated on the following versions" />
        <VStack noStretch gap={1}>
          {endpoints.map(e => {
            return <Badge
              onClick={() => {
                setVersion(e.version)
              }}
              className="cursor-pointer"
              key={toVersionString(e.version)}
              colorTheme={isVersionEqual(e.version, endpoint.version) ? 'success' : 'light'}
            >
              {toVersionString(e.version)}
            </Badge>
          })}
        </VStack>
      </VStack >
    }>
      <Badge>{toVersionString(endpoint.version)}</Badge>
    </HoverCard >
  )
}