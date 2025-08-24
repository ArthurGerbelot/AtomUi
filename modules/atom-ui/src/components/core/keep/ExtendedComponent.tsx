import { cva, VariantProps } from "class-variance-authority"

// Use relative import to avoid circular dependency
import { cn } from "../../../lib/tailwind-utils"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "../../../lib/core"
import { Atom, AtomProps } from "../Atom"
import { asSmartSlot } from "../SmartSlot"


// =============================================================================
// ExtendedComponent
// -----------------------------------------------------------------------------
// Example component extending Atom
// =============================================================================


// -----------------------------------------------------------------------------
// VARIANTS & STYLING
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
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

// Your component's own props only
type ExtendedComponentOwnProps = {
  customProp?: string
} & VariantProps<typeof extendedComponentVariants>

// Public API - combines your props + Atom props
export type ExtendedComponentProps = AtomProps & ExtendedComponentOwnProps

// Make it polymorphic (export to be able to extend it)
export type ExtendedComponentPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, ExtendedComponentProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

export const ExtendedComponent = forwardRefPolymorphic<"div", ExtendedComponentProps>(
  function ExtendedComponent<T extends React.ElementType = "div">(
    {
      // Own props
      variant = "default", size = "md", customProp,
      // Polymorphic props
      as, asChild, children,
      // Remaining Atom props
      ...props
    }: ExtendedComponentPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { className, ...rest } = resolveAtomTokens(props);

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

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartExtendedComponent = asSmartSlot(ExtendedComponent);
