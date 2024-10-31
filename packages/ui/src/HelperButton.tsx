import { lazyLoad } from "@levana-protocol/utils/lazyLoad"
import { useModal } from "@levana-protocol/utils/modal"
import IconButton, { type IconButtonProps } from "@mui/joy/IconButton"
import type React from "react"
import { forwardRef } from "react"

import QuestionMarkIcon from "./icons/QuestionMarkIcon"
import { muiMergeSx } from "./utils/mui"

export interface HelperButtonProps extends Omit<IconButtonProps, "children"> {
  modal?: HelperButtonModalProps
}

export interface HelperButtonModalProps {
  title: React.ReactNode
  message: React.ReactNode
}

export type HelperButtonAction =
  | { onClick: () => void }
  | { modal: HelperButtonModalProps }

const HelperButton = forwardRef<HTMLButtonElement, HelperButtonProps>(
  (props, ref) => {
    const { modal, onClick, sx, ...joyProps } = props
    const { present } = useModal()

    return (
      <IconButton
        color="neutral"
        variant="soft"
        aria-label="help"
        {...joyProps}
        ref={ref}
        onClick={async (event) => {
          onClick?.(event)

          if (modal) {
            const HelperModal = await lazyLoad(() => import("./HelperModal"))
            present(<HelperModal title={modal.title} message={modal.message} />)
          }
        }}
        sx={[
          {
            "--IconButton-size": "1rem",
            "--Icon-fontSize": "calc(var(--IconButton-size) / 1.2)",
            color: "text.secondary",
            paddingInline: 0,
          },
          (theme) => muiMergeSx(theme, sx),
        ]}
      >
        <QuestionMarkIcon />
      </IconButton>
    )
  },
)

export default HelperButton
