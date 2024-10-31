import CssBaseline from "@mui/joy/CssBaseline"
import GlobalStyles from "@mui/joy/GlobalStyles"
import { CssVarsProvider } from "@mui/joy/styles"
import { useEffect, useState, type PropsWithChildren } from "react"
import type { PropsWithFunctionChildren } from "@levana-protocol/utils/react"
import { lazyLoad } from "@levana-protocol/utils/lazyLoad"

import BreakpointDetection from "../BreakpointDetection"
import type { CssVarsData } from "./types"

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
