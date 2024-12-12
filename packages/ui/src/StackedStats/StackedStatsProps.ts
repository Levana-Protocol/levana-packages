import type Skeleton from "@mui/joy/Skeleton"
import type Stack from "@mui/joy/Stack"
import type Typography from "@mui/joy/Typography"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"
import type React from "react"

import type GainsTypography from "../GainsTypography/GainsTypography"

export interface StackedStatsSlots {
  root?: React.ElementType
  title?: React.ElementType
  mainStat?: React.ElementType
  otherStat?: React.ElementType
  skeleton?: React.ElementType
}

export type StackedStatsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StackedStatsSlots,
  {
    root: SlotProps<typeof Stack, object, StackedStatsOwnerState>
    title: SlotProps<typeof Typography, object, StackedStatsOwnerState>
    mainStat: SlotProps<typeof GainsTypography, object, StackedStatsOwnerState>
    otherStat: SlotProps<typeof Typography, object, StackedStatsOwnerState>
    skeleton: SlotProps<typeof Skeleton, object, StackedStatsOwnerState>
  }
>

interface StackedStatsTypeMap<
  P = object,
  D extends React.ElementType = typeof Stack,
> {
  props: P &
    StackedStatsSlotsAndSlotProps & {
      stats:
        | (string | undefined)[]
        | {
            title?: string
            value: string | undefined
            gains?: number
          }[]
      sx?: SxProps
    }
  defaultComponent: D
}

export type StackedStatsProps<
  D extends React.ElementType = StackedStatsTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<StackedStatsTypeMap<P, D>, D>

export type StackedStatsOwnerState = StackedStatsProps & {
  isGainsStats: boolean
}
