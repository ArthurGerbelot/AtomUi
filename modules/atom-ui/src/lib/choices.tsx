
import { SmartSlot } from "../components/core/SmartSlot";
import { IconProps } from "../components/atoms/Icon";
import { BadgeProps, TextProps } from "@uikit/components";
import { ColorTheme, Surface } from "@uikit/tokens";


// =========================================
//  Types
// =========================================

// Move
// ------
// @TODO: Translation?? string | JSX.Element
export type Translation = string;            // @TODO: Translation?? string | JSX.Element







export type ChoiceValue = string | number | boolean;

type IconSlot = SmartSlot<IconProps, 'icon'>;
type BadgeSlot = SmartSlot<BadgeProps, 'badge'>;
type TextSlot = SmartSlot<TextProps, 'description'>;
type TooltipSlot = SmartSlot<TextProps, 'tooltip'>;  // Up to TooltipProps once we implement it.

// Allow SelectOption value to be extended (to use it with enum, ...)

export type ChoiceObject<_ChoiceValue extends ChoiceValue = ChoiceValue> = {

  /** Business value (typed) */
  value: _ChoiceValue                        // (string | number | boolean),
  /** Human-readable label */
  label?: Translation              // TranslationType (string | JSX.Element)
  // isLabelLoading?: boolean,    // Is Translation loaded ? (still a thing ? keep the ideain case it become  thing..)


  // Shorthand helpers for common badge props
  // These can be set directly on the root object instead of using badgeProps: {}
  // If both are provided, badgeProps takes precedence
  colorTheme?: ColorTheme
  surface?: Surface
  // -------

  // Grouping
  group?: string | null;
  // Disabled
  disabled?: boolean;

  /** Additional search tokens included by default in filtering */
  keywords?: string[];
}
  /** Additional data */
  & TextSlot
  & TooltipSlot

  /** Visual SmartSlots */
  & IconSlot
  & BadgeSlot;


export type Choice<_ChoiceValue extends ChoiceValue = ChoiceValue> = _ChoiceValue | ChoiceObject<_ChoiceValue>



// =========================================
//  Helpers (shared by Select/SimpleSelect/MultiSelect)
// =========================================

/**
 * Ensure to work with a ChoiceObject.
 * @param choice - The choice to convert.
 * @returns The choice as a ChoiceObject.
 */
export const toChoiceObject = <_ChoiceValue extends ChoiceValue>(choice: Choice<_ChoiceValue>): ChoiceObject<_ChoiceValue> => {
  return (choice instanceof Object ? choice : { value: choice }) as ChoiceObject<_ChoiceValue>;
}

/**
 * Apply an immutable override of badgeProps to all choices.
 * Never mutates the input objects.
 */
export function overrideChoicesBadgeProps<_ChoiceValue extends ChoiceValue>(
  choices: Choice<_ChoiceValue>[],
  overrides: Partial<BadgeProps> | undefined
): Choice<_ChoiceValue>[] {
  if (!overrides || Object.keys(overrides).length === 0) return choices;
  return choices.map((c) => ({
    ...(c instanceof Object ? c : { value: c }),
    badgeProps: { ...(c as any).badgeProps, ...(overrides as any) },
  } as Choice<_ChoiceValue>));
}


// -----------------------------------------------------------------------------
// Grouping
// -----------------------------------------------------------------------------

export const UNGROUPED_GROUP_KEY = "__ungrouped__";

export type GroupedChoices<_ChoiceValue extends ChoiceValue> = Array<{
  key: string; // group key or UNGROUPED_GROUP_KEY
  choices: Choice<_ChoiceValue>[];
}>;


/**
 * Groups choices by `group`, preserving the order of first occurrence and
 * the relative order of ungrouped items. Ungrouped items are returned as a
 * dedicated group with key UNGROUPED_GROUP_KEY.
 */
export function regroupChoices<_ChoiceValue extends ChoiceValue>(
  choices: Choice<_ChoiceValue>[]
): GroupedChoices<_ChoiceValue> {
  const seen = new Set<string>();
  const out: GroupedChoices<_ChoiceValue> = [];
  const ungrouped: Choice<_ChoiceValue>[] = [];

  for (const c of choices) {
    const g = (c as any)?.group ?? null;
    if (g) {
      if (!seen.has(g)) {
        seen.add(g);
        out.push({ key: g, choices: choices.filter(x => ((x as any)?.group ?? null) === g) as Choice<_ChoiceValue>[] });
      }
    } else {
      ungrouped.push(c);
    }
  }

  if (ungrouped.length) {
    out.push({ key: UNGROUPED_GROUP_KEY, choices: ungrouped });
  }

  return out;
}


export const addGroupLabels = <_ChoiceValue extends ChoiceValue>(
  groups: GroupedChoices<_ChoiceValue>,
  groupLabels?: Record<string, React.ReactNode>
) => {
  return groups.map(group => ({
    ...group,
    heading: getGroupHeading(group, groupLabels)
  }));
}


export const getGroupHeading = <_ChoiceValue extends ChoiceValue>(
  group: GroupedChoices<_ChoiceValue>[number],
  groupLabels?: Record<string, React.ReactNode>
) => {
  return group.key === UNGROUPED_GROUP_KEY
    ? (groupLabels?.[group.key] ?? undefined)
    : (groupLabels?.[group.key] ?? group.key);
}
