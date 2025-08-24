'use client'

// app/docs/layout/page.tsx
import * as React from "react"

// Import from your UI Kit alias
import { Stack, VStack, HStack, AutoGrid, SimpleGrid, Code, Header, Separator, SimpleSelect, Card, List, IconInfo } from "@uikit"
import { CardExample } from "../components/CardExample"

export default function LayoutDocsPage() {
  const [dir, setDir] = React.useState<'horizontal' | 'vertical'>('horizontal')
  const [wrap, setWrap] = React.useState<boolean>(true)
  const [stretch, setStretch] = React.useState<boolean>(false)
  const [maxH, setMaxH] = React.useState<number>(240)
  const [count, setCount] = React.useState<number>(12)
  const [align, setAlign] = React.useState<'start' | 'center' | 'end' | 'stretch' | 'baseline'>('start')
  const [colsMinWidth, setColsMinWidth] = React.useState<number>(128)
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-16">

      <Header
        variant="main"
        title="Layout Components"
        titleProps={{ className: "text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-indigo-500 bg-clip-text text-transparent" }}
        subtitle="Flexible primitives for vertical, horizontal, and grid-based layouts"
        description={<>
          These components abstract common layout patterns such as flex stacks and responsive grids.<br />
          They make it easier to build consistent, composable UIs without repeating Tailwind utility classes</>}
        align="center"
      />

      {/* =============================================================================
          WHEN TO USE WHICH
      ============================================================================= */}
      <section className="mt-16 space-y-6">
        <Header
          title="Stack / AutoGrid / SimpleGrid"
          subtitle="When to Use Which?"
          align="center"
        />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">✅ Stack / VStack / HStack</h3>
            <p className="text-muted-foreground text-sm">
              Use when arranging elements linearly, either vertically or horizontally.
              Great for forms, toolbars, navbars, and groups of controls.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">✅ AutoGrid</h3>
            <p className="text-muted-foreground text-sm">
              Use when you want flexible card layouts that auto-fill space.
              Ideal for galleries, dashboards, or product listings.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">✅ SimpleGrid</h3>
            <p className="text-muted-foreground text-sm">
              Use when you want explicit control over column count at different breakpoints.
              Perfect for predictable layouts like forms, comparison tables, or uniform grids.
            </p>
          </div>
        </div>
      </section>

      {/* =============================================================================
          STACK (VSTACK & HSTACK)
      ============================================================================= */}
      <section className="space-y-8">
        <Header
          variant="sub-section"
          title="Stack, VStack &amp; HStack"
          subtitle="For simple flex-based layouts"
          description={<><Code>Stack</Code> is a wrapper around <Code>flex</Code> that simplifies vertical and horizontal alignment.
            It comes with spacing and alignment baked in, so you don&apos;t have to remember every Tailwind class.
            <br />
            Use <Code>VStack</Code> when stacking elements vertically (common for forms, content blocks),
            and <Code>HStack</Code> when placing items side-by-side (navigation bars, button groups).</>}
        />


        <CardExample
          title="Basic Stack Usage"
          description="A vertical and horizontal arrangement of items"
          code={`
<VStack className="">
  {Array.from({ length: 3 }).map((_, i) => (
    <LayoutItemExample key={i} i={i + 1} />
  ))}
</VStack>
<Separator className="my-4 bg-indigo-200 dark:bg-indigo-700/30" />
<HStack >
  {Array.from({ length: 6 }).map((_, i) => (
    <LayoutItemExample key={i} i={i + 1} />
  ))}
</HStack>`}
        >
          <VStack className="">
            {Array.from({ length: 3 }).map((_, i) => (
              <LayoutItemExample key={i} i={i + 1} />
            ))}
          </VStack>
          <Separator className="my-4 bg-indigo-200 dark:bg-indigo-700/30" />
          <HStack >
            {Array.from({ length: 6 }).map((_, i) => (
              <LayoutItemExample key={i} i={i + 1} />
            ))}
          </HStack>
        </CardExample>

        <Card
          title="Stack props"
          subtitle="Special variants that control layout behavior"
          Icon={<IconInfo textColor="info" />}
          textColor="info"
          className="border-info bg-blue-50 dark:bg-blue-900/50 max-w-2xl mx-auto"
        >
          <List className="text-sm space-y-2">
            <List.Item>
              <Code>direction</Code>: "vertical" | "horizontal" — sets flex direction (VStack/HStack are presets).
            </List.Item>
            <List.Item>
              <Code>wrap</Code>: boolean — toggles <Code>flex-wrap</Code> for multi-line rows/columns.
            </List.Item>
            <List.Item>
              <Code>align</Code>: "start" | "center" | "end" | "stretch" | "baseline" — maps to <Code>align-items</Code>.
            </List.Item>
            <List.Item>
              <Code>stretch</Code>: boolean — convenience flag for <Code>align-items: stretch</Code>.
            </List.Item>
            <List.Item>
              <Code>full</Code>: boolean — applies <Code>w-full</Code> so the stack fills its parent width.
            </List.Item>
            <List.Item>
              <Code>gap</Code>: token — spacing between children (e.g. <Code>gap="sm"</Code>, passed via Atom tokens).
            </List.Item>
          </List>
        </Card>

        <CardExample
          title="Interactive Stack Playground"
          description="Tune direction, wrapping, stretching, max height and item count"
          code={`<Stack
  direction={dir as any}
  wrap={wrap}
  stretch={stretch}
  className="bg-muted p-4 rounded-lg2"
  style={dir === 'horizontal' && wrap ? { maxHeight: \`${maxH} px\`, overflow: 'auto' } : undefined}
>
  {Array.from({ length: count }).map((_, i) => (
    <LayoutItemExample key={i} i={i + 1} />
  ))}
</Stack>`}
        >
          {/* Controls */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <label className="flex items-center gap-2">
              <span className="min-w-20 text-foreground">Direction</span>
              <SimpleSelect
                size="sm"
                placeholder="Select Direction"
                choices={[
                  { value: "horizontal" },
                  { value: "vertical" },
                ]}
                onValueChange={(v) => setDir(v as 'horizontal' | 'vertical')}
              />
            </label>


            <label className="flex items-center gap-2">
              <span className="min-w-20 text-foreground">Align</span>
              <SimpleSelect
                size="sm"
                placeholder="Select Align"
                choices={[
                  { value: "start" },
                  { value: "center" },
                  { value: "end" },
                  { value: "stretch" },
                  { value: "baseline" },
                ]}
                // value={align}
                onValueChange={(v) => setAlign(v as 'start' | 'center' | 'end' | 'stretch' | 'baseline')}
              />
              {/* <select
                className="rounded border bg-background px-2 py-1"
                value={align}
                onChange={(e) => setAlign(e.target.value as any)}
              >
                <option value="start">start</option>
                <option value="center">center</option>
                <option value="end">end</option>
                <option value="stretch">stretch</option>
                <option value="baseline">baseline</option>
              </select> */}
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} />
              <span>wrap</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={stretch} onChange={(e) => setStretch(e.target.checked)} />
              <span>stretch</span>
            </label>

            <label className="flex items-center gap-2">
              <span className="min-w-20 text-foreground">max-height</span>
              <input
                type="range"
                min={120}
                max={480}
                step={12}
                value={maxH}
                onChange={(e) => setMaxH(parseInt(e.target.value, 10))}
              />
              <span className="tabular-nums w-12 text-right">{maxH}px</span>
            </label>

            <label className="flex items-center gap-2">
              <span className="min-w-20 text-foreground">items</span>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
              />
              <span className="tabular-nums w-8 text-right">{count}</span>
            </label>
          </div>

          {/* Demo */}
          <Stack
            direction={dir}
            wrap={wrap}
            stretch={stretch}
            align={align}
            className="bg-muted p-4 rounded-lg gap-2 content-start"
            style={
              wrap
                ? (
                  dir === 'horizontal'
                    ? { maxHeight: `${maxH}px`, overflow: 'auto' }  // rows wrap down, limit height
                    : { height: `${maxH}px`, overflow: 'auto' }      // columns wrap right, need fixed height
                )
                : undefined
            }
          >
            {Array.from({ length: count }).map((_, i) => {
              // Deterministic size based on index
              const baseW = 96 + ((i % 4) * 24) // 96..168 px
              const baseH = 40 + ((i % 3) * 16) // 40..72 px
              const style: React.CSSProperties = dir === 'horizontal'
                ? {
                  width: `${baseW}px`,
                  ...(stretch ? {} : { minHeight: `${baseH}px` }), // drop cross-axis size on stretch
                }
                : {
                  height: `${baseH + 16}px`,
                  ...(stretch ? {} : { minWidth: `${baseW - 24}px` }), // drop cross-axis size on stretch
                }
              return <LayoutItemExample key={i} i={i + 1} style={style} />
            })}
          </Stack>
        </CardExample>
      </section >

      {/* =============================================================================
          AUTOGRID
      ============================================================================= */}
      < section className="space-y-8" >
        <Header
          variant="sub-section"
          title="AutoGrid"
          subtitle="For fluid, responsive grids"
          description={<><Code>AutoGrid</Code> uses <Code>grid-template-columns: repeat(auto-fit, minmax(...))</Code>.
            It&apos;s best when you want cards or tiles that automatically wrap based on the container&apos;s width.
            You don&apos;t specify the number of columns—just the minimum and maximum width of each cell.</>}
        />


        <CardExample
          title="AutoGrid Example"
          description="Items automatically flow to fit the available space"
          code={`<AutoGrid colsMinWidth="12rem" colsMaxWidth="1fr">
  {Array.from({ length: 6 }).map((_, i) => (
    <LayoutItemExample key={i} i={i + 1} />
  ))}
</AutoGrid>`}
        >

          <label className="flex items-center gap-2">
            <span className="min-w-20 text-foreground">colsMinWidth</span>
            <input
              type="range"
              min={64}
              max={256}
              value={colsMinWidth}
              onChange={(e) => setColsMinWidth(parseInt(e.target.value, 10))}
            />
            <span className="tabular-nums w-12 text-right">{colsMinWidth}px</span>
          </label>

          <AutoGrid colsMinWidth={`${colsMinWidth}px`} colsMaxWidth="1fr">
            {Array.from({ length: 24 }).map((_, i) => (
              <LayoutItemExample key={i} i={i + 1} />
            ))}
          </AutoGrid>
        </CardExample>
      </section >

      {/* =============================================================================
          SIMPLEGRID
      ============================================================================= */}
      < section className="space-y-8" >
        <Header
          variant="sub-section"
          title="SimpleGrid"
          subtitle="For fixed grid layouts with responsive control"
          description={<><Code>SimpleGrid</Code> lets you define a fixed number of columns,
            optionally responsive per breakpoint (<Code>{`cols={{ base: 1, md: 2, lg: 4 }}`}</Code>).
            It&apos;s ideal when you know exactly how many columns you want at each screen size.</>}
        />

        <CardExample
          title="SimpleGrid Example"
          description="Responsive grid with fixed column counts"
          code={`<SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
  {Array.from({ length: 6 }).map((_, i) => (
    <LayoutItemExample key={i} i={i + 1} />
  ))}
</SimpleGrid>`}
        >
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <LayoutItemExample key={i} i={i + 1} />
            ))}
          </SimpleGrid>
        </CardExample>
      </section >


    </div >
  )
}


const LayoutItemExample = ({ i, style, className }: { i: number; style?: React.CSSProperties; className?: string }) => {
  return (
    <div key={i} style={style} className={"bg-indigo-200 dark:bg-indigo-700/30 rounded-lg p-4 text-center " + (className ?? "")}>
      Block {i}
    </div>
  )
}