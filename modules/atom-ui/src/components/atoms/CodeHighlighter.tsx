'use client'

// import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"
import { CSSProperties, Suspense } from "react"
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

import { cn, resolveAtomTokens } from "../../lib"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { asSmartSlot } from "../core/SmartSlot"
import { CopyButton } from "./CopyButton"

// Dynamic import pour optimiser le bundle
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then(mod => mod.Prism),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 h-20 rounded" />
  }
)

// Import dynamique des thèmes
const getThemes = async () => {
  const {
    oneLight,
    // oneDark,
    darcula
  } = await import('react-syntax-highlighter/dist/esm/styles/prism')
  return { oneLight, darcula }
}

// =============================================================================
// CodeHighlighter
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography]
// -----------------------------------------------------------------------------
// Code component with syntax highlighting using react-syntax-highlighter
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type CodeHighlighterOwnProps = {
  /** Programming language for syntax highlighting */
  language?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Text scale for code size */
  textScale?: number | string
  /** Use inline style (span) instead of block (pre) */
  inline?: boolean
}

export type CodeHighlighterProps = AtomProps & CodeHighlighterOwnProps;

export type CodeHighlighterPolymorphicProps<T extends React.ElementType = "pre"> =
  PolymorphicProps<T, CodeHighlighterProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Code component with syntax highlighting
 */
export const CodeHighlighter = forwardRefPolymorphic<"pre", CodeHighlighterProps>(
  function CodeHighlighter<T extends React.ElementType = "pre">(
    {
      language = 'typescript',
      showLineNumbers = false,
      textScale = 0.875,
      inline = false,
      children,
      ...props
    }: CodeHighlighterPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { theme } = useTheme()
    const { as, asChild, className, style, ...rest } = resolveAtomTokens(props);

    // State pour les thèmes chargés dynamiquement
    const [themes, setThemes] = React.useState<any>(null)

    React.useEffect(() => {
      getThemes().then(setThemes)
    }, [])

    // Choose theme based on current theme
    const syntaxTheme = themes ? (theme === 'dark' ? themes.darcula : themes.oneLight) : undefined

    // Loading fallback
    if (!themes || !syntaxTheme) {
      return (
        <Atom
          ref={ref}
          as={(as ?? "pre") as any}
          asChild={asChild}
          className={cn("font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg relative", className)}
          style={style}
          {...rest}
        >
          <pre>{String(children).trim()}</pre>
          <CopyButton
            size="xs"
            copy={String(children).trim()}
            className="absolute top-2 right-2"
          />
        </Atom>
      )
    }

    // // If inline, use different component structure
    // if (inline || as === "span" || as === "code") {
    //   return (
    //     <Atom
    //       ref={ref}
    //       as={(as ?? "code") as any}
    //       asChild={asChild}
    //       className={cn("font-mono relative", className)}
    //       style={{
    //         ...style,
    //         "--text-scale": textScale,
    //       } as CSSProperties}
    //       {...rest}
    //     >
    //       <SyntaxHighlighter
    //         language={language}
    //         style={syntaxTheme}
    //         PreTag="span"
    //         CodeTag="span"
    //         customStyle={{
    //           background: 'transparent',
    //           padding: 0,
    //           margin: 0,
    //           fontSize: `calc(1em * var(--text-scale, 1))`,
    //           fontFamily: 'inherit'
    //         }}
    //       >
    //         {String(children).trim()}
    //       </SyntaxHighlighter>
    //       <CopyButton
    //         size="xs"
    //         copy={String(children).trim()}
    //         className="absolute top-1 right-1"
    //       />
    //     </Atom>
    //   )
    // }

    // Block version (default)
    return (
      <Atom
        ref={ref}
        as={(as ?? "div") as any}
        asChild={asChild}
        className={cn("font-mono rounded-lg overflow-hidden relative", className)}
        style={style}
        {...rest}
      >
        <SyntaxHighlighter
          language={language}
          style={syntaxTheme}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            fontSize: `calc(1em * ${textScale})`,
            padding: '1rem'
          }}
        >
          {String(children).trim()}
        </SyntaxHighlighter>
        <CopyButton
          size="xs"
          copy={String(children).trim()}
          className="absolute top-2.5 right-2.5"
        />
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartCodeHighlighter = asSmartSlot(CodeHighlighter);