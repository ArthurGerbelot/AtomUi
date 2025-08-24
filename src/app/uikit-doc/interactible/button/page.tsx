'use client'

import * as React from "react"
import Link from "next/link"

import { HStack, VStack, Heading, Card, IconUser, IconArrowRight, IconPlus, IconMinus, IconEdit, IconDelete, IconClose, IconSearch, IconAdmin, Button, ButtonVariant, buttonVariants, IconButton, type Size, type Radius, sizes, type ColorTheme, colorThemes } from "@uikit"

import { VariantsSelect } from "@/app/uikit-doc/components/VariantsSelect"


export default function ButtonPage() {
  const [size, setSize] = React.useState<Size | undefined>(undefined)
  const [color, setColor] = React.useState<ColorTheme | undefined>(undefined)
  const [variant, setVariant] = React.useState<ButtonVariant | undefined>(undefined)
  const [radius, setRadius] = React.useState<Radius | undefined>(undefined)

  return (
    <div className="space-y-8 p-6">
      <Heading typo="section-title">Button Component Examples</Heading>

      {/* Variation Controls */}
      <VariantsSelect<ButtonVariant>
        size={size} setSize={setSize}
        colorTheme={color} setColorTheme={setColor}
        variant={variant} variants={buttonVariants} setVariant={setVariant}
        radius={radius} setRadius={setRadius}
      />

      {/* Basic Buttons */}
      <Card title="Basic Buttons">
        <VStack gap>
          <strong>Button without props</strong>
          <HStack gap>
            <Button>Button</Button>
            <Button secondary>Button secondary</Button>
          </HStack>
          <strong>Button with props</strong>
          <HStack gap>
            <Button size={size} variant={variant} radius={radius} colorTheme={color}>Default button without props</Button>
            <Button size={size} variant={variant} radius={radius} colorTheme={color} secondary>secondary helper</Button>
          </HStack>
          <strong>Button events</strong>
          <HStack gap>
            <Button size={size} variant={variant} radius={radius} colorTheme={color} onClick={() => console.log("Button clicked")}>
              Console.log
            </Button>
            <Button size={size} variant={variant} radius={radius} colorTheme={color} asChild>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">href Link</a>
            </Button>
          </HStack>
        </VStack>
      </Card>

      {/* Styles */}
      <Card title="Button Styles">
        <HStack wrap>
          {buttonVariants.map((variantOption) => (
            <Button key={variantOption} variant={variantOption} size={size} radius={radius} colorTheme={color}>
              {variantOption.charAt(0).toUpperCase() + variantOption.slice(1)}
            </Button>
          ))}
        </HStack>
      </Card>

      {/* Colors */}
      <Card title="Button Colors">
        <HStack wrap gap>
          {colorThemes.map((ct) => (
            <Button key={ct} size={size} variant={variant} radius={radius} colorTheme={ct}>
              {ct}
            </Button>
          ))}
        </HStack>
      </Card>

      {/* Sizes */}
      <Card title="Button Sizes">
        <VStack gap>
          {sizes.map((sizeOption) => (
            <HStack gap key={sizeOption}>
              <Button size={sizeOption} variant={variant} radius={radius} colorTheme={color}>
                {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
              </Button>
              <Button size={sizeOption} variant={variant} radius={radius} colorTheme={color} icon={IconUser}>
                {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
              </Button>
            </HStack>
          ))}
        </VStack>
      </Card>

      <Card title="Button Widths">
        <VStack gap>
          <Button size={size} variant={variant} radius={radius} colorTheme={color} className="w-full">Full Width</Button>
          <Button size={size} variant={variant} radius={radius} colorTheme={color} className="w-[200px]">200px</Button>
        </VStack>
      </Card>

      {/* With Icons */}
      <Card title="Buttons with Icons">
        <HStack gap>
          <Button size={size} variant={variant} radius={radius} colorTheme={color} icon={IconUser}>
            User Profile
          </Button>
          <Button size={size} variant={variant} radius={radius} colorTheme={color} icon={IconArrowRight}>
            Continue
          </Button>
          <Button size={size} variant={"link"} radius={radius} colorTheme={color}>Link</Button>
        </HStack>
      </Card>

      {/* Icon Only Buttons */}
      <Card title="Icon Only Buttons">
        <HStack gap>
          <IconButton icon={IconPlus} size={size} variant={variant} radius={radius} colorTheme={color} />
          <IconButton icon={IconMinus} size={size} variant={variant} radius={radius} colorTheme={color} />
          <IconButton icon={IconEdit} size={size} variant={variant} radius={radius} colorTheme={color} />
          <IconButton icon={IconDelete} size={size} variant={variant} radius={radius} colorTheme={color} />
          <IconButton icon={IconClose} size={size} variant={variant} radius={radius} colorTheme={color} />
          <IconButton icon={IconSearch} size={size} variant={variant} radius={radius} colorTheme={color} />
          <IconButton icon={IconAdmin} size={size} variant={variant} radius={radius} colorTheme={color} />
        </HStack>
      </Card>

      {/* Disabled / Loading */}
      <Card title="States">
        <HStack gap>
          <Button disabled size={size} variant={variant} radius={radius} colorTheme={color}>Disabled</Button>
          <Button loading size={size} variant={variant} radius={radius} colorTheme={color}>Loading</Button>
          <Button loading variant="outline" size={size} radius={radius} colorTheme={color}>Loading Outline</Button>
        </HStack>
      </Card>

      {/* as/asChild */}
      <Card title="as/asChild">
        <HStack gap>
          <Button>Button</Button>
          <Button as={Link} href="https://www.google.com" target="_blank">as Link</Button>
          <Button asChild>
            <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">asChild Link</Link>
          </Button>
        </HStack>
        <Heading typo="subsection-subtitle" className="my-4">With Icons</Heading>
        <HStack gap>
          <Button icon={IconUser}>Button</Button>
          <Button icon={IconUser} as={Link} href="https://www.google.com" target="_blank">as Link</Button>
          <Button icon={IconUser} asChild>
            <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">asChild Link</Link>
          </Button>
        </HStack>
      </Card>

      <Card title="Override props">
        <HStack gap>
          <Button className="text-blue-100 bg-indigo-500 shadow-lg showdow-indigo-500" size={size} variant={variant} radius={radius} colorTheme={color}>Button</Button>
        </HStack>
      </Card>

    </div >
  )
}
