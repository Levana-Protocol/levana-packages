import { useColorScheme } from "@mui/joy/styles"
import type { Mode } from "@mui/system/cssVars/useCurrentColorScheme"

export type ThemeMode = Extract<Mode, "light" | "dark">

export const useThemeMode = (): ThemeMode => {
  const { mode, systemMode } = useColorScheme()

  switch (mode) {
    case "system":
      return systemMode === "light" ? "light" : "dark"
    case "light":
      return "light"
    case "dark":
    case undefined:
      return "dark"
  }
}
