import Typography from "@mui/joy/Typography"
import Stack, { type StackProps } from "@mui/joy/Stack"
import useSlot from "@mui/joy/utils/useSlot"
import { styled, useThemeProps } from "@mui/joy/styles"
import { forwardRef, useEffect, useState } from "react"
import { getTimediffSplitDHMS, getTimediffSplitHMS } from "@levana/utils/date"

import type { CountdownProps } from "./CountdownProps"

export * from "./CountdownProps"

const name = "LevanaCountdown"

const CountdownRoot = styled(Stack, {
  name,
  slot: "root",
})({
  alignItems: "baseline",
})

const CountdownNumber = styled(Typography, {
  name,
  slot: "number",
})({})

const CountdownUnit = styled(Typography, {
  name,
  slot: "unit",
})({})

const Countdown = forwardRef<HTMLDivElement, CountdownProps>(
  function Countdown(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { ...otherProps } = props
    const {
      date,
      labels,
      startDecorator,
      endDecorator,
      ...externalForwardedProps
    } = props

    const ownerState = { ...otherProps }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: CountdownRoot,
      ownerState,
      externalForwardedProps,
      internalForwardedProps: {
        direction: "row",
        spacing: 0.5,
      } satisfies StackProps,
    })

    const [SlotNumber, numberProps] = useSlot("number", {
      ref,
      className: "number",
      elementType: CountdownNumber,
      ownerState,
      externalForwardedProps,
    })

    const [SlotUnit, unitProps] = useSlot("unit", {
      ref,
      className: "unit",
      elementType: CountdownUnit,
      ownerState,
      externalForwardedProps,
    })

    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDate(new Date())
      }, 1000)

      return () => clearInterval(interval)
    }, [])

    const sections = (() => {
      if (labels?.days) {
        const { days, hours, minutes, seconds } = getTimediffSplitDHMS(
          date,
          currentDate,
        )
        return [
          { label: labels?.days, value: days },
          { label: labels?.hours, value: hours },
          { label: labels?.minutes, value: minutes },
          { label: labels?.seconds, value: seconds },
        ]
      } else {
        const { hours, minutes, seconds } = getTimediffSplitHMS(
          date,
          currentDate,
        )
        return [
          { label: labels?.hours, value: hours },
          { label: labels?.minutes, value: minutes },
          { label: labels?.seconds, value: seconds },
        ]
      }
    })()

    return (
      <SlotRoot {...rootProps}>
        {startDecorator}
        <Typography>
          {sections.map((section, index) => (
            <SlotNumber key={index} {...numberProps}>
              {index > 0 && " "}
              {section.value}
              {section.label && (
                <SlotUnit {...unitProps}>{section.label}</SlotUnit>
              )}
            </SlotNumber>
          ))}
        </Typography>
        {endDecorator}
      </SlotRoot>
    )
  },
)

export default Countdown
