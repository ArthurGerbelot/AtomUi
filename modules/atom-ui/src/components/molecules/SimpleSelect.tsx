import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"

import { BadgeProps, ChoiceBadgeProps, IconChevronDown, IconChevronUp, IconSelected, Separator, SmartChoiceBadge } from "../atoms"
import { Atom, AtomProps } from "../core/Atom"
import { addGroupLabels, overrideChoicesBadgeProps, regroupChoices, toChoiceObject, type Choice, type ChoiceValue } from "../../lib/choices"
import { selectBaseChoiceBadgeProps, selectTriggerVariants } from "../../lib/select"
import { createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot } from "../core"
import { cn, resolveAtomTokens } from "../../lib"
import { surfaceVariants } from "../../tokens"


// =============================================================================
// SimpleSelect
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Accessible select built with Radix UI and styled via Atom tokens
// for basic Select without search, multi-select, etc.
// =============================================================================



// =============================================================================
// SimpleSelect Composed - one‑shot API
// =============================================================================

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type SimpleSelectComposedOwnProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = {
  choices: Choice<_ChoiceValue>[]

  placeholder?: string
  groupLabels?: Record<string, string | React.ReactNode>



  // SmartSlot `choiceBadgeProps` - have lower priority override the choice.badgeProps
  // so use `overrideChoiceBadgeProps` to override everything
  overrideChoiceBadgeProps?: Partial<BadgeProps>
}
  & SmartSlot<ChoiceBadgeProps, "choiceBadge">  // { choiceBadge, choiceBadgeProps, ChoiceBadge }
  & VariantProps<typeof selectTriggerVariants>  // { size }


// Compose props: Own + Radix Root Primitive + (Trigger) Variant + Atom
type SimpleSelectComposedProps<_ChoiceValue extends ChoiceValue = ChoiceValue> = SimpleSelectComposedOwnProps<_ChoiceValue>
  & Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, "children">
  & AtomProps


type SimpleSelectPolymorphicComposedProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, SimpleSelectComposedProps<ChoiceValue>>


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Accessible select built with Radix UI and styled via Atom tokens
 * for basic Select without search, multi-select, etc.
 */
