// Text.tsx
import { cva, VariantProps } from "class-variance-authority"


import { cn } from "../../../lib"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../../lib/core/polymorphic-helpers"
import { Atom, type AtomOwnProps } from "./Atom - v1"


const textVariants = cva("leading-normal m-0 p-0", {
  variants: {
    variant: {
      // Structural (could be removed and use "display" Atom token: inline, block, etc.)
      inline: "inline",
      inlineBlock: "inline-block",
      block: "block",

      // Typography (style should be moved to "typo" Atom token)
      // Text.Variant is only used to define HTML tag (p, blockquote, span, ..) and call the right "typo" Atom props
      number: "text-[32px] text-",
      p: "leading-relaxed [&:not(:first-child)]:mt-6 block",
      blockquote: "border-l-2 border-gray pl-4 my-2 py-2 italic block",
    },
  },
  defaultVariants: { variant: "inline" },
})


type TextOwnProps = VariantProps<typeof textVariants>

// ✅ Source de vérité unique pour les props publiques de Text
export type TextProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, AtomOwnProps & TextOwnProps>

// ✅ Instancie le helper avec AtomOwnProps & TextOwnProps
export const Text = forwardRefPolymorphic<"span", AtomOwnProps & TextOwnProps>(function Text<
  T extends React.ElementType = "span"
>(
  { className, variant = "inline", as, asChild, ...props }: TextProps<T>,
  ref: PolymorphicRef<T>
) {
  const element =
    as ??
    (variant === "p" ? "p"
      : variant === "blockquote" ? "blockquote"
        : (variant === "inline" || variant === "inlineBlock") ? "span"
          : "div")

  return (
    <Atom
      ref={ref}
      as={element as any} // As any mandatory.. TS cannot infer a Type here.
      asChild={asChild}
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  )
})
