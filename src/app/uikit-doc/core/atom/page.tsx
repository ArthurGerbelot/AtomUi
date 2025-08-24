// app/docs/atom/page.tsx (or pages/docs/atom.tsx for the pages router)
import * as React from "react"

// Import from your UI Kit alias
import { Atom, Code, Text } from "@uikit"
import { CardExample } from "../../components/CardExample"


export default function AtomDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* =============================================================================
          HEADER AND INTRODUCTION
      ============================================================================= */}

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
          Atom
        </h1>
        <p className="text-xl text-muted-foreground mt-3 font-medium">
          The foundational building block of the UI Kit
        </p>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          <strong>Atom</strong> is the low-level primitive of the UI Kit. It adds a thin, typed layer over
          Tailwind utility classes using <em>class-variance-authority</em> (CVA), enabling a consistent prop-based
          styling model and optional theme injection. Higher-level components extend Atom to gain the same
          ergonomics and constraints by default.
        </p>
      </header>

      {/* =============================================================================
          WHY USE ATOM?
      ============================================================================= */}

      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Why use Atom?</h2>
          <p className="text-muted-foreground mt-2">The key benefits of this foundational primitive</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-indigo-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Typed variants</h3>
                <p className="text-muted-foreground text-sm">
                  React props to Tailwind classes via CVA, so consumers use props (e.g. <code>display</code>,
                  <Code>gap</Code>, <code>fontSize</code>) instead of hand-assembling class strings.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sky-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Theme injection</h3>
                <p className="text-muted-foreground text-sm">
                  Pass <code>colorTheme</code> to inject CSS variables for runtime theming without touching
                  Tailwind config.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-violet-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold">Composable</h3>
                <p className="text-muted-foreground text-sm">
                  Any component can extend Atom and inherit the same variant surface and conventions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-cyan-600 text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold">Override-friendly</h3>
                <p className="text-muted-foreground text-sm">
                  Final <code>className</code> is composed last to escape hatches when needed. For polymorphism,
                  every level can resolve props to classes to ensure priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================================
          CORE API OVERVIEW
      ============================================================================= */}

      <section className="mt-12 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Core API</h2>
          <p className="text-muted-foreground mt-2">Understanding Atom&apos;s variant system and capabilities</p>
        </div>

        <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
          Atom renders a <code>&lt;div&gt;</code> by default and accepts both React HTML props and a curated set of
          variant props. Below is a <em>non-exhaustive</em> sample of fields to give you the flavor.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-2 border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">📝</span>
              <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-200">Typography</h3>
            </div>
            <ul className="text-indigo-700 dark:text-indigo-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-indigo-500 dark:text-indigo-400 mt-1">•</span>
                <span><code>fontSize</code>, <code>fontWeight</code></span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-500 dark:text-indigo-400 mt-1">•</span>
                <span><code>textColor</code> (maps to text tokens)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-500 dark:text-indigo-400 mt-1">•</span>
                <span><code>textAlign</code>, <code>textTransform</code>, <code>truncate</code></span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sky-600 dark:text-sky-400 font-bold text-lg">🔲</span>
              <h3 className="font-bold text-lg text-sky-800 dark:text-sky-200">Flex & Grid</h3>
            </div>
            <ul className="text-sky-700 dark:text-sky-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-sky-500 dark:text-sky-400 mt-1">•</span>
                <span><code>flexDirection</code>, <code>justifyContent</code>, <code>alignItems</code></span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-sky-500 dark:text-sky-400 mt-1">•</span>
                <span><code>gridTemplateColumns</code>, <code>gridColumn</code></span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">🎨</span>
              <h3 className="font-bold text-lg text-violet-800 dark:text-violet-200">Colors</h3>
            </div>
            <ul className="text-violet-700 dark:text-violet-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-violet-500 dark:text-violet-400 mt-1">•</span>
                <span>Uses <code>colorTheme</code> to inject CSS variables</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-violet-500 dark:text-violet-400 mt-1">•</span>
                <span>Tokens can update CSS variables for child components</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-violet-500 dark:text-violet-400 mt-1">•</span>
                <span>Any class passed overrides generated classes</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-cyan-200 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">📐</span>
              <h3 className="font-bold text-lg text-cyan-800 dark:text-cyan-200">Layout & Spacing</h3>
            </div>
            <ul className="text-cyan-700 dark:text-cyan-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-500 dark:text-cyan-400 mt-1">•</span>
                <span><code>display</code>: block, inline, flex, grid, ...</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-500 dark:text-cyan-400 mt-1">•</span>
                <span><code>position</code>: static, relative, absolute, ...</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-500 dark:text-cyan-400 mt-1">•</span>
                <span><code>gap</code>, <code>padding</code>, <code>margin</code></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border-2 border-amber-200 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-sky-50 dark:from-amber-950/50 dark:to-sky-950/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-white font-bold text-lg">💡</span>
            <h3 className="font-bold text-xl text-amber-800 dark:text-amber-200">Important Notes</h3>
          </div>

          <div className="space-y-3">
            <p className="text-amber-700 dark:text-amber-300">
              <strong>Atom tokens are not designed to match all Tailwind classes</strong> - this is not meant to be a Chakra UI clone.
            </p>
            <p className="text-amber-700 dark:text-amber-300">
              These props serve as styling helpers for components and provide design rules (example <code>gap=&quot;md&quot;</code> means <code>.gap-4</code>),
              while still allowing you to fall back to Tailwind classes when you need specific styling (e.g. <code>dark:focus:text-blue-500</code>).
            </p>
          </div>
        </div>
      </section>

      {/* =============================================================================
          PRACTICAL EXAMPLES
      ============================================================================= */}

      <section className="mt-12 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Practical Examples</h2>
          <p className="text-muted-foreground mt-2">See Atom in action with real-world usage</p>
        </div>

        <CardExample title="Basic usage" description="Simple Atom components">
          <Atom data-doc="Atom">
            <div data-doc-compact>Hello</div>
          </Atom>
        </CardExample>

        <CardExample title="Color theme" description="Atom components with a color theme and a div with .text-primary">
          <Atom data-doc="Atom" colorTheme="green">
            <div className="text-primary" data-doc-compact>Hello</div>
          </Atom>
        </CardExample>

        <CardExample
          title="Text Component"
          description="Text is an extended component of Atom, it's a helper wrapper around Atom that add custom variants and props."
          note={<div>
            <strong>Note:</strong> To be sure that tokens and classes are resolve correctly (on the right order) you can use <a href="/uikit-doc/core/atom-polymorphism#resolveAtomTokens"><code>resolveAtomTokens()</code></a>.
          </div>
          }>

          <Text data-doc="Text" colorTheme="green" variant="blockquote">
            <div className="text-primary" data-doc-compact>Hello</div>
          </Text>
        </CardExample>
      </section>

    </div>
  )
}
