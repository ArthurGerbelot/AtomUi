import * as React from "react"
import Link from "next/link"

import { Atom, Heading, IconWarning, Label, Text } from "@uikit"
import { CardExample } from "../../components/CardExample"

export default function TextPage() {
  return (
    <div className=" px-6 py-12 space-y-12">
      <header className="mb-2">
        <h1 className="text-3xl font-semibold tracking-tight">Typography</h1>
        <p className="text-muted-foreground mt-2">
          This page demonstrates typography using Atom React props for atomic variants.
          You can always fall back to Tailwind classes when needed.
        </p>
      </header>

      <header className="mb-2">
        <h2 className="text-2xl font-semibold tracking-tight">Text Component</h2>
        <CardExample
          title="Text Component"
          description="The Text component provide a variant props to help setup html tag and style in a single props."
        >
          <div className="space-y-3">
            <Text>Default text Default text Default text<br />Default text Default text Default text<br />Default text Default text Default text</Text>
            <Text variant="p">Paragraph Paragraph Paragraph (bigger line-height)<br />Paragraph Paragraph Paragraph<br />Paragraph Paragraph Paragraph</Text>
            <Text variant="blockquote">Blockquote Blockquote Blockquote<br />Blockquote Blockquote Blockquote<br />Blockquote Blockquote Blockquote</Text>
            <Text variant="number">$ 1,000 CAD</Text>
          </div>
        </CardExample>
      </header>


      <header className="mb-2">
        <h2 className="text-2xl font-semibold tracking-tight">Related Atomic Props</h2>
        <p className="text-muted-foreground mt-2">
          Atomic props (available on every Atomic-Component) related to Typography.
        </p>
      </header>

      <CardExample
        title="Core recipes"
        description="Base class recipes that cover most text needs"
      >
        <div className="space-y-3">
          <Atom typo="body">typo="body"</Atom>
          <Atom typo="label">typo="label"</Atom>
          <Atom typo="subtle">typo="subtle"</Atom>
          <Atom typo="hint">typo="hint"</Atom>
          <Atom typo="p">typo="p" (larger line-height than body)</Atom>
          <Atom typo="blockquote">typo="blockquote"</Atom>
          <Atom typo="link">typo="link"</Atom>
          <Atom typo="number">typo="number"</Atom>
        </div>
      </CardExample>

      <CardExample
        title="Headings"
        description="Heading recipes use the heading font and correct rhythm"

      >
        <div className="space-y-2">
          <Atom typo="main-title">typo="main-title"</Atom>
          <Atom typo="main-subtitle">typo="main-subtitle"</Atom>
          <br />
          <Atom typo="section-title">typo="section-title"</Atom>
          <Atom typo="section-subtitle">typo="section-subtitle"</Atom>
          <br />
          <Atom typo="subsection-title">typo="subsection-title"</Atom>
          <Atom typo="subsection-subtitle">typo="subsection-subtitle"</Atom>
          <br />

          <Atom typo="card-title">typo="card-title"</Atom>
          <Atom typo="card-subtitle">typo="card-subtitle"</Atom>
        </div>
      </CardExample>

      <CardExample
        title="Atomic variants — Weight"
        description="Use Atom props to control font-weight"
        note={<>
          <Atom typo="hint">Fallback classes: <code>.weight-*</code> (example: <code>.weight-normal</code>)</Atom>
          <IconWarning className="inline-block m-0 mr-2 text-warning" />
          <Text typo="hint">We use .weight-* instead of .font-* to avoid confusion with Tailwind's .font-* (used for both font-family and font-weidht).</Text>
        </>}
      >
        <div className="space-y-1">
          <Atom weight="normal">weight="normal" or .weight-normal or .font-normal</Atom>
          <Atom weight="medium">weight="medium" or .weight-medium or .font-medium</Atom>
          <Atom weight="semibold">weight="semibold" or .weight-semibold or .font-semibold</Atom>
          <Atom weight="bold">weight="bold" or .weight-bold or .font-bold</Atom>
        </div>
      </CardExample>

      <CardExample
        title="Atomic variants — Text size"
        description="Use Atom props to control text size"
        note={<Atom typo="hint">Fallback classes: <code>.text-*</code> (example: <code>.text-sm</code>)</Atom>}
      >
        <div className="space-y-1">
          <Atom textSize="xs">textSize="xs"</Atom>
          <Atom textSize="sm">textSize="sm"</Atom>
          <Atom textSize="md">textSize="md"</Atom>
          <Atom textSize="lg">textSize="lg"</Atom>
          <Atom textSize="xl">textSize="xl"</Atom>
          <Atom textSize="2xl">textSize="2xl"</Atom>
          <Atom textSize="3xl">textSize="3xl"</Atom>
          <Atom textSize="4xl">textSize="4xl"</Atom>
          <Atom textSize="5xl">textSize="5xl"</Atom>
        </div>
      </CardExample>

      <CardExample
        title="Atomic variants — Leading"
        description="Use Atom props to control line-height"
        note={<Atom typo="hint">Fallback classes: <code>.leading-*</code> (example: <code>.leading-tight</code>)</Atom>}
      >
        <div className="space-y-1">
          <Atom leading="tight">leading="tight"</Atom>
          <Atom leading="snug">leading="snug"</Atom>
          <Atom leading="normal">leading="normal"</Atom>
          <Atom leading="relaxed">leading="relaxed"</Atom>
          <Atom leading="loose">leading="loose"</Atom>
        </div>
      </CardExample>

      <CardExample
        title="Atomic variants — Tracking"
        description="Use Atom props to control letter-spacing"
        note={<Atom typo="hint">Fallback classes: <code>.tracking-*</code> (example: <code>.tracking-tight</code>)</Atom>}
      >
        <div className="space-y-1">
          <Atom tracking="tighter">tracking="tighter"</Atom>
          <Atom tracking="tight">tracking="tight"</Atom>
          <Atom tracking="normal">tracking="normal"</Atom>
          <Atom tracking="wide">tracking="wide"</Atom>
        </div>
      </CardExample>

      <CardExample
        title="Atomic variants — Family"
        description="Use Atom props to control font-family"
        note={<Atom typo="hint">Fallback classes: <code>.font-*</code> (example: <code>.font-sans</code>)</Atom>}
      >
        <div className="space-y-1">
          <Atom family="sans">family="sans"</Atom>
          <Atom family="mono">family="mono"</Atom>
          <Atom family="serif">family="serif"</Atom>
          <Atom family="heading">family="heading" <Text typo="hint">(actually use the same as "sans")</Text></Atom>
        </div>
      </CardExample>

      <CardExample
        title="Atomic variants — Boolean helper"
        description="Use Atom props to control uderline, italic, truncate, etc."
        note={<Atom typo="hint">Fallback classes: Use default Tailwind classes, <code>.truncate</code>, <code>.italic</code>, <code>.underline</code></Atom>}
      >
        <div className="space-y-1">
          <Atom underline>underline</Atom>
          <Atom italic>italic</Atom>
          <Atom className="max-w-[150px]"><Atom truncate>trucate-trucate-trucate-trucate-trucate</Atom></Atom>
        </div>
      </CardExample>

      <CardExample
        title="Helper Components"
        description="Component that wrap Text to implement a specific typo."
      >
        <div className="space-y-1">
          <Heading typo="section-title">Heading also change HTML tag</Heading>
          <Label>Label</Label>
          {/* <Caption>Caption</Caption> */}
        </div>
      </CardExample>


      <section className="space-y-4">
        <h2 className="text-xl font-medium">Guidelines</h2>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Prefer <code>typo</code> Atom props for consistent rhythm and readability</li>
          <li>Use atomic typo props <code>textSize-*</code>, <code>weight-*</code>, etc for fine-tuning</li>
          <li>Use theme text utilities (<code>text-primary</code>, <code>text-success</code>, etc.) for color semantics</li>
          <li>Use <code>{`.{props}-{value}`}</code> fallback classes (or any <Link className="text-primary hover:underline" href="https://tailwindcss.com/docs/font-family" target="_blank">Tailwind classes</Link>) for none atomic tags (or higher priority, classes always win)</li>
        </ul>
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