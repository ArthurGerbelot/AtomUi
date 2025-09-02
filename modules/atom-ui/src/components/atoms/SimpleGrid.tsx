import { cn, resolveAtomTokens } from "../../lib"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { asSmartSlot } from "../core"
import { asResponsiveObject, breakpoints, isResponsiveObject, Responsive, ResponsiveObject } from "../../lib/typescript"
import { ContainerSize, Size } from "../../tokens"
import { Breakpoint } from "../layouts/layout"

type CountCol = 1 | 2 | 3 | 4 | 5 | 6


// =============================================================================
// SimpleGrid
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [Layout]
// -----------------------------------------------------------------------------
// Responsive grid built with a single CSS formula (`.simplegrid-formula`)
// that uses CSS variables `--simplegrid-cols` and `--simplegrid-size`.
// Tailwind utility classes (`sg-cols-*`, `sg-size-*`) are used to set these
// variables responsively (e.g. `xl:sg-cols-3`, `md:sg-size-lg`).
// Keeps the class footprint small and purge-safe while allowing full runtime flexibility.
//
// See layout.layer.css for the CSS formula, variables and classes.
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type SimpleGridOwnProps = {
  cols?: Responsive<CountCol>           // { base, sm, md, ... }
  size?: Responsive<ContainerSize>      // { base, sm, md, ... }
  gap?: Size
}

export type SimpleGridProps = Omit<AtomProps, "size"> & SimpleGridOwnProps

type SimpleGridPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, SimpleGridProps>


// -----------------------------------------------------------------------------
// VARIANTS
// -----------------------------------------------------------------------------

const bp = {
  base: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
  "2xl": "2xl:",
} as const

const COLS_CLASS: Record<CountCol, string> = {
  1: "sg-cols-1",
  2: "sg-cols-2",
  3: "sg-cols-3",
  4: "sg-cols-4",
  5: "sg-cols-5",
  6: "sg-cols-6",
}

const SIZE_CLASS: Record<ContainerSize, string> = {
  "5xs": "sg-size-5xs", "4xs": "sg-size-4xs", "3xs": "sg-size-3xs", "2xs": "sg-size-2xs",
  xs: "sg-size-xs", sm: "sg-size-sm", md: "sg-size-md", lg: "sg-size-lg", xl: "sg-size-xl",
  "2xl": "sg-size-2xl", "3xl": "sg-size-3xl", "4xl": "sg-size-4xl",
  "5xl": "sg-size-5xl", "6xl": "sg-size-6xl", "7xl": "sg-size-7xl",
}


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

export const SimpleGrid = forwardRefPolymorphic<"div", SimpleGridProps>(
  function SimpleGrid<T extends React.ElementType = "div">(
    {
      gap = "md",
      cols = { base: 1 },               // default stack
      size = { base: "md" },            // default track
      ...props
    }: SimpleGridPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const { as, className, style, ...rest } = resolveAtomTokens({ ...props, gap })



    const cls: string[] = []

    // Columns responsives
    // ------------------------------------------------------------
    // Transform the responsive cols prop into a responsive class list
    // - Example: {base: 2, md: 3} => "sg-cols-2 md:sg-cols-3"
    // - `sg-cols-${n}` classes are used to set a CSS varaibles responsivly (for example --sg-cols)
    // - {base: 2, md: 3} => "sg-cols-2 md:sg-cols-3" => "--sg-cols: 2; md: --sg-cols: 3;"
    const colsObj: ResponsiveObject<CountCol> = asResponsiveObject(cols);
    for (const k of breakpoints) {
      const v = colsObj[k];
      if (v == null) continue;
      const token = Math.max(1, Math.min(6, Number(v))) as CountCol;
      cls.push(`${bp[k]}${COLS_CLASS[token]}`);
    }

    // Size responsives
    // ------------------------------------------------------------
    // Transform the responsive cols prop into a responsive class list
    // - Example: {base: "xs", md: "lg"} => "sg-size-xs md:sg-size-lg"
    // - `sg-size-${size}` classes are used to set a CSS varaibles responsivly (for example --sg-size)
    // - {base: "xs", md: "lg"} => "sg-size-xs md:sg-size-lg" => "--sg-size: xs; md: --sg-size: lg;"
    const sizeObj: ResponsiveObject<ContainerSize> = asResponsiveObject(size);
    for (const k of breakpoints) {
      const t = sizeObj[k];
      if (!t) continue;
      cls.push(`${bp[k]}${SIZE_CLASS[t]}`);
    }

    return (
      <Atom
        as={(as ?? "div") as any}
        ref={ref}
        className={cn(
          "grid simplegrid-formula justify-center items-start",
          cls.join(" "),
          className)}
        style={style}
        {...rest}
      />
    )
  }
)

