"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "@uikit/lib"
import { CardProps, SmartCard } from "./Card"
import { Choice, ChoiceValue, toChoiceObject, toChoicesObject } from "../../lib/choices"
import { IconRadio, Label } from "../atoms"
import { SmartText, TextProps } from "../atoms"
import { createSmartSlotSpecs, SmartSlot } from "../core"
import { StackProps, VStack } from "../atoms"


// =============================================================================
// Radio
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Radio component for form inputs with modular primitives
// =============================================================================


// =============================================================================
// RadioComposed - simple composition that mixes everything together
// =============================================================================

type RadioComposedOwnProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = {
  choices?: Choice<_ChoiceValue>[]
  /** Use Card wrapper around everything (always acts as label) */
  withCard?: boolean
  /** Label props */
  labelProps?: React.ComponentProps<typeof Label>
  /** Prefix for generated radio input ids (e.g., "my-radio" → "my-radio-value1") */
  idPrefix?: string
}

type RadioComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue> =
  RadioComposedOwnProps<_ChoiceValue>
  & React.ComponentProps<typeof RadioGroupPrimitive.Root>
  & SmartSlot<CardProps, "checkedCard">
  & SmartSlot<CardProps, "uncheckedCard">
  & RadioContentProps

/**
 * One-shot API Radio Composed Component - mixes everything together
 */
const RadioComposed = React.forwardRef<
  React.ComponentRef<typeof RadioGroup>,
  RadioComposedProps
>(function RadioComposed<_ChoiceValue extends ChoiceValue = ChoiceValue>(
  props: RadioComposedProps<_ChoiceValue>,
  ref: React.ForwardedRef<React.ComponentRef<typeof RadioGroup>>
) {
  const {
    choices,
    withCard = false,
    children,
    idPrefix,

    // SmartSlot props for Card
    checkedCard, checkedCardProps, CheckedCard,
    uncheckedCard, uncheckedCardProps, UncheckedCard,

    // Label props
    label, labelProps, Label: LabelComponent,
    description, descriptionProps, Description: DescriptionComponent,

    disabled = false,

    ...radioProps
  } = props

  const _choices = toChoicesObject(choices || []);

  // Handle controlled vs uncontrolled state
  const isControlled = radioProps.value !== undefined
  const [internalValue, setInternalValue] = React.useState(
    radioProps.defaultValue ?? ""
  )

  const currentValue = isControlled ? radioProps.value : internalValue

  // Combine user's onValueChange with internal state management
  const handleValueChange = React.useCallback((_value: string) => {
    if (disabled) return
    if (!isControlled) {
      setInternalValue(_value)
    }
    radioProps.onValueChange?.(_value)
  }, [disabled, isControlled, radioProps.onValueChange])


  // -----------------------------------------------------------------------------
  // Render (per choices)
  // -----------------------------------------------------------------------------

  const choicesRadio = _choices.map((_choice) => {

    // Generate ID with priority:  idPrefix-value > value
    const inputId = (idPrefix ? `${idPrefix}-${_choice?.value}` : String(_choice?.value))

    // Combine global disabled with individual choice disabled
    const isDisabled = disabled || _choice?.disabled || false

    // The input element (always receives the ref)
    const inputElement = <RadioInput
      id={inputId}
      value={String(_choice?.value)}
      disabled={isDisabled}
      className={cn(radioProps.className, "mt-0.5")} /* Make it align with the label - may be update if we change label textSize */
    />

    const labelContent = <RadioContent
      disabled={isDisabled}
      label={label ?? _choice?.label ?? String(_choice?.value)}
      labelProps={labelProps}
      Label={LabelComponent}
      description={description ?? _choice?.description}
      descriptionProps={descriptionProps}
      Description={DescriptionComponent}
    />

    // Auto-enable Card wrapper if any card props are provided
    const hasCardProps = !!(
      checkedCard || checkedCardProps || CheckedCard ||
      uncheckedCard || uncheckedCardProps || UncheckedCard
    )



    // With Card wrapper (always acts as label)
    if (withCard || hasCardProps) {
      return (
        <Label htmlFor={isDisabled ? undefined : inputId} key={inputId}>
          <RadioCard
            htmlFor={isDisabled ? undefined : inputId}
            isChecked={currentValue === _choice?.value}
            disabled={isDisabled}
            checkedCard={checkedCard}
            checkedCardProps={checkedCardProps}
            CheckedCard={CheckedCard}
            uncheckedCard={uncheckedCard}
            uncheckedCardProps={uncheckedCardProps}
            UncheckedCard={UncheckedCard}
          >
            <RadioLayout disabled={isDisabled}>
              {inputElement}
              {labelContent}
            </RadioLayout>
          </RadioCard>
        </Label>
      )
    }

    return (
      <Label htmlFor={isDisabled ? undefined : inputId} key={inputId}>
        <RadioLayout disabled={isDisabled}>
          {inputElement}
          {labelContent}
        </RadioLayout>
      </Label>
    )
  })

  return (
    <RadioGroup
      ref={ref}
      value={currentValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      {...radioProps}
    >
      {choicesRadio}
    </RadioGroup>
  )
})


// =============================================================================
// Checkbox Primitive
// =============================================================================


// -----------------------------------------------------------------------------
// RadioGroup
// -----------------------------------------------------------------------------

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentProps<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
})


// -----------------------------------------------------------------------------
// CheckboxInput - receives ref
// -----------------------------------------------------------------------------

const RadioInput = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentProps<typeof RadioGroupPrimitive.Item>
>(function RadioInput({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="Radio"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive "
        + "size-4.5 shrink-0 rounded-full border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="Radio-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <IconRadio className="size-3.5 fill-primary stroke-[4px]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})

// =============================================================================
// RadioLayout (wrapper to place input and content)
// =============================================================================

type RadioLayoutProps = { disabled?: boolean }
  & React.ComponentProps<"div">

function RadioLayout({ className, children, disabled, ...props }: RadioLayoutProps) {
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
// RadioContent (Text content next to input)
// -----------------------------------------------------------------------------

type RadioContentProps = {
  disabled?: boolean
}
  & StackProps
  & SmartSlot<TextProps, "label">
  & SmartSlot<TextProps, "description">

function RadioContent({
  label, labelProps, Label: LabelComponent,
  description, descriptionProps, Description: DescriptionComponent,
  disabled,
  ...props
}: RadioContentProps) {

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
// RadioCard (polymorphic Card as label with SmartSlot support)
// -----------------------------------------------------------------------------

type RadioCardOwnProps = {
  isChecked?: boolean
  disabled?: boolean
} & SmartSlot<CardProps, "checkedCard"> & SmartSlot<CardProps, "uncheckedCard">

type RadioCardProps = RadioCardOwnProps & CardProps

type RadioCardPolymorphicProps<T extends React.ElementType = "label"> =
  PolymorphicProps<T, RadioCardProps>

const RadioCard = forwardRefPolymorphic<"label", RadioCardProps>(
  function RadioCard<T extends React.ElementType = "label">(
    props: RadioCardPolymorphicProps<T>,
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
        contentProps={{
          className: "py-2 px-3"
        }}
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

export const Radio = Object.assign(RadioComposed, {
  Group: RadioGroup,
  Input: RadioInput,
  Layout: RadioLayout,
  Content: RadioContent,
  Card: RadioCard,
})

export type {
  RadioComposedProps,
  RadioComposedOwnProps,
  RadioContentProps,
  RadioCardProps,
}