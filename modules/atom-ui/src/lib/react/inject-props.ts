import * as React from "react";
import { mergeShallowNode, NodeMergeOptions } from "./merge-shallow-node";
import { cn } from "../tailwind-utils";
import { Size } from "../../tokens";




// =============================================================================
// INJECT PROPS
// =============================================================================

/**
 * Injects props into a React element following mergeShallowNode rules
 *
 * @example
 * `injectProps(<Icon />, { size: "lg" })`
 */

export function injectProps<T extends object>(
  node: React.ReactNode,
  newProps: Partial<T>,
  options?: NodeMergeOptions
): React.ReactNode {
  if (!React.isValidElement(node)) return node;
  const merged = mergeShallowNode(
    node.props as Record<string, any>,
    newProps as Record<string, any>,
    options
  );
  return React.cloneElement(node as React.ReactElement<any>, merged as any);
}


/**
 * Injects a Tailwind className to a React element without overriding the existing one.
 *
 * @example
 * `injectClass(<Icon />, "text-red-500")`
 */
export function injectClass(node: React.ReactNode, className: string): React.ReactNode {
  if (!React.isValidElement<{ className?: string }>(node)) return node

  const combined = cn(className, node.props.className)
  return injectProps(node, { className: combined })
}


// --- Inject size unless already set ---
/**
 * Injects a `size` prop into a React element if it doesn't already define one.
 *
 * @example
 * `injectSize(<Icon />, "lg")`
 */
export function injectSize(node: React.ReactNode, size: number | Size): React.ReactNode {
  if (!React.isValidElement<{ size?: any }>(node)) return node
  if (node.props.size !== undefined) return node

  return injectProps(node, { size })
}

