import { asSmartSlot, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core";
import { Text, TextProps } from "./Text"

// =============================================================================
// Label
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Simple Text with preset typo="label" and display="block"
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export type LabelProps = TextProps;

export type LabelPolymorphicProps<T extends React.ElementType = "label"> =
  PolymorphicProps<T, LabelProps>


// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

export const Label = forwardRefPolymorphic<"label", LabelProps>(
  function Label<T extends React.ElementType = "label">(
    props: LabelPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return <Text
      ref={ref}
      typo="label"
      display="block"
      as="label"
      {...props}
    />
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartLabel = asSmartSlot(Label);