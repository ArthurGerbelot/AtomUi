import { Tabs, TabsList, TabsTrigger } from "@uikit"

import { ApiAuthType, useApiSettingsStore } from "@/store/ApiSettingsProvider"


export const ApiAuthTypeInput = () => {

  const { authType, setAuthType } = useApiSettingsStore()

  return (
    <Tabs value={authType} onValueChange={(newAuthType) => setAuthType(newAuthType as ApiAuthType)}>
      <TabsList variant="solid" mt={2}>
        <TabsTrigger variant="solid" value="cookie">Cookie</TabsTrigger>
        <TabsTrigger variant="solid" value="api-key">API Key</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
