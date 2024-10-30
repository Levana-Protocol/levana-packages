import type { Mark } from "@mui/base"
import type ButtonGroup from "@mui/joy/ButtonGroup"
import type Slider from "@mui/joy/Slider"
import type { Theme, StyleOverrides, ColorPaletteProp } from "@mui/joy/styles"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"

declare module "@mui/joy/styles" {
  interface Components {
    LevanaButtonSlider?: {
      defaultProps?: Partial<ButtonSliderProps>
      styleOverrides?: StyleOverrides<
        keyof ButtonSliderSlots,
        ButtonSliderOwnerState,
        Theme
      >
    }
  }
}

export interface ButtonSliderSlots {
  root?: React.ElementType
  slider?: React.ElementType
  buttonGroup?: React.ElementType
}

export type ButtonSliderSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ButtonSliderSlots,
  {
    root: SlotProps<"div", object, ButtonSliderOwnerState>
    slider: SlotProps<typeof Slider, object, ButtonSliderOwnerState>
    buttonGroup: SlotProps<typeof ButtonGroup, object, ButtonSliderOwnerState>
  }
>

interface ButtonSliderTypeMap<P = object, D extends React.ElementType = "div"> {
  props: P &
    ButtonSliderSlotsAndSlotProps & {
      color?: ColorPaletteProp
      marks?: Mark[]
      value?: number
      onChange?: (value: number) => void
      disabled?: boolean
      sx?: SxProps
    }
  defaultComponent: D
}

export type ButtonSliderProps<
  D extends React.ElementType = ButtonSliderTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<ButtonSliderTypeMap<P, D>, D>

export type ButtonSliderOwnerState = ButtonSliderProps
