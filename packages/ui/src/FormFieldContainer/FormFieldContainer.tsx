import FormControl from "@mui/joy/FormControl"
import FormHelperText from "@mui/joy/FormHelperText"
import { styled, useThemeProps } from "@mui/joy/styles"
import useSlot from "@mui/joy/utils/useSlot"
import { forwardRef } from "react"

import type {
  FormFieldContainerOwnerState,
  FormFieldContainerProps,
} from "./FormFieldContainerProps"

export * from "./FormFieldContainerProps"

const name = "LevanaFormFieldContainer"

const FormFieldContainerRoot = styled("div", {
  name,
  slot: "root",
})<{ ownerState: FormFieldContainerOwnerState }>(({ theme, ownerState }) => ({
  backgroundColor: theme.vars.palette.background.level1,
  borderRadius: theme.vars.radius.md,
  boxSizing: "border-box",
  paddingInline: "1rem",
  paddingBlock: "1rem",

  ...(ownerState.error && {
    boxShadow: `0 0 0 2px ${theme.vars.palette.danger[500]} inset`,
  }),
  ...(ownerState.warning && {
    boxShadow: `0 0 0 2px ${theme.vars.palette.warning[500]} inset`,
  }),
}))

const FormFieldContainerIssue = styled(FormHelperText, {
  name,
  slot: "issue",
})<{ ownerState: FormFieldContainerOwnerState }>(({ theme, ownerState }) => ({
  ...(ownerState.warning && {
    "--FormHelperText-color": theme.vars.palette.warning[500],
  }),
}))

const FormFieldContainer = forwardRef<HTMLDivElement, FormFieldContainerProps>(
  function FormFieldContainer(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { header, label, input, slider, issue, disabled, ...otherProps } =
      props

    const ownerState = {
      ...otherProps,
      error: issue?.type === "error",
      warning: issue?.type === "warning",
      disabled,
    }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: FormFieldContainerRoot,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const [SlotIssue, issueProps] = useSlot("issue", {
      ref,
      className: "issue",
      elementType: FormFieldContainerIssue,
      ownerState,
      externalForwardedProps: otherProps,
    })

    return (
      <SlotRoot {...rootProps}>
        {header}
        <FormControl
          disabled={disabled}
          error={issue !== undefined}
          sx={{ "--FormLabel-margin": "0", gap: 1 }}
        >
          {label}
          {input}
          {slider}
          {issue && <SlotIssue {...issueProps}>{issue.message}</SlotIssue>}
        </FormControl>
        {props.children}
      </SlotRoot>
    )
  },
)

export default FormFieldContainer
