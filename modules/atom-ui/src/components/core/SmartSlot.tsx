import * as React from "react";
import { injectProps, mergeShallowNode, cn, resolveAtomTokens, mergeShallow } from "@uikit";

// =============================================================================
// SmartSlot Policy
// -----------------------------------------------------------------------------
// Tools to help build Molecule Components with multiple sub-parts that are fully customizable.
//
// Each SmartSlot component handles 3 props per part:
//  - `node`: the default children of the SmartSlot (text, children, etc.)
//  - `nodeProps`: the props for the SmartSlot (className, style, etc.)
//  - `Node`: the component (instance or type) used for the SmartSlot (<Icon ../> or Icon, etc.)
//
// Example for a title child-component: { title, titleProps, Title }
//
// -----------------------------------------------------------------------------
// Render Rules
// -----------------------------------------------------------------------------
// 1) If `Node` is null||undefined and `node` is null
//    => Skip rendering.
// 2) If `Node` is a component type:
//    => Node = Instantiate the Node component.
// 3) If `Node` is empty and DefaultNode is provided:
//    => Node = Instantiate the provided Default Component (from the Molecule) with `nodeContent` as children
// 4) Inject props into the Node following this priority:
//    - SmartAtom.props           // Original props of the SmartAtom (defined on the Molecule)
//       < baseProps              // Base props the Molecule wants to inject into the part
//       < variantProps           // Variant props the Molecule wants to inject into the part
//       < specs.Component.props  // Props of the component (if it's an element) (e.g. <Foo Addon={<Icon className="yes" />} />) ==> {className:"yes"}
//       < specs.props            // Highest priority props from the consumer, overriding everything else
// 5) Render the Node.
//
// -----------------------------------------------------------------------------
// Usage (inside a Molecule Component)
// -----------------------------------------------------------------------------
//
// @TODO
//
// -----------------------------------------------------------------------------
// Case Studies
// -----------------------------------------------------------------------------
// Header with two different types of SmartSlot:
//
//  Title
//     - Title: simple text { title: "Hello" }
//     - Comsommateur can override with a custom component { Title: <OverridedHeader>Hello</OverridedHeader> }
//     - If only content (string) is provided, the Molecule can instantiate the <Heading> component
//     - The Molecule can inject props into the SmartSlot component (<Heading>) to configure it or apply variations
//     - Finally, { title: "Hello", titleProps: { level: "h1" } } will override everything,
//              so the consumer or the Molecule always has the final say.
//
//  Icon
//     - Icon: provide a component directly with default props { Icon: <IconEdit textColor="red" size="20" /> }
//              (or more conveniently { Icon: IconEdit, iconProps: { textColor: "red", size: 20 } })
//     - The Molecule can inject props to modify the component
//              Example: by default, a Header icon might have { size: 30 }, but a "main" variant uses { size: 40 }
//     - The consumer can still override everything with
//              { Icon: <IconEdit textColor="red" size="20" />, iconProps: { size: 50 } }
//     - Rendering will follow the priority for `size`:
//              Node.props (20) < baseProps (30) < variantProps (40) < nodeProps (50)
//              => Final size will be 50.
//
// =============================================================================



/* =============================================================================
   Public types & Helpers
   -----------------------------------------------------------------------------
   For a slot named "title", this generates:
     - title?: React.ReactNode | null     (children; null disables content slots)
     - titleProps?: Partial<Omit<P,"children">>  (props to inject)
     - Title?: ComponentType<P> | ReactElement<P> | null (final node)
============================================================================= */



// ----------------------------------------------
// SmartSlotVariantSpecs
// ----------------------------------------------

/** Allow to define a map of default specs for SmartSlots based on the Molecule Variant*/
export type SmartSlotVariantSpecs<Variant extends string | undefined | null, Props extends object> =
  Partial<Record<NonNullable<Variant>, Partial<Props>>>;

/** Safe picker that tolerates undefined|null variants and missing keys, then type the result correctly.*/
export function pickVariantSmartSlotSpecs<V extends string | undefined | null, P extends object>(
  map: SmartSlotVariantSpecs<V, P>,
  v?: V | null
): Partial<P> {
  return (v ? map[v as NonNullable<V>] : undefined) ?? ({} as Partial<P>);
}





/**
 * Type for the SmartSlot specs on the Molecule.
 * Use only the lowercase name of the slot to generate all keys.
 */
export type SmartSlot<P extends { children?: any }, SmartSlotName extends string> = {
  [K in SmartSlotName]?: P['children'] | null;
} & {
  [K in `${SmartSlotName}Props`]?: Partial<Omit<P, "children">>;
} & {
  [K in Capitalize<SmartSlotName>]?: React.ComponentType<P> | React.ReactElement<P> | null;
};

