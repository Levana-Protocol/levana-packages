import type { PaletteRange, Theme } from "@mui/joy/styles/types"
import type { Mode } from "@mui/system/cssVars/useCurrentColorScheme"

export type ColorRange = Pick<
  PaletteRange,
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
>

export interface CssVarsData {
  theme: Theme
  defaultMode: Mode
}
