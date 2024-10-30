import IconButton from "@mui/joy/IconButton"
import ModalClose, { type ModalCloseProps } from "@mui/joy/ModalClose"
import type { SxProps } from "@mui/joy/styles/types"
import { styled, useThemeProps } from "@mui/joy/styles"
import useSlot from "@mui/joy/utils/useSlot"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"
import { forwardRef } from "react"

import ArrowBackIcon from "./icons/ArrowBackIcon"

interface NavigationModalHeaderSlots {
  root?: React.ElementType
  close?: React.ElementType
}

type NavigationModalHeaderSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NavigationModalHeaderSlots,
  {
    root: SlotProps<"div", object, NavigationModalHeaderOwnerState>
    close: SlotProps<typeof ModalClose, object, NavigationModalHeaderOwnerState>
  }
>

interface NavigationModalHeaderTypeMap<
  P = object,
  D extends React.ElementType = "div",
> {
  props: P &
    NavigationModalHeaderSlotsAndSlotProps & {
      topDecorator?: React.ReactElement
      onBack?: () => void
      canClose?: boolean
      sx?: SxProps
    }
  defaultComponent: D
}

export type NavigationModalHeaderProps<
  D extends
    React.ElementType = NavigationModalHeaderTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<NavigationModalHeaderTypeMap<P, D>, D>

type NavigationModalHeaderOwnerState = NavigationModalHeaderProps

const name = "LevanaNavigationModalHeader"

const NavigationModalHeaderRoot = styled("div", {
  name,
  slot: "root",
})({
  "--IconButton-size": "40px",
  "--IconButton-radius": "calc(var(--IconButton-size) / 2)",
  "--ModalClose-radius": "var(--IconButton-radius)",
  textAlign: "center",
  paddingTop: "var(--ModalContent-padding)",
  paddingInline: "var(--ModalContent-padding)",
})

const NavigationModalHeaderClose = styled(ModalClose, {
  name,
  slot: "close",
})({})

const NavigationModalHeader = forwardRef<
  HTMLDivElement,
  NavigationModalHeaderProps
>(function NavigationModalHeader(inProps, ref) {
  const props = useThemeProps({ props: inProps, name })

  const { onBack, canClose, topDecorator, children, ...otherProps } = props
  const ownerState = { ...props, canClose }
  const externalForwardedProps = { ...otherProps }

  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: "root",
    elementType: NavigationModalHeaderRoot,
    ownerState,
    externalForwardedProps,
  })

  const [SlotClose, closeProps] = useSlot("close", {
    ref,
    className: "close",
    elementType: NavigationModalHeaderClose,
    ownerState,
    externalForwardedProps,
    internalForwardedProps: {
      color: "neutral",
      variant: "outlined",
      "aria-label": "close",
    } satisfies ModalCloseProps,
  })

  return (
    <SlotRoot {...rootProps}>
      {topDecorator}
      {onBack && (
        <IconButton
          onClick={onBack}
          color="neutral"
          variant="outlined"
          sx={{
            position: "absolute",
            top: "var(--ModalClose-inset)",
            left: "var(--ModalClose-inset)",
          }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      {children}
      {canClose && <SlotClose {...closeProps} />}
    </SlotRoot>
  )
})

export default NavigationModalHeader
