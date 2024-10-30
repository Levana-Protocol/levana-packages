import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import useSlot from "@mui/joy/utils/useSlot"
import { styled, useThemeProps } from "@mui/joy/styles"
import { forwardRef } from "react"

import { muiMergeSx } from "../utils/mui"
import type {
  HorizontalGaugeOwnerState,
  HorizontalGaugeProps,
} from "./HorizontalGaugeProps"

export * from "./HorizontalGaugeProps"

const name = "LevanaHorizontalGauge"

const HorizontalGaugeRoot = styled("div", {
  name,
  slot: "root",
})(({ theme }) => ({
  "--HorizontalGaugeBar-height": "5px",
  "--HorizontalGaugeBar-gap": "2px",
  "--HorizontalGaugeBar-foregroundColor": theme.vars.palette.success.solidBg,
  "--HorizontalGaugeBar-backgroundColor": theme.vars.palette.neutral[700],
  minWidth: 150,
}))

const HorizontalGaugeTitle = styled(Typography, {
  name,
  slot: "title",
})<{ ownerState: HorizontalGaugeOwnerState }>(({ theme, ownerState }) => ({
  color: theme.vars.palette.text.primary,
  position: "absolute",
  left: `${ownerState.gapOffset}%`,
  bottom: 0,
  transform: "translateX(-50%)",
}))

const HorizontalGaugeBar = styled("div", {
  name,
  slot: "bar",
})<{ ownerState: HorizontalGaugeOwnerState }>(({ theme, ownerState }) => ({
  display: "flex",
  justifyContent: "space-between",
  height: "var(--HorizontalGaugeBar-height)",
  borderRadius: "calc(var(--HorizontalGaugeBar-height) / 2)",
  overflow: "hidden",
  marginTop: ownerState.title ? theme.spacing(0.25) : theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  backgroundColor: "var(--HorizontalGaugeBar-backgroundColor)",
  ...(ownerState.gapOffset > 0 &&
    ownerState.gapOffset < 100 && {
      clipPath: `polygon(
        0% 0%, 
        100% 0%, 
        100% 100%, 
        calc(${ownerState.gapOffset}% + var(--HorizontalGaugeBar-gap) / 2) 100%, 
        calc(${ownerState.gapOffset}% + var(--HorizontalGaugeBar-gap) / 2) 0%, 
        calc(${ownerState.gapOffset}% - var(--HorizontalGaugeBar-gap) / 2) 0%, 
        calc(${ownerState.gapOffset}% - var(--HorizontalGaugeBar-gap) / 2) 100%, 
        0% 100%
      )`,
    }),
}))

const HorizontalGaugeLabel = styled(Typography, {
  name,
  slot: "label",
})(({ theme }) => ({
  color: theme.vars.palette.text.secondary,
}))

const HorizontalGauge = forwardRef<HTMLDivElement, HorizontalGaugeProps>(
  function HorizontalGauge(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { ...otherProps } = props
    const {
      labels,
      percentage,
      title,
      isGapCentered,
      ...externalForwardedProps
    } = otherProps
    const ownerState = {
      ...otherProps,
      gapOffset: isGapCentered
        ? 50
        : Math.max(0, Math.min(100, percentage ?? 0)),
    }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: HorizontalGaugeRoot,
      ownerState,
      externalForwardedProps,
    })

    const [SlotTitle, titleProps] = useSlot("title", {
      ref,
      className: "title",
      elementType: HorizontalGaugeTitle,
      ownerState,
      externalForwardedProps,
    })

    const [SlotBar, barProps] = useSlot("bar", {
      ref,
      className: "bar",
      elementType: HorizontalGaugeBar,
      ownerState,
      externalForwardedProps,
    })

    const [SlotLabel, labelProps] = useSlot("label", {
      ref,
      className: "label",
      elementType: HorizontalGaugeLabel,
      ownerState,
      externalForwardedProps,
    })

    return (
      <SlotRoot {...rootProps}>
        {title && (
          <Box sx={{ position: "relative" }}>
            {/* Duplicate component to handle dynamic height */}
            <SlotTitle
              level="body-sm"
              {...titleProps}
              sx={[
                (theme) => muiMergeSx(theme, titleProps.sx),
                {
                  position: "unset",
                  transform: "unset",
                  visibility: "hidden",
                  color: "transparent",
                },
              ]}
            >
              {title}
            </SlotTitle>
            <SlotTitle level="body-sm" {...titleProps}>
              {title}
            </SlotTitle>
          </Box>
        )}
        <SlotBar {...barProps}>
          {percentage && (
            <Box
              sx={{
                width: `calc(${percentage}% - (var(--HorizontalGaugeBar-gap) / 2))`,
                backgroundColor: "var(--HorizontalGaugeBar-foregroundColor)",
              }}
            />
          )}
        </SlotBar>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          {labels.map((label, index) => (
            <SlotLabel key={index} level="body-xs" {...labelProps}>
              {label}
            </SlotLabel>
          ))}
        </Stack>
      </SlotRoot>
    )
  },
)

export default HorizontalGauge
