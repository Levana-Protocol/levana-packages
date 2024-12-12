import type Skeleton from "@mui/joy/Skeleton"
import type Stack from "@mui/joy/Stack"
import type Typography from "@mui/joy/Typography"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"
import type React from "react"

import type GainsTypography from "../GainsTypography/GainsTypography"

export interface StackedGainsStatsSlots {
  root?: React.ElementType
  title?: React.ElementType
  stat?: React.ElementType
  skeleton?: React.ElementType
}

export type StackedGainsStatsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StackedGainsStatsSlots,
  {
    root: SlotProps<typeof Stack, object, StackedGainsStatsOwnerState>
    title: SlotProps<typeof Typography, object, StackedGainsStatsOwnerState>
    stat: SlotProps<typeof GainsTypography, object, StackedGainsStatsOwnerState>
    skeleton: SlotProps<typeof Skeleton, object, StackedGainsStatsOwnerState>
  }
>

interface StackedGainsStatsTypeMap<
  P = object,
  D extends React.ElementType = typeof Stack,
> {
  props: P &
    StackedGainsStatsSlotsAndSlotProps & {
      stats: (
        | {
            title?: string
            value: string | undefined
            gains?: number | undefined
          }
        | string
        | undefined
      )[]
      sx?: SxProps
    }
  defaultComponent: D
}

export type StackedGainsStatsProps<
  D extends React.ElementType = StackedGainsStatsTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<StackedGainsStatsTypeMap<P, D>, D>

export type StackedGainsStatsOwnerState = StackedGainsStatsProps
