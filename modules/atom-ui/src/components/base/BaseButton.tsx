// =============================================================================
// NEW COMPONENT - Template for extending Atom
// =============================================================================

import { cva, VariantProps } from "class-variance-authority"

// Use relative import to avoid circular dependency
import { cn } from "../../lib/tailwind-utils"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "../../lib/core"
import { Atom, type AtomProps } from "../core/Atom"
import { asSmartSlot } from "../core/SmartSlot"
import { sizeWithHeightVariants, surfaceVariants, typoVariants } from "../../tokens"

// -----------------------------------------------------------------------------
// VARIANTS
// -----------------------------------------------------------------------------

export type ButtonVariant = "solid" | "outline" | "subtle" | "subtle-accent" | "subtle-outline" | "ghost" | "ghost-accent" | "link" | "secondary"
export const buttonVariants: ButtonVariant[] = ["solid", "outline", "subtle", "subtle-accent", "subtle-outline", "ghost", "ghost-accent", "link", "secondary"]


// We do not use @later components anymore. See why in context-css-theme.ia.md
// So compose by getting the surface variants and adding the hover: ...
const variants: Record<ButtonVariant, string> = {
  solid: surfaceVariants["solid"] + " hover:bg-primary/70",
  secondary: surfaceVariants["secondary"] + " hover:bg-primary/20 dark:hover:bg-primary/20",
  outline: surfaceVariants["outline"] + " hover:bg-primary hover:text-primary-foreground",
  subtle: surfaceVariants["subtle"] + " hover:bg-primary hover:text-primary-foreground",
  "subtle-accent": surfaceVariants["subtle-accent"] + " hover:bg-primary hover:text-primary-foreground",
  "subtle-outline": surfaceVariants["subtle-outline"] + " hover:bg-primary hover:text-primary-foreground",
  ghost: "hover:bg-primary/10 hover:text-primary-higher-contrast dark:hover:bg-primary/20",
  "ghost-accent": "text-primary-higher-contrast hover:bg-primary/10 hover:text-primary-higher-contrast dark:hover:bg-primary-higher-contrast/20",
  link: typoVariants["link"], // "typo-link"//"text-primary-higher-contrast underline-offset-4 hover:underline",
}

export const baseButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer " +
  "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg:not([data-icon-size])]:size-4 shrink-0 [&_svg]:shrink-0 " +
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 " +
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: variants,
      // Redefine size to also include padding / gap ..
      size: sizeWithHeightVariants,

      // Helper that change defalt props for secondary variant
      secondary: {
        true: "", // Text must be hanlde by logic to override default + colorTheme by style :/,
        false: ""
      }
    },
    // compoundVariants: [
    //   {
    //     variant: "outline",
    //     colorTheme: "brand",
    //     class: "dark:text-foreground",
    //   },
    // ],
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export type BaseButtonOwnProps = {
  // customProp?: string
  loading?: boolean
} & VariantProps<typeof baseButtonVariants>

export type BaseButtonProps = AtomProps & BaseButtonOwnProps & React.ComponentProps<"button">

// Public API - combines your props + Atom props + polymorphic
export type BaseButtonPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, BaseButtonProps> // No need to omit `size` ? it's the same.

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------

export const BaseButton = forwardRefPolymorphic<"button", BaseButtonProps>(
  function BaseButton<T extends React.ElementType = "button">(
    {
      // Own props
      secondary,
      variant, size, radius = "md", colorTheme,
      loading, disabled,

      // Polymorphic props
      as, asChild, children,
      // Remaining Atom props
      ...props
    }: BaseButtonPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { className, ...rest } = resolveAtomTokens(props);

    const isDisabled = disabled || loading
    const tag = as ?? "button"
    const isNativeButton = tag === "button" && !asChild



    if (secondary && !colorTheme)
      colorTheme = "high-contrast";
    if (secondary && !variant)
      variant = "secondary";



    return (
      <Atom
        // Polymorphic
        ref={ref}
        as={tag as any}
        asChild={asChild}

        // a11y
        data-slot="button"
        aria-busy={loading || undefined}

        // Theming and overriding style
        colorTheme={colorTheme}
        radius={radius} // Send back to Atom (here to be able to default it to "full")
        size={size}
        className={cn(baseButtonVariants({ variant, size }), className)}

        {...(isNativeButton ? { disabled: isDisabled, type: "button" } : {})}

        {...rest}
      >
        {children}
      </Atom>
    )
  }
)

// Also provide a SmartSlot version
export const SmartBaseButton = asSmartSlot(BaseButton);
