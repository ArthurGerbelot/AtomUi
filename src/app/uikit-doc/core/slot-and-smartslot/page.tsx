import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

// Import from your UI Kit alias
import { Atom, cn, Code, Header, IconArrowRight, resolveAtomTokens, SmartText, Text, TextProps } from "@uikit"
import { SmartSlot, pickSmartSlotSpecs } from "@uikit/components/core/SmartSlot"
import { CardExample } from "../../components/CardExample"
import { MoleculeComponent } from "@uikit/components/core/keep/MoleculeComponent"



export default function SlotAndSmartSlotDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* =============================================================================
          HEADER AND INTRODUCTION
      ============================================================================= */}

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Slot & SmartSlot
        </h1>
        <p className="text-xl text-muted-foreground mt-3 font-medium">
          Advanced composition patterns for flexible and reusable components
        </p>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Learn how to build complex components that compose multiple sub-components
          with flexible rendering patterns. <strong>Slot</strong> allows injecting components
          as placeholders, while <strong>SmartSlot</strong> enables updating child components
          managed by the parent with intelligent prop merging.
        </p>
      </header>

      {/* =============================================================================
          WHY USE THESE PATTERNS?
      ============================================================================= */}

      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Why use these patterns?</h2>
          <p className="text-muted-foreground mt-2">Key benefits of intelligent composition</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Flexible rendering</h3>
                <p className="text-muted-foreground text-sm">
                  Allow consumers to inject custom components or modify internal structure
                  without breaking the parent component's logic and styling.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Automatic propagation</h3>
                <p className="text-muted-foreground text-sm">
                  Automatically share parent state/variants with child components
                  (e.g., button size affects icon size).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold">Component overrides</h3>
                <p className="text-muted-foreground text-sm">
                  Replace default sub-components while preserving the composition pattern
                  and prop merging logic.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-600 text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold">Clean APIs</h3>
                <p className="text-muted-foreground text-sm">
                  Maintain simple component interfaces while supporting advanced
                  customization scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================================
          SLOT VS SMARTSLOT COMPARISON
      ============================================================================= */}

      <section className="mt-12 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Slot vs SmartSlot</h2>
          <p className="text-muted-foreground mt-2">Understanding differences and use cases</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200">Slot (Radix UI)</h3>
            </div>
            <p className="text-blue-700 dark:text-blue-300 mb-4 leading-relaxed">
              <strong>Slot</strong> is a Radix UI utility that merges props with child elements
              instead of creating wrapper elements. Perfect for "injecting" functionality into
              existing DOM structures without adding extra nesting.
            </p>

            <div className="space-y-3">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded">
                <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">💡 <strong>Atom is built over Slot</strong></p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">You can use it at every level</p>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded">
                <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">✅ <strong>Always use <code>asChild</code></strong></p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">Avoid <code>as</code> except to change the DOM element</p>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded">
                <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">🎯 <strong>Best example</strong></p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">Inject a Next Link into a Button component</p>
                <code className="text-xs text-blue-600 dark:text-blue-400 block mt-1">
                  {`<Button asChild>
  <Link href="/">Home</Link>
</Button>`}
                </code>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200">SmartSlot (Internal)</h3>
            </div>
            <p className="text-purple-700 dark:text-purple-300 mb-4 leading-relaxed">
              <strong>SmartSlot</strong> is an internal pattern that allows a component to compose
              multiple child components and lets the consumer override every part of the child component.
            </p>

            <div className="space-y-3">
              <div>
                <p className="text-purple-800 dark:text-purple-200 text-sm font-medium">🔧 <strong>Based on 3 fields</strong></p>
                <p className="text-purple-700 dark:text-purple-300 text-sm">Example for a title component:</p>
              </div>


              <div className="space-y-2">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded">
                  <p className="text-purple-800 dark:text-purple-200 text-xs font-medium">• <code>title</code></p>
                  <p className="text-purple-700 dark:text-purple-300 text-xs">Default content of the component</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded">
                  <p className="text-purple-800 dark:text-purple-200 text-xs font-medium">• <code>titleProps</code></p>
                  <p className="text-purple-700 dark:text-purple-300 text-xs">Additional props for the title component</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded">
                  <p className="text-purple-800 dark:text-purple-200 text-xs font-medium">• <code>Title</code></p>
                  <p className="text-purple-700 dark:text-purple-300 text-xs">Completely replace the component</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-amber-800 dark:text-amber-200 rounded-lg border-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 p-6 max-w-lg mx-auto">
          <strong>Hint ! </strong>Most of the Component offered by Atom-UI are also provided as a SmartSlot.

          <ul className="list-disc pl-6 space-y-1">
            <li>
              <Code includeTag>Atom</Code> <IconArrowRight /> <Code includeTag>SmartAtom</Code>
            </li>
            <li>
              <Code includeTag>Text</Code> <IconArrowRight /> <Code includeTag>SmartText</Code>
            </li>
            <li>...</li>
          </ul>

        </div>
      </section >


      {/* =============================================================================
          BEST PRACTICES
      ============================================================================= */}

      < section className="mt-12 space-y-6" >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Best Practices</h2>
          <p className="text-muted-foreground mt-2">When and how to use each pattern</p>
        </div>

        <div className="rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <h3 className="font-bold text-xl text-blue-800 dark:text-blue-200">Selection Guide</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 text-lg">✅ Use <strong>Slot</strong> for:</h4>
              <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                  <span>Simple prop merging and avoiding wrappers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                  <span>Polymorphic components (as, asChild)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                  <span>Library integrations (React Router, etc.)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 text-lg">🚀 Use <strong>SmartSlot</strong> for:</h4>
              <ul className="text-purple-700 dark:text-purple-300 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                  <span>Complex parent-child relationships</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                  <span>Components with multiple sub-components</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                  <span>Automatic prop injection based on variants</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section >


      {/* =============================================================================
          PRACTICAL EXAMPLES - SLOT
      ============================================================================= */}

      < section className="mt-12 space-y-6" >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Slot - Radix's composition primitive</h2>
          <p className="text-muted-foreground mt-2">Understanding how it works and use cases</p>
        </div>

        <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
          <strong>Slot</strong> is a Radix UI utility that merges props with child elements
          instead of creating wrapper elements. Perfect for "injecting" functionality into
          existing DOM structures without adding extra nesting.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white font-bold text-sm">⚙️</span>
              <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200">How Slot works</h3>
            </div>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>Takes props from parent component</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>Merges them with child element's props</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>Renders the child with combined props</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>No extra wrapper DOM elements</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white font-bold text-sm">🎯</span>
              <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200">When to use Slot</h3>
            </div>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>Polymorphic components (as, asChild)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>Wrapper components that add behavior</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>Avoiding unnecessary DOM nesting</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                <span>Library integrations (React Router, etc.)</span>
              </li>
            </ul>
          </div>
        </div>

        <CardExample
          title="Basic Slot usage"
          description="Slot merges parent props with child elements"
          code={`// Without Slot (creates wrapper)
<div className="button-wrapper" onClick={handleClick}>
  <a href="/home">Home</a>
</div>

// With Slot (merges props)
<Slot className="button-wrapper" onClick={handleClick}>
  <a href="/home">Home</a>
</Slot>
// Result: <a className="button-wrapper" onClick={handleClick} href="/home">Home</a>`}
        >
          <div className="space-y-4">
            <div>
              <Text variant="p">Without Slot (wrapper div):</Text>
              <div className="border border-dashed border-red-300 p-2 rounded">
                <div className="bg-blue-100 px-3 py-1 rounded cursor-pointer">
                  <a href="#" className="text-blue-600">Home Link</a>
                </div>
              </div>
            </div>

            <div>
              <Text variant="p">With Slot (merged props):</Text>
              <div className="border border-dashed border-green-300 p-2 rounded">
                <Slot className="bg-blue-100 px-3 py-1 rounded cursor-pointer">
                  <a href="#" className="text-blue-600">Home Link</a>
                </Slot>
              </div>
            </div>
          </div>
        </CardExample>

        <CardExample
          title="Slot with Atom (asChild)"
          description="How Atom uses Slot internally for polymorphic rendering"
        >
          <div className="space-y-2">
            <Atom className="border border-green-100 p-3 rounded" data-doc="Atom">
              Normal Atom (creates div wrapper)
            </Atom>

            <Atom asChild className="border border-green-100 p-3 rounded" data-doc="Atom" data-doc-aschild>
              <span>Atom with asChild (merges with span)</span>
            </Atom>
          </div>
        </CardExample>
      </section >

      {/* =============================================================================
          PRACTICAL EXAMPLES - SMARTSLOT
      ============================================================================= */}

      < section className="mt-12 space-y-6" >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">SmartSlot - Intelligent child component management</h2>
          <p className="text-muted-foreground mt-2">Understanding how it works and advanced use cases</p>
        </div>

        <p className="text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
          <strong>SmartSlot</strong> is an internal pattern that allows a component to compose multiple child components
          and lets the consumer override every part of the child component through three powerful fields.
          The component field can accept both component types and JSX elements (render functions, inline components, etc.).
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">🧠</span>
              <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200">How SmartSlot works</h3>
            </div>
            <ul className="text-purple-700 dark:text-purple-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Accepts 3 fields: content, props, and component</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Merges overriding props with child default component props</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Allows complete component replacement (type or JSX)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Supports variant-based prop injection</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">🎯</span>
              <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200">When to use SmartSlot</h3>
            </div>
            <ul className="text-purple-700 dark:text-purple-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Complex parent-child relationships</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Components with multiple sub-components</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Need for flexible content injection</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                <span>Variant-based prop management</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/50 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">🔧</span>
            <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200">The 3 SmartSlot Fields</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">1. Content Field</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
                <code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">text</code> - The default content
              </p>
              <p className="text-purple-600 dark:text-purple-400 text-xs">
                Quick setup: <code>{`{title: "My Title"}`}</code>
              </p>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">2. Props Field</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
                <code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">textProps</code> - Additional props
              </p>
              <p className="text-purple-600 dark:text-purple-400 text-xs">
                Override: <code>{`{titleProps: {color: "red"}}`}</code>
              </p>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">3. Component Field</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
                <code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">Text</code> - Replace component
              </p>
              <p className="text-purple-600 dark:text-purple-400 text-xs">
                <strong>Component Type:</strong> <code>{`{Text: MyCustomText}`}</code>
                <br />
                <strong>JSX Element:</strong> <code>{`{Text: (props) => <div>...</div>}`}</code>
              </p>
            </div>
          </div>
        </div>
      </section >

      {/* =============================================================================
          EXISTING EXAMPLES
      ============================================================================= */}

      < section className="mt-12 space-y-4" >
        <h2 className="text-xl font-medium">SmartSlot - Intelligent child component management</h2>


        <CardExample
          title="SmartSlot Implementation"
          description="Here is the implementation of the Text component as SmartSlot into a Example Molecule Component"
          note={
            <Atom typo="hint">
              <strong>Note: </strong>
              {`It's more verbose to put the 3 fields at the root of props instead of having a single \`textSpecs\` field. But it allows to quickly inject the \`content\` (95% of cases: {title: "Title"}) instead of having to do {textSpecs:{content:"Title"}}`}
              <br />
              <br />
              <strong>Use Case: </strong>
              Take a look at Header to see how it used with Heading SmartSlots. In this case we also handle the fact that Header's variant will inject different props to each Heading component.
            </Atom>
          }
          code={`// STEP 1: Create types for all 3 fields
type TextSpecsProps = SmartSlot<TextProps, "text">;

const MoleculeExample = (props: TextSpecsProps) => {

// STEP 2: Pick the specs from props {text, textProps, Text}
const specs = pickSmartSlotSpecs<TextProps>(props, "text");
  return (
  <div>
    Content Before
    {/* STEP 3: Render the default SmartSlot and send Specs to override rendering */}
    <SmartSlot<TextProps> as={Text} specs={specs} baseSpecs={{ props: {variant: "blockquote"} }} >
      Default text
    </SmartSlot>
    Content After
  </div>
  )
}

// Use Molecule without overriding props:
// ---------------------------------------------
<MoleculeExample />
`}
        >
          <MoleculeExample />
        </CardExample>

        <section>
          <div className="text-amber-800 dark:text-amber-200 rounded-lg border-2 border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50 p-6 max-w-lg mx-auto">
            <strong>Hint ! </strong>As Atom-UI provide a SmartText version of the Text component, we could use it to make the code look more readable:
            <br />
            <Code>{`<SmartSlot<TextProps> as={Text} specs={specs} ...>`}</Code>
            <br />
            Can be replaced by:
            <br />
            <Code>{`<SmartText specs={specs} ...>`}</Code>
            <br />
            <br />
            <strong>Make your own:</strong>
            <br />
            Even if it can be used on any Component using <Code>{`<SmartSlot<T> as={C} />`}</Code> (no need to do anything on the), you can convert it using the helper <Code>asSmartSlot</Code> for better readability, example for Text:
            <Code>export const SmartText = asSmartSlot(Text);</Code>

          </div>
        </section >

        <CardExample
          title="Simple override"
          description="Change content and override props"
          code={`<MoleculeExample
  text="Bitcoin is the best"
  textProps={{ textColor: "bitcoin" }}
/>`}
        >

          <MoleculeExample text="Bitcoin is the best" textProps={{ textColor: "bitcoin" }} />
        </CardExample>

        <CardExample
          title="Override the component type"
          description="Ask to use another component to render it. But keep original Molecule props on it. Note that all original props are still injected on new component types, even if ExampleRedText doesn't ask for it (it just add .text-red-500)."
          code={`<MoleculeExample
  Text={ExampleRedText}   // Simply add .text-red-500 and fallback on <Text/>
/>`}
        >

          <MoleculeExample Text={ExampleRedText} />
        </CardExample>
        <CardExample
          title="Override the component types and props"
          description=""
          code={`<MoleculeExample
  Text={ExampleRedText}      // Simply add .text-red-500 and fallback on <Text/>
  textProps={{ variant: "number" }}
/>`}
        >

          <MoleculeExample Text={ExampleRedText} textProps={{ variant: "number" }} />
        </CardExample>

        <CardExample
          title="Or ask for a complete new component instead"
          description="You'll still receive the original props, but you can render whatever you want with them."
          code={`<MoleculeExample
  text="New Content (instead of original Default text)"
  textProps={{ bgColor: "light" }}
  Text={(props) => <Atom typo="code"><pre>{JSON.stringify(props, null, 2)}</pre></Atom>}
/>`}
        >
          <MoleculeExample
            text="New Content (instead of original Default text)"
            textProps={{ bgColor: "light" }}
            Text={(props) => <Atom typo="code"><pre>{JSON.stringify(props, null, 2)}</pre></Atom>}
          />
        </CardExample>

        <CardExample
          title="Avoid rendering by sending `null` as content"
          description="You can avoid rendering by sending `null` as content."
          code={`<MoleculeExample
  text={null}
/>`}
        >
          <MoleculeExample
            text={null}
          />
        </CardExample>


        {/* Layers card */}
        <section className="space-y-6 mt-12 max-w-xl mx-auto">
          <Header variant="main" align="center" title="How it internally works ?" subtitle="Layers of updates" />
          <div className="flex justify-center">
            <div className="max-w-4xl rounded-xl border-2 border-purple-200 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-sky-50 dark:from-purple-950/40 dark:to-sky-950/40 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-purple-600 dark:text-purple-400 text-lg">🎛️</span>
                <h3 className="font-bold text-purple-900 dark:text-purple-100">Update pipeline (bottom overrides top)</h3>
              </div>

              <ul className="space-y-3 text-sm text-purple-800 dark:text-purple-200">
                <li className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded">
                  <strong>SmartSlot props (wrapper)</strong><br />
                  Props placed directly on the SmartSlot JSX inside the Molecule Component (e.g., <Code includeTag>SmartSlot className="..."</Code>) act as the first/base layer. Children provided to SmartSlot are considered the first "content" candidate.
                </li>
                <li className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded">
                  <strong>baseSpecs</strong><br />
                  Additional "base" specs provided by the Molecule (rarely needed, easier to directly set on the JSX - previous sets). But allow to handle it using specs format: <Code>{`{ props, content, Component }`}</Code>.
                </li>
                <li className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded">
                  <strong>variantSpecs</strong><br />
                  Specs injected from Molecule variants (specified, picked and typed with helpers). Ideal to tweak parts based on variant.
                </li>
                <li className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded">
                  <strong>specs (strongest)</strong><br />
                  Explicit final overrides. Sent by the consomater of the Molecule Component.
                </li>
              </ul>

              <div className="mt-4 text-purple-900 dark:text-purple-100">
                <strong>Note: </strong> Last-wins for <Code>content</Code> and <Code>Component</Code>; shallow-merge for <Code>props</Code>, with <Code>className</Code> composed using <Code>cn()</Code>
              </div>
            </div>
          </div>
        </section>


        <CardExample
          status="not-working"
          title="Advanced Example with Variants props"
          description={<div>
            On this version the Molecule is composed of 2 SmartSlots:
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <Code includeTag>Wrapper</Code> a <Code includeTag>SmartAtom</Code>
              </li>
              <li>
                <Code includeTag>Text</Code> a <Code includeTag>SmartText</Code>
              </li>
            </ul>
            <br />

            {/* Petite section: ce que chaque variant modifie (basé sur MoleculeComponent) */}
            <div className="rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/50 p-4">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">MoleculeComponent variants</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm text-purple-700 dark:text-purple-300">
                <li>
                  <code>update-props</code>: met à jour uniquement les props des SmartSlots
                  (ex: <code>wrapperProps.className = "border-success"</code>, <code>textProps.textColor = "success"</code>).
                </li>
                <li>
                  <code>update-content</code>: remplace seulement le contenu
                  (ex: <code>text = "New Content"</code> et <code>wrapperProps.className = "border-info"</code>).
                </li>
                <li>
                  <code>update-component</code>: remplace les composants sous-jacents
                  (ex: <code>Wrapper</code> devient un <code>pre</code> de debug, <code>Text</code> devient un composant étendu rouge).
                </li>
              </ul>
              <p className="mt-2 text-xs text-purple-700 dark:text-purple-300">
                Rappel de priorité: SmartSlot props (wrapper) &lt; baseSpecs &lt; variantSpecs &lt; specs (dernier gagne).
                Les <code>props</code> sont fusionnées (shallow), et <code>className</code> est composé via <code>cn()</code>.
              </p>
            </div>

            <br />
            Check the code of <Code includeTag>MoleculeComponent</Code> to understand how it's implemented and re-use it to create your own Molecule Component.
          </div>
          }
          code={`
            import { MoleculeComponent } from "@uikit/components/core/keep/MoleculeComponent"

// Use Advanced Molecule
// ---------------------------------------------

<MoleculeComponent />
<MoleculeComponent variant="update-props" />
<MoleculeComponent variant="update-content" />
<MoleculeComponent variant="update-component" />


<MoleculeComponent
  variant="update-component"
  wrapperProps={{ className: "bg-light" }}
  text="You still have the possibility to update everything"
  textProps={{ variant: "p" }}
  Text={ExampleRedText}
/>
`}
        >
          <MoleculeComponent />
          <MoleculeComponent variant="update-props" />
          <MoleculeComponent variant="update-content" />
          <MoleculeComponent variant="update-component" />

          <MoleculeComponent
            variant="update-component"
            wrapperProps={{ className: "bg-light" }}
            text="You still have the possibility to update everything"
            textProps={{ variant: "p" }}
            Text={ExampleRedText}
          />
        </CardExample >

        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-medium">TypeScript Limitations</h2>
          <div className="rounded-lg border border-yellow-200 bg-yellow-500/10 p-4">
            <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-400">⚠️ Known Limitation</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">
              TypeScript cannot infer a type relationship between two <em>independent</em> props (e.g. a SmartSlot <code>Component</code>
              and its <code>*Props</code>) unless the enclosing component exposes a <strong>shared generic parameter</strong> that links them.
              JSX inference flows from the component’s generics — two arbitrary props do not establish a relation by themselves.
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-2">
              Consequence: <code>codeProps</code> cannot be strictly inferred from <code>Code={'{Input}'}</code> unless the Molecule itself is
              generic (or you introduce per‑slot generics/overloads). Trying to “auto‑wire” this purely with types quickly becomes brittle
              and hurts DX.
            </p>
            <ul className="text-sm text-yellow-700 dark:text-yellow-400 list-disc pl-5 space-y-1">
              <li>Without a shared generic anchor, props don’t cross‑infer each other in JSX.</li>
              <li>Per‑slot generics/overloads are possible but add API and usage complexity.</li>
              <li>Pragmatic approach: accept an escape hatch (e.g. <code>{`as any`}</code>) for special polymorphic SmartSlot combos.</li>
              <li>Runtime stays correct: SmartSlot still renders the provided Component and merges props in the right order.</li>
            </ul>
          </div>
        </section>

      </section >


    </div >
  )
}

