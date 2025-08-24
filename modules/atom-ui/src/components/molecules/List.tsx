import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn, resolveAtomTokens } from "../../lib"
import { Atom, type AtomProps } from "../core/Atom"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { sizeVariants } from "../../tokens/base/base"
import { IconCheckboxChecked, IconCheckboxUnchecked } from "../atoms"
import { asSmartSlot } from "../core"

// =============================================================================
// List
// -----------------------------------------------------------------------------
// [Molecule] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Component to render lists with different variants
// =============================================================================


// -----------------------------------------------------------------------------
// VARIANTS & STYLING
// -----------------------------------------------------------------------------


// List
// ------------------

const listVariants = cva("m-0 p-0", {
  variants: {
    variant: {
      bullet: "list-disc list-inside",
      ordered: "list-decimal list-inside",
      none: "list-none",
      check: "list-none space-y-1",
      custom: "list-none space-y-1",
    },
    size: sizeVariants,
    spacing: {
      tight: "space-y-0.5",
      normal: "space-y-1",
      loose: "space-y-2",
    },
  },
  defaultVariants: {
    variant: "bullet",
    size: "md",
    spacing: "normal",
  },
})

// ListItem
// ------------------

const listItemVariants = cva("", {
  variants: {
    variant: {
      bullet: "list-disc list-inside pl-2",
      ordered: "list-decimal list-inside pl-2",
      none: "list-none",
      check: "list-none flex items-center gap-2",
      custom: "list-none flex items-center gap-2",
    },
    size: sizeVariants,
  },
  defaultVariants: {
    variant: "bullet",
  },
})

// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

// List
// ------------------

type ListOwnProps = VariantProps<typeof listVariants>

type ListProps = AtomProps & ListOwnProps;

type ListPolymorphicProps<T extends React.ElementType = "ul"> =
  PolymorphicProps<T, ListProps>

// ListItem
// ------------------

type ListItemOwnProps = VariantProps<typeof listItemVariants> & {
  bullet?: React.ReactNode
  label?: React.ReactNode
  checked?: boolean
}
type ListItemProps = AtomProps & ListItemOwnProps;

type ListItemPolymorphicProps<T extends React.ElementType = "li"> =
  PolymorphicProps<T, ListItemProps>

// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------



// Composed List (NOPE - Add to much props for that on Choice.. And dont care about "Choice" here.. Will never been used)
// -----------------------------------------------------------------------------
// @TODO Later:
// - List with props (like typeof props)
// - Accepts a list of Choices (like Select)
// - Render them




// List
// -----------------------------------------------------------------------------

/**
 * The List component around all types of items.
 */
const ListBase = forwardRefPolymorphic<"ul", ListProps>(
  function List<T extends React.ElementType = "ul">(
    props: ListPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { variant = "custom", size, spacing, children, ...restProps } = props;

    const { as, asChild, className, ...rest } = resolveAtomTokens(restProps)
    const element = as ?? (variant === "ordered" ? "ol" : "ul")

    return (
      <Atom
        ref={ref}
        as={element as any}
        asChild={asChild}
        className={cn(listVariants({ variant, size, spacing }), className)}
        {...rest}
      >
        {children}
      </Atom>
    )
  }
)

// List.Item
// -----------------------------------------------------------------------------

/**
 * The List.Item component that renders a single item in a list. By default a bullet point
 */
const ListItem = forwardRefPolymorphic<"li", ListItemProps>(
  function ListItem<T extends React.ElementType = "li">(
    props: ListItemPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      className,
      variant = "bullet",
      size,
      bullet,
      label,
      checked,
      children,
      ...restProps
    } = props;

    const { as, asChild, className: atomClass, ...rest } = resolveAtomTokens(restProps)

    let bulletContent: React.ReactNode = null
    let contentElement: React.ReactNode = children

    switch (variant) {
      case "check":
        bulletContent = checked ? <IconCheckboxChecked /> : <IconCheckboxUnchecked />
        break
      case "custom":
        bulletContent = bullet
        break
    }

    return (
      <Atom
        ref={ref}
        as={(as ?? "li") as any}
        asChild={asChild}
        className={cn(listItemVariants({ variant, size }), atomClass, className)}
        {...rest}
      >
        {bulletContent && (
          <span className="flex-shrink-0 mt-0.5">
            {bulletContent}
          </span>
        )}
        <span className={cn(size && sizeVariants[size as keyof typeof sizeVariants], "flex-1")}>
          {contentElement}
        </span>
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// Convenience components
// -----------------------------------------------------------------------------

const OrderedList = React.forwardRef<HTMLOListElement, Omit<ListProps, "variant">>(
  (props, ref) => <List ref={ref} variant="ordered" {...props} />
)
const CustomList = React.forwardRef<HTMLUListElement, Omit<ListProps, "variant">>(
  (props, ref) => <List ref={ref} variant="custom" {...props} />
)

const OrderedListItem = React.forwardRef<HTMLLIElement, Omit<ListItemProps, "variant">>(
  (props, ref) => <ListItem ref={ref} variant="ordered" {...props} />
)
const CheckListItem = React.forwardRef<HTMLLIElement, Omit<ListItemProps, "variant">>(
  (props, ref) => <ListItem ref={ref} variant="check" {...props} />
)
const CustomListItem = React.forwardRef<HTMLLIElement, Omit<ListItemProps, "variant">>(
  (props, ref) => <ListItem ref={ref} variant="custom" {...props} />
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

const SmartList = asSmartSlot(ListBase);
const SmartListItem = asSmartSlot(ListItem);

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export const List = Object.assign(ListBase, {
  // Ordered: OrderedList,
  // Custom: CustomList,
  SmartList: SmartList,

  Item: ListItem,
  OrderedItem: OrderedListItem,
  CheckItem: CheckListItem,
  CustomItem: CustomListItem,
  SmartItem: SmartListItem,
});

export type {
  ListProps, ListPolymorphicProps,
  ListItemProps, ListItemPolymorphicProps,
};