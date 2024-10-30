import Modal from "@mui/joy/Modal"
import type { SxProps } from "@mui/joy/styles/types"
import useSlot from "@mui/joy/utils/useSlot"
import { styled, useThemeProps } from "@mui/joy/styles"
import type { SlotProps, CreateSlotsAndSlotProps } from "@mui/joy/utils/types"
import type { OverrideProps } from "@mui/types"
import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  type PropsWithChildren,
  forwardRef,
  useCallback,
} from "react"
import { useModal, useModalTopKey } from "@levana/utils/modal"

import type { OmitComponentProps } from "./types"
import { muiMergeSx } from "./utils/mui"
import NavigationModalDialog, {
  type NavigationModalRequiredProps,
  type NavigationModalDialogProps,
  type NavigationModalItem,
  type NavigationModalItemId,
  type NavigationModalStackItem,
} from "./NavigationModalDialog"
import PreventUnmounting from "./PreventUnmounting"

interface NavigationModalSlots {
  root?: React.ElementType
  dialog?: React.ElementType
}

type NavigationModalSlotsAndSlotProps = CreateSlotsAndSlotProps<
  NavigationModalSlots,
  {
    root: SlotProps<"div", object, NavigationModalOwnerState>
    dialog: SlotProps<
      OmitComponentProps<
        typeof NavigationModalDialog,
        keyof NavigationModalRequiredProps
      >,
      object,
      NavigationModalOwnerState
    >
  }
>

interface NavigationModalTypeMap<
  P = object,
  D extends React.ElementType = "div",
> {
  props: P &
    NavigationModalSlotsAndSlotProps &
    Pick<NavigationModalDialogProps, "rootId" | "onDismiss" | "children"> & {
      sx?: SxProps
    }
  defaultComponent: D
}

export type NavigationModalProps<
  D extends React.ElementType = NavigationModalTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<NavigationModalTypeMap<P, D>, D>

type NavigationModalOwnerState = NavigationModalProps

const name = "LevanaNavigationModal"

const NavigationModalRoot = styled(Modal, {
  name,
  slot: "root",
})({})

const _NavigationModalDialog = styled(NavigationModalDialog, {
  name,
  slot: "dialog",
})({})

/**
 * Modal with a navigation stack
 *
 * There are two types of navigation items which can be pushed onto the stack.
 *
 * 1. A dynamic item is able to update its properties, such as `canClose`, while
 * the view rerenders. This item must exist upfront in the modals children.
 * Pushing these items can be done using their `id`.
 *
 * 2. A static item is unable to update its properties while the view rerenders
 * since it's pushed on the stack with no reference to the original view.
 * Pushing these items must contain all of the static item properties.
 *
 * @example
 * // Dynamic Item
 * <NavigationModal rootId={Settings.name}>
 *   {(modal) => (
 *     <NavigationModalDynamicItem id={Settings.name} title="Settings">
 *       <Settings modal={modal} />
 *     </NavigationModalDynamicItem>
 *   )}
 * </NavigationModal>
 *
 * // Static Item
 * modal.push({
 *   id: SettingsUser.name,
 *   canPop: true,
 *   view: (modal) => (
 *     <SettingsUser modal={modal} />
 *   ),
 * })
 */
const NavigationModal = forwardRef<HTMLDivElement, NavigationModalProps>(
  function NavigationModal(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { rootId, onDismiss, children, ...otherProps } = props
    const ownerState = { ...props }
    const externalForwardedProps = { ...otherProps }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: NavigationModalRoot,
      ownerState,
      externalForwardedProps,
    })

    const [SlotDialog, dialogProps] = useSlot("dialog", {
      ref,
      className: "dialog",
      elementType: _NavigationModalDialog,
      ownerState,
      externalForwardedProps,
    })

    const { dismiss } = useModal()
    const topModalKey = useModalTopKey()
    const initialTopModalKey = useRef(topModalKey)
    const [dynamicItemMap, setDynamicItemMap] =
      useState<NavigationModalDynamicItemMap>({})
    const [stack, setStack] = useState<NavigationModalStackItem[]>([
      {
        type: "dynamic",
        id: rootId,
      },
    ])

    const topItem = ((): NavigationModalItem | undefined => {
      const topStackItem = stack.at(stack.length - 1)

      if (!topStackItem) {
        return undefined
      }

      switch (topStackItem.type) {
        case "dynamic":
          return dynamicItemMap[topStackItem.id]
        case "static":
          return topStackItem
      }
    })()

    const handleDismiss = useCallback(() => {
      dismiss()
      props.onDismiss?.()
    }, [dismiss, props.onDismiss])
    const handleDismissRef = useRef(handleDismiss)
    useEffect(() => {
      handleDismissRef.current = handleDismiss
    }, [handleDismiss])

    useEffect(() => {
      if (topItem?.canClose) {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            handleDismissRef.current()
          }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
          document.removeEventListener("keydown", handleKeyDown)
        }
      }
    }, [topItem?.canClose])

    return (
      <NavigationModalContext.Provider
        value={{
          id: topItem?.id ?? rootId,
          setDynamicItemMap,
        }}
      >
        <SlotRoot
          {...rootProps}
          open
          onClose={
            topItem?.canClose ? () => handleDismissRef.current() : undefined
          }
          sx={[
            (theme) => muiMergeSx(theme, props.sx),
            topModalKey !== initialTopModalKey.current && {
              display: "none",
            },
          ]}
        >
          <SlotDialog
            {...dialogProps}
            rootId={rootId}
            stack={stack}
            setStack={setStack}
            topItem={topItem}
            onDismiss={onDismiss}
          >
            {children}
          </SlotDialog>
        </SlotRoot>
      </NavigationModalContext.Provider>
    )
  },
)

export const NavigationModalDynamicItem = (
  props: PropsWithChildren<NavigationModalItem>,
) => {
  const navigationModalContext = useContext(NavigationModalContext)
  const { canClose, canPop, subtitle, title } = props
  const propsRef = useRef(props)
  useEffect(() => {
    propsRef.current = props
  }, [props])

  useEffect(() => {
    navigationModalContext?.setDynamicItemMap((map) => ({
      ...map,
      [propsRef.current.id]: {
        id: propsRef.current.id,
        canClose,
        canPop,
        icon: propsRef.current.icon,
        subtitle,
        title,
        helper: propsRef.current.helper,
      },
    }))
  }, [
    navigationModalContext?.setDynamicItemMap,
    canClose,
    canPop,
    subtitle,
    title,
  ])

  return (
    <PreventUnmounting show={navigationModalContext?.id === props.id}>
      {props.children}
    </PreventUnmounting>
  )
}

type NavigationModalDynamicItemMap = Record<
  NavigationModalItemId,
  NavigationModalItem
>

interface NavigationModalContextProps {
  id: NavigationModalItemId
  setDynamicItemMap: React.Dispatch<
    React.SetStateAction<NavigationModalDynamicItemMap>
  >
}

const NavigationModalContext = createContext<
  NavigationModalContextProps | undefined
>(undefined)

export const useNavigationModalTopId = () => {
  return useContext(NavigationModalContext)?.id ?? ""
}

export default NavigationModal
