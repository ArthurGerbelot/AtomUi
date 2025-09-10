import { asSmartSlot, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core";
import { Stack, StackProps } from "./Stack"
import { cn } from "../../lib"

// =============================================================================
// Center Helper
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// Simple Stack with preset center alignment (both horizontal and vertical)
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

export type CenterProps = StackProps;

export type CenterPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, CenterProps>


// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

export const Center = forwardRefPolymorphic<"div", CenterProps>(
  function Center<T extends React.ElementType = "div">(
    props: CenterPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    return <Stack
      ref={ref}
      direction="vertical"  // flex-col (default but explicit)
      align="center"        // items-center (horizontal centering for flex-col)
      center={true}         // justify-center (vertical centering for flex-col)
      {...props}
    />
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartCenter = asSmartSlot(Center);
