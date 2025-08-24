'use client'

import React from "react"
import Link from "next/link"
import { Card, Header, typoVariants } from "@uikit"

export default function UIKitDocHomePage() {
  return (
    <div className="px-6 py-12 space-y-12">
      <section className="text-center max-w-5xl mx-auto space-y-4">
        <Header
          variant="main"
          align="center"
          titleProps={{ className: "bg-gradient-to-r from-brand to-amber-500 bg-clip-text text-transparent" }}
          title="Bull Bitcoin React UIKit Documentation"
          subtitle="A concise, type-safe component toolkit built with React, TypeScript and Tailwind CSS. Compose, override and ship faster."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-sm">
          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">React</span>
          <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800">TypeScript</span>
          <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border border-violet-200 dark:border-violet-800">Radix</span>
          <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">shadcn-inspired</span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <Card variant="secondary" title="Philosophy">
          <p className="text-sm text-muted-foreground">
            This kit is not meant to replace Chakra UI or MUI. It provides a small, consistent foundation so you don’t retype the same components across apps.
          </p>
        </Card>
        <Card variant="secondary" title="Tailwind-first">
          <p className="text-sm text-muted-foreground">
            Everything is overridable via Tailwind classes. Helpers are here to speed you up, not to get in the way.
          </p>
        </Card>
        <Card variant="secondary" title="Type-safe ergonomics">
          <p className="text-sm text-muted-foreground">
            Strong TypeScript surfaces reduce guesswork. Tokens and SmartSlots guide composition and keep APIs predictable.
          </p>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto space-y-4">
        <Header subtitle="Learn how the core components are built">Core building blocks</Header>
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Atom & Atom Tokens">
            <p className="text-sm text-muted-foreground mt-2">
              All components extend <strong>Atom</strong>, which maps Tailwind utilities to typed React props. You get string-typed tokens (spacing, typography, colors) and don’t need to memorize every class.
            </p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link href="/uikit-doc/core/atom" className={typoVariants.link}>Atom</Link>
              <Link href="/uikit-doc/core/atom-tokens" className={typoVariants.link}>Atom Tokens</Link>
              <Link href="/uikit-doc/core/atom-polymorphism" className={typoVariants.link}>Polymorphism</Link>
            </div>
          </Card>
          <Card title="SmartSlot">
            <p className="text-sm text-muted-foreground mt-2">
              Build Molecules with parts that can be fully overridden by consumers (content, props, component) with minimal verbosity and clear priority rules.
            </p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link href="/uikit-doc/core/slot-and-smartslot" className={typoVariants.link}>Slot & SmartSlot</Link>
              <Link href="/uikit-doc/core/advanced-smartslot" className={typoVariants.link}>Advanced SmartSlot</Link>
            </div>
          </Card>
        </div>
      </section >

      <section className="max-w-6xl mx-auto space-y-4">
        <Header subtitle="Learn the base building blocks of the UI Kit">Get started</Header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Typography">
            <p className="text-sm text-muted-foreground mt-2">Heading, Text, and tokens for consistent type scale.</p>
            <div className="mt-3 flex gap-3 text-sm">
              <Link href="/uikit-doc/typo/header" className={typoVariants.link}>Heading & Header</Link>
              <Link href="/uikit-doc/typo/text" className={typoVariants.link}>Text</Link>
            </div>
          </Card>
          <Card title="Core">
            <p className="text-sm text-muted-foreground mt-2">Learn Atom and composition primitives.</p>
            <div className="mt-3 flex gap-3 text-sm">
              <Link href="/uikit-doc/core/atom" className={typoVariants.link}>Atom</Link>
              <Link href="/uikit-doc/core/slot-and-smartslot" className={typoVariants.link}>SmartSlot</Link>
            </div>
          </Card>
          <Card title="Theme">
            <p className="text-sm text-muted-foreground mt-2">Color tokens and dark mode-ready surfaces.</p>
            <div className="mt-3 flex gap-3 text-sm">
              <Link href="/uikit-doc/theme/colors" className={typoVariants.link}>Colors</Link>
            </div>
          </Card>
        </div>
      </section >
    </div >
  )
}