'use client'


import React from "react"
import { Card, VStack, Header, Code, Badge, Size, ColorTheme, Radius, Surface, colorThemes, surfaces, sizes, radiuses, HStack, Text } from "@uikit"
import { VariantsSelect } from "../../components/VariantsSelect"
import Link from "next/link"

export default function BadgePage() {
  const [size, setSize] = React.useState<Size | undefined>(undefined)
  const [color, setColor] = React.useState<ColorTheme | undefined>(undefined)
  const [surface, setSurface] = React.useState<Surface | undefined>(undefined)
  const [radius, setRadius] = React.useState<Radius | undefined>(undefined)


  return (
    <div className="space-y-8 p-6">
      <Header
        variant="main"
        title={<><Code textSize="4xl" includeTag>Badge</Code> Component Examples</>}
        subtitle={<>Badge uses <Text typo="link" as={Link} href="/uikit-doc/theme/colors">colorTheme</Text> and <Text typo="link" as={Link} href="/uikit-doc/theme/surfaces">surface</Text> to define its appearance<br /></>}
        description={<>The size is also slightly reduced while keeping the same size field to be able to propagate the size.</>}
      />

      {/* Variation Controls */}
      <VariantsSelect<Surface>
        size={size} setSize={setSize}
        colorTheme={color} setColorTheme={setColor}
        variant={surface} variants={Array.from(surfaces)} setVariant={setSurface}
        radius={radius} setRadius={setRadius}
      />

      <Card title="Color Theme">
        <HStack wrap>
          {colorThemes.map((colorTheme) => (
            <Badge key={colorTheme} colorTheme={colorTheme} size={size} radius={radius} surface={surface}>{colorTheme}</Badge>
          ))}
        </HStack>
      </Card>

      <Card title="Surface">
        <HStack wrap>
          {surfaces.map((surface) => (
            <Badge key={surface} colorTheme={color} size={size} radius={radius} surface={surface}>{surface}</Badge>
          ))}
        </HStack>
      </Card>

      <Card title="Radius">
        <HStack wrap>
          {radiuses.map((radius) => (
            <Badge key={radius} colorTheme={color} size={size} radius={radius} surface={surface}>{radius}</Badge>
          ))}
        </HStack>
      </Card>

      <Card title="Size">
        <VStack noGap>
          {sizes.map((size) => (
            <React.Fragment key={size}>
              <Text weight="semibold">{size}</Text>
              <HStack noGap key={size} align="baseline">
                <Text size={size}>
                  [HStack-baseline] Test text alignement
                  <Badge key={size} colorTheme={color} size={size} radius={radius} surface={surface}>{size}</Badge>
                  Test text alignement
                </Text>
              </HStack>
              <Text size={size}>
                [Inside Text] Test text alignement
                <Badge key={size} colorTheme={color} size={size} radius={radius} surface={surface}>{size}</Badge>
                Test text alignement
              </Text>
            </React.Fragment>
          ))}
        </VStack>
      </Card>

      <Card title="Long text">
        Lorem ipsum dolor sit amet, <Badge colorTheme="brand">consectetur</Badge> adipiscing elit. Sed do eiusmod <Badge>tempor incididunt</Badge> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <Badge size="sm" colorTheme="success">sm: tempor incididunt</Badge>  ex itation ullamco laboris  ea <Badge size={"xl"}>XL: tempor incididunt</Badge>  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Card>


    </div >
  )
}