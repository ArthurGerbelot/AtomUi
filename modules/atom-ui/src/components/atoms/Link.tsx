import { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { asSmartSlot, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core";
import { Text, TextProps } from "./Text"

// =============================================================================
// NextJS Link Helper
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography]
// -----------------------------------------------------------------------------
// Simple Text with preset typo="link" as={Link}
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export type LinkProps = TextProps & NextLinkProps;

export type LinkPolymorphicProps<T extends React.ElementType = "a"> =
  PolymorphicProps<T, LinkProps>


// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

export const Link = forwardRefPolymorphic<"a", LinkProps>(
  function Link<T extends React.ElementType = "a">(
    props: LinkPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return <Text
      ref={ref}
      as={(props.as ?? NextLink) as any}
      typo="link"
      {...props}
    />
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartLink = asSmartSlot(Link);