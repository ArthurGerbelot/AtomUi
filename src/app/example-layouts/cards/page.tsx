'use client'

import React from "react"
import {
  LayoutOneCol,
  LayoutMultiCol,

  Card, Text, Button, Badge, VStack, HStack,
  Header
} from "@uikit"

const ProductCard = ({ title, price, description, featured = false }: {
  title: string
  price: string
  description: string
  featured?: boolean
}) => (
  <Card
    title={title}
    subtitle={price}
    description={description}
    className={featured ? "border-primary bg-primary/5" : ""}
  >
    <VStack gap="sm">
      <HStack gap="sm">
        {featured && <Badge colorTheme="brand">Featured</Badge>}
        <Badge colorTheme="light">In stock</Badge>
      </HStack>
      <Button size="sm" variant={featured ? undefined : "outline"}>
        Add to cart
      </Button>
    </VStack>
  </Card>
)

export default function ExampleCardsLayoutsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Cards Layouts Examples
        </h1>
        <p className="text-lg text-muted-foreground">
          Demonstration of LayoutOneCol and LayoutTwoCol components
        </p>
      </div>

      {/* LayoutOneCol Example */}
      <div className="space-y-6">
        <Header align="center" title="LayoutOneCol - Vertical List" subtitle="Perfect for product lists or steps" />

        <LayoutOneCol gap="md" size="sm">
          <ProductCard
            title="iPhone 15 Pro"
            price="1,499.00 CAD"
            description="Apple's most advanced smartphone with A17 Pro chip"
            featured
          />
          <ProductCard
            title="iPhone 15"
            price="1,129.00 CAD"
            description="iPhone with Dynamic Island and 48MP camera"
          />
          <ProductCard
            title="iPhone 14"
            price="949.00 CAD"
            description="Exceptional performance with A15 Bionic chip"
          />
        </LayoutOneCol>
      </div>

      {/* LayoutTwoCol Example */}
      <div className="space-y-6">
        <Header align="center" title="LayoutTwoCol - Responsive Grid" subtitle="Automatically adapts based on screen width" />

        <LayoutMultiCol size="md" cols={2}>
          <VStack>
            <ProductCard
              title="MacBook Pro 14"
              price="2,499.00 CAD"
              description="Extraordinary performance with M3 Pro chip"
              featured
            />
            <ProductCard
              title="MacBook Air"
              price="1,499.00 CAD"
              description="Light and powerful with M2 chip"
            />
          </VStack>
          <VStack>
            <ProductCard
              title="iMac 24"
              price="1,699.00 CAD"
              description="Colorful all-in-one with 4.5K Retina display"
            />
            <ProductCard
              title="Mac Studio"
              price="2,499.00 CAD"
              description="Desktop power with M2 Max chip"
            />
          </VStack>
        </LayoutMultiCol>
      </div>


      <VStack align="center">
        <Text textColor="muted">
          Resize the window to see LayoutTwoCol responsive behavior
        </Text>
        <Button as="a" href="/uikit-doc/layout-structure/cards-layout">
          View full documentation
        </Button>
      </VStack>
    </div >
  )
}