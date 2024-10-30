import type { SystemStyleObject } from "@mui/system/styleFunctionSx"
import type { SxProps, Theme } from "@mui/joy/styles/types/theme"

export type MuiOverridableComponentProps<
  Props,
  C = React.ElementType,
> = Props & {
  component?: C
}

export interface MuiMark {
  value: number
  label?: React.ReactNode
}

/**
 * @deprecated Components should use slots instead
 */
export const muiMergeSx = (
  theme: Theme,
  sx: SxProps | undefined,
): SystemStyleObject<Theme> => {
  if (typeof sx === "function") {
    return sx(theme) as SystemStyleObject<Theme>
  } else if (Array.isArray(sx)) {
    return sx.reduce((accumulator, current) => {
      return Object.assign(accumulator, muiMergeSx(theme, current))
    }, {})
  } else if (typeof sx === "object") {
    return sx as SystemStyleObject<Theme>
  }
  return {}
}
