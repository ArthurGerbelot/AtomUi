

/**
 * Treats only plain objects as mergeable (no arrays, no functions)
 */
export const isPlainObject = (v: any) =>
  v !== null && typeof v === "object" && !Array.isArray(v);


/**
 * Copy an object
 */
export const clipboardCopy = async (value: string) => {
  try { await navigator.clipboard.writeText(value) } catch { }
}

/**
 * Merges top-level keys only.
 * -----------------------------
 * - Undefined never overwrites.
 * - Rightmost defined wins for scalars/objects/arrays (objects are replaced, not merged).
 * - Good for composing plain props objects when you don’t want to merge sub-objects
 */
export function mergeShallow<T extends Record<string, any>>(
  ...objs: (Partial<T> | undefined)[]
): Partial<T> | undefined {
  const srcs = objs.filter(Boolean) as Partial<T>[];
  if (srcs.length === 0) return undefined;

  const out: any = {};
  for (const src of srcs) {
    for (const k of Object.keys(src)) {
      const v = (src as any)[k];
      if (v === undefined) continue; // never overwrite with undefined
      out[k] = v;                    // replace (1 level only)
    }
  }
  return out as Partial<T>;
}

/**
 * Recursively merges plain objects only; arrays/others are replaced.
 * -----------------------------
 * - Undefined never overwrites.
 * - Accepts an optional depth (default = Infinity) to cap recursion.
 * - Use it when you want structured deep merges without surprises.
 */

export function mergeDeep<T extends Record<string, any>>(
  a: Partial<T> | undefined,
  b: Partial<T> | undefined,
  depth: number = Infinity
): Partial<T> | undefined {
  if (!a && !b) return undefined;
  if (!a) return { ...(b as any) } as Partial<T>;
  if (!b) return { ...(a as any) } as Partial<T>;

  if (depth <= 0) {
    // stop here: rightmost defined wins (shallow replace at this level)
    return mergeShallow(a, b);
  }

  const out: any = { ...(a as any) };
  for (const k of Object.keys(b as any)) {
    const v = (b as any)[k];
    if (v === undefined) continue; // never overwrite with undefined

    const p = out[k];
    if (isPlainObject(p) && isPlainObject(v)) {
      out[k] = mergeDeep(p, v, depth - 1);
    } else {
      out[k] = v; // replace arrays/scalars/non-plain objects
    }
  }
  return out as Partial<T>;
}




export function sanitizeToId(str: string): string {
  // 1. Replace any character that is not a letter, digit, hyphen, underscore, colon, or period with a hyphen.
  let sanitized = str.replace(/[^a-zA-Z0-9\-_:.]/g, '-');

  // 2. Ensure the ID starts with a letter if it doesn't already.
  // If the first character is not a letter, prepend 'id-'.
  if (!/^[a-zA-Z]/.test(sanitized)) {
    sanitized = 'id-' + sanitized;
  }

  // 3. Remove any leading or trailing hyphens that might result from replacements.
  sanitized = sanitized.replace(/^-+|-+$/g, '');

  return sanitized;
}
/**
 * Safe stringify for JSON.stringify
 */
export function safeStringify(obj: any, indent = 2): string {
  const seen = new WeakSet();

  return JSON.stringify(obj, (key, value) => {
    // Handle circular references
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return "[Circular]";
      }
      seen.add(value);
    }

    // Handle functions
    if (typeof value === "function") {
      return `[Function: ${value.name || 'anonymous'}]`;
    }

    // Handle React elements
    if (value && value.$$typeof) {
      return `[React Element: ${value.type?.name || value.type}]`;
    }

    return value;
  }, indent);
}