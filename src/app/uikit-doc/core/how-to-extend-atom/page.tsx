// app/docs/atom/page.tsx (or pages/docs/atom.tsx for the pages router)
import * as React from "react"
import Link from "next/link"

// Import from your UI Kit alias
import { CardExample } from "../../components/CardExample"
import { ExtendedComponent } from "@uikit/components/core/keep/ExtendedComponent"
import { Atom, AtomProps, cn, resolveAtomTokens } from "@uikit"

export default function ExtendAtomDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 space-y-12">

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">How to extend Atom - Create new components</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to create new components by extending Atom to inherit all design tokens
          and polymorphic capabilities while adding your own specific functionality.
          <br />
          This approach ensures consistency across your design system and reduces code duplication.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-medium">The OwnProps Pattern</h2>
        <p className="text-muted-foreground">
          We use the <strong>modern "OwnProps + PolymorphicHelpers" approach</strong> which provides:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Strong type safety</strong>: Better TypeScript validation and IntelliSense</li>
          <li><strong>Excellent composability</strong>: Easy to extend with <code>AtomOwnProps & YourOwnProps</code></li>
          <li><strong>Modern standards</strong>: Follows patterns used by Radix UI, Ariakit, and other leading libraries</li>
          <li><strong>Clear separation</strong>: Distinguishes between your component's props and inherited Atom props</li>
        </ul>
      </section>


      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-medium">Key Principles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">OwnProps Only</h3>
            <p className="text-sm text-muted-foreground">
              Use <code>AtomOwnProps & YourOwnProps</code> to combine capabilities.
              This creates a clean inheritance chain without type conflicts.
              Don't include <code>as</code>, <code>asChild</code>,
              <code>className</code>, etc. - those come from Atom automatically.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">forwardRefPolymorphic</h3>
            <p className="text-sm text-muted-foreground">
              Always use this helper instead of regular <code>forwardRef</code>.
              It handles the complex TypeScript generics for polymorphic components.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Render through Atom</h3>
            <p className="text-sm text-muted-foreground">
              Always render <code>&lt;Atom&gt;</code> (or an extended component) as the final element.
              This ensures you inherit all <Link href="/uikit-doc/core/atom-tokens" className="text-primary hover:underline">Atoms Tokens</Link> and capabilities.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-medium">Internal Composition</h2>
        <p className="text-muted-foreground">
          For complex components that need internal composition (multiple child elements,
          conditional rendering, etc.), see the <Link href="/uikit-doc/core/slot-and-smart-slot" className="text-primary hover:underline">
            Slot and SmartSlot documentation</Link> for advanced patterns and techniques.
        </p>
      </section>

      <section className="space-y-4">

        <CardExample title="resolveAtomTokens()" subtitle="Atom tokens must be resolved into classes at every levels" description={(
          <>
            When a component extends Atom and provides CSS classes, token resolution must happen at each component level in the hierarchy.<br /><br />
            <strong>Understanding the concept:</strong>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Both example components extend Atom and:
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Propagate an atomic token: <code>bgColor="light"</code></li>
                  <li>Add their own classes: <code>{`className={cn('text-error', className)}`}</code></li>
                </ul>
              </li>
            </ul>
            <br />
            <strong>ComponentThatPropagateTokens</strong> simply propagate tokens and CSS classes through to the underlying Atom. Since CSS classes take precedence over atomic tokens, and tokens are only resolved at the Atom level, any className provided to the component will override atomic tokens, even tokens passed from an higher level (here the Next.js page).<br />
            <strong><code>(1) Component.token &lt; (2) Props.tokens (textColor="success") &lt; (1) Component.className (.text-error) &lt; (2) Props.className</code></strong><br />
            With this approach, you cannot override a component's hardcoded classes using atomic tokens in props. You must use className props instead.
            <br />
            <br />
            <strong>Solution: </strong><code>{`const { className, ...rest } = resolveAtomTokens(props);`}</code>
            <br />
            <br />
            <strong>ComponentThatResolveTokens</strong> resolves atomic tokens into CSS classes at each level of the component hierarchy. This changes the precedence order to:<br />
            <strong><code>(1) Component.token &lt; (1) Component.className (.text-error) &lt; (2) Props.tokens (textColor="success") &lt; (2) Props.className</code></strong><br />
            While CSS classes still take precedence over atomic tokens, props passed to the component take precedence over the component's internal styles, providing better composability.
          </>
        )}>
          <div className="space-y-4">
            <div>
              <strong>Component by default: </strong><br />
              .text-error bgColor="light"
              <ComponentThatPropagateTokens>ComponentThatPropagateTokens</ComponentThatPropagateTokens>
              <ComponentThatResolveTokens>ComponentThatResolveTokens</ComponentThatResolveTokens>
            </div>

            <div>
              <strong>Class always win: </strong><br />
              .text-success .bg-black
              <ComponentThatPropagateTokens className="text-success bg-black">ComponentThatPropagateTokens</ComponentThatPropagateTokens>
              <ComponentThatResolveTokens className="text-success bg-black">ComponentThatResolveTokens</ComponentThatResolveTokens>
            </div>

            <div>
              <strong>But props need to be resolved and not propagated: </strong><br />
              textColor="success" bgColor="black"
              <ComponentThatPropagateTokens textColor="success" bgColor="black">ComponentThatPropagateTokens</ComponentThatPropagateTokens>
              <ComponentThatResolveTokens textColor="success" bgColor="black">ComponentThatResolveTokens</ComponentThatResolveTokens>
            </div>

          </div>
        </CardExample>
      </section>



      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-medium">Component Template</h2>
        <p className="text-muted-foreground mb-4">
          Here's the essential template for creating any component that extends Atom:
        </p>

        <CardExample
          title="Basic Extension Template"
          description="Copy this template and customize the variants, types, and component name"
          code={`// =============================================================================
// NEW COMPONENT - Template for extending Atom
// =============================================================================

import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/tailwind-utils"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "../../../lib/core"
import { Atom, type AtomOwnProps } from "../Atom"
import { asSmartSlot } from "./SmartSlot"

// -----------------------------------------------------------------------------
// VARIANTS
// -----------------------------------------------------------------------------

const extendedComponentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-low-contrast text-low-contrast-foreground",
    },
    size: {
      sm: "text-sm",
      md: "text-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

// Your component's own props only
type ExtendedComponentOwnProps = {
  customProp?: string
} & VariantProps<typeof extendedComponentVariants>

// --------------------------------------

// Public API - combines your props + Atom props + polymorphic
export type ExtendedComponentProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, AtomOwnProps & ExtendedComponentOwnProps>

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------

export const ExtendedComponent = forwardRefPolymorphic<"div", AtomOwnProps & ExtendedComponentOwnProps>(
  function ExtendedComponent<T extends React.ElementType = "div">(
    {
      // Own props
      variant = "default", size = "md", customProp,
      // Polymorphic props
      as, asChild, children,
      // Remaining Atom props
      ...props
    }: ExtendedComponentProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { className, style, ...rest } = resolveAtomTokens(props);

    return (
      <Atom
        ref={ref}
        as={(as ?? "div") as any}
        asChild={asChild}
        className={cn(extendedComponentVariants({ variant, size }), className)}
        {...rest}
      >
        {children} {customProp}
      </Atom>
    )
  }
)

// Also provide a SmartSlot version
export const SmartExtendedComponent = asSmartSlot(ExtendedComponent);


// -----------------------------------------------------------------------------
// USAGE
// -----------------------------------------------------------------------------

<ExtendedComponent size="md" customProp="World">Hello</ExtendedComponent>
<ExtendedComponent colorTheme="success" size="md" customProp="with Atom Props">Hello</ExtendedComponent>
`}
        >
          <ExtendedComponent size="md" customProp="World">Hello</ExtendedComponent>
          <ExtendedComponent colorTheme="success" size="md" customProp="with Atom Props">Hello</ExtendedComponent>
        </CardExample>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-medium">TypeScript Limitations</h2>
        <div className="rounded-lg border border-yellow-200 bg-yellow-500/10 p-4">
          <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-400">⚠️ Known Behavior</h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-400 mb-2">
            When defining polymorphic components, TypeScript validation is less strict inside the component
            definition itself. For example, <code>&lt;Atom invalidProps /&gt;</code> might not trigger
            errors during component development.
          </p>
          <p className="text-sm text-yellow-800 dark:text-yellow-400 mb-2">
            <strong>This is normal behavior</strong> - TypeScript is more permissive in component definition
            contexts with generic types, but strict when components are consumed by developers.
          </p>
          <ul className="text-sm text-yellow-800 dark:text-yellow-400 list-disc pl-5 space-y-1">
            <li>Validation works where it matters: when developers use your components</li>
            <li>Errors in component definitions are rare since you test your components</li>
            <li>This doesn't affect end users or component consumers</li>
            <li>All major UI libraries (Radix, Chakra, etc.) have this same behavior</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

const ComponentThatPropagateTokens = ({ className, ...props }: AtomProps) => {
  return <Atom bgColor="light" className={cn('text-error', className)} {...props} />
}
const ComponentThatResolveTokens = (props: AtomProps) => {
  const { className, style, ...rest } = resolveAtomTokens(props)
  return <Atom bgColor="light" className={cn('text-error', className)} style={style} {...rest} />
}