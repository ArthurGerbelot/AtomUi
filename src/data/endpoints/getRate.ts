import { Endpoint, EndpointVersions } from "@/lib/endpoints"

export const getRateEndpoint: Endpoint = {
  method: 'getRate',
  service: 'price',

  version: { major: 1, minor: 0, patch: 0 },
  description: 'Get the current exchange rate between two currencies',

  requireAuth: false,

  request: `{
  element: {
    fromCurrency: string // Currency to convert from (e.g., "BTC", "CAD", "USD")
    toCurrency: string   // Currency to convert to (e.g., "BTC", "CAD", "USD")
  }
}`,

  response: `{
  element: {
    fromCurrency: string
    toCurrency: string
    price: number        // Exchange rate price
    priceCurrency: string
    precision: number    // Number of decimal places
    indexPrice: number   // Reference index price
    createdAt: string    // ISO timestamp
  }
}`,

  examples: [
    {
      label: 'BTC to CAD',
      request: {
        element: {
          fromCurrency: "BTC",
          toCurrency: "CAD"
        }
      },
      response: {
        element: {
          fromCurrency: "BTC",
          toCurrency: "CAD",
          price: 15400362,
          priceCurrency: "CAD",
          precision: 2,
          indexPrice: 15769615,
          createdAt: "2025-09-10T18:14:27.584Z"
        }
      }
    },
    {
      label: 'CAD to BTC',
      request: {
        element: {
          fromCurrency: "CAD",
          toCurrency: "BTC"
        }
      },
      response: {
        element: {
          fromCurrency: "CAD",
          toCurrency: "BTC",
          price: 6493,
          priceCurrency: "BTC",
          precision: 8,
          indexPrice: 6340,
          createdAt: "2025-09-12T19:12:47.584Z"
        }
      }
    },
    {
      label: 'USD to BTC',
      request: {
        element: {
          fromCurrency: "USD",
          toCurrency: "BTC"
        }
      },
      response: {
        element: {
          fromCurrency: "USD",
          toCurrency: "BTC",
          price: 4821,
          priceCurrency: "BTC",
          precision: 8,
          indexPrice: 4705,
          createdAt: "2025-09-12T19:12:47.584Z"
        }
      }
    }
  ],

  notes: [
    {
      title: 'Public endpoint - no authentication required',
      type: 'info'
    },
    {
      title: 'Prices are returned in the smallest unit (e.g., satoshis for BTC, cents for CAD)',
      type: 'warning'
    }
  ]
}

// Array pour versioning
export const getRateEndpoints: EndpointVersions = [
  getRateEndpoint,
]