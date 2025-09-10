'use client'

import React, { useState } from "react"
import {
  Card, Header, Text, Badge, VStack, HStack,
  LayoutOneCol,
  LayoutMultiCol,
  // LayoutGrid,
  Button, SimpleSelect,
  LayoutGrid,
  Code,
  ContainerSize,
  containerSizes,
  Alert
} from "@uikit"
import Link from "next/link"


// Sample cards for demonstrations
const SampleCard = ({ title, description, variant = "default" }: {
  title: string,
  description: string,
  variant?: "default" | "highlight"
}) => (
  <Card
    title={title}
    description={description}
    className={variant === "highlight" ? "border-primary bg-primary/5" : ""}
  >
    <VStack gap="sm">
      <Text textSize="sm">Contenu de la card #{title}</Text>
      <HStack gap="sm">
        <Badge colorTheme={variant === "highlight" ? "brand" : "light"}>Sample</Badge>
        <Button size="sm" variant="outline">Action</Button>
      </HStack>
    </VStack>
  </Card>
)

export default function CardsLayoutDocsPage() {

  const [colSize, setColSize] = useState<ContainerSize | undefined>(undefined)
  const [colCount, setColCount] = useState<"1" | "2" | "3" | "4" | undefined>("2")

  return (
    <div className="px-6 py-12 space-y-12">
      <Header
        variant="main"
        title="Cards Layout"
        subtitle="LayoutOneCol & LayoutMultiCol"
        description="Composants layouts simples pour organiser des cards en colonnes avec des tailles de colonnes identiques."
      />

      <Alert variant="info" className="max-w-md mx-auto" title="Full page implementation demo">
        See full page implementation here <Text typo="link" colorTheme="brand" as={Link} href="/example-layouts/cards">Cards</Text>
      </Alert>

      <Card title="Variant Control" className="max-w-md mx-auto">
        <HStack>
          <SimpleSelect
            choices={[...containerSizes]}
            value={colSize}
            onValueChange={(v) => setColSize(v)}
          />
        </HStack>
      </Card>

      {/* LayoutOneCol */}
      <Card
        title="LayoutOneCol"
        subtitle="Une seule colonne centrée"
        description="Layout simple pour stacker des cards verticalement"
      >
        <VStack gap="lg">
          <div className="w-full border rounded-lg p-6 bg-muted/20">
            <LayoutOneCol size={colSize}>
              <SampleCard title="1" description="Première card dans la colonne" />
              <SampleCard title="2" description="Deuxième card empilée" variant="highlight" />
              <SampleCard title="3" description="Troisième card en dessous" />
            </LayoutOneCol>
          </div>

          <VStack gap="sm">
            <Text weight="semibold">Props disponibles :</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Text className="font-mono text-xs">gap</Text>: xs, sm, md, lg, xl
              </div>
              <div>
                <Text className="font-mono text-xs">maxWidth</Text>: sm, md, lg, xl, 2xl, full
              </div>
              <div>
                <Text className="font-mono text-xs">center</Text>: boolean (default: true)
              </div>
              <div>
                <Text className="font-mono text-xs">className</Text>: string
              </div>
            </div>
          </VStack>
        </VStack>
      </Card>


      <Card title="Variant Control" className="max-w-md mx-auto">
        <HStack>
          <SimpleSelect
            choices={[...containerSizes]}
            value={colSize}
            onValueChange={(v) => setColSize(v)}
          />
          <SimpleSelect
            choices={["1", "2", "3", "4"]}
            value={colCount || "2"}
            onValueChange={(v) => setColCount(v as "1" | "2" | "3" | "4")}
          />
        </HStack>
      </Card>

      {/* LayoutMultiCol */}
      <Card
        title="LayoutMultiCol"
        subtitle="Colonnes empilées"
        description={<>No need to send the nomber of cols as props. Only send a list of <Code includeTag>VStack</Code> component with <Code includeTag>Cards</Code>on it</>}
      >
        <VStack>
          <div className="w-full border rounded-lg p-6 bg-muted/20">
            <LayoutMultiCol size={colSize} cols={colCount}>
              {Array.from({ length: Number(colCount || "2") }).map((_, index) => (
                <VStack key={index} stretch>
                  {Array.from({ length: Number(5 - index) }).map((_, index2) => (
                    <SampleCard key={index2} title={`${index2 + 1}`} description="Première card dans la colonne" />
                  ))}
                </VStack>
              ))}
            </LayoutMultiCol>
          </div>
        </VStack>
      </Card>


      <Card title="Variant Control" className="max-w-md mx-auto">
        <HStack>
          <SimpleSelect
            choices={[...containerSizes]}
            value={colSize}
            onValueChange={(v) => setColSize(v)}
          />
          <SimpleSelect
            choices={["1", "2", "3", "4"]}
            value={colCount || "2"}
            onValueChange={(v) => setColCount(v as "1" | "2" | "3" | "4")}
          />
        </HStack>
      </Card>

      {/* LayoutGrid */}
      <Card
        title="LayoutGrid"
        subtitle="Multi-colonnes"
        description="Layout simple pour organiser des cards en plusieurs colonnes. Chaque colonne a la même taille que LayoutOneCol."
      >
        <VStack gap="lg">
          <div className="w-full border rounded-lg p-6 bg-muted/20">
            <LayoutGrid size={colSize} cols={colCount}>
              <SampleCard title="1" description="Première card dans la colonne" />
              <SampleCard title="2" description="Deuxième card empilée" variant="highlight" />
              <SampleCard title="3" description="Troisième card en dessous" />
              <SampleCard title="4" description="Quatrième card dans la colonne" />
              <SampleCard title="5" description="Cinquième card empilée" variant="highlight" />
              <SampleCard title="6" description="Sixième card en dessous" />
              <SampleCard title="7" description="Septième card dans la colonne" />
              <SampleCard title="8" description="Huitième card empilée" variant="highlight" />
              <SampleCard title="9" description="Neuvième card en dessous" />
            </LayoutGrid>
          </div>
        </VStack>
      </Card>

    </div >
  )
}