/** Normalized shape used internally by renderers */
export type SmartSlotSpec<P extends { children?: any }> = {
  content?: P['children'] | null;       // Inject as children of the SmartSlot - use {content} instead of {children} to avoid collision/confusion
  props?: Partial<Omit<P, "children">>;
  Component?: React.ComponentType<P> | React.ReactElement<P> | null;
};

/** Normalized props for the SmartSlot renderer (used by renderSmartSlot and SmartSlot) */
type SmartSlotProps<P extends { children?: any }> = {
  // Final layer (can be provided directly)
  specs?: SmartSlotSpec<P>;
  // or Equivalent triade (if both are provided, triade will override `specs`)
  content?: P['children'] | null;
  props?: Partial<Omit<P, "children">>;
  Component?: React.ComponentType<P> | React.ReactElement<P> | null;

  forceRender?: boolean;

  // First layer (props coming from the SmartSlot wrapper itself)
  smartSlotProps?: SmartSlotSpec<P>;
  // Default layer (Molecule default)
  baseSpecs?: SmartSlotSpec<P>;
  // Variant layer (Molecule variants)
  variantSpecs?: SmartSlotSpec<P>;
  // Default component if no Component is provided
  as?: React.ComponentType<P>;
  // Children provided by the Molecule
  children?: React.ReactNode;
}

/** Merge multiple SmartSlotSpec sources with last-one-wins for Component/content and shallow-merge for props */
function mergeSmartSlotSpecs<P extends { children?: any }>(
  ...sources: Array<SmartSlotSpec<P> | undefined>
): SmartSlotSpec<P> {
  let merged: SmartSlotSpec<P> = {};
  let accProps: Record<string, any> | undefined = undefined;
  let accClassName: string | undefined = undefined;
  let accStyle: React.CSSProperties | undefined = undefined;

  for (const s of sources) {
    if (!s) continue;

    // Last-one-wins for content/component
    merged = {
      content: s.content !== undefined ? s.content : merged.content,
      Component: s.Component !== undefined ? s.Component : merged.Component,
      props: merged.props // placeholder, reassigned later
    } as SmartSlotSpec<P>;

    // Resolve tokens for this layer and merge props
    if (s.props) {
      const { className, style, ...rest } = resolveAtomTokens(s.props as any);

      // 1) Merge original props (without className/style) so we propagate everything (e.g., size)
      const original = { ...(s.props as any) };
      delete (original as any).className;
      delete (original as any).style;
      accProps = mergeShallowNode(accProps, original) as any;

      // 2) Merge token-resolved rest as well (non-atomic props kept)
      accProps = mergeShallowNode(accProps, rest) as any;

      // 3) Merge visual aspects
      accClassName = cn(accClassName, className, (s.props as any).className);
      accStyle = mergeShallow(accStyle, style, (s.props as any).style) as React.CSSProperties | undefined;
    }
  }

  if (accProps || accClassName || accStyle) {
    merged.props = {
      ...(accProps || {}),
      ...(accClassName ? { className: accClassName } : {}),
      ...(accStyle ? { style: accStyle } : {}),
    } as any;
  }

  return merged;
}

/**
 * Small helper to extract a SmartSlotSpecs from component props by slot name
 *    Component props {title, titleProps, Title, ..allOthersProps}
 *    becomes {content: title, props: titleProps, Component: Title}
 */
export function pickSmartSlotSpecs<P extends { children?: any }>(
  props: Record<string, unknown>,
  name: string
): SmartSlotSpec<P> {
  const contentKey = name as string; // e.g., "title"
  const propsKey = `${name}Props` as string; // e.g., "titleProps"
  const NodeKey = (name[0].toUpperCase() + name.slice(1)) as string; // e.g., "Title"
  return {
    content: props[contentKey] as P['children'] | null | undefined,
    props: props[propsKey] as Partial<Omit<P, "children">> | undefined,
    Component: props[NodeKey] as (React.ComponentType<P> | React.ReactElement<P> | null) | undefined,
  };
}

/**
 * Create a SmartSlotSpecs from a component props that are already extracted form {props}
 * Use this fonction to type and avoid to name all object fields
 * Instead of: {content: __, props: __, Component: __}
 * You can do: createSmartSlotSpecs(__, __, __)
 */
export function createSmartSlotSpecs<P extends { children?: any }>(
  content: P['children'] | null | undefined,
  props: Partial<Omit<P, "children">> | undefined,
  Component: (React.ComponentType<P> | React.ReactElement<P> | null) | undefined,
): SmartSlotSpec<P> {
  return { content, props, Component };
}

