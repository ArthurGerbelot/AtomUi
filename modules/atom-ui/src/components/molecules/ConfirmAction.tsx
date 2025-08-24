import { createSmartSlotSpecs, pickSmartSlotSpecs, SmartSlot } from "../core"
import { Dialog, DialogProps } from "../molecules/Dialog"
import { Button, ButtonProps, SmartButton } from "../atoms/Button"
import { IconWarning } from "../atoms/IconLibrary"
import { SmartText } from "../atoms/Text"


// =============================================================================
// ConfirmAction
// -----------------------------------------------------------------------------
// [Polymorphic] [SmartSlot] [Interactive] [Dialog]
// -----------------------------------------------------------------------------
// Helper Components to confirm action.
// children is rendered as the trigger for the dialog.
// =============================================================================


// -----------------------------------------------------------------------------
// TYPE DEFINITIONS
// -----------------------------------------------------------------------------

type ConfirmSpecs = SmartSlot<ButtonProps, "confirm">;
type CancelSpecs = SmartSlot<ButtonProps, "cancel">;

type ConfirmActionOwnProps = {
  onConfirm: () => void,
  children: DialogProps["trigger"]
}
  & ConfirmSpecs
  & CancelSpecs;

export type ConfirmActionProps = Omit<DialogProps, "trigger" | "triggerProps" | "Trigger">
  & ConfirmActionOwnProps;



// -----------------------------------------------------------------------------
// COMPONENT DEFINITIONS
// -----------------------------------------------------------------------------

export function ConfirmAction({

  cancel, cancelProps, Cancel,
  confirm, confirmProps, Confirm,

  onConfirm,
  children,
  ...props
}: ConfirmActionProps) {

  const bodySpecs = pickSmartSlotSpecs(props, "body");

  return (
    <Dialog
      trigger={children}
      title="Confirm action"
      icon={IconWarning}
      iconProps={{ textColor: "destructive" }}
      // align="center"
      footer={
        <>
          <Dialog.Close asChild>
            <SmartButton secondary specs={createSmartSlotSpecs(cancel, cancelProps, Cancel)}>
              Cancel
            </SmartButton>
          </Dialog.Close>

          <Dialog.Close asChild>
            <SmartButton onClick={onConfirm} specs={createSmartSlotSpecs(confirm, confirmProps, Confirm)}>
              Confirm
            </SmartButton>
          </Dialog.Close>
        </>
      }
      {...props}
    >
      <SmartText specs={bodySpecs} >Are you sure?</SmartText>
    </Dialog>
  )
}


// -----------------------------------------------------------------------------
// Delete Version
// -----------------------------------------------------------------------------

export function ConfirmDelete(props: ConfirmActionProps) {

  return (
    <ConfirmAction
      title="Confirm delete"
      confirmProps={{ colorTheme: "destructive" }}
      confirm="Delete"
      {...props}
    />
  )
}

