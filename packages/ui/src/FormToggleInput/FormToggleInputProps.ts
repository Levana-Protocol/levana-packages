import type IconButton from "@mui/joy/IconButton"
import type Input from "@mui/joy/Input"
import type Typography from "@mui/joy/Typography"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"

import type {
  FormInputProps,
  FormInputDataProps,
} from "../FormInput/FormInputProps"

export interface FormToggleInputSlots {
  root?: React.ElementType
  input?: React.ElementType
  label?: React.ElementType
  toggle?: React.ElementType
}

export type FormToggleInputSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormToggleInputSlots,
  {
    root: SlotProps<"div", object, FormToggleInputOwnerState>
    input: SlotProps<typeof Input, object, FormToggleInputOwnerState>
    label: SlotProps<typeof Typography, object, FormToggleInputOwnerState>
    toggle: SlotProps<typeof IconButton, object, FormToggleInputOwnerState>
  }
>

interface FormToggleInputTypeMap<
  P = object,
  D extends React.ElementType = "div",
> {
  props: P &
    FormToggleInputSlotsAndSlotProps &
    Pick<FormInputProps, "readOnly" | "disabled" | "issueType"> & {
      /**
       * The primary value always starts at the top
       */
      primary: FormInputDataProps
      /**
       * The secondary value always starts at the bottom
       */
      secondary: FormInputDataProps
      onToggle?: () => void
      /**
       * Toggle between the primary and secondary inputs
       *
       * If the value is `undefined`, than the value will be managed internally.
       */
      toggled?: boolean
      sx?: SxProps
    }
  defaultComponent: D
}

export type FormToggleInputProps<
  D extends React.ElementType = FormToggleInputTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<FormToggleInputTypeMap<P, D>, D>

export type FormToggleInputOwnerState = FormToggleInputProps
