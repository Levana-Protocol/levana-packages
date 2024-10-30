import { useTheme } from "@mui/joy/styles"
import type { Breakpoint } from "@mui/system"
import useMediaQuery from "@mui/system/useMediaQuery"
import { useEffect } from "react"
import { create } from "zustand"

const breakpoints: Breakpoint[] = (() => {
  // Ensure we have type safety for using all breakpoints
  const breakpointRecord: Record<Breakpoint, number> = {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  }
  const keys = Object.keys(breakpointRecord) as Breakpoint[]
  return keys.sort((a, b) => breakpointRecord[a] - breakpointRecord[b])
})()

interface UseBreakpointDetectionStoreProps {
  breakpoint: Breakpoint
  isGreater: (breakpoint: Breakpoint) => boolean
  isGreaterOrEqual: (breakpoint: Breakpoint) => boolean
}

export const useBreakpointDetectionStore =
  create<UseBreakpointDetectionStoreProps>((_set, get) => ({
    breakpoint: "xs",
    isGreater: (breakpoint) => {
      return (
        breakpoints.indexOf(get().breakpoint) > breakpoints.indexOf(breakpoint)
      )
    },
    isGreaterOrEqual: (breakpoint) => {
      return (
        breakpoints.indexOf(get().breakpoint) >= breakpoints.indexOf(breakpoint)
      )
    },
  }))

const BreakpointDetection = () => {
  const theme = useTheme()

  for (const breakpoint of theme.breakpoints.keys) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMediaQuery = useMediaQuery(theme.breakpoints.only(breakpoint))

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isMediaQuery) {
        useBreakpointDetectionStore.setState({ breakpoint })
      }
    }, [isMediaQuery])
  }

  return null
}

export default BreakpointDetection
