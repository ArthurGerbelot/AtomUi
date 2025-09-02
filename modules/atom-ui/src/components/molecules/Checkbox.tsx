"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "../../lib"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { resolveAtomTokens } from "../../lib/core/atom"
import { CardProps, SmartCard } from "./Card"
import { Choice, ChoiceValue, toChoiceObject } from "../../lib/choices"
import { IconCheck, Label } from "../atoms"
import { SmartText, TextProps } from "../atoms"
import { createSmartSlotSpecs, SmartSlot } from "../core"
import { StackProps, VStack } from "../atoms"


// =============================================================================
// Checkbox
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Checkbox component for form inputs with modular primitives
// =============================================================================


// =============================================================================
// CheckboxComposed - simple composition that mixes everything together
// =============================================================================

type CheckboxComposedOwnProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = {
  choice?: Choice<_ChoiceValue>
  /** Use Card wrapper around everything (always acts as label) */
  withCard?: boolean
  /** Label props */
  labelProps?: React.ComponentProps<typeof Label>
}

type CheckboxComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue> =
  CheckboxComposedOwnProps<_ChoiceValue>
  & React.ComponentProps<typeof CheckboxPrimitive.Root>
  & SmartSlot<CardProps, "checkedCard">
  & SmartSlot<CardProps, "uncheckedCard">
  & CheckboxContentProps

/**
 * One-shot API Checkbox Composed Component - mixes everything together
 */
const CheckboxComposed = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxComposedProps
>(function CheckboxComposed<_ChoiceValue extends ChoiceValue = ChoiceValue>(
  props: CheckboxComposedProps<_ChoiceValue>,
  ref: React.ForwardedRef<React.ComponentRef<typeof CheckboxPrimitive.Root>>
) {
  const {
    choice,
    withCard = false,
    children,

    // SmartSlot props for Card
    checkedCard, checkedCardProps, CheckedCard,
    uncheckedCard, uncheckedCardProps, UncheckedCard,

    // Label props
    label, labelProps, Label: LabelComponent,
    description, descriptionProps, Description: DescriptionComponent,

    disabled = false,

    ...checkboxProps
  } = props

  const _choice = choice ? toChoiceObject(choice) : null
  const _disabled = disabled || _choice?.disabled || false

  // Handle controlled vs uncontrolled state
  const isControlled = checkboxProps.checked !== undefined
  const [internalChecked, setInternalChecked] = React.useState(
    !!(checkboxProps.defaultChecked ?? false)
  )

  const isChecked = isControlled
    ? !!checkboxProps.checked
    : internalChecked

  // Combine user's onCheckedChange with internal state management
  const handleCheckedChange = React.useCallback((checked: boolean | 'indeterminate') => {
    if (_disabled) return
    if (!isControlled) {
      setInternalChecked(!!checked)
    }
    checkboxProps.onCheckedChange?.(checked)
  }, [_disabled, isControlled, checkboxProps.onCheckedChange])

  // The input element (always receives the ref)
  const inputElement = <CheckboxInput
    id={checkboxProps.id || String(_choice?.value)}
    ref={ref}
    disabled={_disabled}
    {...checkboxProps}
    onCheckedChange={handleCheckedChange}
    className={cn(checkboxProps.className, "mt-0.5")} /* Make it align with the label - may be update if we change label textSize */
  />

  const labelContent = <CheckboxContent
    disabled={_disabled}
    label={label ?? _choice?.label ?? String(_choice?.value)}
    labelProps={labelProps}
    Label={LabelComponent}
    description={description ?? _choice?.description}
    descriptionProps={descriptionProps}
    Description={DescriptionComponent}
  />

  const inputId = checkboxProps.id || String(_choice?.value)

  // Auto-enable Card wrapper if any card props are provided
  const hasCardProps = !!(
    checkedCard || checkedCardProps || CheckedCard ||
    uncheckedCard || uncheckedCardProps || UncheckedCard
  )

  // With Card wrapper (always acts as label)
  if (withCard || hasCardProps) {
    return (
      <Label htmlFor={_disabled ? undefined : inputId}>
        <CheckboxCard
          htmlFor={_disabled ? undefined : inputId}
          isChecked={isChecked}
          disabled={_disabled}
          checkedCard={checkedCard}
          checkedCardProps={checkedCardProps}
          CheckedCard={CheckedCard}
          uncheckedCard={uncheckedCard}
          uncheckedCardProps={uncheckedCardProps}
          UncheckedCard={UncheckedCard}
        >
          <CheckboxLayout disabled={_disabled}>
            {inputElement}
            {labelContent}
          </CheckboxLayout>
        </CheckboxCard>
      </Label>
    )
  }

  return (
    <Label htmlFor={_disabled ? undefined : inputId}>
      <CheckboxLayout disabled={_disabled}>
        {inputElement}
        {labelContent}
      </CheckboxLayout>
    </Label>
  )

})


