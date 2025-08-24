import * as React from "react"

export default function AtomTokensDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-rose-500 bg-clip-text text-transparent">Atom Tokens - Design system helpers</h1>
        <p className="text-muted-foreground mt-2">
          <strong>Atom tokens</strong> are prop-based design helpers that provide consistent styling across your components.
          They're not meant to replace Tailwind classes but to offer semantic, design-system-aligned shortcuts for common patterns.
          <br />
          When tokens don't cover your needs, <strong>Tailwind classes remain your escape hatch</strong> - they always work and take priority.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Philosophy & Approach</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 p-6">
            <h3 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">🎯 Design Helpers, Not CSS Mapping</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Unlike Chakra UI, we don't map every CSS property. Tokens provide <strong>semantic shortcuts</strong> for
              design system patterns. For everything else, use Tailwind classes directly.
            </p>
          </div>
          <div className="rounded-lg border-2 border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/50 p-6">
            <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-200">🔀 Tailwind as Escape Hatch</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              <code>className</code> always wins. When tokens don't fit your needs,
              Tailwind classes like <code>dark:md:text-sm</code> provide full control and override tokens.
            </p>
          </div>
          <div className="rounded-lg border-2 border-rose-200 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/50 p-6">
            <h3 className="font-semibold mb-2 text-rose-800 dark:text-rose-200">📏 Semantic Values</h3>
            <p className="text-sm text-rose-700 dark:text-rose-300">
              Props use design tokens like <code>gap="md"</code> instead of <code>gap-4</code>.
              You don't need to remember that "medium" spacing is 1rem.
            </p>
          </div>
          <div className="rounded-lg border-2 border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-950/50 p-6">
            <h3 className="font-semibold mb-2 text-red-800 dark:text-red-200">🔧 CSS @apply Integration</h3>
            <p className="text-sm text-red-700 dark:text-red-300">
              Most Atom Tokens like <code>typo="body"</code> are also available as Tailwind utility-classes (.<code>typo-body</code>),
              defined in CSS with <code>@apply</code> for consistency across HTML and components.
            </p>
          </div>
          <div className="rounded-lg border-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 p-6">
            <h3 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">🔗 Smart Propagation</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Tokens can extend behavior in child components.<br />
              A <code>size="lg"</code> on a Button affects will also affect spacing (gap)
              and will be propagated to Text and Icon chilren component.
            </p>
          </div>
          <div className="rounded-lg border-2 border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-950/50 p-6">
            <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-200">🎨 Theme Integration</h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              Some tokens like <code>themeColor="success"</code> works by updating CSS Varible (like <code>--color-primary = var(--color-success)</code>).<br />
              This ways, components/tokens can be style using a single CSS Variable and style will adapt (example surface="solid" use <code>background: "var(--color-primary)"</code>)
            </p>
          </div>






        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">Limitations & Escape Hatches</h2>
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 p-4">
          <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 When to Use Tailwind Classes</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-200 list-disc pl-5 space-y-1">
            <li><strong>Responsive variants</strong>: <code>md:text-lg lg:text-xl</code> for breakpoint-specific styles</li>
            <li><strong>State variants</strong>: <code>hover:bg-blue-500 dark:text-white</code> for complex states</li>
            <li><strong>Precise control</strong>: <code>translate-x-[13px]</code> for exact positioning</li>
            <li><strong>Complex combinations</strong>: <code>before:content-[''] after:absolute</code> for advanced styling</li>
            <li><strong>One-off styles</strong>: Component-specific styles that don't belong in the design system</li>
          </ul>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
            <strong className="text-red-500 dark:text-red-400">Remember:</strong> <code>className</code> props always override token-generated classes,
            giving you full control when needed.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-medium">Core Token Categories</h2>

        <p className="text-2xl text-primary">
          @TODO: Document all tokens here! <br />
          This is just an IA generated list as a starting point and need to be updated.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Typography */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">Typography</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">typo</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>body</code> - Default body text</li>
                <li>• <code>caption</code> - Small secondary text</li>
                <li>• <code>title-main</code> - Primary headings</li>
                <li>• <code>title-section</code> - Section headings</li>
                <li>• <code>title-sub</code> - Sub-section headings</li>
                <li>• <code>label</code> - Form labels and tags</li>
                <li>• <code>code</code> - Monospace code text</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">size</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>xs</code> - Extra small text</li>
                <li>• <code>sm</code> - Small text</li>
                <li>• <code>md</code> - Medium text (default)</li>
                <li>• <code>lg</code> - Large text</li>
                <li>• <code>xl</code> - Extra large text</li>
                <li>• <code>2xl</code>, <code>3xl</code>, <code>4xl</code>, <code>5xl</code> - Progressive scaling</li>
              </ul>
            </div>
          </div>

          {/* Display & Layout */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">Display & Layout</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">display</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>block</code>, <code>inline</code>, <code>inline-block</code></li>
                <li>• <code>flex</code>, <code>inline-flex</code></li>
                <li>• <code>grid</code>, <code>inline-grid</code></li>
                <li>• <code>hidden</code>, <code>none</code></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">direction</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>row</code> - Horizontal flex (default)</li>
                <li>• <code>column</code> - Vertical flex</li>
                <li>• <code>row-reverse</code>, <code>column-reverse</code></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">align / justify</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>start</code>, <code>center</code>, <code>end</code></li>
                <li>• <code>between</code>, <code>around</code>, <code>evenly</code></li>
                <li>• <code>stretch</code>, <code>baseline</code></li>
              </ul>
            </div>
          </div>

          {/* Spacing */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">Spacing</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">spacing (gap)</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>xs</code> - 0.25rem (4px)</li>
                <li>• <code>sm</code> - 0.5rem (8px)</li>
                <li>• <code>md</code> - 1rem (16px)</li>
                <li>• <code>lg</code> - 1.5rem (24px)</li>
                <li>• <code>xl</code> - 2rem (32px)</li>
                <li>• <code>2xl</code> - 3rem (48px)</li>
                <li>• Numeric: <code>1</code>, <code>2</code>, <code>4</code>, <code>8</code>, etc.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">spacingX / spacingY</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Same values as spacing</li>
                <li>• Controls horizontal or vertical gap only</li>
              </ul>
            </div>
          </div>

          {/* Boxing */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">Boxing (Padding)</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">boxing</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>, <code>2xl</code></li>
                <li>• Numeric values: <code>1</code>, <code>2</code>, <code>4</code>, <code>6</code>, <code>8</code>, etc.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Directional Boxing</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>boxingX</code> / <code>boxingY</code> - Horizontal/vertical</li>
                <li>• <code>boxingT</code> / <code>boxingR</code> / <code>boxingB</code> / <code>boxingL</code> - Individual sides</li>
              </ul>
            </div>
          </div>

          {/* Surface Styles */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">Surface Styles</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">surface - Classic</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>solid</code> - Filled background</li>
                <li>• <code>outline</code> - Border only</li>
                <li>• <code>subtle</code> - Light background</li>
                <li>• <code>ghost</code> - Transparent, hover effects</li>
                <li>• <code>link</code> - Text-like appearance</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">surface - Custom</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>card</code> - Card-like surface</li>
                <li>• <code>sidebar</code> - Sidebar styling</li>
                <li>• <code>modal</code> - Modal overlay style</li>
                <li>• <code>popover</code> - Floating content style</li>
                <li>• <code>toolbar</code> - Toolbar appearance</li>
              </ul>
            </div>
          </div>

          {/* Boolean Aliases */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-primary">Boolean Aliases</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Layout Helpers</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>flex</code> - flex-1 (grow)</li>
                <li>• <code>wrap</code> - flex-wrap</li>
                <li>• <code>center</code> - center content</li>
                <li>• <code>fullWidth</code> - w-full</li>
                <li>• <code>fullHeight</code> - h-full</li>
                <li>• <code>square</code> - aspect-square</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">State Helpers</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• <code>loading</code> - Loading state</li>
                <li>• <code>disabled</code> - Disabled appearance</li>
                <li>• <code>hidden</code> - sr-only or hidden</li>
                <li>• <code>interactive</code> - Cursor pointer + hover</li>
                <li>• <code>truncate</code> - Text truncation</li>
              </ul>
            </div>
          </div>

        </div>
      </section>


    </div>
  )
}


