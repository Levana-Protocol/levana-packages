import type FormHelperText from "@mui/joy/FormHelperText"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"

export interface FormFieldContainerSlots {
  root?: React.ElementType
  issue?: React.ElementType
}

export type FormFieldContainerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormFieldContainerSlots,
  {
    root: SlotProps<"div", object, FormFieldContainerOwnerState>
    issue: SlotProps<
      typeof FormHelperText,
      object,
      FormFieldContainerOwnerState
    >
  }
>

interface FormFieldContainerTypeMap<
  P = object,
  D extends React.ElementType = "div",
> {
  props: P &
    FormFieldContainerSlotsAndSlotProps & {
      /**
       * A top view, outside of the form control
       *
       * This component is unaffected from form field controls such as disabled.
       */
      header?: JSX.Element
      label?: JSX.Element
      input?: JSX.Element
      slider?: JSX.Element
      // TODO: get type from `ValidateIssue`
      issue?: {
        type: "error" | "warning"
        message: string
      }
      disabled?: boolean
      sx?: SxProps
    }
  defaultComponent: D
}

export type FormFieldContainerProps<
  D extends React.ElementType = FormFieldContainerTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<FormFieldContainerTypeMap<P, D>, D>

export type FormFieldContainerOwnerState = FormFieldContainerProps & {
  error: boolean
  warning: boolean
}
