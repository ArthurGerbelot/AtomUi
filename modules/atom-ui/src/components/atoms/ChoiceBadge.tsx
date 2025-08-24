import * as React from "react"
import { SmartBadge, type BadgeProps } from "./Badge"
import { TextWithIcon } from "./TextWithIcon"
import { forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../../lib/core/polymorphic-helpers"
import { Choice } from "../../lib/choices"
import { pickSmartSlotSpecs, expandSmartSlotSpecs, asSmartSlot } from "../core/SmartSlot"
import { IconProps } from "./Icon"
import { TextProps } from "./Text"



// =============================================================================
// ChoiceBadge
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Typography] [Choice]
// -----------------------------------------------------------------------------
// Badge variant using a Choice to render the badge style/content
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type ChoiceBadgeOwnProps = {
  choice: Choice
  badgeOverrideProps?: Partial<BadgeProps>
}

export type ChoiceBadgeProps = BadgeProps & ChoiceBadgeOwnProps

export type ChoiceBadgePolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, ChoiceBadgeProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * Badge variant using a Choice to render the badge style/content
 *
 * @param props - ChoiceBadgeProps
 * @returns ChoiceBadge component
 */
export const ChoiceBadge = forwardRefPolymorphic<"span", ChoiceBadgeProps>(
  function ChoiceBadge<T extends React.ElementType = "span">(
    props: ChoiceBadgePolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const {
      choice,
      colorTheme,
      badgeOverrideProps,
      ...rest
    } = props

    const forwardedSize = (props as any)?.size;

    const _choice = (choice instanceof Object ? choice : { value: choice });

    const badgeSpecs = pickSmartSlotSpecs<BadgeProps>(_choice, 'badge');
    const iconSpecs = pickSmartSlotSpecs<IconProps>(_choice, 'icon');
    const textSpecs = pickSmartSlotSpecs<TextProps>(_choice, 'description');

    // Inject colorTheme: prefer explicit prop, fallback to choice.colorTheme, keep existing if already set
    const computedColorTheme = (_choice?.colorTheme ?? colorTheme);
    if (computedColorTheme && (!badgeSpecs.props || badgeSpecs.props.colorTheme == null)) {
      badgeSpecs.props = {
        ...(badgeSpecs.props as any),
        colorTheme: computedColorTheme,
      } as any;
    }

    // Inject surface from Choice root shorthand unless already set in badgeSpecs
    const computedSurface = _choice?.surface;
    if (computedSurface && (!badgeSpecs.props || (badgeSpecs.props as any).surface == null)) {
      badgeSpecs.props = {
        ...(badgeSpecs.props as any),
        surface: computedSurface as any,
      } as any;
    }

    // Apply Select-level overrides with highest priority (instance-specific)
    if (badgeOverrideProps) {
      badgeSpecs.props = {
        ...(badgeSpecs.props as any),
        ...(badgeOverrideProps as any),
      } as any
    }

    // @TODO: Handle tooltip once we have a Tooltip Component
    // const tooltipSpecs = pickSmartSlotSpecs(rest, 'tooltip');

    // Do we want to render the description ?? Probably not.
    // const descriptionSpecs = pickSmartSlotSpecs(rest, 'description');

    return (
      <SmartBadge
        surface="subtle"
        data-value={_choice.value}
        ref={ref as any}
        specs={badgeSpecs}
        {...rest as any}
      >
        <TextWithIcon
          size={forwardedSize}
          // Expand the icon and text slots into props (as TextWith Icon is waiting for the specs as root props)
          {...expandSmartSlotSpecs(iconSpecs, 'icon')}
          {...expandSmartSlotSpecs(textSpecs, 'text')}
          text={(textSpecs.content ?? _choice.label ?? _choice.value)}
        />
      </SmartBadge>
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

export const SmartChoiceBadge = asSmartSlot(ChoiceBadge);