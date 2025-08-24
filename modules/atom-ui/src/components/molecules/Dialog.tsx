"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn, resolveAtomTokens } from "../../lib"
import { Header, type HeaderProps } from "./Header"
import { Heading, IconButtonProps, IconClose, Overlay, SmartIconButton, Text } from "../atoms"
import { Atom, AtomProps, createSmartSlotSpecs, forwardRefPolymorphic, PolymorphicProps, PolymorphicRef, SmartSlot, smartSlotMustBeRendered } from "../core"


// =============================================================================
// Dialog
// -----------------------------------------------------------------------------
// [Molecule] [Dialog]
// -----------------------------------------------------------------------------
// Dialog Component focused on a11y and accessibility based on Radix Primitives
// =============================================================================




// =============================================================================
// Dialog Composed - one‑shot API
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type DialogComposedOwnProps = {
  /** Trigger rendered via <Dialog.Trigger asChild> */
  trigger?: React.ReactNode

  // Transform to SmartSlot ?!
  //   or only provide props
  boxProps?: React.ComponentProps<typeof DialogPrimitive.Content>
  headerProps?: React.ComponentProps<typeof DialogPrimitive.Content>

  // If true, the <Dialog.Content> will not be rendered.
  avoidContent?: boolean
  contentProps?: React.ComponentProps<typeof DialogPrimitive.Content>

  // Footer content
  footer?: React.ReactNode

  // Options
  showCloseButton?: boolean
} & HeaderProps

type DialogComposedProps = React.ComponentProps<typeof DialogPrimitive.Root> & DialogComposedOwnProps


// -----------------------------------------------------------------------------
// COMPONENT IMPLEMENTATION
// -----------------------------------------------------------------------------


/**
 * One‑shot API Dialog Composed Component focused on a11y and accessibility
 *
 * @param props - DialogProps
 * @returns Dialog component
 */
