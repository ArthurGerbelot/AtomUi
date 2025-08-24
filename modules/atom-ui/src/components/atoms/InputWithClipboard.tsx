import * as React from "react"
import { Input, InputProps } from "./Input";
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core";
import { IconButton } from "./IconButton";
import { IconCopy } from "./IconLibrary";
import { cn } from "../../lib";

// =============================================================================
// InputWithClipboard
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Input with clipboard icon action
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type InputWithClipboardOwnProps = {
  /** Called after clearing the value (in addition to the native onChange being fired) */
  onCleared?: () => void
}

export type InputWithClipboardProps = InputProps & InputWithClipboardOwnProps;

export type InputWithClipboardPolymorphicProps<T extends React.ElementType = "input"> =
  PolymorphicProps<T, InputWithClipboardProps>



// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * Input with clipboard icon action
 */

export const InputWithClipboard = forwardRefPolymorphic<"input", InputWithClipboardProps>(
  function InputClearable<T extends React.ElementType = "input">(
    {
      as,
      onValueChange,
      className,
      onChange,

      ...props }: InputWithClipboardPolymorphicProps<T>,
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



    // Handle Change
    // -----------------------------------------------

    const toStr = (v: unknown) => (v == null ? "" : String(v))
    const [value, setValue] = React.useState<string>(() => toStr((props as any).value ?? (props as any).defaultValue))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      onChange?.(e)
      onValueChange?.(newValue)
    }

    return (
      <Input
        as={as as any}
        ref={innerRef}

        onChange={handleChange}
        AddonRight={
          <IconButton
            onClick={async () => {
              try { await navigator.clipboard.writeText(value) } catch { }
            }}
            variant="ghost"
            icon={IconCopy}
          />
        }
        className={cn(className, "pr-12")}
        {...props}
      />
    )
  }
)

