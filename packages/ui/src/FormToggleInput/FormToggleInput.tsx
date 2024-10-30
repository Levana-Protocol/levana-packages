import IconButton from "@mui/joy/IconButton"
import Typography, { typographyClasses } from "@mui/joy/Typography"
import useSlot from "@mui/joy/utils/useSlot"
import { styled, useThemeProps } from "@mui/joy/styles"
import { forwardRef, useState } from "react"

import ArrowsIcon from "../icons/ArrowsIcon"
import FormInput from "../FormInput/FormInput"
import type {
  FormToggleInputOwnerState,
  FormToggleInputProps,
} from "./FormToggleInputProps"

export * from "./FormToggleInputProps"

const name = "LevanaFormToggleInput"

const FormToggleInputRoot = styled("div", {
  name,
  slot: "root",
})<{ ownerState: FormToggleInputOwnerState }>(({ theme, ownerState }) => ({
  "--FormToggleInputToggle-size": "2rem",
  paddingBottom: theme.spacing(0.5),
  display: "grid",
  gridTemplateColumns: ownerState.readOnly
    ? "1fr"
    : "1fr var(--FormToggleInputToggle-size)",
  gridTemplateAreas: ownerState.readOnly
    ? `
        'input'
        'label'
      `
    : `
        'input toggle'
        'label toggle'
      `,
  columnGap: theme.spacing(1),
}))

const FormToggleInputInput = styled(FormInput, {
  name,
  slot: "input",
})({
  gridArea: "input",
})

const FormToggleInputLabel = styled(Typography, {
  name,
  slot: "label",
})<{ ownerState: FormToggleInputOwnerState }>(({ theme, ownerState }) => ({
  gridArea: "label",
  fontSize: theme.vars.fontSize.xs,
  color: ownerState.disabled
    ? theme.vars.palette.text.tertiary
    : theme.vars.palette.text.secondary,
  overflow: "hidden",

  [`.${typographyClasses.endDecorator}`]: {
    color: theme.vars.palette.text.tertiary,
  },
}))

const FormToggleInputToggle = styled(IconButton, {
  name,
  slot: "toggle",
})({
  "--IconButton-size": "var(--FormToggleInputToggle-size)",
  gridArea: "toggle",
  alignSelf: "center",
})

const FormToggleInput = forwardRef<HTMLDivElement, FormToggleInputProps>(
  function FormToggleInput(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { ...otherProps } = props
    const {
      primary,
      secondary,
      onToggle: _,
      toggled,
      disabled,
      readOnly,
      issueType,
      ...externalForwardedProps
    } = otherProps
    const ownerState = {
      ...otherProps,
      disabled,
      readOnly,
      toggled,
      issueType,
    }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: FormToggleInputRoot,
      ownerState,
      externalForwardedProps,
    })

    const [SlotInput, inputProps] = useSlot("input", {
      ref,
      className: "input",
      elementType: FormToggleInputInput,
      ownerState,
      externalForwardedProps,
    })

    const [SlotLabel, labelProps] = useSlot("label", {
      ref,
      className: "label",
      elementType: FormToggleInputLabel,
      ownerState,
      externalForwardedProps,
    })

    const [SlotToggle, toggleProps] = useSlot("toggle", {
      ref,
      className: "toggle",
      elementType: FormToggleInputToggle,
      ownerState,
      externalForwardedProps,
    })

    const toggle = useToggle(props)

    const top = toggle.toggled ? secondary : primary
    const bottom = toggle.toggled ? primary : secondary

    return (
      <SlotRoot {...rootProps}>
        <SlotInput
          value={top.value}
          onChange={top.onChange}
          placeholder={top.placeholder}
          prefix={top.prefix}
          suffix={top.suffix}
          minSuffix={top.minSuffix}
          disabled={disabled}
          readOnly={readOnly}
          issueType={issueType}
          // biome-ignore lint/suspicious/noExplicitAny:
          slotProps={props.slotProps as any}
          {...inputProps}
        />
        <SlotLabel
          startDecorator={bottom.prefix}
          endDecorator={bottom.suffix}
          {...labelProps}
        >
          {bottom.value || bottom.placeholder}
        </SlotLabel>
        {!readOnly && (
          <SlotToggle
            color="neutral"
            variant="soft"
            size="sm"
            disabled={disabled}
            onClick={toggle.handleToggle}
            aria-label="input toggle"
            {...toggleProps}
          >
            <ArrowsIcon />
          </SlotToggle>
        )}
      </SlotRoot>
    )
  },
)

type UseToggleProps = Pick<
  FormToggleInputProps,
  "primary" | "secondary" | "toggled" | "onToggle"
>

const useToggle = (props: UseToggleProps) => {
  const [controlToggled, setControlToggled] = useState(false)

  const handleToggle = () => {
    setControlToggled((isToggled) => !isToggled)
    props.onToggle?.()
  }

  return {
    toggled: props.toggled ?? controlToggled,
    handleToggle: props.toggled !== undefined ? props.onToggle : handleToggle,
  }
}

export default FormToggleInput
