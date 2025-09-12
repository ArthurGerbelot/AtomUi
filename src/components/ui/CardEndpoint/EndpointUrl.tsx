import { Endpoint } from "@/lib/endpoints"
import { ApiAuthType, ApiEnv, useApiSettingsStore } from "@/store/ApiSettingsProvider"
import { clipboardCopy, HStack, IconButton, IconCopy, Text } from "@uikit"
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
  const url = getEndpointUrl({ endpoint, env, authType });

  return (
    <>
      <Text typo="code" ellipsis className="w-fit">{url}</Text>
      {/* Avoid Gap between icons  */}
      <HStack noGap>
        <IconButton size="xs" icon={IconCopy} onClick={() => clipboardCopy(getEndpointUrl({ endpoint, env, authType }))} />
        {endpoint.requireAuth && <ApiSettingsHoverCard iconButtonProps={{ size: 'xs' }} />}
      </HStack>
    </>
  )

}