export const SmartSimpleGrid = asSmartSlot(SimpleGrid)




// import { cn, resolveAtomTokens } from "../../lib"
// import {
//   forwardRefPolymorphic,
//   PolymorphicProps,
//   PolymorphicRef
// } from "../../lib/core/polymorphic-helpers"
// import { Atom, type AtomProps } from "../core/Atom"
// import { PartialResponsiveType } from "../../lib/typescript";
// import { asSmartSlot } from "../core";
// import { Size } from "../../tokens";


// // =============================================================================
// // SimpleGrid
// // -----------------------------------------------------------------------------
// // [Atomic] [Polymorphic] [SmartSlot] [Layout]
// // -----------------------------------------------------------------------------
// // SimpleGrid component to specify responsive the number of columns
// // -----------------------------------------------------------------------------
// // Tailwind safelist: grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6
// // sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6
// // md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6
// // lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6
// // xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6
// // 2xl:grid-cols-1 2xl:grid-cols-2 2xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-cols-5 2xl:grid-cols-6
// // grid-cols-[repeat(1,var(--container-xs))] grid-cols-[repeat(2,var(--container-xs))] grid-cols-[repeat(3,var(--container-xs))]
// // grid-cols-[repeat(1,var(--container-sm))] grid-cols-[repeat(2,var(--container-sm))] grid-cols-[repeat(3,var(--container-sm))]
// // grid-cols-[repeat(1,var(--container-md))] grid-cols-[repeat(2,var(--container-md))] grid-cols-[repeat(3,var(--container-md))]
// // grid-cols-[repeat(1,var(--container-lg))] grid-cols-[repeat(2,var(--container-lg))] grid-cols-[repeat(3,var(--container-lg))]
// // grid-cols-[repeat(1,var(--container-xl))] grid-cols-[repeat(2,var(--container-xl))] grid-cols-[repeat(3,var(--container-xl))]
// // xl:grid-cols-[repeat(1,var(--container-xs))] xl:grid-cols-[repeat(2,var(--container-xs))] xl:grid-cols-[repeat(3,var(--container-xs))]
// // xl:grid-cols-[repeat(1,var(--container-sm))] xl:grid-cols-[repeat(2,var(--container-sm))] xl:grid-cols-[repeat(3,var(--container-sm))]
// // xl:grid-cols-[repeat(1,var(--container-md))] xl:grid-cols-[repeat(2,var(--container-md))] xl:grid-cols-[repeat(3,var(--container-md))]
// // xl:grid-cols-[repeat(1,var(--container-lg))] xl:grid-cols-[repeat(2,var(--container-lg))] xl:grid-cols-[repeat(3,var(--container-lg))]
// // xl:grid-cols-[repeat(1,var(--container-xl))] xl:grid-cols-[repeat(2,var(--container-xl))] xl:grid-cols-[repeat(3,var(--container-xl))]
// // =============================================================================



// // -----------------------------------------------------------------------------
// // Grid Cols Classes
// // -----------------------------------------------------------------------------
// // Compose `(breakpoint:)grid-cols-${n}` classes based on responsive `cols` prop
// // Use a fixed set of known classes so Tailwind will include them (and JIT engine will not purge them)

