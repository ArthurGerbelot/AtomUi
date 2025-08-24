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
// =============================================================================


// -----------------------------------------------------------------------------
// VARIANTS
// -----------------------------------------------------------------------------

const iconVariants = cva("inline-block shrink-0", {
  variants: {
    variant: {
      default: "",
      small: "size-10 rounded-full p-[.25em] bg-primary",
      big: "size-28 rounded-full p-3 bg-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})



// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type IconSize = number | Size | undefined;

export type IconProps = Omit<AtomProps, 'children' | 'asChild' | 'size'>
  & VariantProps<typeof iconVariants>
  & {
    icon?: ComponentType<any>
    size?: IconSize
    children?: ReactNode | ComponentType<any> | string
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
    {
      icon: IconType,
      children,
      size = "md",
      variant = "default",
      ...props
    }: IconPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // If textColor is provided, use it, otherwise use colorTheme
    const color = (props as any)?.textColor ?? (props as any)?.colorTheme


    // Resolve the atom tokens
    const { as, className, ...rest } = resolveAtomTokens({ ...(props as any), ...(color ? { textColor: color } : {}) });
    const resolvedSize = typeof size === "string" ? sizeMap[size as Size] ?? 24 : size



    // For both ResolvedElement and ResolvedIcon
    const sharedProps = {
      // className: cn("inline-block leading-none"),
      className: cn("inline-block leading-none text-inherit"),
      "data-slot": "icon",
      "data-icon-size": true, // To disactivate the default size-4 on BaseButton [&_svg:not([data-icon-size])]:size-4
      "aria-hidden": true,
      ...(resolvedSize ? { width: resolvedSize, height: resolvedSize, size: resolvedSize } : {})
    } as IconProps;

    const wrapperClass = cn(
      "inline-flex items-center justify-center align-bottom leading-[0]",
      iconVariants({ variant }),
      // "w-[var(--icon-size)] h-[var(--icon-size)]",

      // No-op pour contourner [&_svg:not([class*='size-'])]
      // "size-empty", // No more needed now that we have data-icon-size ??
      className
    )


    let ResolvedIcon: ComponentType<any> | undefined = IconType
    let ResolvedElement: React.ReactElement | undefined

    if (!ResolvedIcon && React.isValidElement(children)) {

      const childrenProps = (children as any)?.props;
      const { className: childrenClassName, style: childrenStyle, ...rest } = resolveAtomTokens(childrenProps);

      sharedProps.className = cn(sharedProps.className, childrenClassName);
      sharedProps.style = { ...sharedProps.style, ...childrenStyle };


      // Clone the element with the shared props
      ResolvedElement = React.cloneElement(children as React.ReactElement, { ...sharedProps, ...rest })
    }

    if (!ResolvedIcon && typeof children === "function") {
      ResolvedIcon = children as unknown as ComponentType<any>
    }

    if (!ResolvedIcon && children && !React.isValidElement(children) && typeof children !== "string") {
      ResolvedIcon = children as unknown as ComponentType<any>
    }

    if (!ResolvedIcon && !ResolvedElement && process.env.NODE_ENV !== 'production') {
      console.warn('[Icon] Unable to resolve icon from:', children)
    }


    return (
      <Atom
        ref={ref}
        as={(as ?? "span") as any}
        className={wrapperClass}
        style={
          resolvedSize ? ({ ["--icon-size"]: `${resolvedSize}px` } as React.CSSProperties) : undefined
        }
        // {...(resolvedSize ? { width: `${resolvedSize}px`, height: `${resolvedSize}px`, size: `${resolvedSize}px` } : {})}
        {...rest}
      >
        {
          ResolvedElement
            ? ResolvedElement
            : ResolvedIcon
              ? (
                <ResolvedIcon
                  {...sharedProps}
                />
              )
              : null
        }
      </Atom >
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartIcon = asSmartSlot(Icon);