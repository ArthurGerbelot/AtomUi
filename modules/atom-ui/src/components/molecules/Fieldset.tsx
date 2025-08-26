import { Atom, AtomProps } from "../core"

// =============================================================================
// Fieldset
// -----------------------------------------------------------------------------
// [Molecule] [Polymorphic] [SmartSlot] [Form]
// -----------------------------------------------------------------------------
// Simple fieldset component for form grouping (to be expanded later)
// =============================================================================

// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------

// TODO: Redo better later (Polymorphism, SmartSlot (label, caption, ...))
export const Fieldset = (props: AtomProps) => <Atom as="fieldset" {...props} />