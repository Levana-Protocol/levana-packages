import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import useSlot from "@mui/joy/utils/useSlot"
import { styled, useThemeProps } from "@mui/joy/styles"
import { forwardRef } from "react"

import type { StackedStatsProps } from "./StackedStatsProps"

export * from "./StackedStatsProps"

const name = "LevanaStackedStats"

const StackedStatsRoot = styled(Stack, {
  name,
  slot: "root",
})({
  alignItems: "baseline",
})

const StackedStatsMainStat = styled(Typography, {
  name,
  slot: "mainStat",
})(({ theme }) => ({
  color: theme.vars.palette.text.primary,
}))

const StackedStatsOtherStat = styled(Typography, {
  name,
  slot: "otherState",
})(({ theme }) => ({
  color: theme.vars.palette.text.secondary,
}))

const StackedStats = forwardRef<HTMLDivElement, StackedStatsProps>(
  function StackedStats(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { ...otherProps } = props
    const { stats, ...externalForwardedProps } = props
    const ownerState = { ...otherProps }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: StackedStatsRoot,
      ownerState,
      externalForwardedProps,
    })

    const [SlotMainStat, mainStatProps] = useSlot("mainStat", {
      ref,
      className: "mainStat",
      elementType: StackedStatsMainStat,
      ownerState,
      externalForwardedProps,
    })

    const [SlotOtherStat, otherStatProps] = useSlot("otherStat", {
      ref,
      className: "otherStat",
      elementType: StackedStatsOtherStat,
      ownerState,
      externalForwardedProps,
    })

    return (
      <SlotRoot {...rootProps}>
        {stats.map((stat, index) =>
          index === 0 ? (
            <SlotMainStat key={index} level="body-sm" {...mainStatProps}>
              {stat}
            </SlotMainStat>
          ) : (
            <SlotOtherStat key={index} level="body-xs" {...otherStatProps}>
              {stat}
            </SlotOtherStat>
          ),
        )}
      </SlotRoot>
    )
  },
)

export default StackedStats
