import { create } from "zustand"


export type ApiAuthType = 'cookie' | 'api-key'
export type ApiEnv = 'preprod' | 'prod'

interface ApiSettingsStore {
  authType: ApiAuthType
  env: ApiEnv
  setAuthType: (authType: ApiAuthType) => void
  setEnv: (env: ApiEnv) => void
}

export const useApiSettingsStore = create<ApiSettingsStore>((set) => ({
  authType: 'api-key',
  env: 'prod',
  setAuthType: (authType) => set({ authType }),
  setEnv: (env) => set({ env }),
}))

