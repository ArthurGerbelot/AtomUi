"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { type AtomProps } from "../core/Atom"
import type { BadgeProps } from "../atoms/Badge"
import type { Choice, ChoiceValue } from "../../lib/choices"
import { regroupChoices, overrideChoicesBadgeProps, addGroupLabels, toChoiceObject } from "../../lib/choices"
import { ChoiceBadgeProps, SmartChoiceBadge } from "../atoms/ChoiceBadge"
import { createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot } from "../core"
import { cn, resolveAtomTokens } from "../../lib"
import { selectBaseChoiceBadgeProps, selectTriggerVariants, selectFilterDefault } from "../../lib/select"
import { Command, Popover, Select as BaseSelect, Select } from "."

// =============================================================================
// MultiSelect (Advanced)
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type MultiSelectComposedOwnProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = {
  choices: Choice<_ChoiceValue>[]
  placeholder?: string
  groupLabels?: Record<string, React.ReactNode>

  // Advanced features
  searchable?: boolean
  searchPlaceholder?: string
  noResultsPlaceholder?: string
  filter?: (value: string, search: string, keywords?: string[]) => number

  // Controlled/uncontrolled (multiple)
  value?: _ChoiceValue[]
  defaultValue?: _ChoiceValue[]
  onValueChange?: (v: _ChoiceValue[]) => void

  // SmartSlot
  overrideChoiceBadgeProps?: Partial<BadgeProps>
}
  & SmartSlot<ChoiceBadgeProps, "choiceBadge">
  & VariantProps<typeof selectTriggerVariants>

export type MultiSelectComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = MultiSelectComposedOwnProps<_ChoiceValue> & AtomProps
export type MultiSelectPolymorphicComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue, T extends React.ElementType = "div"> =
  PolymorphicProps<T, MultiSelectComposedProps<_ChoiceValue>>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION (Composed)
// -----------------------------------------------------------------------------

const MultiSelectComposed = forwardRefPolymorphic<"button", MultiSelectComposedProps<ChoiceValue>>(
  function MultiSelectComposed<_ChoiceValue extends ChoiceValue = ChoiceValue, T extends React.ElementType = "button">(
    {
      choices,
      placeholder = "Select",
      size = "md",
      groupLabels,

      choiceBadge, choiceBadgeProps, ChoiceBadge,
      overrideChoiceBadgeProps,

      searchable = true,
      searchPlaceholder = "Search…",
      noResultsPlaceholder = "No results",
      filter,

      value,
      defaultValue,
      onValueChange,

      ...rest
    }: MultiSelectPolymorphicComposedProps<_ChoiceValue, T>,
    ref: PolymorphicRef<T>
  ) {

    // State (multiple)
    const [open, setOpen] = React.useState(false)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<_ChoiceValue[] | undefined>(defaultValue as _ChoiceValue[] | undefined)
    const current = (isControlled ? value : internalValue) as _ChoiceValue[] | undefined
    const selectedValues = current ?? ([] as _ChoiceValue[])
    const selectedSet = React.useMemo(() => new Set<any>(selectedValues as any), [selectedValues])

    const setMulti = React.useCallback((next: _ChoiceValue[]) => {
      if (isControlled) onValueChange?.(next)
      else {
        setInternalValue(next)
        onValueChange?.(next)
      }
    }, [isControlled, onValueChange])

    const toggleValue = React.useCallback((val: _ChoiceValue) => {
      const exists = selectedSet.has(val as any)
      const next = exists
        ? (selectedValues.filter(v => v !== val) as _ChoiceValue[])
        : ([...selectedValues, val] as _ChoiceValue[])
      setMulti(next)
    }, [selectedSet, selectedValues, setMulti])

    // Resolve tokens
    const { className, style, as, ...rootProps } = resolveAtomTokens(rest)

    // Prepare choices
    const choicesWithOverrides = React.useMemo(
      () => overrideChoicesBadgeProps(choices, overrideChoiceBadgeProps),
      [choices, overrideChoiceBadgeProps]
    )

    const groupsInOrder = React.useMemo(
      () => addGroupLabels(regroupChoices(choicesWithOverrides), groupLabels as any),
      [choicesWithOverrides, groupLabels]
    )

    const allChoices = React.useMemo(() =>
      groupsInOrder.flatMap((g: any) => g.choices.map((it: any) => toChoiceObject(it))),
      [groupsInOrder]
    )

    const selectedChoices = React.useMemo(() =>
      allChoices.filter((c: any) => selectedSet.has(c.value as any)),
      [allChoices, selectedSet]
    )

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Select.Trigger
            as={as as any}
            ref={ref}
            size={size}
            className={className}
            style={style}
            {...rootProps as any}
          >
            <Select.Value>
              {selectedChoices.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1 w-full">
                  {selectedChoices.map((c: any) => (
                    <SmartChoiceBadge
                      key={String(c.value)}
                      forceRender
                      baseSpecs={{ props: selectBaseChoiceBadgeProps }}
                      specs={createSmartSlotSpecs(choiceBadge, choiceBadgeProps, ChoiceBadge)}
                      choice={c}
                    />
                  ))}
                </div>
              ) : (placeholder)}
            </Select.Value>
          </Select.Trigger>
        </Popover.Trigger>

        <Select.Content>
          <Command.Root filter={filter || selectFilterDefault}>
            {searchable && (
              <Select.Input placeholder={searchPlaceholder} className="h-9" />
            )}
            <Command.List>
              <Command.Empty>{noResultsPlaceholder}</Command.Empty>
              {groupsInOrder.map((group: any, gi: number) => (
                <Command.Group key={`${group.key}-${gi}`} heading={group.heading}>
                  {group.choices.map((it: any) => {
                    const c = toChoiceObject(it)
                    const isSelected = selectedSet.has(c.value as any)
                    return (
                      <Select.Item
                        key={String(c.value)}
                        choice={c}
                        isSelected={isSelected}
                        onSelect={() => {
                          toggleValue(c.value as _ChoiceValue)
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
        </Select.Content>
      </Popover.Root>
    )
  }
)

// =============================================================================
// EXPORT
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


function MultiSelectTyped<_ChoiceValue extends ChoiceValue = ChoiceValue, T extends React.ElementType = "button">(
  props: MultiSelectPolymorphicComposedProps<_ChoiceValue, T> & { ref?: PolymorphicRef<T> }
) {
  return <MultiSelectComposed {...(props as any)} />;
}


// Re-use Primitive from Select (both share the sames, MultiSelect is a pre-configured Select with Multi value support)
// No need to re-export form here.

export { MultiSelectTyped as MultiSelect }
// No need to use assign here. Cause issue without any {} at the end (typing is wrong without)
// export const MultiSelect = Object.assign(MultiSelectTyped, {})


export type {
  MultiSelectComposedProps as MultiSelectProps,
  MultiSelectPolymorphicComposedProps as MultiSelectPolymorphicProps,
}