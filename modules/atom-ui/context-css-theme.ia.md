## **Design Token + Tailwind Utility Structure**

This setup keeps **full Tailwind compatibility** while letting you theme via CSS variables and build higher‑level recipes — without relying on `@layer components`.



### Helper — How to add/update props

- Add CSS in theme/tokens/{domain}.css (if not provided by Tailwind)
  - Add CSS variables (source of truth)
  - Transform CSS to classes
    - `@theme` when handled by Tailwind
    - `@layer utilities` only for missing atomic aliases (no recipes here) - example gap-md => .gap-4
    <!-- DO NOT USE @layer components ANYMORE (see rationale) -->
- Create variants in `/lib/tokens/{domain}.ts`
  - List of values, types
  - Variant maps (value → utility class string)
- Wire it in `/lib/tokens.ts`
  - Add the new key in `atomicVariantsTokens`/`atomicBooleanTokens`
  - Link the variant map in `atomicVariants`

---

### 1) CSS Variables (Design Tokens)

Declare runtime tokens in `:root` or in `[data-theme=...]` for mode overrides.

```css
:root {
  /* Typography */
  --text-body: 1rem;          /* ~ text-base */
  --leading-body: 1.5;        /* ~ leading-normal */
  --text-title: 1.25rem;      /* ~ text-xl */

  /* Colors */
  --color-surface-card: oklch(98% 0 0);
  --color-surface-card-fg: oklch(25% 0.02 260);
}
```

### 2) Mode overrides (dark, mobile, …)

Override the variables; classes generated from them update automatically.

### 3) `@theme`

Map variables to **official Tailwind names** (`text-*`, `leading-*`, `bg-*`, …).

```css
@theme {
  /* Typography */
  --text-body: var(--text-body);
  --text-title: var(--text-title);
  --leading-body: var(--leading-body);

  /* Colors */
  --bg-surface-card: var(--color-surface-card);
  --text-surface-card-fg: var(--color-surface-card-fg);
}
```

---

### 3) `@layer utilities` (aliases only)

Use utilities for what Tailwind doesn’t generate and for **atomic aliases only** (single‑property helpers). Do not publish “recipe” classes here.

```css
@layer utilities {
  /* Atomic aliases */
  .gap-md { @apply gap-4; }
  .shadow-card { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
}
```

### Do not use `@layer components`

This is NOT an issue with out Atomic Token system, but how Tailwind handled `@layer components` classes:

Rationale (no `@layer components` and no recipe classes): Tailwind does not reliably allow overriding `@layer components` classes by stacking more classes in `className`.
Example: classaName={cn("surface-outline surface-solid")} will keep both, and utilities classes will be handled by the order of definition.

Reliable override is achieved with utilities (utilities > components) and merge order (last wins). Therefore, expose composition at the TypeScript level (variant maps that emit utilities), not as component/recipe CSS classes.

---

### 4) Compose recipes in TypeScript (variant maps emitting utilities)

Instead of `typo-*` / `surface-*` component classes, provide variant maps that return plain utility strings. This keeps everything overridable and merge‑friendly (twMerge last‑wins).

Surface (example)
```ts
// tokens/surface.ts
export const surfaceVariants = {
  card: "bg-surface-card text-surface-card-fg shadow-card",
  subtle: "bg-primary/20 text-primary-higher-contrast shadow-xs",
  secondary: "bg-surface-secondary text-surface-secondary-foreground shadow-xs",
} as const
```

Typo (example)
```ts
export const typoVariants = {
  body: "text-body leading-body",
  title: "text-title leading-body",
  caption: "text-xs italic text-muted-foreground",
} as const
```

Usage with CVA
```ts
import { cva } from "class-variance-authority"
import { cn } from "@uikit/lib"

const textVariants = cva("", { variants: { typo: typoVariants } })

export function Text({ typo = "body", className, ...rest }) {
  return <p className={cn(textVariants({ typo }), className)} {...rest} />
}
```

Buttons composing surface
```ts
const buttonVariants = cva("inline-flex items-center gap-2 rounded-md", {
  variants: {
    surface: surfaceVariants,
    size: { sm: "px-2 py-1", md: "px-3 py-2", lg: "px-4 py-3" },
  },
  defaultVariants: { size: "md" },
})
```

---

### 5) Workflow

1. **Tokens** → `:root` variables (themeable at runtime)
2. **`@theme`** → Tailwind‑style classes mapped to tokens
3. **`@layer utilities`** → atomic aliases only (no recipe classes)
4. **Variants** → TypeScript maps that emit utility strings (bg-*, text-*, border-*, …)
5. **Compose** → base + variants + tokens → `className` (twMerge), then consumer `className` last

---

### 6) Example usage

```html
<!-- Token‑mapped utilities -->
<p class="text-body leading-body">Hello</p>

<!-- Composed via variants (TS), still overridable by className -->
<p class="text-title leading-body">Hello</p>

<!-- Compose using variant -->
<Card surface="card" />
<!-- become -->
<div class="p-4 rounded-lg bg-surface-card text-surface-card-fg shadow-card">Card</div>
```

---

**Summary**

- Do not ship recipe CSS classes (`@layer components`); compose utilities via TypeScript variant maps.
- Keep `@layer utilities` for atomic aliases only (single‑property helpers).
- Variants emit plain utilities → fully overridable (twMerge, last wins).
- Consumers can still add `className` utilities to override.