const SimpleSelectComposed = forwardRefPolymorphic<"button", SimpleSelectComposedProps<ChoiceValue>>(
  function SimpleSelectComposed<T extends React.ElementType = "button">(
    {
      choices,
      placeholder = "Select",
      size = "md",
      groupLabels,

      // ChoiceBadge SmartSlot props (lower priority than choice.badgeProps)
      choiceBadge, choiceBadgeProps, ChoiceBadge,
      // Override choice badge props (highest priority)
      overrideChoiceBadgeProps,

      ...rest // atomic and radix root primitive props
    }: SimpleSelectPolymorphicComposedProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // 1. Split props
    // ------------------------------

    // Resolve Atomic props - Rest is for the Radix Root Primitive
    const { className, style, as, ...rootProps } = resolveAtomTokens(rest)


    // 2. Prepare choices
    // ------------------------------

    // 2.1. Override choices badge props
    const choicesWithOverrides = overrideChoicesBadgeProps(choices, overrideChoiceBadgeProps)
    // 2.2. Regroup choices
    const regroupedChoices = regroupChoices(choicesWithOverrides)
    // 2.3. Add group labels
    const choicesWithGroupLabels = addGroupLabels(regroupedChoices, groupLabels)


    // 3. Render
    // ------------------------------

    return (
      <SelectRoot {...rootProps}>
        <SelectTrigger
          as={as as any}
          ref={ref}
          className={cn(selectTriggerVariants({ size }), className)}
          style={style}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {choicesWithGroupLabels.map((group, i) => (
            <React.Fragment key={`grp-${group.key}-${i}`}>
              {i != 0 && <SelectSeparator />}
              <SelectGroup>
                {group.heading && <SelectLabel>{group.heading}</SelectLabel>}
                {group.choices.map((it, idx) => {
                  const c = toChoiceObject(it);
                  return (
                    <SelectItem key={String(c.value)} value={String(c.value)} disabled={c.disabled}>
                      <SmartChoiceBadge
                        forceRender
                        size={size}
                        baseSpecs={{ props: { size, ...selectBaseChoiceBadgeProps } }}
                        specs={createSmartSlotSpecs(choiceBadge, choiceBadgeProps, ChoiceBadge)}
                        choice={c}
                      />
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </React.Fragment>
          ))}
        </SelectContent >
      </SelectRoot>
    );

  }
);


// =============================================================================
// Primitives SimpleSelect
// =============================================================================



// -----------------------------------------------------------------------------
// SelectRoot
// -----------------------------------------------------------------------------

type SimpleSelectRootProps = React.ComponentProps<typeof SelectPrimitive.Root>
/**
 * Stateful container (Radix Root) handling a11y and value
 */
function SelectRoot({
  ...props
}: SimpleSelectRootProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}


// -----------------------------------------------------------------------------
// SelectGroup
// -----------------------------------------------------------------------------

type SimpleSelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>

/**
 * Logical grouping for items (Radix Group)
 */
function SelectGroup({
  ...props
}: SimpleSelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}


// -----------------------------------------------------------------------------
// SelectValue
// -----------------------------------------------------------------------------

type SimpleSelectValueOwnProps = { placeholder?: string }
type SimpleSelectValueProps = AtomProps & SimpleSelectValueOwnProps
type SimpleSelectValuePolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, SimpleSelectValueProps>

/**
 * Default value renderer (mirrors the selected <SelectItem>)
 */
const SelectValue = forwardRefPolymorphic<"span", SimpleSelectValueProps>(
  function SelectValue<T extends React.ElementType = "span">(
    { placeholder, ...atomProps }: SimpleSelectValuePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { className, style, as, ...rest } = resolveAtomTokens(atomProps)
    return (
      <Atom
        ref={ref}
        as={as as any}
        data-slot="select-value"
        className={className}
        style={style}
        {...rest}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// CustomSelectValue
// -----------------------------------------------------------------------------

type SimpleSelectCustomValueOwnProps = SimpleSelectValueOwnProps & { value?: string }
type SimpleSelectCustomValueProps = AtomProps & SimpleSelectCustomValueOwnProps
type SimpleSelectCustomValuePolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, SimpleSelectCustomValueProps>

/**
 * Custom value renderer (polymorphic). You control the rendered content via children.
 * Provide placeholder/value so the component can manage a11y attributes.
 */
const SelectCustomValue = forwardRefPolymorphic<"span", SimpleSelectCustomValueProps>(
  function SelectCustomValue<T extends React.ElementType = "span">(
    { placeholder, value, ...atomProps }: SimpleSelectCustomValuePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { className, style, as, asChild, children, ...rest } = resolveAtomTokens(atomProps)
    return (
      <Atom
        ref={ref}
        as={(as ?? "span") as any}
        asChild={asChild}
        className={className}
        style={style}
        data-slot="select-value"
        aria-label={value}
        data-placeholder={!value && placeholder}
        {...rest}
      >
        {!!value ? (children || value) : (placeholder)}
      </Atom>
    )
  }
)


// -----------------------------------------------------------------------------
// SelectTrigger
// -----------------------------------------------------------------------------

// TYPES DEFINITIONS
// ------------------------------

type SimpleSelectTriggerOwnProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTriggerVariants>
type SimpleSelectTriggerProps = AtomProps & SimpleSelectTriggerOwnProps
type SimpleSelectTriggerPolymorphicProps<T extends React.ElementType = "button"> =
  PolymorphicProps<T, SimpleSelectTriggerProps>

// COMPONENT IMPLEMENTATION
// ------------------------------

/**
 * Select trigger (Radix Trigger)
 * Visual part of the Select component on the Form
 */
const SelectTrigger = forwardRefPolymorphic<"button", SimpleSelectTriggerProps>(
  function SelectTrigger<T extends React.ElementType = "button">(
    { size = "md", children, ...props }: SimpleSelectTriggerPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { className, style, as, asChild, ...rest } = resolveAtomTokens(props)
    return (
      <SelectPrimitive.Trigger asChild data-slot="select-trigger">
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
          <SelectPrimitive.Icon asChild>
            <IconChevronDown className="opacity-50" />
          </SelectPrimitive.Icon>
        </Atom>
      </SelectPrimitive.Trigger>
    )

  }
)


// -----------------------------------------------------------------------------
// SelectContent
// -----------------------------------------------------------------------------

type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content>

/**
 * Popover container with viewport (Radix Content)
 */
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) {
  const { className: atomClass, style, ...rest } = resolveAtomTokens(props as any)
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          surfaceVariants.popover,
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          atomClass,
          className
        )}
        position={position}
        style={style}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}




// -----------------------------------------------------------------------------
// SelectLabel
// -----------------------------------------------------------------------------

type SimpleSelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>

/**
 * Group title (must be inside Group)
 */
function SelectLabel({
  className,
  ...props
}: SimpleSelectLabelProps) {
  const { className: atomClass, style, ...rest } = resolveAtomTokens(props as any)
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", atomClass, className)}
      style={style}
      {...rest}
    />
  )
}


// -----------------------------------------------------------------------------
// SelectItem
// -----------------------------------------------------------------------------

type SimpleSelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>

/**
 * Selectable option (Radix Item)
 */
function SelectItem({
  className,
  children,
  value,
  ...props
}: SimpleSelectItemProps) {
  const { className: atomClass, style, ...rest } = resolveAtomTokens(props as any)
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      value={value}
      className={cn(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground hover:bg-low-contrast/20 focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([data-icon-size])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        atomClass,
        className
      )}
      style={style}
      {...rest}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <IconSelected />
        </SelectPrimitive.ItemIndicator>
      </span>
      {/* {children} */}
      <SelectPrimitive.ItemText>
        <span className="flex items-center gap-2 leading-none">{children}</span>
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}


// -----------------------------------------------------------------------------
// SelectSeparator
// -----------------------------------------------------------------------------

type SimpleSelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>
/**
 * Visual divider between groups/sections
 */
function SelectSeparator({
  className,
  ...props
}: SimpleSelectSeparatorProps) {
  const { className: atomClass, style, ...rest } = resolveAtomTokens(props as any)
  return (
    <Separator
      my={1}
      data-slot="select-separator"
      className={cn(atomClass, className)}
      style={style}
      {...rest}
    />
  )
}


// -----------------------------------------------------------------------------
// Scroll Up/Down Buttons  (Not exported)
// -----------------------------------------------------------------------------

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <IconChevronUp className="opacity-50" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <IconChevronDown className="opacity-50" />
    </SelectPrimitive.ScrollDownButton>
  )
}



// =============================================================================
// Export
// =============================================================================


export const SimpleSelect = Object.assign(SimpleSelectComposed, {
  Root: SelectRoot,
  Content: SelectContent,
  Group: SelectGroup,
  Value: SelectValue,
  CustomValue: SelectCustomValue,
  Item: SelectItem,
  Label: SelectLabel,
  Separator: SelectSeparator,
  Trigger: SelectTrigger,
});


export type {
  SimpleSelectComposedOwnProps,
  SimpleSelectComposedProps as SimpleSelectProps,
  SimpleSelectRootProps,
  SimpleSelectGroupProps,
  SimpleSelectValueProps,
  SimpleSelectCustomValueProps,
  SimpleSelectItemProps,
  SimpleSelectLabelProps,
  SimpleSelectSeparatorProps,
  SimpleSelectTriggerProps,
}