import Skeleton, { type SkeletonProps } from "@mui/joy/Skeleton"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import { styled, useThemeProps } from "@mui/joy/styles"
import useSlot from "@mui/joy/utils/useSlot"
import { forwardRef } from "react"

import GainsTypography from "../GainsTypography/GainsTypography"
import type {
  StackedStatsOwnerState,
  StackedStatsProps,
} from "./StackedStatsProps"

export * from "./StackedStatsProps"

const name = "LevanaStackedStats"

const StackedStatsRoot = styled(Stack, {
  name,
  slot: "root",
})({
  alignItems: "baseline",
})

const StackedStatsTitle = styled(Typography, {
  name,
  slot: "title",
})(({ theme }) => ({
  color: theme.vars.palette.text.secondary,
}))

const StackedStatsMainStat = styled(GainsTypography, {
  name,
  slot: "mainStat",
})<{ ownerState: StackedStatsOwnerState }>(({ theme, ownerState }) => ({
  ...(!ownerState.isGainsStats && {
    color: theme.vars.palette.text.primary,
    width: "100%",
  }),
}))

const StackedStatsOtherStat = styled(Typography, {
  name,
  slot: "otherState",
})(({ theme }) => ({
  color: theme.vars.palette.text.secondary,
  width: "100%",
}))

const StackedStatsSkeleton = styled(Skeleton, {
  name,
  slot: "skeleton",
})({
  maxWidth: 100,
})

const StackedStats = forwardRef<HTMLDivElement, StackedStatsProps>(
  function StackedStats(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { ...otherProps } = props
    const { stats, ...externalForwardedProps } = otherProps
    const ownerState = {
      ...otherProps,
      isGainsStats: typeof stats.at(0) === "object",
    }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: StackedStatsRoot,
      ownerState,
      externalForwardedProps,
    })

    const [SlotTitle, titleProps] = useSlot("title", {
      ref,
      className: "title",
      elementType: StackedStatsTitle,
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

    const [SlotSkeleton, skeletonProps] = useSlot("skeleton", {
      ref,
      className: "skeleton",
      elementType: StackedStatsSkeleton,
      ownerState,
      externalForwardedProps,
      internalForwardedProps: {
        variant: "text",
      } satisfies SkeletonProps,
    })

    return (
      <SlotRoot {...rootProps}>
        {stats.map((stat, index) =>
          typeof stat === "object" ? (
            <Stack
              key={index}
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {stat.title && (
                <SlotTitle level="body-sm" {...titleProps}>
                  {stat.title}
                </SlotTitle>
              )}
              <SlotMainStat
                level="body-sm"
                {...mainStatProps}
                gains={stat.gains}
              >
                <SlotSkeleton
                  loading={stat.value === undefined}
                  level={mainStatProps.level ?? "body-sm"}
                  {...skeletonProps}
                >
                  {stat.value}
                </SlotSkeleton>
              </SlotMainStat>
            </Stack>
          ) : index === 0 ? (
            <SlotMainStat key={index} level="body-sm" {...mainStatProps}>
              <SlotSkeleton
                loading={stat === undefined}
                level={"body-sm"}
                {...skeletonProps}
              >
                {stat}
              </SlotSkeleton>
            </SlotMainStat>
          ) : (
            <SlotOtherStat key={index} level="body-xs" {...otherStatProps}>
              <SlotSkeleton
                loading={stat === undefined}
                level={"body-xs"}
                {...skeletonProps}
              >
                {stat}
              </SlotSkeleton>
            </SlotOtherStat>
          ),
        )}
      </SlotRoot>
    )
  },
)

export default StackedStats
