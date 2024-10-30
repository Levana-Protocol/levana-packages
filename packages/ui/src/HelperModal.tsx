import Typography from "@mui/joy/Typography"

import LightbulbIcon from "./icons/LightbulbIcon"
import NavigationModal, { NavigationModalDynamicItem } from "./NavigationModal"
import type { NavigationModalItem } from "./NavigationModalDialog"

export type HelperModalProps = Pick<
  HelperModalDynamicItemProps,
  "title" | "message"
>

const HelperModal = (props: HelperModalProps) => {
  return (
    <NavigationModal rootId={HelperModalDynamicItem.name}>
      <HelperModalDynamicItem
        id={HelperModalDynamicItem.name}
        canClose
        {...props}
      />
    </NavigationModal>
  )
}

export interface HelperModalDynamicItemProps
  extends Pick<NavigationModalItem, "id" | "canClose" | "canPop"> {
  title: React.ReactNode
  message: React.ReactNode
}

export const HelperModalDynamicItem = (props: HelperModalDynamicItemProps) => {
  const { message, ...dynamicItemProps } = props
  return (
    <NavigationModalDynamicItem
      {...dynamicItemProps}
      icon={<LightbulbIcon sx={{ color: "text.secondary" }} />}
    >
      <Typography
        textColor="text.secondary"
        sx={{ textAlign: "center", whiteSpace: "pre-line" }}
      >
        {message}
      </Typography>
    </NavigationModalDynamicItem>
  )
}

export default HelperModal
