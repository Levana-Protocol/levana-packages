import Typography from "@mui/joy/Typography"
import { styled, useThemeProps } from "@mui/joy/styles"
import useSlot from "@mui/joy/utils/useSlot"
import { forwardRef } from "react"

import type { GainsTypographyProps } from "./GainsTypographyProps"

export * from "./GainsTypographyProps"

const name = "LevanaGainsTypography"

const GainsTypographyRoot = styled(Typography, {
  name,
  slot: "root",
})({})

const GainsTypography = forwardRef<HTMLDivElement, GainsTypographyProps>(
  function GainsTypography(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { ...otherProps } = props
    const { gains, ...externalForwardedProps } = props
    const ownerState = { ...otherProps }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: GainsTypographyRoot,
      ownerState,
      externalForwardedProps,
    })

    return (
      <SlotRoot
        color={(() => {
          if (gains) {
            if (gains > 0) {
              return "success"
            } else if (gains < 0) {
              return "danger"
            }
          }
        })()}
        {...rootProps}
      />
    )
  },
)

export default GainsTypography
