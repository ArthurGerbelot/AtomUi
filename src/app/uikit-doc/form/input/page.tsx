"use client"

import React, { useState } from "react"
import { Input, Card, VStack, HStack, Text, Code, Button, IconButton, SimpleGrid, Header, Separator, IconSearch, IconUser, IconPrivate, IconPublic, TextWithIcon, IconError, IconWarning, IconSuccess, formatAmount, InputAmount, InputWithClipboard } from "@uikit"
import { sizes, Size, radiuses, Radius } from "@uikit/tokens"
import { InputAmountHuge } from "@uikit/components/atoms/InputAmountHuge"
import { InputClearable } from "@uikit/components/atoms/InputClearable"
import { VariantsSelect } from "../../components/VariantsSelect"

export default function InputPage() {
  const [size, setSize] = useState<Size | undefined>(undefined)
  const [radius, setRadius] = useState<Radius | undefined>(undefined)

  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [password, setPassword] = useState("")


  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      {/* Header */}
      <Header
        variant="main"
        title={<><Code includeTag textSize="4xl">Input</Code> Component</>}
        subtitle="Flexible text input with icons and addons"
        description="A minimal input built over Atom, supporting polymorphism, sizes and SmartSlots for icons/addons."
      />

      {/* Controls */}
      <VariantsSelect
        size={size} setSize={setSize} defaultSize={undefined}
        radius={radius} setRadius={setRadius} defaultRadius={undefined}
      />

      {/* Basics */}
      <Card title="Basic" description="Default input and common HTML types">
        <div className="flex flex-wrap gap-4">
          <Input placeholder="Basic input" size={size} radius={radius} />
          <Input placeholder="With value" defaultValue="Hello World" size={size} radius={radius} />
          <Input type="email" placeholder="Email" size={size} radius={radius} />
          <Input type="password" placeholder="Password" size={size} radius={radius} />
        </div>
      </Card>

      {/* Sizes */}
      <Card title="Sizes" description="All available sizes next to common elements">
        <div className="flex flex-wrap items-center gap-4">
          <VStack>
            {sizes.map((s) => (
              <HStack key={s} className="items-center">
                <Input placeholder={`${s} size`} size={s} radius={radius} />
                <Text size={s} textColor="muted">{s}</Text>
                <Button size={s}>{s}</Button>
              </HStack>
            ))}
          </VStack>
        </div>
      </Card >

      {/* Radius */}
      < Card title="Radius" >
        <div className="flex flex-wrap items-center gap-4">
          {radiuses.map((r) => (
            <VStack key={r} gap="sm">
              <Text textSize="sm" textColor="muted">{r}</Text>
              <Input placeholder={`${r} radius`} size={size} radius={r} />
            </VStack>
          ))}
        </div>
      </Card >

      {/* Icons */}
      < Card title="With Icons" description="Use SmartSlots IconLeft/IconRight" >
        <SimpleGrid cols={{ base: 1, md: 2 }} gap="lg">
          <VStack gap="md">
            <Input
              type="search"
              placeholder="Search..."
              size={size}
              radius={radius}
              IconRight={<IconSearch aria-label="search" />}
            />
          </VStack>
          <VStack gap="md">
            <Input
              placeholder="Username"
              size={size}
              radius={radius}
              IconLeft={<IconUser aria-label="user" />}
            />
          </VStack>
        </SimpleGrid>
      </Card >

      {/* Addons (example) */}
      < Card title="Addons" description="Compose with Button or any component" >
        <HStack>
          <VStack>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              size={size}
              radius={radius}
              onChange={(e) => { setPassword(e.target.value) }}
              AddonRight={
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={isPasswordVisible ? IconPrivate : IconPublic}
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                  className="top-6 right-2"
                />
              }
              // addonRightProps={{ className: "top-5" }}
              AddonBottom={
                password.length < 6
                  ? <TextWithIcon textColor="error" icon={IconError} size="xs" className="h-6">Password too short</TextWithIcon>
                  : (password.length < 12
                    ? <TextWithIcon textColor="warning" icon={IconWarning} size="xs" className="h-6">Password is weak</TextWithIcon>
                    : <TextWithIcon textColor="success" icon={IconSuccess} size="xs" className="h-6">Password is strong</TextWithIcon>
                  )
              }
              addonRightProps={{ className: "bottom-2" }}
              className="pr-12 pb-6 h-17"
            />
          </VStack>
          <Input size="md" className="w-[200px]" />
        </HStack>
        <Text textColor="muted" textSize="sm" className="mt-2">
          Padding and Height must be adjusted when using absolute addons. (Default height is h-11)<br />
          <br />
          Example, here we add a h-6 bottom addon, so we need to adjust the height to h-17 and padding to pb-6.
        </Text>
      </Card >

      <Separator />

      <Header
        variant="section"
        title={<>Extended Input Components</>}
        subtitle="Extended version of the Input Component with additional features"
      />

      <Card title="InputClearable" description="Input with a clear button">
        <InputClearable />
      </Card>

      <Card title="InputWithClipboard" description="Input with a clipboard button">
        <InputWithClipboard />
      </Card>

      <Card title="InputAmount(Huge)" description="Input with amount formating">
        <VStack>

          <HStack>
            <div>
              <Text typo="label">Uncontrolled</Text>
              <InputAmount defaultValue={1000} />
            </div>
            <div>
              <Text typo="label">Controlled</Text>
              <InputAmount value={1000} />
            </div>
          </HStack>

          <InputAmountHuge
            digits={8}
            currency="BTC"
            estimatedAmount={formatAmount(1000, 2) + " CAD"}
            onSwitchCurrency={() => { }}
          />
        </VStack>
      </Card>
    </div >
  )
}