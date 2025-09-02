'use client'

import * as React from 'react'
import { Header, Atom } from '@uikit'

export default function TestPage() {

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      <Header title="Test Select" />

      <div className="space-y-4">
        <Atom bgColor={"amber"} maxW={"md"} className="h-10 mx-auto" />
      </div>
    </div>
  )
}
