"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { format } from "date-fns"

import { Atom, type AtomProps } from "../core/Atom"
import { Size, sizeWithHeightVariants } from "../../tokens/base/base"
import { surfaceVariants } from "../../tokens"
import type { Choice, ChoiceValue } from "../../lib/choices"
import { regroupChoices, overrideChoicesBadgeProps, addGroupLabels, toChoiceObject } from "../../lib/choices"
import { ChoiceBadgeProps, SmartChoiceBadge } from "../atoms/ChoiceBadge"
import { createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot } from "../core"
import { cn, resolveAtomTokens } from "../../lib"
import { IconCalendar, IconCheck, IconChevronDown } from "../atoms/IconLibrary"
import { Icon } from "../atoms"
import { selectBaseChoiceBadgeProps, selectTriggerVariants, selectFilterDefault, BaseSelectOwnProps } from "../../lib/select"
import { Calendar, Command, Popover } from "."
import { Input } from "../atoms"

// =============================================================================
// DatePicker (Advanced)
// -----------------------------------------------------------------------------
// [Atomic] [Molecule] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Accessible date picker built with Radix UI-like primitives using Popover + Calendar
// =============================================================================



// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type DatePickerComposedOwnProps = {
  /** Selected date value */
  value?: Date
  /** Default selected date */
  defaultValue?: Date | undefined
  /** Callback when date changes */
  onValueChange?: (date: Date | undefined) => void

  /** Placeholder text when no date selected */
  placeholder?: string
  /** Date format for display */
  dateFormat?: string
  /** Calendar props to pass through */
  calendarProps?: React.ComponentProps<typeof Calendar>

  /** Input props gain from polymorphism.. not everytime here so redefine them here */
  disabled?: boolean
}

// Compose props: Own + Atom (excluding conflicting defaultValue)
type DatePickerComposedProps = DatePickerComposedOwnProps & Omit<AtomProps, 'defaultValue'>

type DatePickerComposedPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, DatePickerComposedProps>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION (Composed)
// -----------------------------------------------------------------------------

const DatePickerComposed = forwardRefPolymorphic<"button", DatePickerComposedProps>(
  function DatePickerComposed<T extends React.ElementType = "button">(
    {
      // Base props
      placeholder = "Pick a date",
      dateFormat = "PPP",

      // Controlled/uncontrolled value
      value,
      defaultValue,
      onValueChange,

      disabled,
      calendarProps,

      size = "md",

      ...rest // atomic props
    }: DatePickerComposedPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // ------------------------------
    // 1) State management (controlled/uncontrolled)
    // ------------------------------
    const [open, setOpen] = React.useState(false)

    // Determine if component is controlled or uncontrolled
    const isControlled = value !== undefined

    // Internal state for uncontrolled mode
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue)

    // Current date (controlled or internal)
    const currentDate = isControlled ? value : internalDate

    // Date change handler
    const handleDateSelect = React.useCallback((selectedDate: Date | undefined) => {
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalDate(selectedDate)
      }

      // Always call external handler if provided
      onValueChange?.(selectedDate)

      // Close the popover
      setOpen(false)
    }, [isControlled, onValueChange])

    // ------------------------------
    // 2) Resolve atomic tokens for root
    // ------------------------------
    const { className, style, as, ...atomProps } = resolveAtomTokens(rest)

    // ------------------------------
    // 3) Render
    // ------------------------------
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <DatePickerTrigger
            ref={ref as any}
            size={size}
            disabled={disabled}
            data-empty={!currentDate}
            value={currentDate ? format(currentDate, dateFormat) : undefined}
            placeholder={placeholder}
            className={className}
            style={style}
            {...atomProps}
          />
        </Popover.Trigger>
        <Popover.Content className="w-auto p-0" style={{ zIndex: 1000 }}>
          <Calendar
            mode="single"
            selected={currentDate as any}
            onSelect={handleDateSelect as any}
            defaultMonth={currentDate || new Date()}
            {...calendarProps}
          />
        </Popover.Content>
      </Popover.Root>
    )

  }
)


// =============================================================================
// Primitives (Trigger / Value / Content / Item)
// =============================================================================



// SelectTrigger
// ----------------------------------

export const datePickerTriggerVariants = cva("", {
  variants: {
    size: sizeWithHeightVariants,
  },
  defaultVariants: {
    size: "md",
  },
})

/** Size-dependent padding for left icon */
const datePickerPaddingBySize: Record<Size, string> = {
  xs: "pl-8",
  sm: "pl-9",
  md: "pl-10",
  lg: "pl-12",
  xl: "pl-14"
}

type DatePickerTriggerOwnProps = React.ComponentProps<"button"> & VariantProps<typeof datePickerTriggerVariants> & {
  placeholder?: string
  value?: string
}
type DatePickerTriggerProps = AtomProps & DatePickerTriggerOwnProps
type DatePickerTriggerPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, DatePickerTriggerProps>

