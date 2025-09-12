'use client'

import { LayoutPage } from "@/components/layout/LayoutPage"
import { Header } from "@uikit"
import { getUserEndpoints } from "@/data/endpoints/getUser"
import { getVersionedEndpoint } from "@/lib/endpoints"
import { useVersionStore } from "@/store/NavigationProvider"
import { CardEndpoint } from "@/components/ui/CardEndpoint/CardEndpoint"

export default function GetUserPage() {

  const version = useVersionStore().version
  const endpoint = getVersionedEndpoint(getUserEndpoints, version)

  if (!endpoint)
    return <div>Endpoint not found</div>

  return (
    <LayoutPage>

      {/* Header */}
      <Header
        variant="main"
        title="User Information"
        description="View all information about the logged-in user."
      />

      <CardEndpoint endpoints={getUserEndpoints} />

    </LayoutPage>
  )
}
