import * as React from "react";
import { cn, mergeShallow, Size } from "@uikit";



// =============================================================================
// MERGE SHALLOW NODE
// =============================================================================

type MergeStrategy = "preserve" | "compose" | "replace";

export type NodeMergeOptions = {
  MERGE_CLASSNAME?: boolean;          // default: true (use cn)
  MERGE_STYLE?: boolean;              // default: true (shallow merge)
  HANDLER_STRATEGY?: MergeStrategy;   // default: "compose"
  REF_STRATEGY?: MergeStrategy;       // default: "preserve"
};

const DEFAULT_NODE_OPTS: Required<NodeMergeOptions> = {
  MERGE_CLASSNAME: true,
  MERGE_STYLE: true,
  HANDLER_STRATEGY: "compose",
  REF_STRATEGY: "preserve",
};

const isHandlerKey = (k: string) => /^on[A-Z]/.test(k);

// Keep backward compatible simple composer
// function composeFns<A extends (...args: any[]) => any>(a?: A, b?: A): A | undefined {
//   if (!a) return b;
//   if (!b) return a;
//   return ((...args: any[]) => { a(...args); b(...args); }) as A;
// }

// Unique handler composition to avoid duplicate calls of the same function reference
const HANDLER_SET_SYMBOL: unique symbol = Symbol("NODE_HANDLER_SET");

type HandlerWithSet = ((...args: any[]) => any) & { [HANDLER_SET_SYMBOL]?: Set<Function> };

function getHandlerSet(fn?: Function): Set<Function> | undefined {
  if (!fn) return undefined;
  const set = (fn as HandlerWithSet)[HANDLER_SET_SYMBOL];
  return set instanceof Set ? set : undefined;
}

function markHandlerSet(fn: Function, set: Set<Function>): void {
  try {
    (fn as HandlerWithSet)[HANDLER_SET_SYMBOL] = set;
  } catch {
    // noop: in case fn is not extensible
  }
}

function composeFnsUnique<A extends (...args: any[]) => any>(a?: A, b?: A): A | undefined {
  if (!a) return b;
  if (!b) return a;

  const setA = getHandlerSet(a) ?? new Set<Function>([a as unknown as Function]);
  const setB = getHandlerSet(b) ?? new Set<Function>([b as unknown as Function]);

  const finalSet = new Set<Function>();
  for (const f of setA) finalSet.add(f);
  for (const f of setB) finalSet.add(f);

  const composed = ((...args: any[]) => {
    for (const f of finalSet) (f as any)(...args);
  }) as A;
  markHandlerSet(composed, finalSet);
  return composed;
}

function composeRef(a?: React.Ref<any>, b?: React.Ref<any>): React.Ref<any> | undefined {
  if (!a && !b) return undefined;
  return (value: any) => {
    if (typeof a === "function") a(value);
    else if (a && "current" in (a as any)) (a as any).current = value;
    if (typeof b === "function") b(value);
    else if (b && "current" in (b as any)) (b as any).current = value;
  };
}


/**
 * React-aware merge for props objects
 * -----------------------------
 * - ignores undefined
 * - className: cn | override
 * - style: shallow merge | override
 * - handlers: preserve | compose | replace
 * - ref: preserve | compose | replace
 * - other plain sub-objects: shallow merge (mergeShallow)
 * - others: replace
 */
export function mergeShallowNode<T extends Record<string, any>>(
  ...args: (Partial<T> | undefined)[]
): Partial<T> | undefined {
  let acc: Partial<T> | undefined = undefined;
  for (const part of args) {
    acc = mergeShallowNodePair(acc, part); // pairwise merge
  }
  return acc;
}

function mergeShallowNodePair<T extends Record<string, any>>(
  left: Partial<T> | undefined,
  right: Partial<T> | undefined,
  options?: NodeMergeOptions
): Partial<T> | undefined {
  const opts = { ...DEFAULT_NODE_OPTS, ...(options || {}) };
  if (!left && !right) return undefined;

  const out: Record<string, any> = { ...(left as any) };
  if (!right) return out as Partial<T>;

  for (const key of Object.keys(right)) {
    const next = (right as any)[key];

    // Step 1:  Skip undefined
    // ------------------------------------
    if (next === undefined) continue; // never overwrite with undefined

    // Step 2:  Merge className
    // ------------------------------------
    if (key === "className") {
      out.className = opts.MERGE_CLASSNAME ? cn(out.className, next) : (next ?? out.className);
      continue;
    }

    // Step 3:  Merge style (only first level - not deep)
    // ------------------------------------
    if (key === "style") {
      out.style = opts.MERGE_STYLE ? mergeShallow(out.style, next) : (next ?? out.style);
      continue;
    }

    // Step 4:  Merge handlers `on*`
    // ------------------------------------
    if (isHandlerKey(key)) {
      const a = out[key]; const b = next;

      if (opts.HANDLER_STRATEGY === "compose") {
        // compose while de-duplicating identical function refs across layers
        out[key] = composeFnsUnique(a, b);
      } else if (opts.HANDLER_STRATEGY === "preserve") {
        out[key] = (a ?? b);
      } else { // replace
        out[key] = (b ?? a);
      }
      continue;
    }

    // Step 5:  Merge ref
    // ------------------------------------
    if (key === "ref") {
      const a = out.ref as React.Ref<any> | undefined;
      const b = next as React.Ref<any> | undefined;

      if (opts.REF_STRATEGY === "compose") {
        out.ref = composeRef(a, b);
      } else if (opts.REF_STRATEGY === "preserve") {
        out.ref = (a ?? b);
      } else { // replace
        out.ref = (b ?? a);
      }
      continue;
    }

    // Step 6:  Merge other plain sub-objects
    // ------------------------------------
    // const prev = out[key];
    // if (isPlainObject(prev) && isPlainObject(next)) {
    //   // shallow merge for other plain sub-objects (ignore undefined within)
    //   out[key] = mergeShallow(prev, next);
    //   continue;

    // }

    // Step 7:  Final Replace
    // ------------------------------------
    out[key] = next; // replace

  }

  return out as Partial<T>;
}

