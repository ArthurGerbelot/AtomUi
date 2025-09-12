import { Endpoint } from "@/lib/endpoints"
import { ApiAuthType, ApiEnv, useApiSettingsStore } from "@/store/ApiSettingsProvider"
import { HStack, Text } from "@uikit"
import { ApiSettingsHoverCard } from "../settings/ApiSettingsHoverCard"

export const getEndpointUrl = ({ endpoint, env, authType }: { endpoint: Endpoint, env: ApiEnv, authType: ApiAuthType }) => {
  const host = env === 'prod' ? 'https://api.bullbitcoin.com' : 'https://api04.bullbitcoin.dev'
  const prefix = endpoint.requireAuth
    ? (authType === 'cookie' ? '' : 'ak/')
    : 'public/'
  return `${host}/${prefix}${endpoint.service}`
}

export const EndpointUrl = ({ endpoint }: { endpoint: Endpoint }) => {

  const { env, authType } = useApiSettingsStore()
  const url = <Text typo="code">{getEndpointUrl({ endpoint, env, authType })}</Text>

  if (endpoint.requireAuth) {
    return (
      <HStack noStretch noGap>
        {url}
        <ApiSettingsHoverCard iconButtonProps={{ size: 'xs', mt: -1 }} />
      </HStack>)
  }

  return url
}