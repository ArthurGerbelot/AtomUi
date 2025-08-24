# Type of Polymorphisme on Components

### ① Only Polymorphic Components

⚠️ Typing is flexible but weak — native props like type, href, etc. are not inferred.

Examples:

* Radix UI
* shadcn/ui
* Ark UI

[✔] → You get as="a", but href is any
[x] → ref typing often breaks
[x] → Consumers rely on guesswork or JSDoc
    `extended` or `polymorphic` Component loose types for props (all acceptes, all any)

```tsx
export const ButtonPolymorphic = ButtonImpl as <E extends React.ElementType = "button">(
  props: ButtonProps<E>  // Props extend <E> !
    & { ref?: React.ComponentPropsWithRef<E>["ref"] }
) => React.ReactElement | null

```

### Only Concrete Components

✅ Strong typing, but no structural flexibility — no as, no Slot, no overrides.

Examples:

* Material UI (pre-v5)
* Ant Design
* Mantine (mostly concrete)

[✔] → Great IDE support, but limited extensibility
[x] → Hard to build composites or override tags
    `<Button as={Link} href="#"/>` <= Component don't have `href` props


```tsx
export const Button = ButtonImpl as <E extends React.ElementType = "button">(
  props: ButtonProps   // Props extends NOTHING
    & { ref?: React.ComponentPropsWithRef<E>["ref"] }
) => React.ReactElement | null
```

### Previous Approach: Provide Both Versions (Working well but not user-friendly)
✅ Best of both worlds: DX and flexibility.

* Button → concrete, type-safe, IDE-friendly
* ButtonPolymorphic → fully flexible, as={...}, composable


### Final choice - Bull Kit : ComponentWithAs


```tsx
export type ComponentWithAs<P, DefaultTag extends React.ElementType> = {
  <T extends React.ElementType = DefaultTag>(
    props: P & { as?: T } & Omit<React.ComponentPropsWithRef<T>, keyof P>
  ): React.ReactElement | null
}

export const Atom = AtomImpl as ComponentWithAs<AtomPolymorphicProps, "div">
export const BaseButton = BaseButtonImpl as ComponentWithAs<BaseButtonProps, "button">
```

[✔] No need for generics in props — all components use a single BaseButtonProps type (no <E> required).
[✔] Polymorphism is handled cleanly via ComponentWithAs — enables as, asChild, native props, ref, and proper types.
[✔] Atom and all derived components work consistently — asChild, as="a", as={Link}, as={Input} all function as expected.
[✔] Components like BaseButton stay simple to use — all props are exposed directly and autocomplete works well.

[✘] Known TypeScript limitation on `e` inference — <Atom as={Button} onClick={(e) => ...} /> has e typed as any. Cannot be fixed due to TypeScript’s polymorphic typing limitations. Chakra UI has the same issue.
[✘] as={} works (with props and types) can only be used with html tags and not React Components


| Feature / Approach               | Classic Component | Cast `<E>`                 | Cast `<any, any>` | ComponentWithAs (chosen)     |
|----------------------------------|-------------------|----------------------------|-------------------|------------------------------|
| Supports `as="a"` / `as="button"`| ✅ Yes            | ✅ Yes                     | ✅ Yes            | ✅ Yes                       |
| Supports `as={Link}`             | ❌ No             | ❌ no `href` on as={Link}  | ⚠️ Types OK       | ❌ no `href` on as={Link}    |
| `asChild` support                | ❌ No             | ✅ Yes                     | ✅ Yes            | ✅ Yes                       |
| Event typings (`e`)              | ✅ Yes            | ✅ Yes                     | ❌ `e: any`       | ❌ `e: any`                  |
| IDE native props inference       | ✅ Yes            | ❌ No                      | ❌ No             | ✅ Yes                       |
| Used by                          | ⚠️ Most libs      | ✅ ShadCN (partly)         | ❌ Older kits     | ✅ Chakra UI                 |
| Simplicity to use                | ✅                | ❌ <Atom<typeof Link>      | ⚠️                | ✅ <Atom as={Link} />        |
                                   |                   |       as={Link}            |                   |                              |
                                   |                   |     />                     |                   |                              |



# FORWARD REF MANAGEMENT IF WE ALREADY HAVE ONE

See InputAount to see how to handle if WE NEED A REF
but we don't know if we'll receive one from the parent:


```
  const innerRef = React.useRef<HTMLInputElement>(null)
  React.useImperativeHandle(ref as any, () => innerRef.current as HTMLInputElement)
```