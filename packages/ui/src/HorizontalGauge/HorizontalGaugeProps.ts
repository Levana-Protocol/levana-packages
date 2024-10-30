import type Typography from "@mui/joy/Typography"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"

export interface HorizontalGaugeSlots {
  root?: React.ElementType
  title?: React.ElementType
  bar?: React.ElementType
  label?: React.ElementType
}

export type HorizontalGaugeSlotsAndSlotProps = CreateSlotsAndSlotProps<
  HorizontalGaugeSlots,
  {
    root: SlotProps<"div", object, HorizontalGaugeOwnerState>
    title: SlotProps<typeof Typography, object, HorizontalGaugeOwnerState>
    bar: SlotProps<"div", object, HorizontalGaugeOwnerState>
    label: SlotProps<typeof Typography, object, HorizontalGaugeOwnerState>
  }
>

interface HorizontalGaugeTypeMap<
  P = object,
  D extends React.ElementType = "div",
> {
  props: P &
    HorizontalGaugeSlotsAndSlotProps & {
      /**
       * The percentage of the foreground bar color
       */
      percentage?: number
      /**
       * A title above the bar
       */
      title?: string
      /**
       * Is the gap between the bar colors centered
       */
      isGapCentered?: boolean
      /**
       * Evenly distributed labels below the bar
       */
      labels: string[]
      sx?: SxProps
    }
  defaultComponent: D
}

export type HorizontalGaugeProps<
  D extends React.ElementType = HorizontalGaugeTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<HorizontalGaugeTypeMap<P, D>, D>

export type HorizontalGaugeOwnerState = HorizontalGaugeProps & {
  gapOffset: number
}