// =============================================================================
// Checkbox Primitive
// =============================================================================



// -----------------------------------------------------------------------------
// CheckboxInput (primitive) - receives ref
// -----------------------------------------------------------------------------

const CheckboxInput = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentProps<typeof CheckboxPrimitive.Root>
>(function CheckboxInput({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive "
        + "size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <IconCheck className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

// =============================================================================
// CheckboxLayout (wrapper to place input and content)
// =============================================================================

type CheckboxLayoutProps = { disabled?: boolean }
  & React.ComponentProps<"div">

function CheckboxLayout({ className, children, disabled, ...props }: CheckboxLayoutProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 ",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// -----------------------------------------------------------------------------
// CheckboxContent (Text content next to input)
// -----------------------------------------------------------------------------

type CheckboxContentProps = {
  disabled?: boolean
}
  & StackProps
  & SmartSlot<TextProps, "label">
  & SmartSlot<TextProps, "description">

function CheckboxContent({
  label, labelProps, Label: LabelComponent,
  description, descriptionProps, Description: DescriptionComponent,
  disabled,
  ...props
}: CheckboxContentProps) {

  const resolved = resolveAtomTokens(props);

  return (
    <VStack
      noGap
      {...resolved}
    >
      <SmartText
        typo="label"
        textColor={disabled ? "muted" : undefined}
        className={disabled ? "cursor-not-allowed" : undefined}
        specs={createSmartSlotSpecs(label, labelProps, LabelComponent)}
      />
      <SmartText
        typo="hint"
        textColor={disabled ? "muted" : undefined}
        className={disabled ? "cursor-not-allowed" : undefined}
        specs={createSmartSlotSpecs(description, descriptionProps, DescriptionComponent)}
      />
    </VStack >
  )
}

// -----------------------------------------------------------------------------
// CheckboxCard (polymorphic Card as label with SmartSlot support)
// -----------------------------------------------------------------------------

type CheckboxCardOwnProps = {
  isChecked?: boolean
  disabled?: boolean
} & SmartSlot<CardProps, "checkedCard"> & SmartSlot<CardProps, "uncheckedCard">

type CheckboxCardProps = CheckboxCardOwnProps & CardProps

type CheckboxCardPolymorphicProps<T extends React.ElementType = "label"> =
  PolymorphicProps<T, CheckboxCardProps>

const CheckboxCard = forwardRefPolymorphic<"label", CheckboxCardProps>(
  function CheckboxCard<T extends React.ElementType = "label">(
    props: CheckboxCardPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      isChecked = false,
      disabled = false,
      checkedCard, checkedCardProps, CheckedCard,
      uncheckedCard, uncheckedCardProps, UncheckedCard,
      className,
      children,
      ...rest
    } = props


    const baseSpecs = {
      props: {
        ...(isChecked && !disabled && { surface: "outline", className: 'text-foreground' }),
        ...(disabled && !isChecked && { colorTheme: "muted", className: 'cursor-not-allowed' }),
        ...((isChecked && disabled) && { surface: "outline", className: 'text-muted-foreground cursor-not-allowed' }),
      }
    }

    return (
      <SmartCard
        ref={ref}
        surface="input"
        className={cn("cursor-pointer", className)}
        baseSpecs={baseSpecs}
        specs={
          isChecked
            ? createSmartSlotSpecs(checkedCard, checkedCardProps, CheckedCard)
            : createSmartSlotSpecs(uncheckedCard, uncheckedCardProps, UncheckedCard)
        }
        {...rest}
      >
        {children}
      </SmartCard>
    )
  }
)

// =============================================================================
// Exports
// =============================================================================

export const Checkbox = Object.assign(CheckboxComposed, {
  Input: CheckboxInput,
  Layout: CheckboxLayout,
  Content: CheckboxContent,
  Card: CheckboxCard,
})

export type {
  CheckboxComposedProps,
  CheckboxComposedOwnProps,
  CheckboxContentProps,
  CheckboxCardProps,
}