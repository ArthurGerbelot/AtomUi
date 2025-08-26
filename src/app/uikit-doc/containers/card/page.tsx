'use client'

import * as React from 'react'
import { cn } from '@uikit'
import { Card, CardProps } from '@uikit/components/molecules/Card'
import { VStack, HStack, Text, Button, BackButton } from '@uikit/components/atoms'
import { IconBitcoin } from '@uikit'

type CardVariant = CardProps["variant"]

export default function CardDocPage() {
  // Visibility controls
  const [showHeader, setShowHeader] = React.useState(true)
  const [showHeaderSeparator, setShowHeaderSeparator] = React.useState(true)
  const [showContent1, setShowContent1] = React.useState(true)
  const [showContent2, setShowContent2] = React.useState(false)
  const [showContent3, setShowContent3] = React.useState(false)
  const [showFooter, setShowFooter] = React.useState(true)
  const [showFooterSeparator, setShowFooterSeparator] = React.useState(true)

  const [showSeparators, setShowSeparators] = React.useState(true)
  const [showBorders, setShowBorders] = React.useState(false)

  // Header controls
  const [cardVariant, setCardVariant] = React.useState<CardVariant>('default')
  const [headerHasIcon, setHeaderHasIcon] = React.useState(true)
  const [headerHasBack, setHeaderHasBack] = React.useState(false)
  const [headerHasAction, setHeaderHasAction] = React.useState(false)

  return (
    <div className="container mx-auto max-w-6xl px-6 py-10 space-y-6">


      <HStack gap="lg">
        {/* Controls */}


        <Card.Box className="flex-1">
          <Card.Header title="Card Controls" subtitle="Toggle sections and header options" />
          <Card.Content>
            <VStack gap="md">
              <VStack wrap>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showHeader} onChange={(e) => setShowHeader(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Header</Text>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showHeaderSeparator} onChange={(e) => setShowHeaderSeparator(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Header Separator</Text>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showContent1} onChange={(e) => setShowContent1(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Content 1</Text>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showContent2} onChange={(e) => setShowContent2(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Content 2</Text>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showContent3} onChange={(e) => setShowContent3(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Content 3</Text>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showFooterSeparator} onChange={(e) => setShowFooterSeparator(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Footer Separator</Text>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showFooter} onChange={(e) => setShowFooter(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Footer</Text>
                </label>
              </VStack>

              <VStack wrap>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showSeparators} onChange={(e) => setShowSeparators(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Content Separators</Text>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showBorders} onChange={(e) => setShowBorders(e.target.checked)} className="rounded" />
                  <Text textSize="sm">Colored Borders</Text>
                </label>
              </VStack>

              {/* Header options */}
              <VStack gap="sm">
                <Text textSize="sm" className="font-bold">Header Options</Text>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={headerHasIcon} onChange={(e) => setHeaderHasIcon(e.target.checked)} className="rounded" />
                    <Text textSize="sm">Icon</Text>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={headerHasBack} onChange={(e) => setHeaderHasBack(e.target.checked)} className="rounded" />
                    <Text textSize="sm">BackLink</Text>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={headerHasAction} onChange={(e) => setHeaderHasAction(e.target.checked)} className="rounded" />
                    <Text textSize="sm">Action</Text>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Text textSize="sm">Card Variant</Text>
                  <select
                    className="rounded border px-2 py-1 bg-background"
                    value={cardVariant ?? 'default'}
                    onChange={(e) => setCardVariant(e.target.value as CardVariant)}
                  >
                    <option value="main">Main</option>
                    <option value="secondary">Secondary</option>
                    <option value="default">Default</option>
                  </select>
                </div>
              </VStack>
            </VStack>
          </Card.Content>
        </Card.Box>

        {/* Preview */}
        <Card.Box variant={cardVariant} className={cn(showBorders ? 'border-2 border-blue-500' : '', 'flex-2')}>
          {showHeader && (
            <Card.Header
              variant={cardVariant}

              className={showBorders ? 'border-2 border-blue-300 bg-blue-50/20' : ''}
              title="Interactive Card Demo"
              subtitle="Test different card sections"
              description="Use the controls to show/hide sections. Borders help identify parts."
              {...(
                headerHasIcon
                  ? { icon: IconBitcoin, iconProps: { bgColor: 'bitcoin', textColor: 'white' } as any } // eslint-disable-line @typescript-eslint/no-explicit-any
                  : {}
              )}
              {...(headerHasBack ? { BackLink: <BackButton /> } : {})}
              {...(headerHasAction ? { Action: <Button size="xs" secondary >Edit</Button> } : {})}
            />
          )}

          {showHeaderSeparator && <Card.Separator />}

          {showContent1 && (
            <Card.Content className={showBorders ? 'border-2 border-green-300 bg-green-50/20' : ''}>
              <VStack gap="md">
                <Text className="font-bold">Primary Content Section</Text>
                <Text>
                  This is the main content area. You can have multiple content sections with separators between them.
                </Text>
              </VStack>
            </Card.Content>
          )}

          {showSeparators && showContent1 && showContent2 && <Card.Separator className={showBorders ? 'border-purple-300' : ''} />}

          {showContent2 && (
            <Card.Content className={showBorders ? 'border-2 border-purple-300 bg-purple-50/20' : ''}>
              <VStack gap="md">
                <Text className="font-bold">Secondary Content Section</Text>
                <Text>Another content block for demonstration.</Text>
              </VStack>
            </Card.Content>
          )}

          {showSeparators && showContent2 && showContent3 && <Card.Separator className={showBorders ? 'border-orange-300' : ''} />}

          {showContent3 && (
            <Card.Content className={showBorders ? 'border-2 border-orange-300 bg-orange-50/20' : ''}>
              <VStack gap="md">
                <Text className="font-bold">Tertiary Content Section</Text>
                <Text textSize="sm" textColor="muted">Small descriptive text for the third section.</Text>
              </VStack>
            </Card.Content>
          )}

          {showFooterSeparator && <Card.Separator />}

          {showFooter && (
            <Card.Footer className={showBorders ? 'border-2 border-red-300 bg-red-50/20' : ''}>
              <HStack gap="md" className="justify-between">
                <Text textSize="sm" textColor="muted">Last updated: {new Date().toLocaleDateString()}</Text>
              </HStack>
            </Card.Footer>
          )}
        </Card.Box>
      </HStack>
    </div>
  )
}
