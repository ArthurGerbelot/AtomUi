import { Atom, AtomProps } from "../core"

// Redo better later (Polymorphism, SmartSlot (label, caption, ...))
export const Fieldset = (props: AtomProps) => <Atom as="fieldset" {...props} />