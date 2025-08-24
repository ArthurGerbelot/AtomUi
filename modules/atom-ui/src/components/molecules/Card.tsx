
import { cva, VariantProps } from "class-variance-authority"

// Use relative import to avoid circular dependency
import { cn } from "../../lib/tailwind-utils"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "../../lib/core"
import { mergeShallow } from "../../lib/utils"
import { Atom, AtomPolymorphicProps, type AtomProps } from "../core/Atom"
import { SmartSlotVariantSpecs, pickVariantSmartSlotSpecs } from "../core/SmartSlot"
import { Header, SmartHeader, type HeaderProps } from "./Header"
import React from "react"
import { Separator } from "../atoms/Separator"
import { mergeShallowNode } from "@uikit/lib"



// =============================================================================
// CARD COMPOSED
// =============================================================================
// Helper to create a compound component without redefining everything
//

type CardComposedProps = Omit<CardBoxProps, "title"> & CardHeaderProps & {
  avoidContent?: boolean
}


function CardComposed(props: CardComposedProps) {

  // Destructure props to distribute them to the right atomic components
  const {
    variant,
    title, titleProps, Title,
    subtitle, subtitleProps, Subtitle,
    description, descriptionProps, Description,
    icon, iconProps, Icon,
    Action, BackLink,

    avoidContent,
    align,
    className,

    children,

    ...rest
  } = props;

  return (
    <CardBox {...{
      variant,
      className,
      ...rest
    }}>
      <CardHeader
        {...{
          variant,
          title, titleProps, Title,
          subtitle, subtitleProps, Subtitle,
          description, descriptionProps, Description,
          icon, iconProps, Icon,
          Action, BackLink,
          align,
        }}
      />
      {!avoidContent
        ? (
          <CardContent>
            {children}
          </CardContent>
        )
        : children
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
}

type CardHeaderProps = Omit<HeaderProps, "variant"> & CardHeaderOwnProps

// -----------------------------------------------------------------------------
// VARIANT SPECS (SmartSlot)
// -----------------------------------------------------------------------------

const cardHeaderVariantProps: SmartSlotVariantSpecs<CardHeaderOwnProps["variant"], HeaderProps> = {
  "main": {
    titleProps: { typo: "main-title" },
    subtitleProps: { typo: "main-subtitle" },
    iconProps: { variant: "big", className: "mt-6" },
    align: "center",
  },
  "secondary": {
    titleProps: { typo: "section-title" },
    subtitleProps: { typo: "section-subtitle" },
    iconProps: { variant: "small", className: "mt-2" },
    align: "center",
  },
  "default": {
    titleProps: { typo: "card-title" },
    subtitleProps: { typo: "card-subtitle" },
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


function CardHeader({ variant = "default", ...props }: CardHeaderProps) {

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
    className: cn("p-4 py-2", v.className, p.className),
  }


  return <Header {...merged} />

}



// =============================================================================
// CARD CONTENT
// =============================================================================


export const CardContent = React.forwardRef<HTMLDivElement, AtomPolymorphicProps<"div">>(
  function CardContent({ className, ...props }, ref) {
    return (
      <Atom
        ref={ref}
        data-slot="card-content"
        className={cn(
          "px-4 py-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&:last-child]:pb-4",
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



export const Card = Object.assign(CardComposed, {
  Box: CardBox,
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Separator: CardSeparator,
});

export type { CardBoxProps, CardHeaderProps, CardComposedProps as CardProps }