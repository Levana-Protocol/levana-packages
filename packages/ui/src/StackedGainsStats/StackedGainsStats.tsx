import Skeleton from "@mui/joy/Skeleton"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import { styled, useThemeProps } from "@mui/joy/styles"
import useSlot from "@mui/joy/utils/useSlot"
import { forwardRef } from "react"

import GainsTypography from "../GainsTypography/GainsTypography"
import type { StackedGainsStatsProps } from "./StackedGainsStatsProps"

export * from "./StackedGainsStatsProps"

const name = "LevanaStackedGainsStats"

const StackedGainsStatsRoot = styled(Stack, {
  name,
  slot: "root",
})({
  alignItems: "baseline",
})

const StackedGainsStatsTitle = styled(Typography, {
  name,
  slot: "title",
})(({ theme }) => ({
  color: theme.vars.palette.text.secondary,
}))

const StackedGainsStatsStat = styled(GainsTypography, {
  name,
  slot: "stat",
})({
  textAlign: "right",
  flexGrow: 1,
})

const StackedGainsStats = forwardRef<HTMLDivElement, StackedGainsStatsProps>(
  function StackedGainsStats(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { ...otherProps } = props
    const { stats, ...externalForwardedProps } = props
    const ownerState = { ...otherProps }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: StackedGainsStatsRoot,
      ownerState,
      externalForwardedProps,
    })

    const [SlotTitle, titleProps] = useSlot("title", {
      ref,
      className: "title",
      elementType: StackedGainsStatsTitle,
      ownerState,
      externalForwardedProps,
    })

    const [SlotStat, statProps] = useSlot("stat", {
      ref,
      className: "stat",
      elementType: StackedGainsStatsStat,
      ownerState,
      externalForwardedProps,
    })

    return (
      <SlotRoot {...rootProps}>
        {stats.map(({ title, value, gains }, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            sx={{ width: "100%", alignItems: "center" }}
          >
            <SlotTitle level="body-sm" {...titleProps}>
              {title}
            </SlotTitle>
            <SlotStat level="body-sm" {...statProps} gains={gains}>
              <Skeleton
                loading={value === undefined}
                variant="text"
                level={statProps.level ?? "body-sm"}
                animation={false}
              >
                {value}
              </Skeleton>
            </SlotStat>
          </Stack>
        ))}
      </SlotRoot>
    )
  },
)

export default StackedGainsStats
