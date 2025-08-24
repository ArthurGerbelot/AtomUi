"use client"

import React from "react"
import { Card, Header, Button, HStack, ConfirmAction, ConfirmDelete, Separator } from "@uikit"


export default function ConfirmActionPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      <Header
        variant="main"
        title="Confirm Action"
        subtitle="A dialog that asks for confirmation before performing an action"
        description={
          <>A ConfirmAction is a dialog that asks for confirmation before performing an action.</>
        }
      />

      {/* What is a ConfirmAction */}
      <Card title="What is a ConfirmAction / ConfirmDelete?">
        <HStack>
          <ConfirmAction onConfirm={() => alert("Confirmed")}>
            <Button>Try ConfirmAction</Button>
          </ConfirmAction>

          <Separator orientation="vertical" />

          <ConfirmDelete onConfirm={() => alert("Confirmed")}>
            <Button>Try ConfirmDelete</Button>
          </ConfirmDelete>
        </HStack>
      </Card>


    </div>
  )
}