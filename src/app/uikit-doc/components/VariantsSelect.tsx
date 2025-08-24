import { Card, SimpleSelect } from "@uikit"
import type { Size } from "@uikit/tokens/base/base"
import { sizes } from "@uikit/tokens/base/base"
import { colorThemes, type ColorTheme } from "@uikit/tokens/colors/colors"
import { radiuses, type Radius } from "@uikit/tokens/surface/surface"

// Radius helper (local to docs)



export function VariantsSelect<T extends string | number>({
  size,
  setSize,
  colorTheme,
  setColorTheme,
  variant,
  variants,
  setVariant,
  radius,
  setRadius,
}: {
  size?: Size
  setSize?: (size: Size | undefined) => void
  defaultSize?: Size
  colorTheme?: ColorTheme
  setColorTheme?: (colorTheme: ColorTheme | undefined) => void
  defaultColorTheme?: ColorTheme
  variant?: T | undefined
  variants?: readonly T[]
  setVariant?: (variant: T | undefined) => void
  defaultVariant?: T | undefined
  radius?: Radius
  setRadius?: (radius: Radius | undefined) => void
  defaultRadius?: Radius
}) {
  return (
    <Card title="Variation Controls">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {setSize && (
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <SimpleSelect
              placeholder="undefined"
              choices={sizes.map((sizeOption) => ({ value: sizeOption }))}
              value={size ?? ""}
              onValueChange={(v: Size) => setSize(v ? v : undefined)}
            />
          </div>
        )}

        {setColorTheme && (
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <SimpleSelect
              placeholder="undefined"
              choices={colorThemes.map((ct) => ({ value: ct }))}
              value={colorTheme ?? ""}
              onValueChange={(v: ColorTheme) => setColorTheme(v ? v : undefined)}
            />
          </div>
        )}

        {setRadius && (
          <div>
            <label className="block text-sm font-medium mb-2">Radius</label>
            <SimpleSelect
              placeholder="undefined"
              choices={radiuses.map((r) => ({ value: r }))}
              value={radius ?? ""}
              onValueChange={(v: Radius) => setRadius(v ? v : undefined)}
            />
          </div>
        )}

        {setVariant && variants && (
          <div>
            <label className="block text-sm font-medium mb-2">Variant</label>
            <SimpleSelect
              placeholder="undefined"
              choices={variants.map((v) => ({ value: v as unknown as string }))}
              value={variant ? (variant as unknown as string) : ""}
              onValueChange={(v: string) => setVariant(v ? (v as unknown as T) : undefined)}
            />
          </div>
        )}
      </div >
    </Card >
  )
}