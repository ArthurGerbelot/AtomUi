import { cn } from "../tailwind-utils";
import { getPrimaryColorStyle } from "./colors";
import { atomicRecipe, atomicVariants, atomicTokens } from "../../tokens/tokens";
import { ColorTheme } from "../../tokens/colors/colors";

// Build a typed RecipeInput from arbitrary props without listing keys
type RecipeInput = { className: Parameters<typeof atomicRecipe>[0], cssVariables: Record<string, string> };

const variantKeys = (
  (atomicTokens as readonly string[]).filter((key) =>
    Object.prototype.hasOwnProperty.call(atomicVariants, key)
  )
) as Array<keyof typeof atomicVariants>;

function pickRecipeInput(props: unknown): RecipeInput {
  const className: Record<string, unknown> = {}
  const cssVariables: Record<string, string> = {}

  for (const key of variantKeys) {
    const value = (props as any)[key]
    if (value === undefined) continue
    // raw value for CVA (booleans/strings ok)
    className[key as string] = value.toString()

    // if numeric, use variant "_n" + push CSS var
    if (Number.isInteger(value) || Number.isInteger(parseInt(value))) {
      // check that this variant has a "" entry (but asked props isn't provided)
      const formatVariant = atomicVariants[key as keyof typeof atomicVariants] as Record<string, string>
      if (formatVariant && formatVariant["_n"] && !formatVariant[String(value)]) {
        cssVariables[`--${key}-numerical`] = String(value)
        className[key as string] = "_n" // <-- IMPORTANT: pass KEY to CVA
      }
    }
  }

  return { className: className as RecipeInput, cssVariables }
}

// OLD VERSIONS
// ---------
// Use any cause it' can be anything (from all Components and even future ones)
// In all case it's already tested by the Component and only the props from Atom Recipe are picked, the rest is sent back
// export const resolveAtomTokens = <T extends {
//   className?: string; colorTheme?: string; style?: React.CSSProperties
// }>({ className, colorTheme, style, ...props }: T) => {
// ---------



// Use a broad generic to preserve polymorphic props (e.g., `as`, `asChild`)
export const resolveAtomTokens = <T extends Record<string, any>>(
  { className, colorTheme, style, ...props }: T & { className?: string; colorTheme?: string; style?: React.CSSProperties }
) => {
  const recipeInput = pickRecipeInput(props)

  const remainingProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !variantKeys.includes(key as keyof typeof atomicVariants))
  )

  // toujours injecter les CSS vars; ajouter le thème si fourni
  style = {
    ...(colorTheme ? getPrimaryColorStyle(colorTheme as ColorTheme) : undefined),
    ...recipeInput.cssVariables,
    ...(style || {}),
  }

  className = cn(atomicRecipe(recipeInput.className), className)

  return { className, style, ...remainingProps } as
    Omit<T, keyof typeof atomicVariants | "className" | "style"> &
    { className?: string; style?: React.CSSProperties }
}