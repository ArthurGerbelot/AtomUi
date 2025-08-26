
import { cva, VariantProps } from "class-variance-authority"

// Use relative import to avoid circular dependency
import { cn } from "../../lib/tailwind-utils"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "../../lib/core"
import { Atom, AtomPolymorphicProps, type AtomProps } from "../core/Atom"
import { SmartSlotVariantSpecs, asSmartSlot, createSmartSlotSpecs, pickVariantSmartSlotSpecs, smartSlotMustBeRendered } from "../core/SmartSlot"
import { Header, shouldShowHeader, SmartHeader, type HeaderProps } from "./Header"
import React from "react"
import { Separator } from "../atoms/Separator"
import { mergeShallowNode } from "@uikit/lib"


// =============================================================================
// CARD
// -----------------------------------------------------------------------------
// [Molecule] [Polymorphic] [SmartSlot] [Container]
// -----------------------------------------------------------------------------
// Card component
// =============================================================================


// =============================================================================
// CARD COMPOSED
// =============================================================================
// Helper to create a compound component without redefining everything
//

type CardComposedProps = Omit<CardBoxProps, "title"> & CardHeaderProps & {
  headerProps?: Partial<HeaderProps>
  avoidContent?: boolean
  contentProps?: CardContentProps
}


function CardComposed(props: CardComposedProps) {

  // Destructure props to distribute them to the right atomic components
  const {
    variant,

    headerProps,
    title, titleProps, Title,
    subtitle, subtitleProps, Subtitle,
    description, descriptionProps, Description,
    icon, iconProps, Icon,
    Action, BackLink,

    contentProps, // No need for a complete SmartSlot here, just Props


    avoidContent,
    align,
    className,

    children,

    ...rest
  } = props;

  const _shouldShowHeader = shouldShowHeader(props as HeaderProps);

  // Check if there's actual content to render
  const hasActualChildren = React.Children.count(children) > 0;

  return (
    <CardBox {...{
      variant,
      className,
      ...rest
    }}>
      {_shouldShowHeader && <CardHeader
        {...{
          ...headerProps,
          variant,
          title, titleProps, Title,
          subtitle, subtitleProps, Subtitle,
          description, descriptionProps, Description,
          icon, iconProps, Icon,
          Action, BackLink,
          align,

          // Pass info about content to adjust spacing
          hasContent: hasActualChildren,
        }}
      />}
      {!avoidContent && hasActualChildren
        ? (
          <CardContent hasHeader={!!_shouldShowHeader}  {...contentProps}>
            {children}
          </CardContent>
        )
        : avoidContent && hasActualChildren
          ? children
          : null
      }
    </CardBox>
  )
}



// =============================================================================
// CARD ROOT
// =============================================================================

// -----------------------------------------------------------------------------
// VARIANTS
// -----------------------------------------------------------------------------

const cardVariants = cva("", {
  variants: {
    variant: {
      "main": "",
      "secondary": "",
      "default": "",
      "alert": "",
    },
  },
  defaultVariants: {
  },
})

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

type CardBoxOwnProps = {
  // Own props
} & VariantProps<typeof cardVariants>


type CardBoxProps = CardBoxOwnProps & AtomProps

// Public API - combines props + Atom props + polymorphic
type CardBoxPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, CardBoxProps>

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------

const CardBox = forwardRefPolymorphic<"div", CardBoxProps>(
  function CardBox<T extends React.ElementType = "div">(
    {
      // Own props
      variant,
      // Polymorphic props
      as, asChild, children,
      // Remaining Atom props
      ...props
    }: CardBoxPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { className, ...rest } = resolveAtomTokens(props);

    return (
      <Atom
        ref={ref}
        as={(as ?? "div") as any}
        asChild={asChild}

        surface="card"

        className={cn(cardVariants({ variant }), className)}
        {...rest}
      >
        {children}
      </Atom>
    )
  }
)



// =============================================================================
// CARD HEADER
// =============================================================================

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

type CardHeaderOwnProps = {
  // Variant propre à CardHeader, pour injecter des specs dans Header
  variant?: CardBoxProps["variant"]
  // Pour ajuster le spacing selon s'il y a du contenu ou non
  hasContent?: boolean
}

type CardHeaderProps = Omit<HeaderProps, "variant"> & CardHeaderOwnProps

