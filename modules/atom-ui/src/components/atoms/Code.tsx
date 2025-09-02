
// import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"
import { CSSProperties } from "react"

import { cn, resolveAtomTokens } from "../../lib"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { asSmartSlot } from "../core/SmartSlot"

// =============================================================================
// Code
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography]
// -----------------------------------------------------------------------------
// Code component for displaying code snippets
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type CodeOwnProps = {
  includeTag?: boolean
  includeSelfClosingTag?: boolean
  includeBrace?: boolean
  textScale?: number | string
}

export type CodeProps = AtomProps & CodeOwnProps;

export type CodePolymorphicProps<T extends React.ElementType = "pre"> =
  PolymorphicProps<T, CodeProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Code component for displaying code snippets
 *
 * @param props - CodeProps
 * @returns Code component
 */
export const Code = forwardRefPolymorphic<"pre", CodeProps>(
  function Code<T extends React.ElementType = "pre">(
    {
      variant,
      includeTag, includeSelfClosingTag,
      includeBrace,
      textScale = 0.875, // Slightly smaller than Badge (0.9) for code readability
      children,
      ...props
    }: CodePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const { as, asChild, className, style, ...rest } = resolveAtomTokens(props);

    // If inline, remove <pre> (cannot be inside  <p> tags)
    const isInline = as === "span" || as === "div" || props.display === "inline";
    const _as = as ?? (isInline ? "span" : "pre");

    // -----------------------------------------------------------------------
    // Simple Tokenisation
    // (ex: < > { } ( ) [ ] / = ; : . , + - * ? & | ! % ^ ~ ' " ` \)
    // -----------------------------------------------------------------------
    function renderTokenized(input: string) {
      const specials = new Set(
        Array.from("<>{}()[]/=;:.,+-*?&|!%^~'\"`\\")
      )
      const out: React.ReactNode[] = []
      let buffer = ""
      for (let i = 0; i < input.length; i++) {
        const ch = input[i]
        if (specials.has(ch)) {
          if (buffer) {
            out.push(buffer)
            buffer = ""
          }
          out.push(
            <span key={i} data-code-char={ch} data-code-type="punctuation" className={cn("text-zinc-400")}>{ch}</span>
          )
        } else {
          buffer += ch
        }
      }
      if (buffer) out.push(buffer)
      return <>{out}</>
    }

    // If asChild=true, Atom will expect a single child element and make it the real node.
    // In that mode, the consumer can provide the <code> (or any element) themselves.
    // If asChild=false (default), we render the chosen tag here.
    const childIsString = typeof children === "string"
    const hasSpecials = childIsString && /[<>\{\}\(\)\[\]\/=;:\.,\+\-*\?&\|!%\^~'"`\\]/.test(children as string)
    const content = hasSpecials
      ? renderTokenized(children as string)
      : (
        includeTag || includeSelfClosingTag ? (
          <>
            <span className="text-muted-foreground">{"<"}</span>
            {children}
            <span className="text-muted-foreground">{includeSelfClosingTag ? "/>" : ">"}</span>
          </>
        ) : (includeBrace ? (
          <>
            <span className="text-muted-foreground">{"{"}</span>
            {children}
            <span className="text-muted-foreground">{"}"}</span>
          </>
        ) : (
          <>{children}</>
        ))
      )


    return (
      <Atom
        ref={ref}
        as={_as as any} // Type assertion needed for polymorphic inference
        asChild={asChild}

        colorTheme="light"
        className={cn("font-mono bg-light inline-block px-1 py-0.5 rounded-sm", className)}
        style={{
          ...style,
          "--text-scale": textScale,
        } as CSSProperties}

        {...rest} // Spread remaining props (color theme, style, event handlers, etc.)
      >
        {asChild ? children : (
          <span className="inline-block leading-[inherit] text-[calc(1em*var(--text-scale,1))] min-w-0">
            {content}
          </span>
        )}
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartCode = asSmartSlot(Code);