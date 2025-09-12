import { Tabs, TabsList, TabsTrigger } from "@uikit"

import { ApiEnv, useApiSettingsStore } from "@/store/ApiSettingsProvider"


export const ApiEnvInput = () => {

  const { env, setEnv } = useApiSettingsStore()

  return (
    <Tabs value={env} onValueChange={(newEnv) => setEnv(newEnv as ApiEnv)}>
      <TabsList variant="solid" mt={2}>
        <TabsTrigger variant="solid" value="preprod">Preprod</TabsTrigger>
        <TabsTrigger variant="solid" value="prod">Prod</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
