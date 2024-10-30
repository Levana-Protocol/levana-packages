import Box from "@mui/joy/Box"
import type { PropsWithChildren } from "react"

const PreventUnmounting = (props: PropsWithChildren<{ show: boolean }>) => {
  return (
    <Box sx={{ display: props.show ? "block" : "none" }}>{props.children}</Box>
  )
}

export default PreventUnmounting
