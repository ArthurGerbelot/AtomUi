"use client"

import React, { useState } from "react"
import { IconButton, Button, HStack, IconEdit, IconPlus, IconMinus, IconClose, IconSearch, IconDelete, IconAdmin, IconUser, type Size, type ColorTheme, type ButtonVariant, type Radius, buttonVariants, colorThemes, IconArrowRight, IconBell, IconTrue, sizes, Header, Card, VStack, Text, radiuses, surfaces } from "@uikit"
import { VariantsSelect } from "../../components/VariantsSelect"


export default function IconButtonPage() {
  const [size, setSize] = useState<Size | undefined>(undefined)
  const [colorTheme, setColorTheme] = useState<ColorTheme | undefined>(undefined)
  const [variant, setVariant] = useState<ButtonVariant | undefined>(undefined)
  const [radius, setRadius] = useState<Radius | undefined>(undefined)
  return (
    <div className="space-y-8 p-6">
      <Header>IconButton Component Examples</Header>


      <VariantsSelect
        size={size} setSize={setSize} defaultSize="md"
        colorTheme={colorTheme} setColorTheme={setColorTheme} defaultColorTheme="high-contrast"
        variant={variant} variants={buttonVariants} setVariant={(variant) => setVariant(variant as ButtonVariant)} defaultVariant="ghost"
        radius={radius} setRadius={setRadius} defaultRadius="full"
      />

      <HStack wrap>

        {/* Basic Icon Buttons */}
        <Card title="Basic Icon Buttons">
          <HStack gap>
            <IconButton icon={IconUser} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconAdmin} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconBell} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconSearch} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconClose} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
          </HStack>
        </Card>

        {/* Different Radius */}
        <Card title="Different Radius">
          <HStack gap>
            {
              radiuses.map((radius) => (
                <IconButton key={radius} icon={IconUser} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
              ))
            }
          </HStack>
        </Card>


        {/* Different Radius */}
        <Card title="Different Variants (Overrides Surface)">
          <HStack gap>
            {
              buttonVariants.map((variant) => (
                <IconButton key={variant} icon={IconUser} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
              ))
            }
          </HStack>
        </Card>


        {/* Different Sizes */}
        <Card title="Different Sizes">
          <HStack gap>
            <IconButton icon={IconUser} size="xs" colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconUser} size="sm" colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconUser} size="md" colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconUser} size="lg" colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconUser} size="xl" colorTheme={colorTheme} variant={variant} radius={radius} />
          </HStack>
        </Card>

        {/* Interactive States */}
        <Card title="Interactive States">
          <HStack gap>
            <IconButton icon={IconUser} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconUser} size={size} colorTheme={colorTheme} variant={variant} radius={radius} disabled />
            <IconButton icon={IconUser} size={size} colorTheme={colorTheme} variant={variant} radius={radius} loading />
          </HStack>
        </Card>

        {/* Different Colors */}
        <Card title="Different Colors">
          <HStack gap wrap>
            {
              colorThemes.map((colorTheme) => (
                <IconButton key={colorTheme} icon={IconUser} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
              ))
            }
          </HStack>
        </Card>

        {/* With Children (Alternative to icon prop) */}
        <Card title="With Children (Alternative to icon prop)">
          <HStack gap>
            <IconButton size={size} colorTheme={colorTheme} variant={variant} radius={radius}>
              <IconUser />
            </IconButton>
            <IconButton size={size} colorTheme={colorTheme} variant={variant} radius={radius}>
              <IconAdmin />
            </IconButton>
            <IconButton size={size} colorTheme={colorTheme} variant={variant} radius={radius}>
              <IconBell />
            </IconButton>
          </HStack>
        </Card>


        {/* With Children (Alternative to icon prop) */}
        <Card title="Size matching with Button">
          <VStack gap>
            {sizes.map(size => {
              return (
                <HStack gap key={size}>
                  <IconButton radius="full" size={size} colorTheme={colorTheme} variant="solid">
                    <IconUser />
                  </IconButton>
                  <IconButton size={size} colorTheme={colorTheme} variant="solid" radius={radius}>
                    <IconUser />
                  </IconButton>
                  <Button size={size} colorTheme={colorTheme} variant="solid" radius={radius} icon={IconUser}>
                    Text
                  </Button>
                  <Button size={size} colorTheme={colorTheme} variant="solid" radius={radius}>
                    Text
                  </Button>
                </HStack>
              )
            })}
          </VStack>
        </Card>


      </HStack>

      {/* Real-world Examples */}
      <Header title="Real-world Examples" />
      <VStack gap>
        {/* Heading with actions */}
        <Card title="User Profile" className="w-[500px]" Action={
          <HStack gap className="-mr-2">
            <IconButton icon={IconEdit} size={size} colorTheme={colorTheme} variant={"ghost-accent"} radius={radius} />
            <IconButton icon={IconAdmin} size={size} colorTheme={colorTheme} variant={"ghost-accent"} radius={radius} />
            <IconButton icon={IconClose} size={size} colorTheme={colorTheme} variant={"ghost-accent"} radius={radius} />
          </HStack>
        }>
          <Text>User Profile</Text>
        </Card>

        {/* Search bar */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <IconButton icon={IconSearch} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border-none outline-none"
            />
            <IconButton icon={IconClose} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
          </div>
        </div>

        {/* Card actions */}
        <Card title="Document Title">
          <p className="text-sm text-gray-600">Document description goes here...</p>
          <div className="flex gap-2">
            <IconButton icon={IconEdit} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconDelete} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
            <IconButton icon={IconArrowRight} size={size} colorTheme={colorTheme} variant={variant} radius={radius} />
          </div>
        </Card>

        {/* Form actions */}
        <Card>
          <div className="flex items-center gap-2">
            <div className="w-[150px]">Add new item:</div>
            <IconButton icon={IconPlus} size={size} colorTheme={"success"} variant={variant} radius={radius} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[150px]">Remove item:</div>
            <IconButton icon={IconMinus} size={size} colorTheme={"destructive"} variant={variant} radius={radius} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[150px]">Save changes:</div>
            <IconButton icon={IconTrue} size={size} colorTheme={"info"} variant={variant} radius={radius} />
          </div>
        </Card>
      </VStack>
      {/* </Card> */}

      {/* Accessibility Note */}
      <Card title="Accessibility">
        <VStack gap>
          <Text className="text-sm text-blue-800">
            <strong>Note:</strong> IconButton components should include proper accessibility attributes
            such as <code>aria-label</code> or <code>title</code> to describe the button&apos;s purpose
            for screen readers and other assistive technologies.
          </Text>
        </VStack>
      </Card>
    </div>
  )
}