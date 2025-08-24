import { cn, resolveAtomTokens } from "../../lib"
import {
  forwardRefPolymorphic,
  PolymorphicProps,
  PolymorphicRef
} from "../../lib/core/polymorphic-helpers"
import { Atom, type AtomProps } from "../core/Atom"
import { PartialResponsiveType } from "../../lib/typescript";
import { asSmartSlot } from "../core";


// =============================================================================
// SimpleGrid
// -----------------------------------------------------------------------------
// [Atomic] [Polymorphic] [SmartSlot] [Layout]
// -----------------------------------------------------------------------------
// SimpleGrid component to specify responsive the number of columns
// =============================================================================



// -----------------------------------------------------------------------------
// Grid Cols Classes
// -----------------------------------------------------------------------------
// Compose `(breakpoint:)grid-cols-${n}` classes based on responsive `cols` prop
// Use a fixed set of known classes so Tailwind will include them (and JIT engine will not purge them)

const COLS_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};


function colsToClasses(cols?: PartialResponsiveType<number>) {
  if (!cols) return COLS_CLASS[1];
  if (typeof cols === "number") return COLS_CLASS[cols] || COLS_CLASS[1];

  const classes: string[] = [];
  if (cols.base) classes.push(COLS_CLASS[cols.base]);
  if (cols.sm) classes.push(`sm:${COLS_CLASS[cols.sm]}`);
  if (cols.md) classes.push(`md:${COLS_CLASS[cols.md]}`);
  if (cols.lg) classes.push(`lg:${COLS_CLASS[cols.lg]}`);
  if (cols.xl) classes.push(`xl:${COLS_CLASS[cols.xl]}`);
  return classes.join(" ");
}


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type SimpleGridOwnProps = {
  cols?: PartialResponsiveType<number>;
}

type SimpleGridProps = AtomProps & SimpleGridOwnProps;

type SimpleGridPolymorphicProps<T extends React.ElementType = "span"> =
  PolymorphicProps<T, SimpleGridProps>

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

/**
 * SimpleGrid component to specify responsive the number of columns
 */
const SimpleGrid = forwardRefPolymorphic<"span", SimpleGridProps>(
  function SimpleGrid<T extends React.ElementType = "span">(
    {
      gap = "md",
      ...props
    }: SimpleGridPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    // Resolve the atom tokens
    const {
      as,
      className,
      style,
      cols,

      ...rest
    } = resolveAtomTokens({ ...props, gap });

    const colClass = colsToClasses(cols);

    // -------------------------------------------------------------------------
    // RENDER
    // -------------------------------------------------------------------------

    return (
      <Atom
        as={as as any}
        ref={ref}
        className={cn("grid w-full", colClass, className)}
        style={{ ...style }}
        {...rest} // Spread remaining rest (color theme, style, event handlers, etc.)
      />
    )
  }
)

// -----------------------------------------------------------------------------
// SMART SLOT
// -----------------------------------------------------------------------------

const SmartSimpleGrid = asSmartSlot(SimpleGrid);

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export {
  SimpleGrid,
  SmartSimpleGrid
};

export type {
  SimpleGridProps,
  SimpleGridPolymorphicProps
};