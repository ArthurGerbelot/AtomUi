'use client'

import { Text, Icon, SmartSlot, Heading, Code, IconSearch, IconDelete, IconAdmin, IconSuccess, IconError, IconWarning, IconInfo, IconUser, IconBell, IconDollar, IconExternalLink, IconBullBitcoin, IconLBTC, IconLNBTC, IconBTC, IconBitcoin, IconProps, pickSmartSlotSpecs, Header, SmartIcon, Card, IconButton, Button, TextWithIcon, ChoiceBadge, HStack, Size, VStack } from "@uikit"
import * as IconModule from "@uikit/components/atoms/IconLibrary"
import { CodeRenderer } from "../../components/CardExample"
import { VariantsSelect } from "../../components/VariantsSelect"
import React from "react"
import Link from "next/link"


// Récupère tous les exports qui commencent par "Icon" du module
const iconExports = Object.entries(IconModule)
  .filter(([name, component]) =>
    name.startsWith('Icon') &&
    typeof component === 'function'
  )
  .sort(([a], [b]) => a.localeCompare(b))

export default function IconsPage() {
  const [size, setSize] = React.useState<Size | undefined>(undefined)

  return (
    <div className="space-y-8 p-6">
      <Heading>Icon Library Examples</Heading>

      <Card icon={IconInfo} title="Stress Test" className="max-w-md mx-auto" surface="outline" colorTheme="info">
        See <Text as={Link} typo="link" colorTheme="brand" href="/uikit-doc/typo/icon/stress-test">Stress Test</Text>
      </Card>

      <div className="flex flex-row gap-4">
        <div className="flex-1 flex flex-col gap-8">
          <Card title="Icons">
            <div className="flex flex-wrap gap-4">
              <IconSearch />
              <IconUser />
              <IconAdmin />
              <IconBell />
              <IconDollar />
              <IconExternalLink />
            </div>
          </Card>

          <Card title="Colors">
            <div className="flex flex-wrap gap-4">
              <IconBullBitcoin textColor="brand" />
              <IconSuccess textColor="success" />
              <IconError textColor="error" />
              <IconWarning textColor="warning" />
              <IconInfo textColor="info" />
              <IconDelete textColor="destructive" />
            </div>
          </Card>

          <Card title="Cryptocurrencies">
            <div className="flex flex-wrap gap-4">
              <IconBitcoin textColor="bitcoin" />
              <IconBullBitcoin textColor="brand" />
              <IconLBTC textColor="liquid" />
              <IconLNBTC textColor="lightning" />
              <IconBTC textColor="bitcoin" />
            </div>
          </Card>

          {/* Different Sizes */}
          <Card title="Different px or size prop">
            <VStack>
              <div>
                <Text weight="medium">Alias size (xs, sm, ..) - Match Text size</Text>
                <div className="flex flex-wrap items-center gap-4">
                  <IconUser size={"xs"} />
                  <IconUser size={"sm"} />
                  <IconUser size={"md"} />
                  <IconUser size={"lg"} />
                  <IconUser size={"xl"} />
                </div>
              </div>

              <div>
                <Text weight="medium">Variant size (medium, hero, ...) - For layout purpose</Text>
                <HStack>
                  <IconUser variant="default" />
                  <IconUser variant="mini" />
                  <IconUser variant="chip" />
                  <IconUser variant="medium" />
                </HStack>
                <HStack>
                  <IconUser variant="hero" />
                  <IconUser variant="jumbo" />
                </HStack>
              </div>

              <div>
                <Text weight="medium">Custom size</Text>
                <div className="flex flex-wrap items-center gap-4">
                  <IconUser size={12} />
                  <IconUser />
                  <IconUser size={80} />
                </div>
              </div>
            </VStack>
          </Card>

          {/* Different Sizes */}
          <Card title="Different way to use">
            <HStack>

              {/* 1. Direct use */}
              <IconModule.IconBulletPoint variant="hero" bgColor="bitcoin" textColor="white" />

              {/* 2. Wrapper avec icon */}
              <Icon icon={IconModule.IconBulletPoint} variant="hero" bgColor="bitcoin" textColor="white" />

              {/* 3. Wrapper avec icon prérendu */}
              <Icon><IconModule.IconBulletPoint variant="hero" bgColor="bitcoin" textColor="white" /></Icon>

              {/* 4. Via children */}
              <Icon variant="hero" bgColor="bitcoin" textColor="white"> <IconModule.IconBulletPoint /> </Icon>

            </HStack>
          </Card>

          {/* Wrapper usage */}
          <Card
            title="ExampleWrapper"
            avoidContent
            description={<>
              <Code includeTag>Icon</Code> can be used as a wrapper component to display an icon.
            </>}
          >
            <Card.Content>

              <CodeRenderer>
                <div>1. <IconUser /> - Using Helper (already wrapped) <Code includeSelfClosingTag display={"inline"}>IconUser</Code></div>
                <div>2. <Icon icon={IconUser} /> - Using wrapper and props <Code includeSelfClosingTag display={"inline"}>{`icon={IconUser}`}</Code></div>
                <div>3. <Icon>{IconUser}</Icon> - Using wrapper and children <Code display={"inline"}>{`<Icon>{IconUser}</Icon>`}</Code></div>
              </CodeRenderer>
            </Card.Content>

            <Card.Separator />

            <Card.Content>
              <Header
                variant={"sub-section"}
                title={<>Useful for Molecules that provide <Code includeTag>SmartIcon</Code></>}
                subtitle="Use `icon` props"
                description="so it'll be injected as `children` on the SmartSlot using the `Icon` component (default one)"
              />

              <CodeRenderer code={`<MoleculeExample icon={IconUser} iconProps={{ textColor: "brand" }} />`}>
                <MoleculeExample icon={IconUser} iconProps={{ textColor: "brand" }} />
              </CodeRenderer>

              <br />
              <br />
              <Header
                variant={"sub-section"}
                subtitle="Or Instantiate on Icon props"
              />
              <CodeRenderer code={`<MoleculeExample Icon={<IconUser textColor="brand" />} />`}>
                <MoleculeExample Icon={<IconUser textColor="brand" />} />
              </CodeRenderer>

            </Card.Content>
          </Card>
        </div>

        <div className="flex-1 flex flex-col gap-8">

          <VariantsSelect size={size} setSize={setSize} />


          {/* Usage in Buttons */}
          <Card title="Usage in Button">
            <div className="flex flex-wrap gap-4">
              <Button icon={IconModule.IconUser} size={size} variant="outline">My Account</Button>
              <Button icon={IconModule.IconAdmin} size={size}>Admin</Button>
              <Button icon={IconModule.IconArrowRight} size={size} iconPosition="right" variant="secondary">Next</Button>
            </div>
          </Card>

          <Card title="Usage in IconButton" >
            <div className="flex flex-wrap gap-4 items-center">
              <IconButton icon={IconModule.IconUser} size={size} variant="outline" />
              <IconButton icon={IconModule.IconAdmin} size={size} />
              <IconButton icon={IconModule.IconArrowRight} size={size} variant="secondary" />
            </div>
          </Card >

          {/* Example with IconText Component */}
          <Card title="Example with TextWithIcon" >
            <div className="flex flex-wrap gap-4">
              <TextWithIcon icon={IconModule.IconUser} size={size}>My Account</TextWithIcon>
              <TextWithIcon icon={IconModule.IconAdmin} size={size}>Admin</TextWithIcon>
              <TextWithIcon icon={IconModule.IconArrowRight} size={size} iconPosition="right">Next</TextWithIcon>
            </div>
          </Card >

          {/* Example with ChoiceBadge Component */}
          <Card title="Example with ChoiceBadge" >
            <div className="flex flex-wrap gap-4">
              <ChoiceBadge choice={{ value: "User", icon: IconModule.IconUser, surface: "outline" }} size={size} />
              <ChoiceBadge choice={{ value: "Admin", icon: IconModule.IconAdmin, surface: "solid" }} size={size} />
              <ChoiceBadge choice={{ value: "Next", icon: IconModule.IconArrowRight, surface: "secondary", colorTheme: 'high-contrast' }} size={size} />
              <ChoiceBadge choice={{ value: "True", icon: IconModule.IconSuccess, surface: "subtle", colorTheme: 'success' }} radius="full" size={size} />
              <ChoiceBadge choice={{ value: "False", icon: IconModule.IconError, surface: "subtle-accent", colorTheme: 'error' }} radius="full" size={size} />
            </div>
          </Card >

          <Card title="Alignements">

            <div>
              <IconButton icon={IconModule.IconCheckboxUnchecked} size={size} variant="subtle" />
              <Button icon={IconModule.IconCheckboxUnchecked} size={size} variant="subtle">Button</Button>
            </div>

            <div>
              <Text size={size}>Text Text</Text>
              <IconModule.IconCheckboxUnchecked size={size} />
              <Text size={size}>Text Text</Text>
            </div>

            <div>
              <Text size={size}>
                Wrapper Text
                <IconModule.IconCheckboxUnchecked size={size} />
                Text
              </Text>
            </div>

            <div>
              <TextWithIcon icon={IconModule.IconCheckboxUnchecked} size={size} iconPosition="right">
                Text with righticon
              </TextWithIcon>
              <Text> Text between </Text>
              <TextWithIcon icon={IconModule.IconCheckboxUnchecked} size={size}>
                Text with left icon
              </TextWithIcon>
            </div>


            <div>
              <ChoiceBadge choice={{ value: "Test", icon: IconModule.IconCheckboxUnchecked }} size={size} />
            </div>


            <HStack align="center">
              <Button icon={IconModule.IconCheckboxUnchecked} size={size} variant="subtle">Button</Button>
              <TextWithIcon icon={IconModule.IconCheckboxUnchecked} size={size}>
                Button
              </TextWithIcon>
            </HStack>


          </Card>
        </div >
      </div >



      {/* Complete Icon Grid */}
      < Card title={`Complete ${iconExports.length} icons`
      } >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {iconExports.map(([name, IconComponent]) => {
            const Icon = IconComponent as React.ComponentType<{ size?: number | string }>
            return (
              <div key={name} className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50">
                <Icon size={24} />
                <Text textSize="xs" className="mt-2 text-center" truncate>{name}</Text>
              </div>
            )
          })}
        </div >
      </Card >
    </div >
  )
}

// Simple Molecule Example with a SmartIcon on it

type TextSpecsProps = SmartSlot<IconProps, "icon">;
const MoleculeExample = (props: TextSpecsProps) => {
  const specs = pickSmartSlotSpecs<IconProps>(props, "icon");

  return (
    <div>
      <SmartIcon specs={specs} />
    </div>
  )
}