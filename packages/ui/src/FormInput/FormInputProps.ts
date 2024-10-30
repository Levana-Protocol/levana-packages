import type Input from "@mui/joy/Input"
import type Typography from "@mui/joy/Typography"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"

export interface FormInputSlots {
  root?: React.ElementType
  input?: React.ElementType
  prefixLabel?: React.ElementType
  suffixLabel?: React.ElementType
}

export type FormInputSlotsAndSlotProps = CreateSlotsAndSlotProps<
  FormInputSlots,
  {
    root: SlotProps<"div", object, FormInputOwnerState>
    input: SlotProps<typeof Input, object, FormInputOwnerState>
    prefixLabel: SlotProps<typeof Typography, object, FormInputOwnerState>
    suffixLabel: SlotProps<typeof Typography, object, FormInputOwnerState>
  }
>

export interface FormInputDataProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "placeholder"
  > {
  prefix?: string
  suffix?: string
  /**
   * A string representing the suffix when the amount is too big
   */
  minSuffix?: string
}

interface FormInputTypeMap<P = object, D extends React.ElementType = "div"> {
  props: P &
    FormInputSlotsAndSlotProps &
    FormInputDataProps &
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      "readOnly" | "disabled"
    > & {
      // TODO: get type from `ValidateIssue["type"]`
      issueType?: "error" | "warning"
      sx?: SxProps
    }
  defaultComponent: D
}

export type FormInputProps<
  D extends React.ElementType = FormInputTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<FormInputTypeMap<P, D>, D>

export type FormInputOwnerState = FormInputProps
