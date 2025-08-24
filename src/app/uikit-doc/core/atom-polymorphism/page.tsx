// app/docs/atom/page.tsx (or pages/docs/atom.tsx for the pages router)
import * as React from "react"
import Link from "next/link"

// Import from your UI Kit alias
import { Atom, Text } from "@uikit"
import { CardExample } from "../../components/CardExample"


// Demo component used in examples
const ExampleComponent = ({ customProps, customChoice, children }:
  { customProps?: string, customChoice: "hello" | "world", children?: React.ReactNode }) => {
  return <div>{customProps}{customChoice}{children}</div>
}

export default function AtomDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      {/* =============================================================================
          HEADER AND INTRODUCTION
      ============================================================================= */}

      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
          Atom Polymorphism
        </h1>
        <p className="text-xl text-muted-foreground mt-3 font-medium">
          The UI Kit&apos;s foundation for flexible rendering and type-safe APIs
        </p>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          <strong>Atom&apos;s polymorphism</strong> is the cornerstone of this UI Kit. It allows managing all design tokens
          (typography, spacing, colors, sizing) in a single place without having to redefine them for each component.
          <br />
          <strong>Every component in the kit extends Atom and inherits this unified token system</strong>, allowing them to focus on adding new features rather than reimplementing core functionality.
        </p>
      </header>

      {/* =============================================================================
          WHY POLYMORPHISM?
      ============================================================================= */}

      <section className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Why polymorphism?</h2>
          <p className="text-muted-foreground mt-2">Key benefits of a unified, flexible rendering model</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-indigo-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold">Semantic flexibility</h3>
                <p className="text-muted-foreground text-sm">
                  Transform a visual component into the appropriate HTML element (e.g., a button-styled component can
                  become an actual <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code>).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sky-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold">Type safety</h3>
                <p className="text-muted-foreground text-sm">
                  When using <code>as=&quot;button&quot;</code>, TypeScript automatically provides button-specific props like
                  <code>type</code>, <code>disabled</code>, and proper event handlers.
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
                <h3 className="font-semibold">Composition patterns</h3>
                <p className="text-muted-foreground text-sm">
                  Use <code>asChild</code> with libraries like Radix UI or React Router without wrapper divs or style
                  conflicts.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-cyan-600 text-sm font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold">Consistent API</h3>
                <p className="text-muted-foreground text-sm">
                  All Atom-based components inherit the same polymorphic capabilities, creating a unified component
                  interface across your design system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================================
          CORE POLYMORPHIC PROPS
      ============================================================================= */}

      <section className="mt-12 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Core Polymorphic Props</h2>
          <p className="text-muted-foreground mt-2">Two essential ways to control rendering</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border-2 border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">🔀</span>
              <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-200">as prop</h3>
            </div>
            <p className="text-indigo-700 dark:text-indigo-300 text-sm mb-3">
              Changes the rendered element while preserving component styling and behavior.
            </p>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              &lt;Atom as="button"&gt;Click me&lt;/Atom&gt;
            </code>
          </div>

          <div className="rounded-lg border-2 border-violet-200 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-violet-600 dark:text-violet-400 font-bold text-lg">🧩</span>
              <h3 className="font-bold text-lg text-violet-800 dark:text-violet-200">asChild prop</h3>
            </div>
            <p className="text-violet-700 dark:text-violet-300 text-sm mb-3">
              Uses Radix&apos;s Slot pattern to merge props with the child element instead of creating a wrapper.
            </p>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              &lt;Atom asChild&gt;&lt;Link href="/"&gt;Home&lt;/Link&gt;&lt;/Atom&gt;
            </code>
          </div>
        </div>
      </section>

      {/* =============================================================================
          ADVANCED COMPOSITION
      ============================================================================= */}

      <section className="mt-12 space-y-6">
        <div className="rounded-lg border-2 border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-950/50 p-6">
          <h2 className="font-bold text-lg text-sky-800 dark:text-sky-200 mb-2">Advanced Composition</h2>
          <p className="text-sky-700 dark:text-sky-300 text-sm">
            See <Link className="text-primary hover:underline" href="/uikit-doc/core/slot-and-smartslot">Slot and SmartSlot</Link> section to see how to compose components.
          </p>
        </div>
      </section>

      {/* =============================================================================
          PRACTICAL EXAMPLES
      ============================================================================= */}

      <section className="mt-12 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Practical Examples</h2>
          <p className="text-muted-foreground mt-2">Hands-on examples of as/asChild and type propagation</p>
        </div>

        {/* Polymorphism as/asChild */}
        <h3 id="polymorphism-as-aschild" className="sr-only">Polymorphism as/asChild</h3>
        <CardExample title="Basic as/asChild" description="Simple polymorphism version from <div> to <span>">
          <div>
            <span>Span/</span>
            <Atom as="span" data-doc="Atom" data-doc-as="span" data-doc-compact>Hello</Atom>
            <span>/Span</span>
          </div>
          <div>
            <span>Span/</span>
            <Atom data-doc="Atom" asChild data-doc-aschild>
              <span>Hello</span>
            </Atom>
            <span>/Span</span>
          </div>
        </CardExample>

        {/* Polymorphism to html tags props injection */}
        <CardExample
          title="Polymorphism (with as/asChild) to html tags props injection"
          description={<>Polymorphic Atom should be able to be transformed to html and use the new props (like <code>href</code> for <code>a</code> tag), and IDE should know them.</>}
        >
          <Atom as="a" href="#" target="_blank" data-doc="Atom" data-doc-as="a" data-doc-compact>Atom as="a" href="#" target="_blank"</Atom>
          <br />
          <Atom as="button" type="submit" data-doc="Atom" data-doc-as="button" data-doc-compact>Atom as="button" type="submit"</Atom>
          <br />
          <Atom
            // href="#"
            // target="_blank"
            // type="submit"
            data-doc={"Atom"}
            data-doc-compact
          >Default Atom do not know about &quot;href&quot;, &quot;target&quot;, &quot;type&quot;, .. props (See IDE)</Atom>

          <br />
          <Atom asChild data-doc="Atom" data-doc-aschild data-doc-compact>
            <button type="submit">Atom asChild is irrelevant (prefered solution)</button>
          </Atom>
        </CardExample>

        {/* Polymorphism to Component props injection */}
        <CardExample
          title="Polymorphism (with as/asChild) to Component props injection"
          description={<>Polymorphic Atom should be able to use new props (like <code>customProps</code>), and IDE should know them.</>}
          note={<div>
            <strong>Note: </strong>
            Atom tokens (AtomProps) that are sent to the component are handled by the component itself.<br />
            In this example it's not handled at all, so .bg-gray-500 and colorTheme=green are not applied.
          </div>}
          beforeCode={`const ExampleComponent = ({ customProps, children }: { customProps?: string, children?: React.ReactNode }) => {\n  return <div>{customProps}{children}</div>\n}`}
        >
          <Atom as={ExampleComponent} className="bg-gray-500" colorTheme="green"
            customProps="Hello from custom component"
            customChoice="world" // <== Mandatory
            // foobar
            data-doc={"Atom"} data-doc-as="ExampleComponent">
            <div className="text-primary">children (.text-primary)</div>
          </Atom>
          <Atom colorTheme="green" className="bg-gray-500" data-doc={"Atom"}>
            <ExampleComponent customProps="Hello from custom component" customChoice="world" />
            <div className="text-primary">children (.text-primary)</div>
          </Atom>
        </CardExample>

        {/* Unknown props handling */}
        <CardExample
          title="Atom should know props that do not exists"
          description="Atom should know props that do not exists on the component it's polymorphic to"
          note={<div>
            <strong>Note: </strong> Atom refuse to receive an unknow props (<code>foobar</code>) props or an <code>href</code> prop on a div.<br />
            Once transformed to an <code>a</code> tag, it&apos;s ok, but still refuse an <code>action</code> prop.
            <br />
            <strong>See IDE for more details.</strong>
          </div>}
        >
          <div>
            <Atom
              // foobar
              // href="busmit"
              data-doc={"Atom"} data-doc-compact>Hello</Atom>

            <Atom as="a"
              href="#"
              // action={() => {console.log("Form Submit")}}
              data-doc="Atom" data-doc-as="a" data-doc-compact>Hello</Atom>
          </div>
        </CardExample>

        {/* Polymorphism with Extended Components */}
        <h3 id="polymorphism-with-extended-components" className="sr-only">Polymorphism with Extended Components</h3>
        <CardExample
          title="Text and Polymorphism"
          description={
            <>All Component of the kit (like <code>Text</code>, <code>Button</code>, <code>Card</code>, ..) can be used as polymorphic component, with <code>as/asChild</code> on <code>Atom</code>.</>
          }>
          <Atom as={Text} data-doc={"Atom"} data-doc-as="Text" colorTheme="green" variant="blockquote">
            <div className="text-primary" data-doc-compact>Hello</div>
          </Atom>
          <Atom asChild data-doc="Atom" data-doc-aschild>
            <Text data-doc="Text" colorTheme="green" variant="blockquote">
              <div className="text-primary" data-doc-compact>Hello</div>
            </Text>
          </Atom>
          <Atom asChild data-doc="Atom" data-doc-aschild colorTheme="green">
            <Text data-doc="Text" variant="blockquote">
              <div className="text-primary" data-doc-compact>Hello</div>
            </Text>
          </Atom>

          <Text as="a"
            // href
            type="submit"
            variant="blockquote"
            colorTheme="green"
            data-doc="Text" data-doc-as="a"
          >
            <div className="text-primary" data-doc-compact>Hello</div>
          </Text>
        </CardExample>

        {/* Event type propagation */}
        <CardExample
          title="Also propate the right event type on on* props"
          description={
            <>
              <code>Atom</code> should propagate the right event type on <code>on*</code> props.<br />
              Events are commented because of an issue on the JSX parser. See IDE for more details.
            </>
          }
          code={""}
        >
          <Atom as="button" data-doc="Atom" data-doc-as="button"
          // onClick={(e) => { console.log("Hello") }}
          >
            {"onClick (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)"}
          </Atom>
          <Atom as="a" href="#" data-doc="Atom" data-doc-as="a"
          // onClick={(e) => { console.log("Hello") }}
          >
            {"onClick (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)"}
          </Atom>
        </CardExample>

      </section>

    </div>
  )
}


