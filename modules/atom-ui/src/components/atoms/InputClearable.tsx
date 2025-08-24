import * as React from "react"
import { Input, InputProps } from "./Input";
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core";
import { cn, setReactInputValue } from "../../lib";
import { IconButton } from "./IconButton";
import { IconClose } from "./IconLibrary";


// =============================================================================
// InputClearable
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Input with clearable icon ction
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type InputClearableOwnProps = {
  /** Called after clearing the value (in addition to the native onChange being fired) */
  onCleared?: () => void
}

export type InputClearableProps = InputProps & InputClearableOwnProps;

export type InputClearablePolymorphicProps<T extends React.ElementType = "input"> =
  PolymorphicProps<T, InputClearableProps>


// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * Input with clearable icon action
 */
export const InputClearable = forwardRefPolymorphic<"input", InputClearableProps>(
  function InputClearable<T extends React.ElementType = "input">(
    {
      as,
      className,

      onCleared,
      onChange,

      ...props }: InputClearablePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // -------------------------------------------------------------------------
    // REFS
    // -------------------------------------------------------------------------

    // This component requires a ref to handle focus/blur events.
    // Since we may receive a ref from the parent component,
    // we create an internal ref and merge it with any provided ref.


    const innerRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)


    // Handle Clear
    // -----------------------------------------------

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const el = innerRef.current
      if (!el) return

      setReactInputValue(el, "")
      el.focus({ preventScroll: true })
      onCleared?.()
    }



    return (
      <Input
        as={as as any}
        ref={innerRef}

        AddonRight={
          <IconButton
            aria-label="Clear"
            tabIndex={-1}
            onClick={handleClear}
            variant="ghost"
            icon={IconClose}
          />
        }

        className={cn("pr-12", className)}
        onChange={onChange}
        {...props}
      />
    )
  }
)