// =============================================================================
// COMPOSANTS D'EXEMPLE ET UTILITAIRES
// =============================================================================

/**
 * Composant de texte rouge pour démontrer la personnalisation
 * Utilise SmartSlot pour hériter des props du parent
 */
const ExampleRedText = (props: TextProps) => {
  const { className, ...rest } = resolveAtomTokens(props);
  return (
    <Text {...rest} className={cn("text-red-500", className)} />
  )
}

// =============================================================================
// EXEMPLES DE MOLÉCULES AVEC SMARTSLOT
// =============================================================================

/**
 * Type pour les props SmartSlot du composant Text
 * Permet d'accepter: text, textProps, Text
 */
type TextSpecsProps = SmartSlot<TextProps, "text">;

/**
 * Exemple simple d'une molécule utilisant SmartSlot
 * - Accepte: text, textProps, Text
 * - Rendu par défaut: Text avec variant "blockquote"
 * - Structure: Content Before + SmartSlot + Content After
 */
const MoleculeExample = (props: TextSpecsProps) => {
  const specs = pickSmartSlotSpecs<TextProps>(props, "text");

  return (
    <div>
      Content Before

      <SmartText specs={specs} baseSpecs={{ props: { variant: "blockquote" } }} >
        Default text
      </SmartText>

      Content After
    </div >
  )
}

