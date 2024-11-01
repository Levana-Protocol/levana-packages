import { lazyLoad } from "@levana-protocol/utils/lazyLoad"
import type { PropsWithFunctionChildren } from "@levana-protocol/utils/react"
import CssBaseline from "@mui/joy/CssBaseline"
import GlobalStyles from "@mui/joy/GlobalStyles"
import type {} from "@mui/joy/ModalDialog"
import { CssVarsProvider } from "@mui/joy/styles"
import { type PropsWithChildren, useEffect, useState } from "react"

import BreakpointDetection from "../BreakpointDetection"
import type { CssVarsData } from "./types"

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

interface ThemeProviderProps {
  variant: "levana" | "rujira"
}

const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>) => {
  const { children } = props

  return (
    <ThemeSelector variant={props.variant}>
      {(cssVarsData) => (
        <CssVarsProvider
          theme={cssVarsData.theme}
          defaultMode={cssVarsData.defaultMode}
        >
          <CssBaseline />
          <GlobalStyles
            styles={{
              "#root": {
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
              },
              ul: {
                paddingInlineStart: "1.5rem",
              },
            }}
          />
          <BreakpointDetection />
          {children}
        </CssVarsProvider>
      )}
    </ThemeSelector>
  )
}

const ThemeSelector = (
  props: PropsWithFunctionChildren<ThemeProviderProps, CssVarsData>,
) => {
  const [cssVarsData, setCssVarsData] = useState<CssVarsData>()

  useEffect(() => {
    switch (props.variant) {
      case "levana":
        lazyLoad(() => import("./levana")).then(setCssVarsData)
        break
      case "rujira":
        lazyLoad(() => import("./rujira")).then(setCssVarsData)
        break
    }
  }, [props.variant])

  if (!cssVarsData) {
    return null
  }

  return props.children?.(cssVarsData)
}

export default ThemeProvider
