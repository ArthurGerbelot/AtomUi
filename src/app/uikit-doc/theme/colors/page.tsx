import * as React from "react"
import Link from "next/link"

import { Atom, bgColorVariants, cn } from "@uikit"

import { CardExample } from "../../components/CardExample"
import { cva } from "class-variance-authority"


const bgVariants = cva("", {
  variants: {
    bg: bgColorVariants,
  }
});


export default function ThemeColorsPage() {
  const contrastColorTokens = [
    "full-contrast", "high-contrast", "low-contrast", "light", "muted",
  ] as const
  const statusColorTokens = [
    "success", "warning", "error", "destructive", "info",
  ] as const
  const cryptoColorTokens = [
    "bitcoin", "lightning", "liquid", 'fiat'
  ] as const

  const tailwindColorTokens = [
    "slate", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow",
    "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo",
    "violet", "purple", "fuchsia", "pink", "rose",
  ] as const

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">
      <header className="mb-2">
        <h1 className="text-3xl font-semibold tracking-tight">Theme Colors</h1>
        <p className="text-muted-foreground mt-2">
          This page explains how colors work in the UI Kit via the <code>colorTheme</code> prop on <code>Atom</code>.
          The theme injects CSS variables (e.g., <code>--color-primary</code>) used by utilities like
          <code>text-primary</code>, <code>bg-primary</code>, and <code>border-primary</code>.
          <br />
          Other categories (typography, etc.) have dedicated pages. Here we focus on color only.
        </p>
      </header>


      <CardExample
        title="List color tokens"
        description="Here is the list of color tokens available in the UI Kit:"
        code={null}
      >
        <div className="flex gap-2">

          <div className="flex-1 space-y-4">
            <div key="brand">
              <div className="flex flex-wrap gap-2">
                <div key="brand">
                  <div className={cn(`rounded-md w-16 h-16`, bgVariants({ bg: "brand" }))}></div>
                  <div className="text-center w-16 truncate text-xs">brand</div>
                </div>
              </div>
            </div>
            {[
              {
                title: "Status colors",
                tokens: statusColorTokens,
              },
              {
                title: "Crypto colors",
                tokens: cryptoColorTokens,
              },
              {
                title: "Contrast colors",
                tokens: contrastColorTokens,
              },
            ].map(({ title, tokens }) => (
              <div key={title}>
                <h4 className="text-sm font-medium">{title}</h4>
                <div className="flex flex-wrap gap-2">
                  {tokens.map((c) => (
                    <div key={c}>
                      <div className={cn(`rounded-md w-16 h-16`, bgVariants({ bg: c }))}></div>
                      <div className="text-center w-16 truncate text-xs">{c}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 space-y-4">
            {[
              {
                title: "Tailwind colors",
                tokens: tailwindColorTokens,
              },
            ].map(({ title, tokens }) => (
              <div key={title}>
                <h4 className="text-sm font-medium">{title}</h4>
                <div className="flex flex-wrap gap-2">
                  {tokens.map((c) => (
                    <div key={c}>
                      <div className={cn(`rounded-md w-16 h-16`, bgVariants({ bg: c }))}></div>
                      <div className="text-center w-16 truncate text-xs">{c}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardExample>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Related atomic tokens</h2>
        <p className="text-muted-foreground">Coming soon.</p>
      </section>


      <CardExample
        title="Set using primary color"
        description={
          <>
            To use the current primary color, use <code>text-primary</code>, <code>bg-primary</code>, <code>border-primary</code>,
            <code>shadow-primary</code>, <code>fill-primary</code>, etc. By default, primary is mapped to <code>brand</code>.
          </>
        }
        note={
          <div className=" p-4">
            <h3 className="font-semibold mb-2">How to change primary?</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Use <code>colorTheme</code> on any Atom-based component to switch primary for its subtree.</li>
              <li>Alternatively, use the helper <code>getPrimaryColorStyle(colorTheme)</code> to inject styles inline.</li>
              <li>See <Link href="/docs/interactible/button" className="text-primary">Button</Link> to see a component using colorTheme/primary color.</li>
            </ul>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">

          <Atom data-doc="Atom" className="space-y-2 p-3 rounded border">
            <strong>&lt;Atom&gt;</strong>
            <div className="text-primary" data-doc-compact>text-primary</div>
            <div className="bg-primary text-primary-foreground p-2 rounded" data-doc-compact>bg-primary</div>
            <div className="border border-primary p-2 rounded" data-doc-compact>border-primary</div>
            <div className="shadow shadow-primary p-2 rounded" data-doc-compact>shadow-primary</div>
            <div className="ring-3 ring-primary/20 p-2 rounded" data-doc-compact>ring-primary/20</div>
          </Atom>
          <Atom data-doc="Atom" colorTheme="emerald" className="space-y-2 p-3 rounded border">
            <strong>&lt;Atom colorTheme="emerald"&gt;</strong>
            <div className="text-primary" data-doc-compact>text-primary (emerald)</div>
            <div className="bg-primary text-primary-foreground p-2 rounded" data-doc-compact>bg-primary (emerald)</div>
            <div className="border border-primary p-2 rounded" data-doc-compact>border-primary (emerald)</div>
            <div className="shadow shadow-primary p-2 rounded" data-doc-compact>shadow-primary</div>
            <div className="ring-3 ring-primary/20 p-2 rounded" data-doc-compact>ring-primary/20</div>
          </Atom>
        </div>
      </CardExample>




      <CardExample
        title="Set by using classes"
        description={
          <>
            <p className="text-muted-foreground">
              You can color elements with either:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><strong>Theme-aware utilities</strong>: <code>text-foreground</code>, <code>bg-background</code>, <code>border-high-contrast</code>, etc.</li>
              <li><strong>Tailwind palette utilities</strong>: <code>text-blue-500</code>, <code>bg-emerald-500</code>, <code>border-zinc-700</code>, etc.</li>
            </ul>
          </>
        }
        note={
          <div className="p-4">
            <h3 className="font-semibold mb-2">Notes</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Theme-aware classes are generated from CSS variables in <code>tokens/colors.css</code> via <code>@theme</code>.</li>
              <li>Tailwind palette classes use numeric keys (e.g., <code>-500</code>, from 50 to 950).</li>
            </ul>
          </div>
        }>
        <div className="grid gap-4 md:grid-cols-2">
          <Atom data-doc="Atom" className="space-y-2 p-3 rounded border">
            <h5 className="text-sm font-medium">Theme colors</h5>
            <div className="text-success" data-doc-compact>text-success</div>
            <div className="bg-error p-2 rounded" data-doc-compact>bg-error</div>
            <div className="border border-info p-2 rounded" data-doc-compact>border-info</div>
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-3 rounded border">
            <h5 className="text-sm font-medium">Tailwind colors</h5>
            <div className="text-blue-500" data-doc-compact>text-blue-500</div>
            <div className="bg-emerald-500 text-white p-2 rounded" data-doc-compact>bg-emerald-500</div>
            <div className="border border-zinc-400 p-2 rounded" data-doc-compact>border-zinc-400</div>
          </Atom>
        </div>
      </CardExample>


      <CardExample
        title="Contrast and triplet colors"
        description={
          <>
            Variables designed to manage contrast levels across light/dark modes:
            <ul className="list-disc pl-6 mt-2">
              <li><strong>high-contrast</strong>: inverse at maximum (strongest contrast)</li>
              <li><strong>low-contrast</strong>: subtler surfaces and separators</li>
              <li><strong>light</strong> and <strong>muted</strong>: soft/disabled text and surfaces</li>
            </ul>
            <br />
            <br />
            When a color is set as <code>primary</code>, the theme exposes three coordinated variables/classes:
            <ul className="list-disc pl-6 mt-2 text-muted-foreground">
              <li><strong>primary</strong>: the base color itself (used for text, bg, borders)</li>
              <li><strong>primary-foreground</strong>: readable text color when primary is used as background</li>
              <li><strong>primary-higher-contrast</strong>: stronger alternative for small elements (text, borders). Often equals primary, but can be slightly stronger (e.g., with very light primaries)</li>
            </ul>
          </>
        }
        code={null}
        note={
          <div className="p-4">
            <h3 className="font-semibold mb-2">Theme roles and inversion</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li><strong>foreground/background</strong> have light and dark sources; <code>-inverse</code> points to the opposite source (e.g., in light mode, <code>background-inverse</code> = dark background).</li>
              <li><strong>white/black</strong> are static helpers and do not invert with theme.</li>
              <li>Use <code>-foreground</code> variants for readable text on each contrast surface.</li>
            </ul>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Atom data-doc="Atom" className="space-y-2 p-2 font-bold">
            .border-* <br />
            .text-*
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 font-bold">
            .border-*-higher-contrast <br />
            .text-*-higher-contrast
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 font-bold">
            .bg-* <br />
            .text-*-foreground
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 border border-primary text-primary">
            Primary
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 border border-primary-higher-contrast text-primary-higher-contrast">
            Primary
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-primary text-primary-foreground">
            Primary
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 border border-success text-success">
            Success
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 border border-success-higher-contrast text-success-higher-contrast">
            Success
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-success text-success-foreground">
            Success
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 border border-full-contrast text-full-contrast">
            Full contrast
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 border border-full-contrast-higher-contrast text-full-contrast-higher-contrast">
            Full contrast
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-full-contrast text-full-contrast-foreground">
            Full contrast
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 border border-high-contrast text-high-contrast">
            High contrast
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 border border-high-contrast-higher-contrast text-high-contrast-higher-contrast">
            High contrast
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-high-contrast text-high-contrast-foreground">
            High contrast
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 border border-low-contrast text-low-contrast">
            Low contrast
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 border border-low-contrast-higher-contrast text-low-contrast-higher-contrast">
            Low contrast
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-low-contrast text-low-contrast-foreground">
            Low contrast
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 border border-light text-light">
            Light
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 border border-light-higher-contrast text-light-higher-contrast">
            Light
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-light text-light-foreground">
            Light
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 border border-muted text-muted">
            Muted
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 border border-muted-higher-contrast text-muted-higher-contrast">
            Muted
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-muted text-muted-foreground">
            Muted
          </Atom>
        </div>
        <br /><br />
        <div className="grid gap-4">
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-background text-foreground">
            <strong>Current text/bg:</strong> .bg-background .text-foreground
          </Atom>
          <Atom data-doc="Atom" className="space-y-2 p-2 bg-background-inverse text-foreground-inverse">
            <strong>Inverse text/bg:</strong> .bg-background-inverse .text-foreground-inverse
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 bg-background-light text-foreground-light">
            <strong>Light text/bg:</strong> .bg-background-light .text-foreground-light
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 bg-background-dark text-foreground-dark">
            <strong>Dark text/bg:</strong> .bg-background-dark .text-foreground-dark
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 bg-white-pure text-black-pure">
            <strong>Always white pure/black pure:</strong> .bg-white-pure .text-black-pure
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 bg-black-pure text-white-pure">
            <strong>Always black pure/white pure:</strong> .bg-black-pure .text-white-pure
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 bg-white text-black">
            <strong>Always white/black (subtle):</strong> .bg-white .text-black
          </Atom>

          <Atom data-doc="Atom" className="space-y-2 p-2 bg-black text-white">
            <strong>Always black/white (subtle):</strong> .bg-black .text-white
          </Atom>
        </div>
      </CardExample>

    </div >
  )
}