const DatePickerTrigger = forwardRefPolymorphic<"button", DatePickerTriggerProps>(
  function DatePickerTrigger<T extends React.ElementType = "button">(
    { size = "md", children, placeholder, value, ...props }: DatePickerTriggerPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { className, style, as, asChild, ...rest } = resolveAtomTokens(props)

    const displayValue = value || placeholder
    const isEmpty = !value

    return (
      <div className="relative inline-block w-full">
        {/* Left Icon */}
        <Icon
          icon={IconCalendar}
          size={size || "md"}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />

        {/* Button */}
        <Atom
          ref={ref}
          as={(as ?? "button") as any}
          asChild={asChild}
          type="button"
          surface="input"
          className={cn(
            "flex h-auto w-full items-center justify-between text-left",
            datePickerTriggerVariants({ size }),
            datePickerPaddingBySize[(size || "md") as Size],
            className
          )}
          style={style}
          {...rest}
        >
          <span className={cn(
            "flex-1 text-left",
            isEmpty && "text-muted-foreground"
          )}>
            {displayValue}
          </span>
        </Atom>
      </div>
    )
  }
)




// =============================================================================
// Export (Composed + Primitives)
// =============================================================================




export const DatePicker = Object.assign(DatePickerComposed, {
  Trigger: DatePickerTrigger,
});

export type {
  DatePickerComposedProps as DatePickerProps,
  DatePickerComposedPolymorphicProps as DatePickerPolymorphicProps,
  DatePickerTriggerProps, DatePickerTriggerPolymorphicProps,
};



// "use client"

// import * as React from "react"
// import { format } from "date-fns"
// import { Popover } from "./Popover"
// import { IconCalendar, Icon, type InputProps } from "../atoms"
// import { Calendar } from "./Calendar"
// import { AtomProps, Atom } from "../core/Atom"
// import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "../../lib/core"
// import { cn } from "../../lib"
// import { cva, type VariantProps } from "class-variance-authority"

// // =============================================================================
// // DatePicker
// // -----------------------------------------------------------------------------
// // [Molecule] [Polymorphic] [Form]
// // -----------------------------------------------------------------------------
// // Date picker component with calendar popup, styled via Atom tokens
// // =============================================================================

// // -----------------------------------------------------------------------------
// // VARIANTS & STYLING
// // -----------------------------------------------------------------------------

// const datePickerTriggerVariants = cva(
//   [
//     // Base styles similar to input
//     "flex h-auto w-full items-center justify-between rounded-md bg-transparent px-3 py-2 text-sm",
//     "border border-input",
//     "placeholder:text-muted-foreground",
//     "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//     "disabled:cursor-not-allowed disabled:opacity-50",
//     "text-left"
//   ],
//   {
//     variants: {
//       size: {
//         xs: "h-7 px-2 text-xs",
//         sm: "h-8 px-2 text-sm",
//         md: "h-10 px-3 text-sm",
//         lg: "h-11 px-3 text-base",
//         xl: "h-12 px-4 text-base"
//       }
//     },
//     defaultVariants: {
//       size: "md"
//     }
//   }
// )

// // -----------------------------------------------------------------------------
// // TYPE DEFINITIONS
// // -----------------------------------------------------------------------------

// type DatePickerOwnProps = {
//   /** Selected date value */
//   value?: Date
//   /** Default selected date */
//   defaultValue?: Date
//   /** Callback when date changes */
//   onValueChange?: (date: Date | undefined) => void
//   /** Placeholder text when no date selected */
//   placeholder?: string
//   /** Date format for display */
//   dateFormat?: string
//   /** Calendar props to pass through */
//   calendarProps?: React.ComponentProps<typeof Calendar>

//   /** Input props gain from polymorphism.. not everytime here so redefine them here */
//   disabled?: boolean
// } & Omit<InputProps, 'value' | 'onChange' | 'IconLeft'>;

// // Compose props: Own + Atom
// type DatePickerProps = DatePickerOwnProps & AtomProps

// type DatePickerPolymorphicProps<T extends React.ElementType = "div"> =
//   PolymorphicProps<T, DatePickerProps>

// // -----------------------------------------------------------------------------
// // DATEPICKER TRIGGER COMPONENT
// // -----------------------------------------------------------------------------

// type DatePickerTriggerOwnProps = React.ComponentProps<"button"> & VariantProps<typeof datePickerTriggerVariants> & {
//   placeholder?: string
//   value?: string
//   iconLeft?: React.ComponentType<any>
// }
// type DatePickerTriggerProps = AtomProps & DatePickerTriggerOwnProps
// type DatePickerTriggerPolymorphicProps<T extends React.ElementType = "button"> =
//   PolymorphicProps<T, DatePickerTriggerProps>

