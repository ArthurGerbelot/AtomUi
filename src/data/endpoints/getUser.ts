import { Endpoint, EndpointVersions } from "@/lib/endpoints"



export const getUserEndpointBeta: Endpoint = {
  method: 'getUserSummary',
  service: 'users',
  version: { major: 0, minor: 1, patch: 0, release: 'beta' },
  description: 'Get most used information about the authenticated user',

  requireAuth: true,

  response: `{
  userId: string
  userNbr: string
  email: string
  profile: {
    firstName: string
    lastName: string
  }
  language: 'en' | 'fr'
  currency: 'CAD' | 'USD'
  createdAt: string
  lastLoginAt?: string
}`,

  examples: [
    {
      response: {
        userId: "afc6bd64-fcfe-4d19-8cdb-b4eec10efa31",
        userNbr: "11110000",
        email: "john.doe@bullbitcoin.com",
        profile: {
          firstName: "John",
          lastName: "Doe"
        },
        language: "en",
        currency: "CAD",
        createdAt: "2024-01-15T10:30:00Z",
        lastLoginAt: "2024-01-15T14:22:15Z"
      }
    },
    {
      label: 'Corporate Account',
      response: {
        userId: "afc6bd64-fcfe-4d19-8cdb-b4eec10efa31",
        userNbr: "11110000",
        email: "john.doe@bullbitcoin.com",
        profile: {
          firstName: "John",
          lastName: "Doe"
        },
        language: "en",
        currency: "CAD",
        createdAt: "2024-01-15T10:30:00Z",
        lastLoginAt: "2024-01-15T14:22:15Z"
      }
    }
  ],

  notes: [{
    title: 'Requires authentication via API key or session cookie',
    type: 'info'
  }]
}


export const getUserEndpointV1: Endpoint = {
  method: 'getUser',
  service: 'publicgateway',
  version: { major: 1, minor: 1, patch: 0 },
  description: 'Get most used information about the authenticated user',

  requireAuth: true,


  response: `{
  // Unique user data
  userId: string
  userNbr: string

  // Profile
  email: string
  profile: {
    firstName: string
    lastName: string
  }

  // Settings
  language: 'en' | 'fr'
  currency: 'CAD' | 'USD'
  createdAt: string
  lastLoginAt?: string
}`,

  sdks: [
    {
      language: 'ts',
      functionName: 'getUser',
    }
  ],

  examples: [
    {
      response: {
        userId: "afc6bd64-fcfe-4d19-8cdb-b4eec10efa31",
        userNbr: "11110000",
        email: "john.doe@bullbitcoin.com",
        profile: {
          firstName: "John",
          lastName: "Doe"
        },
        language: "en",
        currency: "CAD",
        createdAt: "2024-01-15T10:30:00Z",
        lastLoginAt: "2024-01-15T14:22:15Z"
      }
    }
  ],

  notes: [{
    title: 'Requires authentication via API key or session cookie',
    type: 'info'
  }]
}

// Array pour versioning
export const getUserEndpoints: EndpointVersions = [
  getUserEndpointBeta,
  getUserEndpointV1
]