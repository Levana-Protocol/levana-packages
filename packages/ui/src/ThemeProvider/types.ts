import type {} from "@mui/joy/ModalDialog"
import type { PaletteRange, Theme } from "@mui/joy/styles/types"
import type { Mode } from "@mui/system/cssVars/useCurrentColorScheme"

declare module "@mui/joy/styles" {
  interface ColorPalettePropOverrides {
    info: false
  }

  interface FontSizeOverrides {
    xs3: true
    xs2: true
    xl5: true
    xl6: true
    xl7: true
  }

  interface PaletteBackgroundOverrides {
    // A better place to put these would be in a spotlight object, sibling to background. Until Joy provides that ability, this will do.
    spotlight1: true
    spotlight2: true
    level4: true
  }

  interface Palette {
    gradient: {
      primary: string
    }
  }

  interface TypographySystemOverrides {
    caption: true
  }
}

declare module "@mui/joy/ModalDialog" {
  interface ModalDialogPropsLayoutOverrides {
    auto: true
  }
}

export type ColorRange = Pick<
  PaletteRange,
  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
>

export interface CssVarsData {
  theme: Theme
  defaultMode: Mode
}
