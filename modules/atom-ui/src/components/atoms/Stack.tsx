import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../../lib"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { resolveAtomTokens } from "../../lib/core/atom"
import { Atom, type AtomProps } from "../core/Atom"
import { asSmartSlot } from "../core/SmartSlot"

// =============================================================================
// STACK
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// Stack component (for VStack, HStack, etc.)
// =============================================================================

// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------

const stackVariants = cva("flex items-start gap-md", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    // Boolean Logic variant. (No need to expose it to Atom, for now we only use it here)
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },

    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    // stretch: {
    //   true: "items-stretch",
    //   false: "",
    // },
    noStretch: {  // default is "stretch" and add an helper for "no stretch":start (most used)
      true: "items-start",
      false: "",
    },
    // For HStack to fill the parent width (and so children flex really spread the full width)
    full: {
      true: "w-full",
      false: "",
    },
    center: {
      true: "justify-center",
      false: "",
    },
  },
  defaultVariants: {
    direction: "vertical",
    align: "stretch",
  },
});


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type StackOwnProps = VariantProps<typeof stackVariants>

export type StackProps = AtomProps & StackOwnProps;

export type StackPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, StackProps>

// =============================================================================
// STACK COMPONENT
// =============================================================================


export const Stack = forwardRefPolymorphic<"div", StackProps>(
  function Stack<T extends React.ElementType = "div">(
    {
      // On variant
      direction, wrap, align, noStretch, full, center,
      // Props with default
      gap = "md",
      ...props }: StackPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { as, asChild, className, ...rest } = resolveAtomTokens({ ...props, gap });

    // RENDER
    // --------------------------

    return (
      <Atom
        ref={ref}
        as={(as ?? "div") as any}
        asChild={asChild}
        className={cn(stackVariants({ direction, wrap, align, noStretch, center, full }), className)}
        {...rest} // Spread remaining props (color theme, style, event handlers, etc.)
      />
    )
  }
)

// Also provide a SmartSlot version
export const SmartStack = asSmartSlot(Stack);


// =============================================================================
// VSTACK COMPONENT
// =============================================================================

export const VStack = forwardRefPolymorphic<"div", StackProps>(
  function VStack<T extends React.ElementType = "div">(
    props: StackPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return <Stack ref={ref} direction="vertical" {...props} />
  }
)

// Also provide a SmartSlot version
export const SmartVStack = asSmartSlot(VStack);


// =============================================================================
// HSTACK COMPONENT
// =============================================================================

export const HStack = forwardRefPolymorphic<"div", StackProps>(
  function HStack<T extends React.ElementType = "div">(
    props: StackPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return <Stack ref={ref} direction="horizontal" {...props} />
  }
)

// Also provide a SmartSlot version
export const SmartHStack = asSmartSlot(HStack);