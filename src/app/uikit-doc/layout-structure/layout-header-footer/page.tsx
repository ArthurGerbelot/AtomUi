'use client'

import React from "react"
import { Card, Header, Text, Button, VStack, HStack, Badge, LayoutHeaderFooter, IconUser, IconSettings, IconInfo, ScrollArea, Alert } from "@uikit"
import Link from "next/link"

export default function LayoutHeaderFooterDocsPage() {
  return (
    <div className="px-6 py-12 space-y-12">
      <Header
        variant="main"
        title="LayoutHeaderFooter"
        subtitle="Page layout with header and footer sections"
        description="Un composant layout simple pour structurer vos pages avec header (left/right content) et footer optionnels."
      />


      <Alert variant="info" className="max-w-md mx-auto" title="Full page implementation demo">
        See full page implementation here <Text typo="link" colorTheme="brand" as={Link} href="/example-layouts/header-footer">Header & Footer</Text>
      </Alert>

      {/* Basic Example */}
      <Card
        title="Exemple de base"
        subtitle="Header avec contenu gauche/droite et footer"
        description="Layout minimal avec header et footer"
      >
        <VStack gap="md" stretch>
          <div className="border rounded-lg overflow-auto w-full h-96">
            <LayoutHeaderFooter
              headerLeftContent={
                <HStack gap="md" align="center">
                  <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                    <Text textColor="background" weight="bold" textSize="sm">BB</Text>
                  </div>
                  <Text weight="semibold">Bull Bitcoin</Text>
                </HStack>
              }
              headerRightContent={
                <HStack gap="sm">
                  <Badge>CAD $</Badge>
                  <Button size="sm">My account</Button>
                </HStack>
              }
              footerContent={
                <HStack gap="lg" className="justify-center">
                  <Text textSize="sm" textColor="muted">Terms</Text>
                  <Text textSize="sm" textColor="muted">Privacy</Text>
                  <Text textSize="sm" textColor="muted">Rates</Text>
                </HStack>
              }
            >
              <div className="flex items-center justify-center h-full bg-muted/30">
                <Text textColor="muted">Main content area</Text>
              </div>
            </LayoutHeaderFooter>
          </div>
        </VStack>
      </Card>

      {/* Sticky Header */}
      <Card
        title="Header sticky"
        subtitle="Header qui reste en haut lors du scroll"
        description="Utilisez la prop sticky pour fixer le header"
      >
        <VStack gap="md">
          <ScrollArea className="border rounded-lg overflow-auto h-96">
            <LayoutHeaderFooter
              sticky
              headerLeftContent={
                <Text weight="semibold">Sticky Header</Text>
              }
              headerRightContent={
                <HStack gap="sm">
                  <Button size="sm" variant="ghost">
                    <IconSettings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <IconUser className="h-4 w-4" />
                  </Button>
                </HStack>
              }
              footerContent={
                <Text textSize="sm" textColor="muted" className="text-center">
                  © 2024 Bull Bitcoin - Sticky header demo
                </Text>
              }
            >
              <div className="p-6 space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="p-4 bg-muted/30 rounded">
                    <Text>Contenu scrollable #{i + 1}</Text>
                    <Text textSize="sm" textColor="muted">
                      Le header reste fixé en haut pendant le scroll
                    </Text>
                  </div>
                ))}
              </div>
            </LayoutHeaderFooter>
          </ScrollArea>
        </VStack>
      </Card>

      {/* No Footer */}
      <Card
        title="Sans footer"
        subtitle="Header uniquement"
        description="Le footer est optionnel"
      >
        <VStack gap="md">
          <div className="border rounded-lg overflow-hidden h-64">
            <LayoutHeaderFooter
              headerLeftContent={<Text weight="semibold">App Name</Text>}
              headerRightContent={
                <Button size="sm" variant="outline">Login</Button>
              }
            >
              <div className="flex items-center justify-center h-full bg-muted/30">
                <Text textColor="muted">Pas de footer dans cet exemple</Text>
              </div>
            </LayoutHeaderFooter>
          </div>
        </VStack>
      </Card>

      {/* Full Width */}
      <Card
        title="Header pleine largeur"
        subtitle="Header et footer sans container"
        description="Utilisez fullWidth pour étendre sur toute la largeur"
      >
        <VStack gap="md">
          <div className="border rounded-lg overflow-hidden h-64">
            <LayoutHeaderFooter
              headerClassName="bg-blue-600 text-white"
              footerClassName="bg-gray-800 text-white"
              headerLeftContent={
                <Text weight="semibold" className="text-inherit">Full Width Layout</Text>
              }
              headerRightContent={
                <Badge colorTheme="light">Edge to Edge</Badge>
              }
              footerContent={
                <Text textSize="sm" className="text-center text-inherit">
                  Header et footer pleine largeur
                </Text>
              }
            >
              <div className="flex items-center justify-center h-full bg-blue-50">
                <Text>Header et footer utilisent toute la largeur disponible</Text>
              </div>
            </LayoutHeaderFooter>
          </div>
        </VStack>
      </Card>

      {/* Custom Styling */}
      <Card
        title="Styling personnalisé"
        subtitle="Classes CSS custom pour chaque section"
        description="Utilisez les props className pour personnaliser l'apparence"
      >
        <VStack gap="md">
          <div className="border rounded-lg overflow-hidden h-64">
            <LayoutHeaderFooter
              headerClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              footerClassName="bg-gray-900 text-white"
              headerLeftContent={
                <Text weight="semibold" className="text-inherit">Custom Theme</Text>
              }
              headerRightContent={
                <Badge colorTheme="light">Premium</Badge>
              }
              footerContent={
                <Text textSize="sm" className="text-center text-inherit">
                  Footer avec style personnalisé
                </Text>
              }
            >
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-50 to-blue-50">
                <Text>Contenu avec thème personnalisé</Text>
              </div>
            </LayoutHeaderFooter>
          </div>
        </VStack>
      </Card>

      {/* Props Reference */}
      <Card
        title="Props Reference"
        subtitle="Liste complète des propriétés"
        Icon={<IconInfo textColor="info" />}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Prop</th>
                <th className="text-left py-2 px-2">Type</th>
                <th className="text-left py-2 px-2">Default</th>
                <th className="text-left py-2 px-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">children</Text></td>
                <td className="py-2 px-2">ReactNode</td>
                <td className="py-2 px-2">-</td>
                <td className="py-2 px-2">Contenu principal de la page</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">headerLeftContent</Text></td>
                <td className="py-2 px-2">ReactNode</td>
                <td className="py-2 px-2">undefined</td>
                <td className="py-2 px-2">Contenu à gauche du header</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">headerRightContent</Text></td>
                <td className="py-2 px-2">ReactNode</td>
                <td className="py-2 px-2">undefined</td>
                <td className="py-2 px-2">Contenu à droite du header</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">footerContent</Text></td>
                <td className="py-2 px-2">ReactNode</td>
                <td className="py-2 px-2">undefined</td>
                <td className="py-2 px-2">Contenu du footer</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">sticky</Text></td>
                <td className="py-2 px-2">boolean</td>
                <td className="py-2 px-2">false</td>
                <td className="py-2 px-2">Header fixe en haut</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">fullWidth</Text></td>
                <td className="py-2 px-2">boolean</td>
                <td className="py-2 px-2">false</td>
                <td className="py-2 px-2">Header/footer pleine largeur (sinon container centré)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">className</Text></td>
                <td className="py-2 px-2">string</td>
                <td className="py-2 px-2">undefined</td>
                <td className="py-2 px-2">Classes CSS pour le conteneur principal</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">headerClassName</Text></td>
                <td className="py-2 px-2">string</td>
                <td className="py-2 px-2">undefined</td>
                <td className="py-2 px-2">Classes CSS pour le header</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-2"><Text className="font-mono text-xs">footerClassName</Text></td>
                <td className="py-2 px-2">string</td>
                <td className="py-2 px-2">undefined</td>
                <td className="py-2 px-2">Classes CSS pour le footer</td>
              </tr>
              <tr>
                <td className="py-2 px-2"><Text className="font-mono text-xs">contentClassName</Text></td>
                <td className="py-2 px-2">string</td>
                <td className="py-2 px-2">undefined</td>
                <td className="py-2 px-2">Classes CSS pour la zone de contenu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}