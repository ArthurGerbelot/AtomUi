"use client"

import * as React from "react"
import Link from "next/link"

import { Atom, Heading, Header, type HeaderProps, IconAdmin, Text, Code, HStack, VStack, IconEdit, Card, IconBitcoin, Button, BackButton } from "@uikit"
import { CardExample } from "../../components/CardExample"

export default function HeaderPage() {
  return (
    <div className=" px-6 py-12 space-y-12">
      <header className="">
        <h1 className="text-3xl font-semibold tracking-tight">Heading & Header</h1>
        <p className="text-muted-foreground mt-2">
          This page demonstrates Heading and Header components.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-center">Typography & Heading</h2>
        <div className="flex justify-center">
          <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-700 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/40 dark:to-cyan-950/40 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-indigo-600 dark:text-indigo-400 text-lg">🎨</span>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-100">Atomic token: typo</h3>
              </div>
              <p className="text-indigo-700 dark:text-indigo-300">
                Headers can use the atomic token <strong>typo</strong> to control their visual style.
                See the <Text asChild typo="link"><Link href="/uikit-doc/typo/text"><strong>Typography</strong></Link></Text> section for the full scale and guidance.
              </p>
            </div>
            <div className="rounded-xl border-2 border-violet-200 dark:border-violet-700 bg-gradient-to-br from-violet-50 to-sky-50 dark:from-violet-950/40 dark:to-sky-950/40 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-violet-600 dark:text-violet-400 text-lg">🧩</span>
                <h3 className="font-bold text-violet-900 dark:text-violet-100">Heading component</h3>
              </div>
              <div className="text-violet-700 dark:text-violet-300">
                The <Code includeTag>Heading</Code> component interprets the <strong>typo</strong> token to choose the
                appropriate HTML tag (e.g., h1, h2, h3) and apply consistent styling.
              </div>
            </div>
          </div>
        </div>
      </section>


      <HeaderDemo />






      <section className="mb-2 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">The Header Component</h2>

        <CardExample
          title="Header Component"
          description="Header composes multiple Heading parts (title, subtitle, description) plus optional Icon, BackLink and Action. Variants and align rules inject the right props into sub-parts."
        >
          <div className="space-y-6">
            <Header
              variant="main"
              title="Welcome to the Docs"
              subtitle="All you need to build consistent UI"
              description={<Text typo="subtle">This header uses the main variant which injects main-title and main-subtitle into Heading parts.</Text>}
            />

            <Header
              variant="section"
              align="left"
              title="Getting Started"
              subtitle="Installation & Setup"
              description={<Text typo="hint">Left aligned, section-level semantics</Text>}
            />

            <Header
              variant="sub-section"
              align="center"
              Icon={<span className="text-3xl">🚀</span>}
              title="Quick Tips"
              subtitle="Boost your productivity"
              description={<Text typo="hint">Centered layout with icon above</Text>}
            />

            <Header
              variant="section"
              align="right"
              title="Advanced"
              subtitle="Composition patterns"
              description={<Text typo="hint">Right aligned with action button</Text>}
              Action={<Atom asChild><a className="px-3 py-1 rounded bg-primary text-primary-foreground" href="#">Action</a></Atom>}
            />
          </div>
        </CardExample>
      </section>

      <section className="mb-2 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Header props & slots</h2>
        <CardExample
          title="Props overview"
          subtitle="Props overview"
          description="Header groups SmartSlots as triplets (content, props, Component)."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-y-1">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2 pr-4">Prop</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Default</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="">
                  <td className="py-2 pr-4 font-medium">variant</td>
                  <td className="py-2 pr-4"><Code>"main" | "section" | "sub-section"</Code></td>
                  <td className="py-2 pr-4"><Code>"section"</Code></td>
                  <td className="py-2">Injects heading semantics for title/subtitle.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">align</td>
                  <td className="py-2 pr-4"><Code>"left" | "center" | "right"</Code></td>
                  <td className="py-2 pr-4"><Code>"left"</Code></td>
                  <td className="py-2">Layout and text alignment; variants may enforce left.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">gap</td>
                  <td className="py-2 pr-4"><Code>"xs" | "sm" | "md" | "lg" | "xl"</Code></td>
                  <td className="py-2 pr-4"><Code>"md"</Code></td>
                  <td className="py-2">Space between header parts.</td>
                </tr>
                <tr><td colSpan={4} className="py-3 text-muted-foreground">SmartSlot</td></tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">title</td>
                  <td className="py-2 pr-4">SmartSlot&lt;<Code includeTag>Heading</Code>&gt;</td>
                  <td className="py-2 pr-4"><Code includeTag>Heading</Code></td>
                  <td className="py-2">SmartSlot for Title, Header children will be placed as Title content</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">subtitle</td>
                  <td className="py-2 pr-4">SmartSlot&lt;<Code includeTag>Heading</Code>&gt;</td>
                  <td className="py-2 pr-4"><Code includeTag>Heading</Code></td>
                  <td className="py-2">SmartSlot for Subtitle</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">description</td>
                  <td className="py-2 pr-4">SmartSlot&lt;<Code includeTag>Text</Code>&gt;</td>
                  <td className="py-2 pr-4"><Code includeTag>Text</Code></td>
                  <td className="py-2">SmartSlot for Description</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">icon</td>
                  <td className="py-2 pr-4">SmartSlot&lt;<Code includeTag>Icon</Code>&gt;</td>
                  <td className="py-2 pr-4"><Code includeTag>Icon</Code></td>
                  <td className="py-2">SmartSlot for Icon</td>
                </tr>
                <tr><td colSpan={4} className="py-3 text-muted-foreground">Insertables</td></tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">BackLink</td>
                  <td className="py-2 pr-4">ReactNode</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2">Optional back link shown at the top/left of the header.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Action</td>
                  <td className="py-2 pr-4">ReactNode</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2">Optional action shown at the top/right of the header.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardExample>

        <CardExample
          title="Simple override (SmartSlot)"
          description="Override the underlying component and props while keeping Header orchestration."
          code={`<Header
  variant="section"
  title="Section Title"
  Title={(p) => <Heading {...p} family="heading" />}
  titleProps={{ weight: "bold" }}
/>`}
        >
          <Header
            variant="section"
            title="Section Title"
            Title={(p) => <Heading {...p} family="heading" />}
            titleProps={{ weight: "bold" }}
          />
        </CardExample>

        <CardExample
          title="Icon + BackLink + Action"
          description="Mix insertable nodes with SmartSlots."
        >
          <Header
            variant="section"
            align="left"
            BackLink={<Atom asChild><a href="#" className="text-primary hover:underline">Back</a></Atom>}
            Action={<Atom asChild><a className="px-3 py-1 rounded bg-primary text-primary-foreground" href="#">New</a></Atom>}
            icon={IconAdmin}
            title="What's new"
            subtitle="Release notes"
            description={<Text typo="subtle">Latest changes and improvements</Text>}
          />
        </CardExample>
      </section>


      <section className="space-y-4">
        <h2 className="text-xl font-medium">Related</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <Link href="/uikit-doc/theme/colors" className="text-primary hover:underline">Theme Colors</Link> — color tokens and usage
          </li>
          <li>
            <Link href="/uikit-doc/core/atom-tokens" className="text-primary hover:underline">Atom Tokens</Link> — general token principles
          </li>
        </ul>
      </section>
    </div>
  )
}


