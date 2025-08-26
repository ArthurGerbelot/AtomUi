"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { Atom, type AtomProps } from "../core/Atom"
import { Size } from "../../tokens/base/base"
import { surfaceVariants } from "../../tokens"
import type { Choice, ChoiceValue } from "../../lib/choices"
import { regroupChoices, overrideChoicesBadgeProps, addGroupLabels, toChoiceObject } from "../../lib/choices"
import { ChoiceBadgeProps, SmartChoiceBadge } from "../atoms/ChoiceBadge"
import { createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot } from "../core"
import { cn, resolveAtomTokens } from "../../lib"
import { IconCheck, IconChevronDown } from "../atoms/IconLibrary"
import { selectBaseChoiceBadgeProps, selectTriggerVariants, selectFilterDefault, BaseSelectOwnProps } from "../../lib/select"
import { Command, Popover } from "."
import { Input } from "../atoms"

// =============================================================================
// Select (Advanced)
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Accessible select built with Radix UI-like primitives using Popover + Command
// Adds search, filter, grouping to the SimpleSelect API
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type SelectComposedOwnProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = BaseSelectOwnProps<_ChoiceValue> & {

  // Advanced features of Select (search, filter)
  searchable?: boolean
  searchPlaceholder?: string
  noResultsPlaceholder?: string
  filter?: (value: string, search: string, keywords?: string[]) => number
}



// Compose props: Own + Atom
export type SelectComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = SelectComposedOwnProps<_ChoiceValue>
  & AtomProps

export type SelectPolymorphicComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue, T extends React.ElementType = "div"> =
  PolymorphicProps<T, SelectComposedProps<_ChoiceValue>>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION (Composed)
// -----------------------------------------------------------------------------

const SelectComposed = forwardRefPolymorphic<"button", SelectComposedProps<ChoiceValue>>(
  function SelectComposed<_ChoiceValue extends ChoiceValue = ChoiceValue, T extends React.ElementType = "button">(
    {
      // Base props
      choices,
      placeholder = "Select",
      size = "md",
      groupLabels,

      // SmartSlot
      choiceBadge, choiceBadgeProps, ChoiceBadge,
      overrideChoiceBadgeProps,

      // Advanced features
      searchable = true,
      searchPlaceholder = "Search…",
      noResultsPlaceholder = "No results",
      filter,

      // Controlled/uncontrolled value
      value,
      defaultValue,
      onValueChange,

      ...rest // atomic props
    }: SelectPolymorphicComposedProps<_ChoiceValue, T>,
    ref: PolymorphicRef<T>
  ) {

    // ------------------------------
    // 1) State (open + value management like MultiSelect)
    // ------------------------------
    const [open, setOpen] = React.useState(false)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<_ChoiceValue | undefined>(defaultValue)
    const currentValue = isControlled ? value : internalValue

    // Value handler with proper controlled/uncontrolled logic (like MultiSelect)
    const handleValueChange = React.useCallback((newValue: unknown) => {
      const choiceValue = (newValue && typeof newValue === "object" && (newValue as any).value !== undefined)
        ? (newValue as any).value as _ChoiceValue
        : newValue as _ChoiceValue

      if (isControlled) {
        onValueChange?.(choiceValue)
      } else {
        setInternalValue(choiceValue)
        onValueChange?.(choiceValue)
      }
    }, [isControlled, onValueChange])

    // ------------------------------
    // 2) Resolve atomic tokens for root
    // ------------------------------
    const { className, style, as, ...rootProps } = resolveAtomTokens(rest)

    // ------------------------------
    // 3) Prepare choices
    // ------------------------------
    const choicesWithOverrides = React.useMemo(
      () => overrideChoicesBadgeProps(choices, overrideChoiceBadgeProps),
      [choices, overrideChoiceBadgeProps]
    )

    const groupsInOrder = React.useMemo(
      () => addGroupLabels(regroupChoices(choicesWithOverrides), groupLabels as any),
      [choicesWithOverrides, groupLabels]
    )

    const selected = React.useMemo(() => {
      if (currentValue == null) return undefined
      for (const group of groupsInOrder) {
        const found = group.choices.find((it: any) => (it instanceof Object ? it.value : it) === currentValue)
        if (found) return (found instanceof Object ? found : { value: found })
      }
      return undefined
    }, [groupsInOrder, currentValue]) as any

    // ------------------------------
    // 4) Render
    // ------------------------------
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <SelectTrigger
            as={as as any}
            ref={ref}
            size={size}
            className={className}
            style={style}
            {...rootProps as any}
          >
            <SelectValue>
              {selected ? (
                <SmartChoiceBadge
                  forceRender
                  baseSpecs={{ props: selectBaseChoiceBadgeProps }}
                  specs={createSmartSlotSpecs(choiceBadge, choiceBadgeProps, ChoiceBadge)}
                  choice={selected}
                />
              ) : (placeholder)}
            </SelectValue>
          </SelectTrigger>
        </Popover.Trigger>

        <SelectContent>
          <Command.Root filter={filter || selectFilterDefault}>
            {searchable && (
              <SelectInput placeholder={searchPlaceholder} className="h-9" />
            )}
            <Command.List>
              <Command.Empty>{noResultsPlaceholder}</Command.Empty>
              {groupsInOrder.map((group: any, gi: number) => (
                <Command.Group key={`${group.key}-${gi}`} heading={group.heading}>
                  {group.choices.map((it: any) => {
                    const c = toChoiceObject(it)
                    return (
                      <SelectCommandItem
                        key={String(c.value)}
                        choice={c}
                        isSelected={currentValue === c.value}
                        onSelect={(v) => {
                          handleValueChange(v)
                          setOpen(false)
                        }}
                        choiceBadge={choiceBadge}
                        choiceBadgeProps={choiceBadgeProps}
                        ChoiceBadge={ChoiceBadge}
                      />
                    )
                  })}
                </Command.Group>
              ))}
            </Command.List>
          </Command.Root>
        </SelectContent>
      </Popover.Root>
    )
  }
)