// -----------------------------------------------------------------------------
// VARIANT SPECS (SmartSlot)
// -----------------------------------------------------------------------------

const cardHeaderVariantProps: SmartSlotVariantSpecs<CardHeaderOwnProps["variant"], HeaderProps> = {
  "main": {
    titleProps: { typo: "main-title" },
    subtitleProps: { typo: "main-subtitle" },
    iconProps: { variant: "hero", className: "mt-6" },
    align: "center",
  },
  "secondary": {
    titleProps: { typo: "section-title" },
    subtitleProps: { typo: "section-subtitle" },
    iconProps: { variant: "chip", className: "mt-2" },
    align: "center",
  },
  "default": {
    titleProps: { typo: "card-title" },
    subtitleProps: { typo: "card-subtitle" },
    align: "left",
  },
  "alert": {
    titleProps: { typo: "body", weight: "semibold" },
    subtitleProps: { typo: "body", size: "sm" },
    align: "left",
  },
}

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------


// We do not wrap Header in a SmartSlot here.
// SmartSlot merges at the parent props level and replaces nested objects (e.g., iconProps),
// which would drop variant defaults. To preserve defaults and allow safe user overrides,
// we merge per-slot (titleProps, subtitleProps, descriptionProps, iconProps) and compose className.
// SmartSlot is best for internal slots of a molecule, not for wrapping the whole molecule.


function CardHeader({ variant = "default", hasContent = true, ...props }: CardHeaderProps) {

  const variantProps = pickVariantSmartSlotSpecs(cardHeaderVariantProps, variant);

  // const merged = mergeShallow<HeaderProps>({ className: "p-4 py-2" }, injected, props as Partial<HeaderProps>);

  const v = variantProps
  const p = props

  // Add negative margin to icons FOR VARIANTS (can be overriden)
  if (!variant || variant == "default") {
    if (v.align == "left") {
      v.iconProps = { ...v.iconProps, className: `${v.iconProps?.className || ""} -mt-2 -ml-2` };
    }
    if (v.align == "right") {
      v.iconProps = { ...v.iconProps, className: `${v.iconProps?.className || ""} -mt-2 -mr-2` };
    }
  }

  // Adjust padding based on whether there's content below
  const headerPadding = hasContent ? "px-4 pt-4 pb-2" : "p-4";

  const merged: HeaderProps = {
    ...v,
    ...p,

    // Ugly but mandatory.. Do not use mergeShallow here.
    //    (or it will override ___Props and not merge them - it's what shallowMerge is designed for)
    titleProps: mergeShallowNode(v.titleProps, p.titleProps),
    subtitleProps: mergeShallowNode(v.subtitleProps, p.subtitleProps),
    descriptionProps: mergeShallowNode((v as any).descriptionProps, p.descriptionProps),
    iconProps: mergeShallowNode(v.iconProps, p.iconProps),

    align: p.align ?? v.align,
    className: cn(headerPadding, v.className, p.className),
  }


  return <Header {...merged} />

}



// =============================================================================
// CARD CONTENT
// =============================================================================


type CardContentProps = AtomPolymorphicProps<"div"> & {
  hasHeader?: boolean
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, hasHeader = true, ...props }, ref) {
    // Adjust padding based on whether there's a header above
    const contentPadding = hasHeader ? "px-4 pb-4" : "p-4";

    return (
      <Atom
        ref={ref}
        data-slot="card-content"
        className={cn(
          contentPadding,
          "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          className
        )}
        {...props}
      />
    )
  }
)

// =============================================================================
// CARD FOOTER
// =============================================================================


export const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn("p-4 pt-2", className)}
        {...props}
      />
    )
  }
)

// =============================================================================
// CARD SEPARATOR
// =============================================================================


export function CardSeparator({ className, ...props }: React.ComponentProps<"div">) {

  // Use same color as surface-card border (but remove the /75)
  return <Separator className={cn("bg-muted my-2 [&:last-child]:mb-4", className)} {...props} />
}






// =============================================================================
// EXPORT
// =============================================================================

export const SmartCard = asSmartSlot(CardComposed)

export const Card = Object.assign(CardComposed, {
  Smart: SmartCard,
  Box: CardBox,
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Separator: CardSeparator,
});

export type { CardBoxProps, CardHeaderProps, CardComposedProps as CardProps }