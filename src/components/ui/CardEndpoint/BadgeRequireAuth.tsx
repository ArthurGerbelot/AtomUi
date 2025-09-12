import Link from "next/link"
import { Badge, Button, Center, Fieldset, Header, HoverCard, Label, Text, VStack } from "@uikit"
import { useUrl } from "@/lib/url"
import { ApiAuthTypeInput } from "../settings/ApiAuthTypeInput"

export const BadgeRequireAuth = ({ requireAuth }: { requireAuth: boolean }) => {

  const { getUrl } = useUrl()

  const content = requireAuth
    ? <VStack>
      <Header
        variant="sub-section"
        title="Authentication"
        description="This endpoint requires authentication"
      />

      <Fieldset>
        <Label>Authentication Type</Label>
        <Text typo="caption">Choose the authentication type you want to use on the documentation.</Text>
        <Center><ApiAuthTypeInput /></Center>
      </Fieldset>

      <Button size="sm" as={Link} href={getUrl('auth/cookie-vs-api-key')}>
        Explore Authentication
      </Button>
    </VStack>
    : <>
      <Header
        variant="sub-section"
        title="Public Endpoint"
        description="This endpoint is public"
      />
    </>

  return <HoverCard
    content={content}
  >
    {requireAuth ? <Badge>Require Auth</Badge> : <Badge>Public</Badge>}
  </HoverCard>

}