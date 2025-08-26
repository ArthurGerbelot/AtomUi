import { cva, VariantProps } from "class-variance-authority"

import { Atom, AtomProps } from "../core/Atom"
import { cn } from "../../lib/tailwind-utils"
import type { Size } from "../../tokens/base/base"
import * as React from "react"
import type { ComponentType, ReactNode } from "react"
import { asSmartSlot } from "../core/SmartSlot"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, resolveAtomTokens } from "../../lib"




// =============================================================================
// Icon
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Icon]
// -----------------------------------------------------------------------------
// Icon component for displaying (lucide) icons
//
// SMART PASSTHROUGH BEHAVIOR:
// This component is intentionally permissive and allows developers to accidentally
// wrap an Icon inside another Icon. When this happens, the outer Icon detects the
// inner Icon (via data-atom-icon attribute) and automatically:
// 1. Merges its props with the inner Icon's props (outer props have lower priority)
// 2. Returns the inner Icon directly, bypassing the wrapper
// 3. This prevents double-wrapping and ensures proper styling
//
// Example that works seamlessly:
// <Icon variant="hero" bgColor="bitcoin">
//   <IconError />  {/* This Icon receives variant="hero" and bgColor="bitcoin" */}
// </Icon>
//
// =============================================================================


// -----------------------------------------------------------------------------
// VARIANTS
// -----------------------------------------------------------------------------

export const iconVariants = [
  'default', 'mini', 'chip', 'medium', 'hero', 'jumbo',
] as const
export type IconVariant = typeof iconVariants[number]

const iconVariantsCva = cva("inline-block shrink-0", {
  variants: {
    variant: {
      default: "",
      mini: "rounded-full p-1 bg-primary",           // 32px - very small
      chip: "rounded-full p-[.25em] bg-primary",     // 56px - small
      medium: "rounded-full p-2 bg-primary",         // 80px - medium
      hero: "rounded-full p-3 bg-primary",           // 112px - large
      jumbo: "rounded-full p-4 bg-primary",          // 144px - very large
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

// Layout Variant sizes (handled in JavaScript instead of CSS to avoid conflicts)
// Not the same as size (xs, sm, ..) made to match the text size
const variantSizes = {
  default: null,  // Uses the size prop
  mini: 32,       // 8 * 4 = 32px
  chip: 56,       // 14 * 4 = 56px
  medium: 80,     // 20 * 4 = 80px
  hero: 112,      // 28 * 4 = 112px
  jumbo: 144,     // 36 * 4 = 144px
} as const;


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type IconSize = number | Size | undefined;

export type IconProps = Omit<AtomProps, 'children' | 'asChild' | 'size'>
  & VariantProps<typeof iconVariantsCva>
  & {
    icon?: ComponentType<any>
    size?: IconSize
    children?: ReactNode | ComponentType<any> | string
    __sizeOverride?: IconSize
  }

export type IconPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, IconProps>



// Icon size is independant of container (like IconButton size)
// We can choose any value, so make it bigger than classic text-size
const sizeMap: Record<Size, number> = {
  // xs: 12,
  // sm: 16,
  // md: 20,
  // lg: 24,
  // xl: 28,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
}


// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------


export const Icon = forwardRefPolymorphic<"span", IconProps>(
  function Icon<T extends React.ElementType = "span">(
    props: IconPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const {
      as,
      style,
      className,
      size = "md",
      icon: IconType,
      children,
      variant = "default",
      __sizeOverride,
      ...propsRest
    } = props;

    // Resolve atom tokens AFTER extracting our specific props
    const { className: atomClassName, style: atomStyle, ...rest } = resolveAtomTokens(propsRest);

    // Remove __sizeOverride from rest props to avoid passing it to DOM
    if ('__sizeOverride' in rest) {
      delete (rest as any).__sizeOverride;
    }

    // Size resolution with __sizeOverride support
    const variantSize = variantSizes[variant as keyof typeof variantSizes];
    const resolvedSize = __sizeOverride
      ? (typeof __sizeOverride === "string" ? sizeMap[__sizeOverride as Size] ?? 24 : __sizeOverride)
      : variantSize !== null
        ? variantSize
        : typeof size === "string"
          ? sizeMap[size as Size] ?? 24
          : size;

    const resolvedVariant = iconVariantsCva({ variant });

    // Smart passthrough: if we're wrapping another Icon, merge props and return it directly
    // Handle case where children is an array (with spaces and React elements)
    let childToCheck = children;
    if (Array.isArray(children)) {
      // Find the first React element in the array
      childToCheck = children.find(child => React.isValidElement(child));
    }

    if (React.isValidElement(childToCheck)) {
      const childType = (childToCheck as any).type;
      const childProps = (childToCheck as any).props || {};

      // Detect if we're wrapping another Icon component
      const isWrappingIcon = childType === Icon ||
        childProps?.['data-atom-icon'] === true ||
        'variant' in childProps ||
        'icon' in childProps ||
        // Detect Icon* components from icon library (IconError, IconInfo, etc.)
        (typeof childType === 'function' && childType.name?.startsWith('Icon'));

      if (isWrappingIcon) {
        // Merge wrapper props with child props (child props have priority)
        // Use propsRest to preserve atomic props (bgColor, textColor, etc.)
        const wrapperProps = {
          ...(variant !== "default" ? { variant } : {}),
          ...propsRest,
          className,
        };

        const mergedProps = {
          ...wrapperProps,
          ...childProps,
        };

        // Special handling for className merging
        if (wrapperProps.className && childProps.className) {
          mergedProps.className = cn(wrapperProps.className, childProps.className);
        }

        // Special handling for size vs variant conflicts
        // We need to keep styling but resolve size conflicts properly
        if (childProps.size && wrapperProps.variant) {
          // Child has explicit size, but keep parent variant for styling
          // The size resolution will happen later in the component
          mergedProps.__sizeOverride = childProps.size;
        } else if (childProps.variant && wrapperProps.size) {
          // Child has explicit variant, remove parent size to avoid conflicts
          delete mergedProps.size;
        }

        // Return child Icon with merged props, bypassing wrapper
        return React.cloneElement(childToCheck as React.ReactElement, mergedProps);
      }
    }

    let ResolvedIcon: React.ReactElement | undefined = undefined;

    // Use the same childToCheck logic for consistency
    if (React.isValidElement(childToCheck)) {
      ResolvedIcon = childToCheck
    } else if (typeof children === "function") {
      ResolvedIcon = React.createElement(children)
    } else if (IconType) {
      ResolvedIcon = <IconType />
    }

    return (
      <Atom
        ref={ref}
        className={cn(
          resolvedVariant,
          resolvedSize ? `size-[var(--icon-size)] w-[var(--icon-size)] h-[var(--icon-size)]` : {},
          atomClassName,
          className
        )}
        style={{
          "--icon-size": `${resolvedSize}px`,
          ...atomStyle,
          ...style
        } as React.CSSProperties}
        data-atom-icon={true}
        data-icon-size={true}
        as={(as ?? "span") as any}
        asChild
        {...rest}
      >
        {ResolvedIcon}
      </Atom>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartIcon = asSmartSlot(Icon);