import * as React from "react"
import { Input, type InputProps } from "./Input"
import { formatAmount, parseAmount } from "../../lib/format"
import { asSmartSlot, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core"
import { setReactInputValue } from "../../lib/react/events"



// =============================================================================
// InputAmount
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Input with amount formatting
// =============================================================================



// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type InputAmountOwnProps = {
  digits?: number
}

export type InputAmountProps = InputProps & InputAmountOwnProps;

export type InputAmountPolymorphicProps<T extends React.ElementType = "input"> =
  PolymorphicProps<T, InputAmountProps>



// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * Input component for the UIKit with amount formatting
 */
export const InputAmount = forwardRefPolymorphic<"input", InputAmountProps>(
  function InputAmount<T extends React.ElementType = "input">(
    props: InputAmountPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { digits = 2, onChange, onBlur, onFocus, value, defaultValue, ...restProps } = props as any

    // -------------------------------------------------------------------------
    // REFS
    // -------------------------------------------------------------------------

    // This component requires a ref to handle focus/blur events.
    // Since we may receive a ref from the parent component,
    // we create an internal ref and merge it with any provided ref.

    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

    // -------------------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------------------

    const [isFocused, setIsFocused] = React.useState(false)
    const isControlled = value !== undefined

    // BONUS: format on mount (uncontrolled only)
    // -----------------------------------------------
    React.useEffect(() => {
      if (!digits) return
      if (isControlled) return
      const el = innerRef.current
      if (!el) return
      if (el.value) {
        const out = formatAmount(el.value, digits)
        setReactInputValue(el, out)
      }
    }, [digits, isControlled])

    // Handle Focus/Blur
    // -----------------------------------------------
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (!isControlled && digits) {
        const parsed = parseAmount(e.currentTarget.value).valueTrimmed
        setReactInputValue(e.currentTarget, parsed)

        requestAnimationFrame(() => {
          const el = e.currentTarget
          if (el && document.activeElement === el) {
            el.selectionStart = el.selectionEnd = parsed.length
          }
        })
      }
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      if (!isControlled && digits) {
        const out = formatAmount(e.currentTarget.value, digits)
        setReactInputValue(e.currentTarget, out, { silent: true })
      }
      onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    // Derive displayed value in controlled mode
    // -----------------------------------------------
    let controlledDisplayedValue: string | undefined = undefined
    if (isControlled) {
      if (!digits) {
        controlledDisplayedValue = value as unknown as string
      } else {
        const raw = String(value as any)
        controlledDisplayedValue = isFocused
          ? parseAmount(raw).valueTrimmed
          : formatAmount(raw, digits)
      }
    }

    // Render
    // -----------------------------------------------

    return (
      <Input
        ref={innerRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...(isControlled ? { value: controlledDisplayedValue } : { defaultValue })}
        {...restProps}
      />
    )
  }
)


// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartInputAmount = asSmartSlot(InputAmount);