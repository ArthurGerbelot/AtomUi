import { Button, Card } from "@uikit";
import { useVersionStore } from "../../../store/NavigationProvider";
import { CardEndpointProps } from "./CardEndpoint";


export type CardEndpointNoVersionProps = {
  endpoints: CardEndpointProps['endpoints'],
}

export function CardEndpointNoVersion({ endpoints }: CardEndpointNoVersionProps) {

  const { setVersion } = useVersionStore();
  return (
    <Card
      title="No version selected"
      description="Please select a version to view the endpoint."
    >
      <Button onClick={() => setVersion(endpoints[0].version)}>Select implemeted version</Button>
      <Button onClick={() => setVersion('lastest')}>Select latest version</Button>
    </Card>
  )
}