'use client'

import { LayoutPage } from "@/components/layout/LayoutPage"
import { CardEndpoint } from "@/components/ui/CardEndpoint/CardEndpoint"
import { getRateEndpoints } from "@/data/endpoints/getRate"
import { Header } from "@uikit"

export default function QuickstartPage() {


  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="Current Rate"
        description="Get the current exchange rate between two currencies."
      />

      <CardEndpoint endpoints={getRateEndpoints} />


    </LayoutPage >
  )
}