/** Check if the SmartSlot must be rendered based on specs and SmartSlot children. */
export function smartSlotMustBeRendered<T extends { children?: any }>(specs: SmartSlotSpec<T>, children?: React.ReactNode, forceRender?: boolean): boolean {
  if (forceRender)
    return true;
  if (specs.content === null)
    return false;
  return !!specs.content || !!specs.Component || !!children;
}


// =============================================================================
//   Render SmartSlot
// =============================================================================

/**
// Render Rules
// ----
// 1) If `Node` is null||undefined and `node` is null
//    => Skip rendering.
// 2) Decide the final target to render
//  2.1) If `Node` is a valid element:
//    => Keep Node as is
//  2.2) If `Node` is a component type:
//    => Node = Instantiate the Node component.
//  2.3) If `Node` is empty and DefaultNode is provided:
//    => Node = Instantiate the provided Default Component (from the Molecule) with `nodeContent` as children
//  2.4) If `Node` is empty and no DefaultNode is provided:
//    => Skip rendering
//  3) Inject props into the Node following this priority (applied upstream via mergeSmartSlotSpecs):
//    - baseSpecs.props < variantSpecs.props < specs.props (shallow merge)
//    - Same for Component and content (last-one-wins)
//  4) Render the Node.
*/
export function renderSmartSlot<P extends { children?: any }>(
  renderProps: SmartSlotProps<P> // Use the same Type between renderSmartSlot and SmartSlot
): React.ReactNode {

  const {
    // First layer (wrapper props) - <SmartSlot className="..." />
    smartSlotProps,
    // Default layer (Molecule default) - <SmartSlot baseSpecs={{props:{className:"..."}}} />
    baseSpecs,
    // Variant layer (Molecule variants) - <SmartSlot variantSpecs={{props:{className:"..."}}} />
    variantSpecs,

    // Final layer (can be provided directly) - <SmartSlot specs={{props:{className:"..."}}} />
    specs,              // Final merged specs (last-one-wins for Component and content / shallow merge for props)
    // or Equivalent triade (if both are provided, triade will override specs) - <SmartSlot  />
    content,
    props,
    Component,

    forceRender,

    // Default component if no Component is provided
    as,                 // Default component to the Molecule want to use to render the SmartSlot
    children,           // If the Module try to insert children (second choise if no specs.children)
  } = renderProps;

  // Normalize the user specs sent as a triade ({content, props, Component})
  // We should only have one of them (specs or triade) - but if we receive both, triade will override specs
  const triadeSpecs = createSmartSlotSpecs(content, props, Component);

  // Extract props from a provided JSX element (triade Component)
  const triadElementProps = React.isValidElement<P>(Component) ? (Component as any).props : undefined;
  // Extract props from a JSX element provided inside specs.Component
  const specsElementProps = specs && React.isValidElement<P>(specs.Component) ? (specs.Component as any).props : undefined;

  // Merge all specs with the expected order (lowest -> highest):
  // smartSlotProps < baseSpecs < variantSpecs < triadElementProps < specsElementProps < specs < triadeSpecs
  const mergedSpecs = mergeSmartSlotSpecs(
    smartSlotProps,
    baseSpecs,
    variantSpecs,
    triadElementProps ? { props: triadElementProps } : undefined,
    specsElementProps ? { props: specsElementProps } : undefined,
    specs,
    triadeSpecs,
  );

  // 1) If no `Component` no`children` and `content` is null
  //    => Skip rendering.
  if (!smartSlotMustBeRendered(mergedSpecs, children, forceRender)) return null;

  // 2) Decide the final target to render
  let element: React.ReactElement<P> | null = null;                 // if we already have an element
  let RenderComponent: React.ComponentType<P> | null = null;        // if we need to instantiate
  let renderedChildren: React.ReactNode | undefined;                // only used for DefaultNode

  //  2.1) If `Node` is a valid element:
  //    => Keep Node as is
  if (React.isValidElement<P>(mergedSpecs.Component)) {
    element = mergedSpecs.Component;
  }
  //  2.2) If `Node` is a component type:
  //    => Node = Instantiate the Node component.
  else if (mergedSpecs.Component && !React.isValidElement<P>(mergedSpecs.Component)) {
    RenderComponent = mergedSpecs.Component as React.ComponentType<P>;
    renderedChildren = mergedSpecs.content ?? children ?? undefined;
  }
  //  2.3) If `Node` is empty and DefaultNode is provided:
  //    => Node = Instantiate the provided Default Component (from the Molecule) with `nodeContent` as children
  else if (as) {
    RenderComponent = as;
    renderedChildren = mergedSpecs.content ?? children ?? undefined; // null is already handled by the early skip
  }
  //  2.4) If `Node` is empty and no DefaultNode is provided:
  //    => Skip rendering
  else {
    return null;
  }

  // 3) Build final props (only inject the props layer)
  const finalProps = mergedSpecs.props;

  // 4) Render the Node.
  if (element) {
    // Clone the element with finalProps (keeps its own children)
    return injectProps(element, finalProps as Partial<P>);
  }
  // Create the decided Component (type or DefaultNode)
  if (RenderComponent) {
    return <RenderComponent {...(finalProps as P)}>{renderedChildren}</RenderComponent>;
  }
  return null;
}


