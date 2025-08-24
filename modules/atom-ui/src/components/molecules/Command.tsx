"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import {
  Dialog,
} from "./Dialog"

import { cn } from "@uikit/lib"
import { HStack, IconActive, IconCheckboxChecked, IconChevronRight, IconSearch, IconSelected, Input } from "../atoms"
import { Atom } from "../core"


// =============================================================================
// COMMAND COMPOSED
// =============================================================================
// @TODO ?
function CommandComposed({
  children, ...props
}: React.ComponentProps<typeof CommandPrimitive> & {
  children: React.ReactNode
}) {

  return (
    <CommandRoot
      data-slot="command"
      {...props}
    >
      {children}
    </CommandRoot>
  )
}
// =============================================================================

function CommandRoot({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Header className="sr-only">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Box
        className={cn("overflow-hidden p-0", className)}
      >
        {showCloseButton && <Dialog.CloseIcon />}
        <CommandRoot className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </CommandRoot>
      </Dialog.Box>
    </Dialog.Root>
  )
}

function CommandInput({
  className,
  size,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="p-2"
    >
      <CommandPrimitive.Input asChild>
        <Input
          iconLeft={IconSearch}
          data-slot="command-input"
          className={cn(
            "w-full",
            className
          )}
          size={"md"}
          {...props}
        />
      </CommandPrimitive.Input>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

type ItemProps = React.ComponentProps<typeof CommandPrimitive.Item> & {
  selected?: boolean
}

export const CommandItem = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, children, selected, ...itemProps }, ref) => {
    return (
      <CommandPrimitive.Item asChild {...itemProps}>
        <Atom
          ref={ref}
          as="div"
          data-slot="command-item"
          className={cn(
            "justify-between",
            "group relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden",
            "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
            "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
            className
          )}
        >
          {children}
          {selected && <IconSelected />}
        </Atom>
      </CommandPrimitive.Item>
    )
  }
)

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export const Command = Object.assign(CommandComposed, {
  Root: CommandRoot,
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
})
