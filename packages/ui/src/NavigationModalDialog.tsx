import { useModal } from "@levana-protocol/utils/modal"
import Box from "@mui/joy/Box"
import ModalDialog from "@mui/joy/ModalDialog"
import Stack from "@mui/joy/Stack"
import type { SvgIconProps } from "@mui/joy/SvgIcon"
import Typography, { type TypographyProps } from "@mui/joy/Typography"
import { useTheme } from "@mui/joy/styles"
import { styled, useThemeProps } from "@mui/joy/styles"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import useSlot from "@mui/joy/utils/useSlot"
import type { Breakpoint } from "@mui/system"
import useMediaQuery from "@mui/system/useMediaQuery"
import type { OverrideProps } from "@mui/types"
import { Fragment, forwardRef, useCallback } from "react"

import HelperButton, { type HelperButtonAction } from "./HelperButton"
import NavigationModalHeader from "./NavigationModalHeader"
import PreventUnmounting from "./PreventUnmounting"

interface NavigationModalDialogSlots {
  root?: React.ElementType
  header?: React.ElementType
  content?: React.ElementType
}

type NavigationModalDialogSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NavigationModalDialogSlots,
  {
    root: SlotProps<typeof ModalDialog, object, NavigationModalDialogOwnerState>
    header: SlotProps<
      typeof NavigationModalHeader,
      object,
      NavigationModalDialogOwnerState
    >
    content: SlotProps<"div", object, NavigationModalDialogOwnerState>
  }
>

export interface NavigationModalRequiredProps {
  rootId: string
  topItem: NavigationModalItem | undefined
  stack: NavigationModalStackItem[]
  setStack: React.Dispatch<React.SetStateAction<NavigationModalStackItem[]>>
  children:
    | React.ReactElement<NavigationModalItem>
    | ((
        props: NavigationModalControlProps,
      ) => React.ReactElement<NavigationModalItem>)
}

interface NavigationModalDialogTypeMap<
  P = object,
  // This is the expected type but it's causing some issues when moving the code
  // into other repos.
  // D extends React.ElementType = typeof ModalDialog,
  D extends React.ElementType = "div",
> {
  props: P &
    NavigationModalDialogSlotsAndSlotProps &
    NavigationModalRequiredProps & {
      onDismiss?: () => void
      /**
       * The breakpoint for changing the dialog layout
       *
       * Below the defined breakpoint, the dialog will display in fullscreen. At
       * the defined breakpoint and above, the dialog will display in the center
       * of the page.
       *
       * @default sm
       */
      centerBreakpoint?: Breakpoint
      sx?: SxProps
    }
  defaultComponent: D
}

export type NavigationModalDialogProps<
  D extends
    React.ElementType = NavigationModalDialogTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<NavigationModalDialogTypeMap<P, D>, D>

type NavigationModalDialogOwnerState = NavigationModalDialogProps & {
  centerBreakpoint: Breakpoint
}

export type NavigationModalItemId = string

export interface NavigationModalItem {
  id: NavigationModalItemId
  title?: React.ReactNode
  subtitle?: React.ReactNode
  icon?: React.JSXElementConstructor<SvgIconProps> | React.ReactElement
  /**
   * When `true`, a back button will be visible in the navigation bar.
   */
  canPop?: boolean
  /**
   * When `true`, a close button will be visible in the navigation bar and
   * tapping outside the modal will perform a close action.
   */
  canClose?: boolean
  /**
   * When set, a help button will appear next to the title.
   */
  helper?: HelperButtonAction
}

export interface NavigationModalStaticItem extends NavigationModalItem {
  view: (
    props: NavigationModalControlProps,
  ) => React.ReactElement<NavigationModalControlProps>
}

export interface NavigationModalControlProps {
  push: (next: NavigationModalItemId | NavigationModalStaticItem) => void
  pop: () => void
  close: () => void
}

export type NavigationModalStackItem =
  | ({ type: "dynamic" } & Pick<NavigationModalItem, "id">)
  | ({ type: "static" } & NavigationModalStaticItem)

const name = "LevanaNavigationModalDialog"

const NavigationModalDialogRoot = styled(ModalDialog, {
  name,
  slot: "root",
})<{ ownerState: NavigationModalDialogOwnerState }>(
  ({ theme, ownerState }) => ({
    "--ModalContent-horizontalPadding": `max(
      var(--ModalContent-padding), 
      calc((100vw - var(--ModalContent-maxWidth)) / 2)
    )`,
    [theme.breakpoints.up(ownerState.centerBreakpoint)]: {
      "--ModalContent-horizontalPadding":
        "calc((var(--ModalDialog-maxWidth) - var(--ModalContent-maxWidth)) / 2)",
    },
  }),
)

