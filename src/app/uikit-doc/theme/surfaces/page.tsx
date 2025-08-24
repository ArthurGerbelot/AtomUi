import * as React from "react"
import Link from "next/link"

import { Atom, Header } from "@uikit"
import { CardExample } from "../../components/CardExample"
import { Surface, surfaces } from "@uikit/tokens/surface/surface"

export default function ThemeSurfacesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <Header
        variant="main"
        title="Surfaces"
        subtitle="This page explains how to use surfaces via the atomic token surface on Atom."
      />

      <CardExample
        title="List of surfaces"
        description="Available atomic surfaces: card, solid, outline, secondary, subtle, subtle-accent, subtle-outline, text-accent, none, input, popover."
        code={null}
      >
        <div className="flex flex-wrap gap-3">
          {surfaces.map((s) => (
            <Atom key={s} surface={s} className="px-4 py-3">
              <div className="w-40 text-center truncate">{s}</div>
            </Atom>
          ))}
        </div>
      </CardExample>

      <CardExample
        title="Surfaces and primary color (colorTheme)"
        description={
          <>
            Surfaces like <code>solid</code>, <code>outline</code>, <code>subtle</code>, etc. rely on the primary color.
            Set <code>colorTheme</code> to drive the primary within a subtree. Example: <code>colorTheme="emerald"</code>.
          </>
        }
        note={
          <div className="p-4">
            <h3 className="font-semibold mb-2">Where is the primary defined?</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Surface CSS variables live in <code>surface.theme.css</code> (light/dark).</li>
              <li>Utility class mappings are in <code>surface.tsx</code> and exposed via the atomic <code>surface</code> token.</li>
              <li>The primary depends on <code>colorTheme</code>, configurable on any <code>Atom</code>-based component.</li>
            </ul>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Without colorTheme (default)</h4>
            <div className="flex flex-wrap gap-2">
              {["solid", "outline", "subtle", "subtle-accent", "subtle-outline", "text-accent"].map((s) => (
                <Atom key={`def-${s}`} surface={s as Surface} className="px-4 py-2">
                  {s}
                </Atom>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">With colorTheme=emerald</h4>
            <Atom colorTheme="emerald" className="flex flex-wrap gap-2 p-2 rounded-md border">
              {["solid", "outline", "subtle", "subtle-accent", "subtle-outline", "text-accent"].map((s) => (
                <Atom key={`em-${s}`} surface={s as Surface} className="px-4 py-2">
                  {s}
                </Atom>
              ))}
            </Atom>
          </div>
        </div>
      </CardExample>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Best practices</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>Use the atomic <code>surface</code> token on <code>Atom</code> components or any that extend it.</li>
          <li>Set <code>colorTheme</code> on a container to propagate a coherent primary to a whole module.</li>
          <li>Avoid <code>@layer components</code> for surfaces; prefer the provided tokens and utilities.</li>
          <li>See <Link href="/docs/core/atom" className="text-primary">Atom</Link> for token resolution details.</li>
        </ul>
      </section>
    </div>
  )
}