// const COLS_CLASS: Record<number, string> = {
//   1: "grid-cols-1",
//   2: "grid-cols-2",
//   3: "grid-cols-3",
//   4: "grid-cols-4",
//   5: "grid-cols-5",
//   6: "grid-cols-6",
// };


// function colsToClasses(cols?: PartialResponsiveType<number>, colSize?: string) {
//   if (!cols) return COLS_CLASS[1];
//   if (typeof cols === "number") {
//     if (colSize) {
//       return `grid-cols-[repeat(${cols},var(--container-${colSize}))]`;
//     }
//     return COLS_CLASS[cols] || COLS_CLASS[1];
//   }

//   const classes: string[] = [];

//   // Fonction helper pour générer la classe avec ou sans taille personnalisée
//   const getColClass = (num: number, prefix = "") => {
//     if (colSize) {
//       return `${prefix}grid-cols-[repeat(${num},var(--container-${colSize}))]`;
//     }
//     return `${prefix}${COLS_CLASS[num]}`;
//   };

//   if (cols.base) classes.push(getColClass(Number(cols.base)));
//   if (cols.sm) classes.push(getColClass(Number(cols.sm), "sm:"));
//   if (cols.md) classes.push(getColClass(Number(cols.md), "md:"));
//   if (cols.lg) classes.push(getColClass(Number(cols.lg), "lg:"));
//   if (cols.xl) classes.push(getColClass(Number(cols.xl), "xl:"));
//   if (cols["2xl"]) classes.push(getColClass(Number(cols["2xl"]), "2xl:"));

//   return classes.join(" ");
// }


// // -----------------------------------------------------------------------------
// // TYPE DEFINITIONS
// // -----------------------------------------------------------------------------

// type SimpleGridOwnProps = {
//   cols?: PartialResponsiveType<number>;
//   size?: Size;
// }

// type SimpleGridProps = AtomProps & SimpleGridOwnProps;

// type SimpleGridPolymorphicProps<T extends React.ElementType = "span"> =
//   PolymorphicProps<T, SimpleGridProps>

// // -----------------------------------------------------------------------------
// // COMPONENT IMPLEMENTATION
// // -----------------------------------------------------------------------------

// /**
//  * SimpleGrid component to specify responsive the number of columns
//  */
// const SimpleGrid = forwardRefPolymorphic<"span", SimpleGridProps>(
//   function SimpleGrid<T extends React.ElementType = "span">(
//     {
//       gap = "md",


//       cols,
//       /** None means full */
//       size,

//       ...props
//     }: SimpleGridPolymorphicProps<T>,
//     ref: PolymorphicRef<T>
//   ) {

//     // Resolve the atom tokens
//     const {
//       as,
//       className,
//       style,

//       ...rest
//     } = resolveAtomTokens({ ...props, gap });


//     const colClass = colsToClasses(cols, size);

//     console.log("colClass", { cols, size, colClass });

//     // -------------------------------------------------------------------------
//     // RENDER
//     // -------------------------------------------------------------------------

//     return (
//       <Atom
//         as={as as any}
//         ref={ref}
//         className={cn("grid w-full", colClass, className)}
//         style={{ ...style }}
//         {...rest} // Spread remaining rest (color theme, style, event handlers, etc.)
//       />
//     )
//   }
// )

// // -----------------------------------------------------------------------------
// // SMART SLOT
// // -----------------------------------------------------------------------------

// const SmartSimpleGrid = asSmartSlot(SimpleGrid);

// // -----------------------------------------------------------------------------
// // EXPORT
// // -----------------------------------------------------------------------------

// export {
//   SimpleGrid,
//   SmartSimpleGrid
// };

// export type {
//   SimpleGridProps,
//   SimpleGridPolymorphicProps
// };
