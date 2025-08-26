import { Card, SimpleSelect, Text } from "@uikit"
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
              choices={[{ value: undefined, label: <Text textColor="muted">undefined</Text> }, ...sizes]}
              value={size}
              /* eslint-disable-next-line -- Radix converts undefined to "undefined" string */
              onValueChange={(v: any) => setSize(v === "undefined" ? undefined : v)}
            />
          </div>
        )}

        {setColorTheme && (
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <SimpleSelect
              placeholder="undefined"
              choices={[{ value: undefined, label: <Text textColor="muted">undefined</Text> }, ...colorThemes]}
              value={colorTheme}
              /* eslint-disable-next-line -- Radix converts undefined to "undefined" string */
              onValueChange={(v: any) => setColorTheme(v === "undefined" ? undefined : v)}
            />
          </div>
        )}

        {setRadius && (
          <div>
            <label className="block text-sm font-medium mb-2">Radius</label>
            <SimpleSelect
              placeholder="undefined"
              choices={[{ value: undefined, label: <Text textColor="muted">undefined</Text> }, ...radiuses]}
              value={radius}
              /* eslint-disable-next-line -- Radix converts undefined to "undefined" string */
              onValueChange={(v: any) => setRadius(v === "undefined" ? undefined : v)}
            />
          </div>
        )}

        {setVariant && variants && (
          <div>
            <label className="block text-sm font-medium mb-2">Variant</label>
            <SimpleSelect
              placeholder="undefined"
              choices={[{ value: undefined, label: <Text textColor="muted">undefined</Text> }, ...variants.map((v) => ({ value: v as unknown as string }))]}
              value={variant as unknown as string}
              /* eslint-disable-next-line -- Radix converts undefined to "undefined" string */
              onValueChange={(v: any) => setVariant(v === "undefined" ? undefined : (v as unknown as T))}
            />
          </div>
        )}
      </div >
    </Card >
  )
}