function DialogComposed({
  // Root props
  children,
  open,
  defaultOpen,
  onOpenChange,
  modal,

  // One‑shot API
  trigger,

  // Part props (not SmartSlot - yet?)
  boxProps,
  headerProps,

  avoidContent,
  contentProps,

  // Header SmartSlots
  title, titleProps, Title,
  subtitle, subtitleProps, Subtitle,
  description, descriptionProps, Description,
  icon, iconProps, Icon,
  Action, BackLink,
  align,

  // Footer content
  footer,

  showCloseButton = true,

  ...restRoot
}: DialogComposedProps) {

  // Define if Header should be shown
  const shouldShowHeader = smartSlotMustBeRendered(createSmartSlotSpecs(title, titleProps, Title))
    || smartSlotMustBeRendered(createSmartSlotSpecs(subtitle, subtitleProps, Subtitle))
    || smartSlotMustBeRendered(createSmartSlotSpecs(description, descriptionProps, Description))
    || smartSlotMustBeRendered(createSmartSlotSpecs(icon, iconProps, Icon))
    || Action
    || BackLink
  // If footer not provided do not show anything (for margin management)
  const shouldShowFooter = Boolean(footer)


  return (
    <DialogRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
      {...restRoot}
    >
      {trigger && (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      )}

      <DialogBox a11yTitle={typeof title === "string" ? title : undefined} {...boxProps}>

        {showCloseButton && <DialogCloseIcon />}

        {shouldShowHeader && (
          <DialogHeader
            title={title}
            titleProps={titleProps}
            Title={Title}
            subtitle={subtitle}
            subtitleProps={subtitleProps}
            Subtitle={Subtitle}
            description={description}
            descriptionProps={descriptionProps}
            Description={Description}
            icon={icon}
            iconProps={iconProps}
            Icon={Icon}
            Action={Action}
            BackLink={BackLink}
            align={align}
            {...headerProps}
          />
        )}

        {!avoidContent
          ? (
            <DialogContent {...contentProps}>
              {children}
            </DialogContent>
          )
          : children
        }

        {shouldShowFooter && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogBox>
    </DialogRoot>
  )
}

// =============================================================================
// Dialog Primitives
// =============================================================================

// DialogRoot
// ----------------------------------

type DialogRootProps = React.ComponentProps<typeof DialogPrimitive.Root>
/**
 * Stateful container (Radix Root) handling a11y and value
 */
function DialogRoot({
  ...props
}: DialogRootProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}


// DialogTrigger
// ----------------------------------

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>

function DialogTrigger({
  ...props
}: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

// DialogPortal
// ----------------------------------

type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>

function DialogPortal({
  ...props
}: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

// DialogClose
// ----------------------------------

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>

/**
 * Radix Close Primitive that render nothing but is used to close the dialog
 * Wrap around Interactive Component (IconButton, Button, etc.)
 * Use DialogCloseIcon to render the close Icon Button (to right cross)
 */
function DialogClose({
  ...props
}: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

// DialogCloseIcon
// ----------------------------------

type DialogCloseIconProps = React.ComponentProps<typeof DialogPrimitive.Close> & SmartSlot<IconButtonProps, "iconButton">

function DialogCloseIcon({
  iconButton, iconButtonProps, IconButton,
  ...props
}: DialogCloseIconProps) {
  return (
    <DialogPrimitive.Close asChild data-slot="dialog-close" {...props} >
      <SmartIconButton
        className="absolute top-2 right-2 z-10"
        specs={createSmartSlotSpecs(iconButton, iconButtonProps, IconButton)}
      >
        <IconClose />
      </SmartIconButton>
    </DialogPrimitive.Close>
  )
}

// DialogOverlay
// ----------------------------------

type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>

function DialogOverlay({
  className,
  ...props
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay asChild data-slot="dialog-overlay" {...props}>
      <Overlay />
    </DialogPrimitive.Overlay>
  )
}

// -----------------------------------------------------------------------------
// Dialog Content (The Box)
// -----------------------------------------------------------------------------

type DialogBoxProps = React.ComponentProps<typeof DialogPrimitive.Content> & { a11yTitle?: string }

function DialogBox({
  className,
  children,
  ...props
}: DialogBoxProps) {
  const { a11yTitle, ...rest } = props as any
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background " +
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 " +
          "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] " +
          "translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 " +
          "max-w-2xl",
          className
        )}
        {...rest}
      >
        {a11yTitle ? (
          <DialogPrimitive.Title className="sr-only">{a11yTitle}</DialogPrimitive.Title>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}



// -----------------------------------------------------------------------------
// Dialog Body (Content of the dialog)
// -----------------------------------------------------------------------------


type DialogContentProps = AtomProps
type DialogContentPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, DialogContentProps>


/**
 * Default value renderer (mirrors the selected <SelectItem>)
 */
const DialogContent = forwardRefPolymorphic<"div", DialogContentProps>(
  function SelectValue<T extends React.ElementType = "div">(
    { placeholder, ...atomProps }: DialogContentPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { className, style, as, ...rest } = resolveAtomTokens(atomProps)
    return (
      <Atom
        ref={ref}
        as={as as any}
        data-slot="dialog-body"
        className={cn("px-4 py-2 min-h-0 overflow-y-auto pr-2 space-y-3", className)}
        style={style}
        {...rest}
      />
    )
  }
)

// -----------------------------------------------------------------------------
// Dialog Original Primitive Component (not using Header molecule)
// -----------------------------------------------------------------------------
// Use this if you don't want to use the Header molecule and need to create a custom one
// -----------------------------------------------------------------------------


// DialogTitle
// ----------------------------------

type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>

function DialogTitle({
  className,
  ...props
}: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}


// DialogDescription
// ----------------------------------

type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>

function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

// -----------------------------------------------------------------------------
// Dialog using Header molecule
// -----------------------------------------------------------------------------

// DialogHeader
// ----------------------------------

type DialogHeaderProps = HeaderProps

// New: Header wired to our Header molecule while preserving a11y via Radix Title/Description
function DialogHeader(props: DialogHeaderProps) {
  const { className, ...rest } = props
  return (
    <Header
      Title={DialogTitleSlot}
      Subtitle={Heading}
      Description={DialogDescriptionSlot}
      className={cn("px-4 py-2", className)}
      {...rest}
    />
  )
}

// Wrappers a11y: Radix Title/Description with own Heading (asChild)
function DialogTitleSlot(props: React.ComponentProps<typeof Heading>) {
  return (
    <DialogPrimitive.Title asChild>
      <Heading {...props} />
    </DialogPrimitive.Title>
  )
}

function DialogDescriptionSlot(props: React.ComponentProps<typeof Text>) {
  return (
    <DialogPrimitive.Description asChild>
      <Text {...props} />
    </DialogPrimitive.Description>
  )
}



// -----------------------------------------------------------------------------
// Dialog Footer
// -----------------------------------------------------------------------------


type DialogFooterProps = AtomProps
type DialogFooterPolymorphicProps<T extends React.ElementType = "div"> =
  PolymorphicProps<T, DialogFooterProps>


/**
 * Default value renderer (mirrors the selected <SelectItem>)
 */
const DialogFooter = forwardRefPolymorphic<"div", DialogFooterProps>(
  function DialogFooter<T extends React.ElementType = "div">(
    { placeholder, ...atomProps }: DialogFooterPolymorphicProps<T>,
    ref: PolymorphicRef<T>
  ) {

    const { className, style, as, ...rest } = resolveAtomTokens(atomProps)

    return (
      <Atom
        ref={ref}
        as={as as any}
        data-slot="dialog-footer"

        className={cn("p-4 pt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
        style={style}

        {...rest}
      />
    )
  }
)


// =============================================================================
// Exports
// =============================================================================


export const Dialog = Object.assign(DialogComposed, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  CloseIcon: DialogCloseIcon,
  Overlay: DialogOverlay,
  Box: DialogBox,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Header: DialogHeader,
});

export type {
  DialogComposedProps as DialogProps,
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogCloseProps,
  DialogCloseIconProps,
  DialogOverlayProps,
  DialogBoxProps,
  DialogContentProps, DialogContentPolymorphicProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogHeaderProps,
  DialogFooterProps, DialogFooterPolymorphicProps,
};
