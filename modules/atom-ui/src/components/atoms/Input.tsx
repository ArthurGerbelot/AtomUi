import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn, resolveAtomTokens } from "@uikit"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { SmartAtom } from "../core/Atom"
import { asSmartSlot, createSmartSlotSpecs, smartSlotMustBeRendered, type SmartSlot } from "../core/SmartSlot"
import { type IconProps, SmartIcon } from "."
import { sizeWithHeightVariants } from "../../tokens/base/base"


// =============================================================================
// Input
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Input component for the UIKit with Icon and Addon support
// =============================================================================


// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------


/** Input-specific Size composed variant */
const inputVariants = cva("", {
  variants: { size: sizeWithHeightVariants }
})


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------


// SmartSlot parts
// ------------------

type WrapperSmartSlot = SmartSlot<AtomProps, "wrapper">
type IconLeftSmartSlot = SmartSlot<IconProps, "iconLeft">
type AddonLeftSmartSlot = SmartSlot<AtomProps, "addonLeft">
type IconRightSmartSlot = SmartSlot<IconProps, "iconRight">
type AddonRightSmartSlot = SmartSlot<AtomProps, "addonRight">
type AddonBottomSmartSlot = SmartSlot<AtomProps, "addonBottom">

// Props
// ----------------
type InputOwnProps = VariantProps<typeof inputVariants>
  & WrapperSmartSlot
  & IconLeftSmartSlot
  & AddonLeftSmartSlot
  & IconRightSmartSlot
  & AddonRightSmartSlot
  & AddonBottomSmartSlot;

export type InputProps = AtomProps & InputOwnProps;

export type InputPolymorphicProps<T extends React.ElementType = "input"> =
  PolymorphicProps<T, InputProps>


// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

/**
 * Input component for the UIKit with Icon and Addon support
 */
export const Input = forwardRefPolymorphic<"input", InputProps>(
  function Input<T extends React.ElementType = "input">(
    props: InputPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      // SmartSlot triads (removed from native props spread)
      wrapper, wrapperProps, Wrapper,
      iconLeft, iconLeftProps, IconLeft,
      addonLeft, addonLeftProps, AddonLeft,
      iconRight, iconRightProps, IconRight,
      addonRight, addonRightProps, AddonRight,
      addonBottom, addonBottomProps, AddonBottom,

      // Own props
      size = "md",

      // Common
      className,
      children,

      // Keep 'type' but only apply when rendering <input>
      type = "text",

      ...restProps
    } = props as any

    // Build SmartSlot specs from triads
    const wrapperSpecs = createSmartSlotSpecs<AtomProps>(wrapper, wrapperProps, Wrapper)
    const iconLeftSpecs = createSmartSlotSpecs<IconProps>(iconLeft, iconLeftProps, IconLeft)
    const addonLeftSpecs = createSmartSlotSpecs<AtomProps>(addonLeft, addonLeftProps, AddonLeft)
    const iconRightSpecs = createSmartSlotSpecs<IconProps>(iconRight, iconRightProps, IconRight)
    const addonRightSpecs = createSmartSlotSpecs<AtomProps>(addonRight, addonRightProps, AddonRight)
    const addonBottomSpecs = createSmartSlotSpecs<AtomProps>(addonBottom, addonBottomProps, AddonBottom)


    // Resolve atom tokens for the INPUT element itself (not the wrapper)
    const { as, asChild, className: atomClass, style, ...rest } = resolveAtomTokens(restProps)

    const element: React.ElementType = as ?? "input"

    const maybeType = typeof element === "string" && element === "input" ? { type } : {}

    const hasLeft = smartSlotMustBeRendered(iconLeftSpecs) || smartSlotMustBeRendered(addonLeftSpecs)
    const leftClassName = "absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center gap-2";

    const hasRight = smartSlotMustBeRendered(iconRightSpecs) || smartSlotMustBeRendered(addonRightSpecs)
    const rightClassName = "absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center gap-2";


    return (
      <SmartAtom
        specs={wrapperSpecs}
        className={cn("relative inline-block")}
      >
        {/* Left SmartSlots */}
        <SmartIcon className={leftClassName + " left-3 text-high-contrast"} specs={iconLeftSpecs} />
        <SmartAtom className={leftClassName} specs={addonLeftSpecs} />

        {/* Right SmartSlots */}
        <SmartIcon className={rightClassName + " right-3 text-high-contrast"} specs={iconRightSpecs} />
        <SmartAtom className={rightClassName} specs={addonRightSpecs} />

        <Atom
          ref={ref}
          as={element as any}
          asChild={asChild}
          data-slot="input"
          surface="input" // Or import surfaceVariants.input on className ?
          {...maybeType}
          className={cn(
            inputVariants({ size }),
            hasLeft && "pl-10",
            hasRight && "pr-10",
            atomClass,
            className,
          )}
          style={style}
          {...rest}
        >
          {asChild ? children : null}
        </Atom>
        {smartSlotMustBeRendered(addonBottomSpecs) && (
          <div className="absolute bottom-0 left-3 right-3">
            <SmartAtom specs={addonBottomSpecs} />
          </div>
        )}
      </SmartAtom>
    )
  }
)


// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartInput = asSmartSlot(Input);