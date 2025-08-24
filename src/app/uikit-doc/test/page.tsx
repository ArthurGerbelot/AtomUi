'use client'

// app/docs/atom/page.tsx (or pages/docs/atom.tsx for the pages router)
import * as React from "react"
// Import from your UI Kit alias
/* eslint-disable */
import { Button, Card, ChoiceBadge, ChoiceObject, ChoiceValue, HStack, IconButton, IconCheckboxChecked, IconCheckboxUnchecked, IconError, IconInfo, IconSearch, Label, SimpleSelect, Size, sizes, Text, TextWithIcon } from "@uikit"
/* eslint-disable */
// import Select from "@uikit/components/molecules/Select"
/* eslint-disable */
import { VariantsSelect } from "../components/VariantsSelect"
/* eslint-disable */
import Link from "next/link"



/* eslint-disable */
const colorChoices: ChoiceObject[] = [
  { value: "error", label: "Error", Icon: IconError, colorTheme: "error" },
  { value: "success", label: "Success", Icon: IconCheckboxChecked, colorTheme: "success" },
  { value: "info", label: "Info", Icon: IconInfo, colorTheme: "info" },
]

export default function TestPage() {

  const [size, setSize] = React.useState<Size | undefined>(undefined)

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      {/*
      <VariantsSelect size={size} setSize={setSize} />

      <Card
        title="SimpleSelect is customizable"
        subtitle="Use the Atomic tokens to customize the SimpleSelect.Trigger, the visual part of the Form Input"
        Icon={<IconCheckboxChecked textColor="success" />}
      >
      </Card> */}
    </div >
  )
}
