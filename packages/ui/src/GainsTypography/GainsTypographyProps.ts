import type Typography from "@mui/joy/Typography"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"
import type React from "react"

export interface GainsTypographySlots {
  root?: React.ElementType
}

export type GainsTypographySlotsAndSlotProps = CreateSlotsAndSlotProps<
  GainsTypographySlots,
  {
    root: SlotProps<typeof Typography, object, GainsTypographyOwnerState>
  }
>

interface GainsTypographyTypeMap<
  P = object,
  D extends React.ElementType = typeof Typography,
> {
  props: P &
    GainsTypographySlotsAndSlotProps & {
      gains?: number
      sx?: SxProps
    }
  defaultComponent: D
}

export type GainsTypographyProps<
  D extends React.ElementType = GainsTypographyTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<GainsTypographyTypeMap<P, D>, D>

export type GainsTypographyOwnerState = GainsTypographyProps
