'use client'

import React from "react"
import {
  LayoutOneCol,
  LayoutMultiCol,

  Card, Text, Button, Badge, VStack, HStack
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
        <Badge colorTheme="light">En stock</Badge>
      </HStack>
      <Button size="sm" variant={featured ? undefined : "outline"}>
        Ajouter au panier
      </Button>
    </VStack>
  </Card>
)

export default function ExampleCardsLayoutsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Exemples Cards Layouts
        </h1>
        <p className="text-lg text-muted-foreground">
          Démonstration des composants LayoutOneCol et LayoutTwoCol
        </p>
      </div>

      {/* LayoutOneCol Example */}
      <div className="space-y-6">
        <div className="text-center">
          <Text textSize="2xl" weight="bold">LayoutOneCol - Liste verticale</Text>
          <Text textColor="muted">Parfait pour les listes de produits ou étapes</Text>
        </div>

        <LayoutOneCol gap="md" size="sm">
          <ProductCard
            title="iPhone 15 Pro"
            price="1 499,00 CAD"
            description="Le smartphone le plus avancé d'Apple avec puce A17 Pro"
            featured
          />
          <ProductCard
            title="iPhone 15"
            price="1 129,00 CAD"
            description="L'iPhone avec Dynamic Island et appareil photo 48 MP"
          />
          <ProductCard
            title="iPhone 14"
            price="949,00 CAD"
            description="Performance exceptionnelle avec puce A15 Bionic"
          />
        </LayoutOneCol>
      </div>

      {/* LayoutTwoCol Example */}
      <div className="space-y-6">
        <div className="text-center">
          <Text textSize="2xl" weight="bold">LayoutTwoCol - Grille responsive</Text>
          <Text textColor="muted">S&apos;adapte automatiquement selon la largeur d&apos;écran</Text>
        </div>

        <LayoutMultiCol size="md">
          <VStack>
            <ProductCard
              title="MacBook Pro 14"
              price="2 499,00 CAD"
              description="Performance extraordinaire avec puce M3 Pro"
              featured
            />
            <ProductCard
              title="MacBook Air"
              price="1 499,00 CAD"
              description="Léger et puissant avec puce M2"
            />
          </VStack>
          <VStack>
            <ProductCard
              title="iMac 24"
              price="1 699,00 CAD"
              description="All-in-one coloré avec écran Retina 4.5K"
            />
            <ProductCard
              title="Mac Studio"
              price="2 499,00 CAD"
              description="Puissance desktop avec puce M2 Max"
            />
          </VStack>
        </LayoutMultiCol>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="LayoutOneCol" subtitle="Colonne unique">
          <VStack gap="sm">
            <Text textSize="sm">✅ Simple et lisible</Text>
            <Text textSize="sm">✅ Mobile-first</Text>
            <Text textSize="sm">✅ Focus sur le contenu</Text>
            <Text textSize="sm">✅ maxWidth configurable</Text>
          </VStack>
        </Card>

        <Card title="LayoutMultiCol" subtitle="Multi-colonnes">
          <VStack gap="sm">
            <Text textSize="sm">🎯 Chaque colonne = même taille</Text>
            <Text textSize="sm">🎯 Nombre de colonnes configurable</Text>
            <Text textSize="sm">🎯 Taille de colonne uniforme</Text>
            <Text textSize="sm">🎯 Perfect pour les cards similaires</Text>
          </VStack>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <Text textColor="muted">
          Redimensionnez la fenêtre pour voir le comportement responsive de LayoutTwoCol
        </Text>
        <Button as="a" href="/uikit-doc/layout-content/cards-layout">
          Voir la documentation complète
        </Button>
      </div>
    </div >
  )
}