// =============================================================================
//   Utils Components
// =============================================================================


/** JSX helper wrapper around `renderSmartSlot` */
export function SmartSlot<P extends { children?: any }>(
  props: {
    specs: SmartSlotSpec<P>;
    as: React.ComponentType<P>;
    baseSpecs?: SmartSlotSpec<P>;
    variantSpecs?: SmartSlotSpec<P>;
    children?: React.ReactNode;
  }
): React.ReactNode;

export function SmartSlot<P extends { children?: any }>(
  props: {
    // Part Specs
    content?: P['children'] | null;
    props?: Partial<Omit<P, "children">>;
    Component?: React.ComponentType<P> | React.ReactElement<P> | null;

    as?: React.ComponentType<P>;
    baseSpecs?: SmartSlotSpec<P>;
    variantSpecs?: SmartSlotSpec<P>;
    children?: React.ReactNode;
  }): React.ReactNode;


export function SmartSlot<P extends { children?: any }>(
  props: SmartSlotProps<P>
) {
  // Build smartSlotProps from wrapper props (exclude known keys)
  const {
    as, baseSpecs, variantSpecs, children,
    specs, content, props: triadeProps, Component,
    forceRender,
    // known keys filtered out, the rest goes into wrapperProps
    ...rest
  } = props as any;

  const knownKeys = new Set([
    'as', 'baseSpecs', 'variantSpecs', 'children',
    'specs', 'content', 'props', 'Component', 'smartSlotProps',
    'forceRender',
  ]);

  const wrapperProps: Record<string, any> = {};
  for (const k of Object.keys(rest)) {
    if (!knownKeys.has(k)) wrapperProps[k] = (rest as any)[k];
  }

  const computedSmartSlotProps: SmartSlotSpec<P> | undefined =
    Object.keys(wrapperProps).length ? { props: wrapperProps as any } : undefined;

  // console.log("RENDER SMART SLOT: ", {computedSmartSlotProps,baseSpecs,variantSpecs,specs,content,props: triadeProps,Component,})
  // Call the renderer with normalized props
  return renderSmartSlot<P>({
    smartSlotProps: computedSmartSlotProps,
    baseSpecs,
    variantSpecs,
    specs,

    content,
    props: triadeProps,
    Component,

    as,
    children,
    forceRender,
  } as SmartSlotProps<P>);
}


/** Factory helper to create a Slot with a default component, fully typed via inference */
export function asSmartSlot<T extends React.ComponentType<any>>(Default: T) {
  type P = React.ComponentProps<T> & { children?: any };
  type Common = {
    baseSpecs?: SmartSlotSpec<P>;
    variantSpecs?: SmartSlotSpec<P>;
    children?: React.ReactNode;
  };

  function Slot(props: Common & { specs: SmartSlotSpec<P> }): React.ReactNode;
  function Slot(props: Common & {
    content?: P['children'] | null;
    props?: Partial<Omit<P, "children">>;
    Component?: React.ComponentType<P> | React.ReactElement<P> | null;
  }): React.ReactNode;
  function Slot(props: any): React.ReactNode {
    return SmartSlot<P>({ ...(props as any), as: Default } as SmartSlotProps<P>);
  }

  return Slot as unknown as React.ComponentType<any>;
}

/**
 * Expand a SmartSlotSpec into props with a given slot name
 * Retransform a {content, props, Component} into triade. Example for "icon" {icon, iconProps, Icon}
*/
export function expandSmartSlotSpecs<P extends { children?: any }, N extends string>(
  specs: SmartSlotSpec<P> | undefined,
  name: N
): Record<N, P['children'] | null | undefined>
  & Record<`${N}Props`, Partial<Omit<P, "children">> | undefined>
  & Record<Capitalize<N>, React.ComponentType<P> | React.ReactElement<P> | null | undefined> {
  const cap = (name.charAt(0).toUpperCase() + name.slice(1)) as Capitalize<N>;
  const triad: Record<string, any> = {};
  triad[name] = specs?.content;
  triad[`${name}Props`] = specs?.props as any;
  triad[cap] = specs?.Component as any;
  return triad as any;
}