// Interactive Header Builder Component
function HeaderDemo() {

  const [showBackLink, setShowBackLink] = React.useState(false)
  const [showAction, setShowAction] = React.useState(true)
  const [showIcon, setShowIcon] = React.useState(false)
  const [iconVariant, setIconVariant] = React.useState<"default" | "small" | "big">("default")
  const [showSubtitle, setShowSubtitle] = React.useState(true)
  const [showDescription, setShowDescription] = React.useState(true)
  const [variant, setVariant] = React.useState<"main" | "section" | "sub-section">("section")
  const [align, setAlign] = React.useState<"left" | "center" | "right">("left")
  const [overrideAlign, setOverrideAlign] = React.useState(false)
  const [overrideIconVariant, setOverrideIconVariant] = React.useState(false)

  return (
    <HStack gap="lg">
      {/* Controls */}
      <Card
        className="flex-1"
        title="Header Controls"
        description="Toggle header elements and adjust settings"
      >
        <VStack gap="md">
          <VStack gap="sm">
            <Text weight="medium" textSize="sm">Elements</Text>
            <VStack wrap>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showBackLink}
                  onChange={(e) => setShowBackLink(e.target.checked)}
                  className="rounded"
                />
                <Text textSize="sm">Back Link</Text>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showAction}
                  onChange={(e) => setShowAction(e.target.checked)}
                  className="rounded"
                />
                <Text textSize="sm">Action</Text>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showIcon}
                  onChange={(e) => setShowIcon(e.target.checked)}
                  className="rounded"
                />
                <Text textSize="sm">Icon</Text>
              </label>
              {/*
              {showIcon && <VStack gap="sm">
                <Text fontWeight="medium" textSize="sm">Icon Variant</Text>
                <select
                  value={iconVariant}
                  onChange={(e) => setIconVariant(e.target.value as any)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="default">Default</option>
                  <option value="small">Small</option>
                  <option value="big">Big</option>
                </select>
              </VStack>} */}

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showSubtitle}
                  onChange={(e) => setShowSubtitle(e.target.checked)}
                  className="rounded"
                />
                <Text textSize="sm">Subtitle</Text>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDescription}
                  onChange={(e) => setShowDescription(e.target.checked)}
                  className="rounded"
                />
                <Text textSize="sm">Description</Text>
              </label>
            </VStack>
          </VStack>

          <VStack gap="sm">
            <Text weight="medium" textSize="sm">Variant</Text>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as HeaderProps["variant"] || "section")}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="main">main (h1)</option>
              <option value="section">section (h2)</option>
              <option value="sub-section">sub-section (h3)</option>
            </select>
          </VStack>

          <VStack gap="sm">
            <Text weight="medium" textSize="sm">Alignment</Text>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={overrideAlign}
                onChange={(e) => setOverrideAlign(e.target.checked)}
                className="rounded"
              />
              <Text textSize="sm">Override default alignment</Text>
            </label>
            {overrideAlign && (
              <select
                value={align}
                onChange={(e) => setAlign(e.target.value as "left" | "center" | "right")}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            )}
          </VStack>

          <VStack gap="sm">
            <Text weight="medium" textSize="sm">Icon Variant</Text>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={overrideIconVariant}
                onChange={(e) => setOverrideIconVariant(e.target.checked)}
                className="rounded"
              />
              <Text textSize="sm">Override default icon variant</Text>
            </label>
            {overrideIconVariant && (
              <select
                value={iconVariant}
                onChange={(e) => setIconVariant(e.target.value as "default" | "small" | "big")}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="default">Default</option>
                <option value="small">Small</option>
                <option value="big">Big</option>
              </select>
            )}
          </VStack>
        </VStack>
      </Card>

      {/* Interactive Header */}
      <div className="flex-2 flex flex-col gap-4">
        <Header
          variant={variant}
          align={overrideAlign ? align : undefined}
          title="Interactive Header Demo"
          subtitle={showSubtitle ? "This is a subtitle" : undefined}
          description={showDescription ? "This is a description that explains the header content. It can be quite long and will wrap appropriately." : undefined}
          iconProps={overrideIconVariant ? { variant: iconVariant as any } : undefined}
          Icon={showIcon ? <IconBitcoin bgColor={"bitcoin"} textColor={"white"} /> : undefined}
          BackLink={showBackLink ? <BackButton onClick={() => console.log("back")} /> : undefined}
          Action={showAction ? <Button textSize="sm" color="high-contrast" variant="ghost" icon={IconEdit}>Edit</Button> : undefined}
        />
        <Code display="block" textSize="sm">
          {`<Header
  variant="` + variant + `"
  align="` + (overrideAlign ? align : undefined) + `"
  title="Interactive Header Demo"
  subtitle="` + (showSubtitle ? "This is a subtitle" : undefined) + `"
  description="` + (showDescription ? "This is a description that explains the header content. It can be quite long and will wrap appropriately." : undefined) + `"
  icon={` + (showIcon ? `<IconBitcoin variant="` + iconVariant + `" bg="` + (iconVariant === "default" ? undefined : "bitcoin") + `" color="` + (iconVariant === "default" ? undefined : "white") + `" />` : "undefined") + `}
  backLink={` + (showBackLink ? `<BackButton onClick={() => console.log("back")} />` : "undefined") + `}
  action={` + (showAction ? `<Button textSize="sm" color="high-contrast" variant="ghost" icon={IconEdit}>Edit</Button>` : "undefined") + `}
/>`}
        </Code>
      </div>
    </HStack>
  )
}