// const DatePickerTrigger = forwardRefPolymorphic<"button", DatePickerTriggerProps>(
//   function DatePickerTrigger<T extends React.ElementType = "button">(
//     {
//       size = "md",
//       placeholder,
//       value,
//       iconLeft: IconLeftProp,
//       children,
//       ...props
//     }: DatePickerTriggerPolymorphicProps<T>,
//     ref: PolymorphicRef<T>
//   ) {
//     const { className, style, as, asChild, ...rest } = resolveAtomTokens(props)

//     const displayValue = value || placeholder
//     const isEmpty = !value

//     return (
//       <Atom
//         ref={ref}
//         as={(as ?? "button") as any}
//         asChild={asChild}
//         type="button"
//         surface="input"
//         className={cn(datePickerTriggerVariants({ size }), className)}
//         style={style}
//         {...rest}
//       >
//         <div className="flex items-center justify-between w-full">
//           <div className="flex items-center gap-2">
//             {IconLeftProp && (
//               <Icon
//                 icon={IconLeftProp}
//                 size="sm"
//                 className="shrink-0"
//               />
//             )}
//             <span className={cn(
//               "flex-1 text-left",
//               isEmpty && "text-muted-foreground"
//             )}>
//               {displayValue}
//             </span>
//           </div>
//         </div>
//       </Atom>
//     )
//   }
// )

// // -----------------------------------------------------------------------------
// // COMPONENT IMPLEMENTATION
// // -----------------------------------------------------------------------------

// /**
//  * Date picker component with calendar popup, styled via Atom tokens
//  */
// const DatePicker = forwardRefPolymorphic<"div", DatePickerProps>(
//   function DatePicker<T extends React.ElementType = "div">(
//     {
//       // Own props
//       value,
//       defaultValue,
//       onValueChange,
//       placeholder = "Pick a date",
//       dateFormat = "PPP",

//       // Do not complicate with SmartSlot (yet ?)
//       calendarProps,

//       // Input-specific props that need to be passed through
//       size,
//       disabled,

//       // Polymorphic props
//       as, asChild, children,
//       // Remaining Atom props
//       ...atomProps
//     }: DatePickerPolymorphicProps<T>,
//     ref: PolymorphicRef<T>
//   ) {

//     // State management with stable controlled/uncontrolled mode
//     const [open, setOpen] = React.useState(false)

//     // Determine if component was initially controlled and stick to that mode
//     const wasInitiallyControlled = React.useRef(value !== undefined)
//     const isControlled = wasInitiallyControlled.current

//     // Internal state for uncontrolled mode
//     const [internalDate, setInternalDate] = React.useState<Date | undefined>(() => {
//       // If controlled, use value, otherwise use defaultValue
//       return isControlled ? value : defaultValue
//     })

//     // Current date value
//     const currentDate = isControlled ? value : internalDate

//     // Update internal state when value changes in controlled mode
//     React.useEffect(() => {
//       if (isControlled && value !== internalDate) {
//         setInternalDate(value)
//       }
//     }, [isControlled, value, internalDate])

//     const handleDateSelect = React.useCallback((selectedDate: Date | undefined) => {
//       // Always update internal state for consistency
//       setInternalDate(selectedDate)

//       // Call external handler if provided
//       onValueChange?.(selectedDate)

//       setOpen(false)
//     }, [onValueChange])

//     // Resolve Atomic props
//     const { className, style, ...atomPropsForTrigger } = resolveAtomTokens(atomProps)

//     return (
//       <Popover open={open} onOpenChange={setOpen}>
//         <Popover.Trigger asChild>
//           <DatePickerTrigger
//             ref={ref as any}
//             size={size}
//             disabled={disabled}
//             data-empty={!currentDate}
//             iconLeft={IconCalendar}
//             value={currentDate ? format(currentDate, dateFormat) : undefined}
//             placeholder={placeholder}
//             className={className}
//             style={style}
//             {...atomPropsForTrigger}
//           />
//         </Popover.Trigger>
//         <Popover.Content className="w-auto p-0" style={{ zIndex: 1000 }}>
//           <Calendar
//             mode="single"
//             selected={currentDate as any}
//             onSelect={handleDateSelect as any}
//             {...calendarProps}
//           />
//         </Popover.Content>
//       </Popover>
//     )
//   }
// )

// // // Export DatePickerDemo for backward compatibility
// // export function DatePickerDemo() {
// //   const [date, setDate] = React.useState<Date>()

// //   return (
// //     <DatePicker
// //       value={date}
// //       onValueChange={setDate}
// //       placeholder="Pick a date"
// //     />
// //   )
// // }

// export { DatePicker }
// export type { DatePickerProps, DatePickerOwnProps }