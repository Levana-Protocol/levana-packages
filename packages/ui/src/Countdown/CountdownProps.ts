import type Stack from "@mui/joy/Stack"
import type Typography from "@mui/joy/Typography"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"
import type React from "react"

export interface CountdownSlots {
  root?: React.ElementType
  number?: React.ElementType
  unit?: React.ElementType
}

export type CountdownSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CountdownSlots,
  {
    root: SlotProps<typeof Stack, object, CountdownOwnerState>
    number: SlotProps<typeof Typography, object, CountdownOwnerState>
    unit: SlotProps<typeof Typography, object, CountdownOwnerState>
  }
>

interface CountdownTypeMap<
  P = object,
  D extends React.ElementType = typeof Stack,
> {
  props: P &
    CountdownSlotsAndSlotProps & {
      date: Date
      labels?: {
        days?: string
        hours?: string
        minutes?: string
        seconds?: string
      }
      startDecorator?: React.ReactNode
      endDecorator?: React.ReactNode
      sx?: SxProps
    }
  defaultComponent: D
}

export type CountdownProps<
  D extends React.ElementType = CountdownTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<CountdownTypeMap<P, D>, D>

export type CountdownOwnerState = CountdownProps