// =============================================================================
// Primitives (Trigger / Value / Content / Item)
// =============================================================================

// SelectValue
// ----------------------------------

type SelectValueOwnProps = { placeholder?: string }
type SelectValueProps = AtomProps & SelectValueOwnProps
type SelectValuePolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, SelectValueProps>

const SelectValue = forwardRefPolymorphic<"span", SelectValueProps>(
  function SelectValue<T extends React.ElementType = "span">(
    { placeholder, children, ...atomProps }: SelectValuePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { className, style, as, ...rest } = resolveAtomTokens(atomProps)
    return (
      <Atom
        ref={ref}
        as={(as ?? "span") as any}
        data-slot="select-value"
        className={className}
        style={style}
        {...rest}
      >
        {children ?? placeholder}
      </Atom>
    )
  }
)


// SelectTrigger
// ----------------------------------

type SelectTriggerOwnProps = React.ComponentProps<"button"> & VariantProps<typeof selectTriggerVariants>
type SelectTriggerProps = AtomProps & SelectTriggerOwnProps
type SelectTriggerPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, SelectTriggerProps>

const SelectTrigger = forwardRefPolymorphic<"button", SelectTriggerProps>(
  function SelectTrigger<T extends React.ElementType = "button">(
    { size = "md", children, ...props }: SelectTriggerPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { className, style, as, asChild, ...rest } = resolveAtomTokens(props)
    return (
      <Atom
        ref={ref}
        as={(as ?? "button") as any}
        asChild={asChild}
        type="button"
        surface="input"
        className={cn(selectTriggerVariants({ size }), className)}
        style={style}
        {...rest}
      >
        {children}
        <IconChevronDown className="opacity-50" />
      </Atom>
    )
  }
)


// SelectContent
// ----------------------------------

type SelectContentProps = React.ComponentProps<typeof Popover.Content>

export const SelectContent = ({ className, children, ...props }: SelectContentProps) => {
  return (
    <Popover.Content
      data-slot="select-content"
      className={cn(
        surfaceVariants.popover,
        "p-0 min-w-[220px] w-fit max-w-[500px]",
        className
      )}
      {...props}
    >
      {children}
    </Popover.Content>
  )
}


// SelectCommandItem
// ----------------------------------

type SelectCommandItemProps<T extends ChoiceValue> = {
  choice: Choice<T>
  isSelected: boolean
  onSelect: (v: T) => void
  size?: Size
} & SmartSlot<ChoiceBadgeProps, "choiceBadge">

export function SelectCommandItem<T extends ChoiceValue>({
  choice,
  isSelected,
  onSelect,
  size,
  choiceBadge,
  choiceBadgeProps,
  ChoiceBadge,
}: SelectCommandItemProps<T>) {
  const _choice = (choice instanceof Object ? choice : { value: choice });
  const isDisabled = !!(_choice as any).disabled
  return (
    <Command.Item
      keywords={_choice.keywords}
      value={String(_choice.value)}
      disabled={isDisabled}
      onSelect={() => {
        if (isDisabled) return
        onSelect(_choice.value as T)
      }}
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      )}
    >
      <SmartChoiceBadge
        forceRender
        choice={choice}
        baseSpecs={{ props: selectBaseChoiceBadgeProps }}
        specs={createSmartSlotSpecs(choiceBadge, choiceBadgeProps, ChoiceBadge)}
      />
      <span className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")}>
        <IconCheck />
      </span>
    </Command.Item>
  )
}

// SelectInput
// ----------------------------------

type SelectInputProps = React.ComponentProps<typeof Command.Input>

export const SelectInput = ({ className, ...props }: SelectInputProps) => {
  return (
    <Command.Input data-slot=" select-input" asChild {...props}>
      <Input />
    </Command.Input >
  )
}


// =============================================================================
// Export (Composed + Primitives)
// =============================================================================


// -----------------------------------------------------------------------------
//  Require to be able to infer the _ChoiceValue from the choices prop to the onValueChange callback
// -----------------------------------------------------------------------------
// TypeScript cannot add a second generic parameter to forwardRef's call signature.
// To expose an inferable generic (_ChoiceValue), we publish our own call signature
// and delegate to SelectComposed. This only changes type surface, not runtime.
// The wrapper keeps both generics <_ChoiceValue, T> and relays T to SelectComposed,
// preserving polymorphism (as/asChild) while enabling _ChoiceValue inference from choices.
// Keep SelectComposed as-is with _ChoiceValue properly propagated internally.


function SelectTyped<_ChoiceValue extends ChoiceValue = ChoiceValue, T extends React.ElementType = "button">(
  props: SelectPolymorphicComposedProps<_ChoiceValue, T> & { ref?: PolymorphicRef<T> }
) {
  return <SelectComposed {...(props as any)} />;
}



export const Select = Object.assign(SelectTyped, {
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectCommandItem,
  Input: SelectInput,
});

export type {
  SelectComposedProps as SelectProps,
  SelectPolymorphicComposedProps as SelectPolymorphicProps,
  SelectValueProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectCommandItemProps,
  SelectInputProps,
};
