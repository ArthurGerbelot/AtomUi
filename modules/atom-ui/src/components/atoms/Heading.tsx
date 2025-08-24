import { convertToValidHtmlId, resolveAtomTokens } from "@uikit/lib"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { asSmartSlot } from "../core"
import { Atom, type AtomProps } from "../core/Atom"


// =============================================================================
// Heading
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography]
// -----------------------------------------------------------------------------
// Heading is a simple Atom without new props.
//  It only goal is to compute the correct as tag based on the typo token
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export type HeadingProps = AtomProps

export type HeadingPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, HeadingProps>


// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

export const Heading = forwardRefPolymorphic<"div", HeadingProps>(
  function Heading<T extends React.ElementType = "div">(
    {
      children,
      ...props
    }: HeadingPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const { as, asChild, className, ...rest } = resolveAtomTokens(props);

    let asTag: React.ElementType | undefined
    if (!as && props.typo) {
      if (props.typo === "main-title") {
        asTag = "h1"
      } else if (props.typo === "section-title") {
        asTag = "h2"
      } else if (props.typo === "subsection-title") {
        asTag = "h3"
      } else if (props.typo === "card-title") {
        asTag = "h4"
      }
    }

    const id = rest.id || convertToValidHtmlId(children);


    return (
      <Atom

        id={id}
        ref={ref}
        as={(as ?? asTag ?? "div") as any}
        asChild={asChild}
        className={className}
        {...rest}
      >
        {children}
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartHeading = asSmartSlot(Heading);