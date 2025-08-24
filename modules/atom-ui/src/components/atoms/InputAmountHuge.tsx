import * as React from "react"
import { InputAmount, InputAmountProps } from "./InputAmount";
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core";
import { Text } from "./Text";
import { TextWithIcon } from "./TextWithIcon";
import { IconButton } from "./IconButton";
import { IconSwitch } from "./IconLibrary";

// =============================================================================
// InputAmountHuge
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Huge input for amount with currency and estimated amount (switch)
// =============================================================================



// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type InputAmountHugeOwnProps = {

  // Current currency
  currency: string,

  // Switch to
  estimatedAmount: string,
  onSwitchCurrency: () => void,
}

export type InputAmountHugeProps = InputAmountProps & InputAmountHugeOwnProps;


export type InputAmountHugePolymorphicProps<T extends React.ElementType = "input"> =
  PolymorphicProps<T, InputAmountHugeProps>



// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * Huge input for amount with currency and estimated amount (switch)
 */
export const InputAmountHuge = forwardRefPolymorphic<"input", InputAmountHugeProps>(
  function InputAmountHuge<T extends React.ElementType = "input">({

    // Current currency
    currency,

    // Switch
    estimatedAmount,
    onSwitchCurrency,

    as,

    ...props

  }: InputAmountHugePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    return (
      <InputAmount
        as={as as any}
        ref={ref}

        textColor="brand"
        typo="number"
        className="h-32 pl-5 pt-6 pr-15 pb-15"
        AddonRight={<Text textColor="brand" variant="number" className="h-24 pt-2 pb-10">{currency}</Text>}

        AddonBottom={
          <TextWithIcon
            Icon={<IconButton icon={IconSwitch} variant="ghost" onClick={onSwitchCurrency} />}
            typo="hint"
          >
            ~ {estimatedAmount}
          </TextWithIcon>
        }

        {...props}
      />
    )
  }
)
