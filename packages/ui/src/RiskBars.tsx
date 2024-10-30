import Box from "@mui/joy/Box"
import Stack, { type StackProps } from "@mui/joy/Stack"

import { muiMergeSx } from "./utils/mui"

const levels = ["low", "medium", "high"] as const

export interface RiskBarsProps extends Pick<StackProps, "sx"> {
  level: (typeof levels)[number]
}

const RiskBars = (props: RiskBarsProps) => {
  const { level, sx } = props
  const bars = Array(levels.length).fill(null)

  return (
    <Stack
      direction="row"
      sx={[
        {
          "--RiskBars-gap": "4px",
          "--RiskBar-width": "6px",
          "--RiskBar-height": "18px",
          gap: "var(--RiskBars-gap)",
        },
        (theme) => muiMergeSx(theme, sx),
      ]}
    >
      {bars.map((_, index) => (
        <Box
          key={index}
          sx={({ vars }) => ({
            backgroundColor: ((): string => {
              if (index <= levels.indexOf(level)) {
                switch (level) {
                  case "low":
                    return vars.palette.success.solidBg
                  case "medium":
                    return vars.palette.warning[500]
                  case "high":
                    return vars.palette.danger[500]
                }
              } else {
                return vars.palette.neutral[700]
              }
            })(),
            width: "var(--RiskBar-width)",
            height: "var(--RiskBar-height)",
            borderRadius: "calc(var(--RiskBar-width) / 2)",
          })}
        />
      ))}
    </Stack>
  )
}

export default RiskBars
