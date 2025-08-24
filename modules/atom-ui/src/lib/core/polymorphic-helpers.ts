// 'use client'

// polymorphic-helpers.ts
import * as React from "react"

export type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>
export type PolymorphicProps<T extends React.ElementType, P> =
  P & { as?: T; asChild?: boolean } &
  Omit<PropsOf<T>, keyof P | "as" | "asChild">

export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"]

/** Wrap forwardRef to keep a clean/generic signature */
export function forwardRefPolymorphic<
  D extends React.ElementType,
  OwnProps = {}
>(
  render: <T extends React.ElementType = D>(
    props: PolymorphicProps<T, OwnProps>,
    ref: PolymorphicRef<T>
  ) => React.ReactElement | null
) {
  return React.forwardRef(render as any) as <
    T extends React.ElementType = D
  >(
    props: PolymorphicProps<T, OwnProps> & { ref?: PolymorphicRef<T> }
  ) => React.ReactElement | null
}
