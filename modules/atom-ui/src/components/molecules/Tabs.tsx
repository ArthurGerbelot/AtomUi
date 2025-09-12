"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib"
import { Button } from "../atoms/Button"
import { HStack, StackProps } from "../atoms/Stack"
import { Atom, AtomProps, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef } from "../core"
import Link, { LinkProps } from "next/link"
import { ScrollArea } from "./ScrollArea"

// Variants for different tab styles
const tabsVariants = cva("flex flex-col", {
  variants: {
    variant: {
      line: "gap-0",
      solid: "gap-2",
      outline: "gap-2"
    }
  },
  defaultVariants: {
    variant: "line"
  }
})

const tabsListVariants = cva("", {
  variants: {
    variant: {
      line: "",
      solid: "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-light p-1",
      outline: "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-light p-1"
    },
    borderDirection: {
      bottom: "",
      top: "",
      left: "",
      right: ""
    }
  },
  defaultVariants: {
    variant: "line",
    borderDirection: "bottom"
  },
  compoundVariants: [
    // Only apply container borders for line variant
    {
      variant: "line",
      borderDirection: "bottom",
      class: "border-b border-border w-full"
    },
    {
      variant: "line",
      borderDirection: "top",
      class: "border-t border-border w-full"
    },
    {
      variant: "line",
      borderDirection: "left",
      class: "border-l border-border h-full w-fit flex-col"
    },
    {
      variant: "line",
      borderDirection: "right",
      class: "border-r border-border h-full w-fit flex-col"
    }
  ]
})

const tabsTriggerVariants = cva("cursor-pointer transition-colors min-w-fit", {
  variants: {
    variant: {
      line: "relative px-4 py-2 text-center text-foreground hover:text-muted-foreground data-[state=active]:text-foreground",
      solid: "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      outline: "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium border border-transparent text-muted-foreground hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-low-contrast data-[state=active]:text-foreground data-[state=active]:bg-transparent"
    },
    borderDirection: {
      bottom: "",
      top: "",
      left: "",
      right: ""
    }
  },
  defaultVariants: {
    variant: "line",
    borderDirection: "bottom"
  },
  compoundVariants: [
    // Only apply borders for line variant
    {
      variant: "line",
      borderDirection: "bottom",
      class: "border-b-[3px] border-transparent data-[state=active]:border-full-contrast"
    },
    {
      variant: "line",
      borderDirection: "top",
      class: "border-t-[3px] border-transparent data-[state=active]:border-full-contrast"
    },
    {
      variant: "line",
      borderDirection: "left",
      class: "border-l-[3px] border-transparent data-[state=active]:border-full-contrast text-left"
    },
    {
      variant: "line",
      borderDirection: "right",
      class: "border-r-[3px] border-transparent data-[state=active]:border-full-contrast text-right"
    }
  ]
})

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsVariants>

function Tabs({
  className,
  variant,
  ...props
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-variant={variant}
      className={cn(tabsVariants({ variant }), className)}
      {...props}
    />
  )
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants> &
  StackProps

function TabsList({
  className,
  variant = "line",
  borderDirection = "bottom",
  ...props
}: TabsListProps) {

  // if (variant === "solid") {
  //   // solid variant doesn't use HStack
  //   return (
  //     <TabsPrimitive.List
  //       data-slot="tabs-list"
  //       className={cn(tabsListVariants({ variant }), className)}
  //       {...props}
  //     />
  //   )
  // }

  // Line variant uses HStack for distribution
  return (
    <ScrollArea.Root className="w-full">
      <ScrollArea.Viewport className="w-full">
        <HStack
          as={TabsPrimitive.List}
          data-slot="tabs-list"
          className={cn(
            tabsListVariants({ variant, borderDirection }),
            className
          )}
          {...props}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Bar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants> &
  AtomProps & {
    isActive?: boolean
  }

export type TabsTriggerPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, TabsTriggerProps>

const TabsTrigger = forwardRefPolymorphic<"div", TabsTriggerProps>(
  function TabsTrigger<T extends React.ElementType = "div">(
    props: TabsTriggerPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const {
      className,
      variant = "line",
      borderDirection = "bottom",
      children,
      as,
      style,
      isActive,
      ...rest
    } = props

    return (
      <Atom
        ref={ref}
        data-slot="tabs-trigger"
        as={as ?? TabsPrimitive.Trigger}
        className={cn(tabsTriggerVariants({ variant, borderDirection }), className)}
        style={style}
        ellipsis
        {...(typeof isActive === "boolean" && { "data-state": isActive ? "active" : undefined })}
        {...rest}
      >
        {children}
      </Atom>
    )
  }
)

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type { TabsProps, TabsListProps, TabsTriggerProps }