const NavigationModalDialogHeader = styled(NavigationModalHeader, {
  name,
  slot: "header",
})({})

const NavigationModalDialogContent = styled(Box, {
  name,
  slot: "content",
})({
  marginTop: "var(--NavigationModal-contentTop, 0.5rem)",
})

const NavigationModalDialog = forwardRef<
  HTMLDivElement,
  NavigationModalDialogProps
>(function NavigationModalDialog(inProps, ref) {
  const props = useThemeProps({ props: inProps, name })

  const {
    rootId,
    topItem,
    stack,
    setStack,
    onDismiss,
    centerBreakpoint = "sm",
    children,
    ...otherProps
  } = props
  const ownerState = { ...props, centerBreakpoint }
  const externalForwardedProps = { ...otherProps }

  const [SlotRoot, rootProps] = useSlot("root", {
    ref,
    className: "root",
    elementType: NavigationModalDialogRoot,
    ownerState,
    externalForwardedProps,
  })

  const [SlotHeader, headerProps] = useSlot("header", {
    ref,
    className: "header",
    elementType: NavigationModalDialogHeader,
    ownerState,
    externalForwardedProps,
  })

  const [SlotContent, contentProps] = useSlot("content", {
    ref,
    className: "content",
    elementType: NavigationModalDialogContent,
    ownerState,
    externalForwardedProps,
  })

  const { dismiss } = useModal()

  const handlePop = useCallback(() => {
    setStack((stack) => (stack.length > 1 ? stack.slice(0, -1) : stack))
  }, [setStack])

  const handleNavigationBarPop =
    topItem?.canPop && stack.length > 1 ? handlePop : undefined

  const handlePush: NavigationModalControlProps["push"] = useCallback(
    (next) => {
      setStack((stack) => {
        if (typeof next === "string") {
          return [...stack, { type: "dynamic", id: next }]
        } else {
          return [...stack, { type: "static", ...next }]
        }
      })
    },
    [setStack],
  )

  const handleDismiss = () => {
    dismiss()
    props.onDismiss?.()
  }

  const theme = useTheme()
  const isCenterBreakpoint = useMediaQuery(
    theme.breakpoints.up(centerBreakpoint),
  )

  return (
    <SlotRoot
      {...rootProps}
      size="lg"
      layout={isCenterBreakpoint ? "center" : "fullscreen"}
    >
      <SlotHeader
        {...headerProps}
        onBack={handleNavigationBarPop}
        canClose={topItem?.canClose}
      >
        {topItem?.subtitle && (
          <Typography
            level="body-xs"
            sx={{
              textTransform: "uppercase",
              height:
                "var(--ModalHeader-height, calc(var(--IconButton-size) * 0.66))",
            }}
          >
            {topItem.subtitle}
          </Typography>
        )}
        <ModalTitle>
          {topItem?.icon && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              {typeof topItem.icon === "function" ? (
                <topItem.icon sx={{ color: "text.secondary" }} />
              ) : (
                <>{topItem.icon}</>
              )}
            </Box>
          )}
          {topItem?.helper ? (
            <Stack
              direction="row"
              columnGap={1}
              alignItems="center"
              justifyContent="center"
            >
              {topItem.title}
              <HelperButton
                {...topItem.helper}
                aria-label={`modal ${topItem.title} helper`}
              />
            </Stack>
          ) : (
            topItem?.title
          )}
        </ModalTitle>
      </SlotHeader>
      <Box
        sx={{
          width: "100%",
          alignSelf: "center",
          overflow: "auto",
          px: "var(--ModalContent-horizontalPadding)",
          pb: "var(--ModalContent-padding)",
        }}
      >
        <SlotContent {...contentProps}>
          {stack.map((item) => (
            <Fragment key={item.id}>
              {item.type === "static" && (
                <PreventUnmounting show={topItem?.id === item.id}>
                  <item.view
                    push={handlePush}
                    pop={handlePop}
                    close={handleDismiss}
                  />
                </PreventUnmounting>
              )}
            </Fragment>
          ))}

          {typeof children === "function"
            ? children({
                push: handlePush,
                pop: handlePop,
                close: handleDismiss,
              })
            : children}
        </SlotContent>
      </Box>
    </SlotRoot>
  )
})

const ModalTitle = (props: TypographyProps) => {
  const { sx, children, ...joyProps } = props

  return (
    <Typography
      {...joyProps}
      level="h3"
      sx={{
        ...sx,
        textAlign: "center",
      }}
    >
      {children}
    </Typography>
  )
}

export default NavigationModalDialog
