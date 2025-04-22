import { styled, useThemeProps } from "@mui/joy/styles"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import useSlot from "@mui/joy/utils/useSlot"
import type { OverrideProps } from "@mui/types"
import { forwardRef } from "react"

export interface NavigationModalFooterSlots {
  root?: React.ElementType
}

type NavigationModalFooterSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NavigationModalFooterSlots,
  {
    root: SlotProps<"div", object, NavigationModalFooterOwnerState>
  }
>

interface NavigationModalFooterTypeMap<
  P = object,
  D extends React.ElementType = "div",
> {
  props: P &
    NavigationModalFooterSlotsAndSlotProps & {
      sx?: SxProps
    }
  defaultComponent: D
}

export type NavigationModalFooterProps<
  D extends
    React.ElementType = NavigationModalFooterTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<NavigationModalFooterTypeMap<P, D>, D>

export type NavigationModalFooterOwnerState = NavigationModalFooterProps

const name = "LevanaNavigationModalFooter"

const NavigationModalFooterRoot = styled("div", {
  name,
  slot: "root",
})(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}))

const NavigationModalFooter = forwardRef<
  HTMLDivElement,
  NavigationModalFooterProps
>(function NavigationModalFooter(inProps, ref) {
  const props = useThemeProps({ props: inProps, name })

  const { children, ...otherProps } = props
  const ownerState = { ...props }
  const externalForwardedProps = { ...otherProps }

  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: "root",
    elementType: NavigationModalFooterRoot,
    ownerState,
    externalForwardedProps,
  })

  return <SlotRoot {...rootProps}>{children}</SlotRoot>
})

export default NavigationModalFooter
