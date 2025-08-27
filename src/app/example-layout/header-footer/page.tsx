'use client'

import { LayoutHeaderFooter, Button, Text, Badge, Card, VStack } from "@uikit"

export default function HeaderFooterExamplePage() {
  return (
    <LayoutHeaderFooter
      fullWidth
      sticky
      headerLeftContent={
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
            <Text textColor="background" weight="bold" textSize="sm">🏗️</Text>
          </div>
          <Text weight="bold" textSize="lg">UIKit Demo</Text>
        </div>
      }
      headerRightContent={
        <div className="flex items-center gap-3">
          <Badge>Full Width</Badge>
          <Button size="sm" variant="outline">
            Documentation
          </Button>
        </div>
      }
      footerContent={
        <div className="flex flex-col items-center gap-4">
          <Text textSize="sm" textColor="muted" className="text-center">
            Exemple d&apos;implémentation complète du LayoutHeader avec <Badge>fullWidth={true}</Badge>
          </Text>
          <div className="flex items-center gap-6">
            <Text as="a" href="#" textSize="sm" textColor="muted" className="hover:text-foreground">
              Documentation
            </Text>
            <Text as="a" href="#" textSize="sm" textColor="muted" className="hover:text-foreground">
              Components
            </Text>
            <Text as="a" href="#" textSize="sm" textColor="muted" className="hover:text-foreground">
              GitHub
            </Text>
          </div>
        </div>
      }
      headerClassName="bg-white shadow-sm"
      footerClassName="bg-gray-50"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              LayoutHeader Full Width Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Voici une implémentation complète du composant LayoutHeader
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card
              title="Container Mode (default)"
              subtitle="fullWidth={false}"
              description="Header et footer centrés avec largeur maximale"
            >
              <VStack gap="sm">
                <Text textSize="sm">✅ Contenu centré et limité en largeur</Text>
                <Text textSize="sm">✅ Responsive design optimal</Text>
                <Text textSize="sm">✅ Lecture confortable</Text>
              </VStack>
            </Card>

            <Card
              title="Full Width Mode"
              subtitle="fullWidth={true}"
              description="Header et footer utilisent toute la largeur"
            >
              <VStack gap="sm">
                <Text textSize="sm">🎯 Utilise toute la largeur disponible</Text>
                <Text textSize="sm">🎯 Parfait pour les apps et dashboards</Text>
                <Text textSize="sm">🎯 Maximum d&apos;espace pour la navigation</Text>
              </VStack>
            </Card>
          </div>

          <Card
            title="Code Example"
            description="Implémentation de cette page"
          >
            <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
              {`<LayoutHeader
  fullWidth={true}
  sticky={true}
  headerLeftContent={<Logo />}
  headerRightContent={<Menu />}
  footerContent={<FooterLinks />}
  headerClassName="bg-white shadow-sm"
  footerClassName="bg-gray-50"
>
  <YourMainContent />
</LayoutHeader>`}
            </pre>
          </Card>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
            <div className="text-center space-y-4">
              <Text textSize="lg" weight="semibold">
                Le header et footer de cette page utilisent fullWidth={true}
              </Text>
              <Text textColor="muted">
                Regardez comme ils s&apos;étendent sur toute la largeur de l&apos;écran,
                même si le contenu principal reste dans un container centré.
              </Text>
              <Button as="a" href="/uikit-doc/layout-structure/layout-header">
                Voir la documentation complète
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutHeaderFooter>
  )
}