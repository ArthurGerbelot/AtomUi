"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Atom, type AtomProps } from "../core/Atom"
import type { BadgeProps } from "../atoms/Badge"
import { Size } from "../../tokens/base/base"
import { surfaceVariants } from "../../tokens"
import type { Choice, ChoiceValue } from "../../lib/choices"
import { regroupChoices, overrideChoicesBadgeProps, addGroupLabels } from "../../lib/choices"
import { ChoiceBadgeProps, SmartChoiceBadge } from "../atoms/ChoiceBadge"
import { createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot } from "../core"
import { cn, resolveAtomTokens } from "../../lib"
import { IconCheck, IconChevronDown } from "../atoms/IconLibrary"
import { selectBaseChoiceBadgeProps, selectTriggerVariants, selectFilterDefault } from "../../lib/select"
import { Command, Popover } from "."

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

type SelectComposedOwnProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = {
  choices: Choice<_ChoiceValue>[]

  placeholder?: string
  groupLabels?: Record<string, React.ReactNode>

  // Advanced features
  searchable?: boolean
  searchPlaceholder?: string
  noResultsPlaceholder?: string
  filter?: (value: string, search: string, keywords?: string[]) => number

  // Controlled/uncontrolled
  value?: _ChoiceValue
  defaultValue?: _ChoiceValue
  onValueChange?: (v: _ChoiceValue) => void

  // SmartSlot `choiceBadgeProps` - low priority; use overrideChoiceBadgeProps to force
  overrideChoiceBadgeProps?: Partial<BadgeProps>
}
  & SmartSlot<ChoiceBadgeProps, "choiceBadge"> // { choiceBadge, choiceBadgeProps, ChoiceBadge }
  & VariantProps<typeof selectTriggerVariants> // { size }


// Compose props: Own + Atom
export type SelectComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = SelectComposedOwnProps<_ChoiceValue>
  & AtomProps

export type SelectPolymorphicComposedProps<T extends React.ElementType = "div", _ChoiceValue extends ChoiceValue = ChoiceValue> =
  PolymorphicProps<T, SelectComposedProps<_ChoiceValue>>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION (Composed)
// -----------------------------------------------------------------------------

const SelectComposed = forwardRefPolymorphic<"button", SelectComposedProps<ChoiceValue>>(
  function SelectComposed<T extends React.ElementType = "button", _ChoiceValue extends ChoiceValue = ChoiceValue>(
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
    }: SelectPolymorphicComposedProps<T, _ChoiceValue>,
    ref: PolymorphicRef<T>
  ) {

    // ------------------------------
    // 1) State (open + value)
    // ------------------------------
    const [open, setOpen] = React.useState(false)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<_ChoiceValue | undefined>(defaultValue as _ChoiceValue | undefined)
    const current = (isControlled ? value : internalValue) as _ChoiceValue | undefined

    const setValue = React.useCallback((v: unknown) => {
      const next = (v && typeof v === "object" && (v as any).value !== undefined) ? (v as any).value as _ChoiceValue : v as _ChoiceValue
      if (isControlled) onValueChange?.(next)
      else {
        setInternalValue(next)
        onValueChange?.(next)
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
      if (current == null) return undefined
      for (const group of groupsInOrder) {
        const found = group.choices.find((it: any) => (it instanceof Object ? it.value : it) === current)
        if (found) return (found instanceof Object ? found : { value: found })
      }
      return undefined
    }, [groupsInOrder, current]) as any

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
              <Command.Input placeholder={searchPlaceholder} className="h-9" />
            )}
            <Command.List>
              <Command.Empty>{noResultsPlaceholder}</Command.Empty>
              {groupsInOrder.map((group: any, gi: number) => (
                <Command.Group key={`${group.key}-${gi}`} heading={group.heading}>
                  {group.choices.map((it: any) => (
                    <SelectCommandItem
                      key={String((it instanceof Object ? it.value : it))}
                      choice={it}
                      isSelected={current === (it instanceof Object ? it.value : it)}
                      onSelect={(v) => {
                        setValue(v)
                        setOpen(false)
                      }}
                      choiceBadge={choiceBadge}
                      choiceBadgeProps={choiceBadgeProps}
                      ChoiceBadge={ChoiceBadge}
                    />
                  ))}
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
export type SelectValueProps = AtomProps & SelectValueOwnProps
export type SelectValuePolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, SelectValueProps>

export const SelectValue = forwardRefPolymorphic<"span", SelectValueProps>(
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
export type SelectTriggerProps = AtomProps & SelectTriggerOwnProps
export type SelectTriggerPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, SelectTriggerProps>

export const SelectTrigger = forwardRefPolymorphic<"button", SelectTriggerProps>(
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
  return (
    <Command.Item
      keywords={_choice.keywords}
      value={String(_choice.value)}
      onSelect={() => onSelect(_choice.value as T)}
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
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


// =============================================================================
// Export (Composed + Primitives)
// =============================================================================

export const Select = Object.assign(SelectComposed, {
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectCommandItem,
}) as unknown as {
  <V extends ChoiceValue = ChoiceValue, T extends React.ElementType = "button">(
    props: SelectPolymorphicComposedProps<T, V> & { ref?: PolymorphicRef<T> }
  ): React.ReactElement | null
  Value: typeof SelectValue
  Trigger: typeof SelectTrigger
  Content: typeof SelectContent
  Item: typeof SelectCommandItem
}

export type { SelectComposedProps as SelectProps }
