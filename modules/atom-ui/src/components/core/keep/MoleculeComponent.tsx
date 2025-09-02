import { cva } from "class-variance-authority";

import { cn } from "../../../lib";
import { resolveAtomTokens } from "../../../lib/core/atom";
import { SmartText, Text, TextProps } from "../../atoms";
import { AtomProps, SmartAtom } from "../Atom";
import { pickSmartSlotSpecs, pickVariantSmartSlotSpecs, SmartSlot, SmartSlotVariantSpecs } from "../SmartSlot";


// =============================================================================
// Advanced Molecule Component example with variants and multiple SmartSlots
// =============================================================================

/**
 * Create an extended Text component that can be used as a SmartSlot Component override
 */
const ExtendedText = (props: TextProps) => {
  const { className, ...rest } = resolveAtomTokens(props);
  return (
    <Text {...rest} className={cn("text-red-500", className)} />
  )
}


// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------


/**
 * Type for the SmartSlot props of the wrapper (Atom)
 */
type WrapperSpecsProps = SmartSlot<AtomProps, "wrapper">;
type TextSpecsProps = SmartSlot<TextProps, "text">;

/**
 * Available variants for the advanced molecule
 * - update-props: Update only the props
 * - update-content: Update only the content
 * - update-component: Replace the text components
 * - not-used: Not defined (to show that variant can be not defined)
 */
type MoleculeVariant = "update-props" | "update-content" | "update-component";

/**
 * Full props of the advanced molecule
 * Combine the wrapper, text and variant specs
 */
type MoleculeComponentsProps = WrapperSpecsProps & TextSpecsProps & { variant?: MoleculeVariant };



// -----------------------------------------------------------------------------
// VARIANTS
// -----------------------------------------------------------------------------

/**
 * Variants for the advanced molecule itself
 */
const moleculesVariants = cva("border bg-amber-500/20", {
  variants: {
    variant: {
      "update-props": "bg-info/20",
      "update-content": "bg-success/20",
      "update-component": "bg-warning/20",
    },
  },
});



/**
 * Base SmartSlot specs for the molecule (Whatever the variants)
 * Order is base < variants < props (props are the last to be applied, the strongest)
 */

const moleculeBaseSmartSlotSpecs: MoleculeComponentsProps = {
  wrapperProps: { className: "border border-5 border-gray-500" },
  textProps: { variant: "blockquote" },
}

/**
 * Variants for the SmartSlots (will be injected into the SmartSlot as variants Props)
 */
const moleculeVariantsSmartSlotSpecs: SmartSlotVariantSpecs<MoleculeVariant, MoleculeComponentsProps> = {
  "update-content": {
    wrapperProps: { className: "border-info" },
    text: "New Content",
  },
  "update-props": {
    wrapperProps: { className: "border-success" },
    textProps: { textColor: "success" },
  },
  "update-component": {
    Wrapper: (props: AtomProps) => <pre className={cn(props.className, "border-3 border-error")}>{safeStringify(props, 2)}</pre>,
    Text: ExtendedText,
  },
}


/**
 * Advanced molecule with support of base specs and variants specs
 * - Uses two SmartSlots: wrapper (Atom) and text (Text)
 * - Injects automatically the props according to the variant
 * - Allows manual customization via props
 */
export const MoleculeComponent = (props: MoleculeComponentsProps) => {
  // Get the props specs for each SmartSlot
  const wrapperSpecs = pickSmartSlotSpecs<AtomProps>(props, "wrapper");
  const textSpecs = pickSmartSlotSpecs<TextProps>(props, "text");

  // Get the variant props to inject into SmartSlots
  const variantSpecs = pickVariantSmartSlotSpecs<MoleculeVariant, MoleculeComponentsProps>(moleculeVariantsSmartSlotSpecs, props.variant);

  const wrapperVariantSpecs = pickSmartSlotSpecs<AtomProps>(variantSpecs, "wrapper");
  const textVariantSpecs = pickSmartSlotSpecs<TextProps>(variantSpecs, "text");

  const wrapperBaseSpecs = pickSmartSlotSpecs<AtomProps>(moleculeBaseSmartSlotSpecs, "wrapper");
  const textBaseSpecs = pickSmartSlotSpecs<TextProps>(moleculeBaseSmartSlotSpecs, "text");


  // console.log("=== MoleculeComponent ===", { props, variantSpecs, wrapperSpecs, textSpecs }, moleculesVariants({ variant: props.variant }));

  return (
    <SmartAtom
      baseSpecs={wrapperBaseSpecs}
      variantSpecs={wrapperVariantSpecs}
      specs={wrapperSpecs}

      className={moleculesVariants({ variant: props.variant })}
    >
      Content Before

      <SmartText
        baseSpecs={textBaseSpecs}
        variantSpecs={textVariantSpecs}
        specs={textSpecs}
      >
        Default text
      </SmartText>

      Content After
    </SmartAtom>
  )
}

function safeStringify(value: unknown, space = 2) {
  const seen = new WeakSet();
  const replacer = (_key: string, val: any) => {
    // Références circulaires
    if (val && typeof val === 'object') {
      if (seen.has(val)) return '[Circular]';
      seen.add(val);
    }
    // Fonctions, Symbol, BigInt
    if (typeof val === 'function') return `[Function ${val.name || 'anonymous'}]`;
    if (typeof val === 'symbol') return val.toString();
    if (typeof val === 'bigint') return val.toString() + 'n';

    // Eléments React
    if (val && val.$$typeof && val._owner) return '[ReactElement]';

    // DOM Node (si présent)
    if (typeof Element !== 'undefined' && val instanceof Element) return `[Element <${val.tagName.toLowerCase()}>]`;

    return val;
  };
  return JSON.stringify(value, replacer, space);
}