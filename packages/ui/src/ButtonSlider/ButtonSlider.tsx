import Button, { buttonClasses } from "@mui/joy/Button"
import ButtonGroup from "@mui/joy/ButtonGroup"
import Slider from "@mui/joy/Slider"
import { styled, useThemeProps } from "@mui/joy/styles"
import useSlot from "@mui/joy/utils/useSlot"
import { forwardRef } from "react"

import { getAriaLabel } from "../utils/accessibility"
import type { ButtonSliderProps } from "./ButtonSliderProps"

export * from "./ButtonSliderProps"

const name = "LevanaButtonSlider"

const ButtonSliderRoot = styled("div", {
  name,
  slot: "root",
})({
  lineHeight: 0,
})

const ButtonSliderSlider = styled(Slider, {
  name,
  slot: "slider",
})({})

const ButtonSliderButtonGroup = styled(ButtonGroup, {
  name,
  slot: "buttonGroup",
})(({ theme, size }) => ({
  ...(size === "sm" && {
    "--Button-minHeight": theme.spacing(3),
    [`.${buttonClasses.root}`]: {
      fontSize: theme.vars.fontSize.xs,
    },
  }),
}))

const ButtonSlider = forwardRef<HTMLDivElement, ButtonSliderProps>(
  function ButtonSlider(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const {
      color = "success",
      marks,
      value,
      onChange,
      disabled,
      ...otherProps
    } = props

    const ownerState = { ...otherProps, color, disabled }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: ButtonSliderRoot,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const [SlotSlider, sliderProps] = useSlot("slider", {
      ref,
      className: "slider",
      elementType: ButtonSliderSlider,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const [SlotButtonGroup, buttonGroupProps] = useSlot("buttonGroup", {
      ref,
      className: "buttonGroup",
      elementType: ButtonSliderButtonGroup,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const handleButtonClick = (value: number) => {
      if (!disabled) {
        onChange?.(value)
      }
    }

    return (
      <SlotRoot {...rootProps}>
        <SlotSlider
          color={color}
          size="lg"
          value={value}
          onChange={(_, value) => {
            onChange?.(Array.isArray(value) ? value[0] : value)
          }}
          disabled={disabled}
          slotProps={{
            input: {
              step: "any", // Fix Firefox input tooltip
            },
          }}
          {...sliderProps}
        />
        {marks && (
          <SlotButtonGroup
            buttonFlex={1}
            spacing={1}
            size="sm"
            variant="soft"
            disabled={disabled}
            {...buttonGroupProps}
          >
            {marks.map((mark, index) => (
              <Button
                key={`${mark.value}-${index}`}
                onClick={() => handleButtonClick(mark.value)}
                aria-label={(() => {
                  const parentLabel = getAriaLabel(props.slotProps?.buttonGroup)
                  return parentLabel
                    ? `${parentLabel} ${mark.label}`
                    : `button slider ${mark.label}`
                })()}
              >
                {mark.label}
              </Button>
            ))}
          </SlotButtonGroup>
        )}
      </SlotRoot>
    )
  },
)

export default ButtonSlider
