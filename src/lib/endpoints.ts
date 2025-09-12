import { ApiVersion, getLatestKnownVersion, isVersionEqual } from "@/lib/versions"

export type Service =
  | 'commcenter'
  | 'kyc'
  | 'orders'
  | 'ordertrigger'
  | 'permissions'
  | 'pricer'
  | 'publicgateway'
  | 'recipients'
  | 'users'

export type EndpointNote = {
  title: string,
  description?: string,
  type: 'info' | 'warning' | 'deprecated' | 'error',
  isOnTopOfCard?: boolean,
}

export type EndpointExample = {
  label?: string,
  request?: object | null,
  response?: object | null,
}

// Endpoint with TypeScript-as-string structure definitions
export type Endpoint = {
  /** Endpoint Method name */
  method: string,
  /** Endpoint Service */
  service: Service,
  /** Endpoint version */
  version: ApiVersion,
  /** Endpoint Description */
  description?: string,

  /** Request structure as TypeScript string + example */
  request?: string | null,
  /** Response structure as TypeScript string + example */
  response?: string | null,

  /** Authentication type */
  requireAuth?: boolean,

  /** SDK functions */
  sdks?: {
    language: 'ts' | 'flutter',
    functionName: string,
    note?: Omit<EndpointNote, 'isOnTopOfCard'>[],
  }[],

  /** Endpoint Examples */
  examples?: EndpointExample[],
  /** Additional notes */
  notes?: EndpointNote[],
}

/** Array of endpoints for versioning */
export type EndpointVersions = Endpoint[]

/** Get endpoint for specific version */
export const getVersionedEndpoint = (endpoints: EndpointVersions, version: ApiVersion): Endpoint | undefined => {
  if (version === 'lastest') {
    return endpoints[endpoints.length - 1]
  }

  // First try to find exact match
  const exactMatch = endpoints.find(endpoint => isVersionEqual(endpoint.version, version))
  if (exactMatch) {
    return exactMatch
  }

  // If no exact match, find the latest version that is before or equal to the requested version
  const availableVersions = endpoints.map(endpoint => endpoint.version)
  const bestVersion = getLatestKnownVersion(version, availableVersions)

  if (bestVersion) {
    return endpoints.find(endpoint => isVersionEqual(endpoint.version, bestVersion))
  }

  return undefined
}
