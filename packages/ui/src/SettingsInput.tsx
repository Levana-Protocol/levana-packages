import type { PropsWithFunctionChildren } from "@levana-protocol/utils/react"
import Input, { type InputProps, inputClasses } from "@mui/joy/Input"
import Stack, { type StackProps } from "@mui/joy/Stack"
import Typography, { type TypographyProps } from "@mui/joy/Typography"
import { styled, useThemeProps } from "@mui/joy/styles"
import type { SxProps } from "@mui/joy/styles/types"
import type { CreateSlotsAndSlotProps, SlotProps } from "@mui/joy/utils/types"
import useSlot from "@mui/joy/utils/useSlot"
import type { OverrideProps } from "@mui/types"
import { forwardRef, useState, useTransition } from "react"

interface SettingsInputSlots {
  root?: React.ElementType
  input?: React.ElementType
  error?: React.ElementType
}

type SettingsInputSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SettingsInputSlots,
  {
    root: SlotProps<typeof Stack, object, SettingsInputOwnerState>
    input: SlotProps<typeof Input, object, SettingsInputOwnerState>
    error: SlotProps<typeof Typography, object, SettingsInputOwnerState>
  }
>

interface SettingsInputTypeMap<
  P = object,
  D extends React.ElementType = "div",
> {
  props: P &
    SettingsInputSlotsAndSlotProps &
    PropsWithFunctionChildren<
      {
        /**
         * Load the initial value from a store
         */
        loadValue?: string
        /**
         * Save the value to a store
         */
        saveValue?: (value: string) => void
        /**
         * On value changes
         *
         * If undefined is returned, no changes will be made.
         * If a string is returned, the string will be used as the new value.
         * If `true` is returned, the `newValue` will be used.
         * If `false` is returned, the input will show an error UI.
         */
        onChange?: (newValue: string) => boolean | string | undefined
        sx?: SxProps
      },
      {
        setValue: React.Dispatch<string>
      }
    >
  defaultComponent: D
}

export type SettingsInputProps<
  D extends React.ElementType = SettingsInputTypeMap["defaultComponent"],
  P = { component?: React.ElementType },
> = OverrideProps<SettingsInputTypeMap<P, D>, D>

type SettingsInputOwnerState = SettingsInputProps

const name = "SettingsInputStats"

const SettingsInputRoot = styled(Stack, {
  name,
  slot: "root",
})({
  alignItems: "end",
})

const SettingsInputInput = styled(Input, {
  name,
  slot: "input",
})(({ theme }) => ({
  [`.${inputClasses.input}`]: {
    textAlign: "right",
  },
  [`.${inputClasses.endDecorator}`]: {
    color: theme.vars.palette.text.secondary,
  },
}))

const SettingsInputError = styled(Typography, {
  name,
  slot: "error",
})({})

const SettingsInput = forwardRef<HTMLDivElement, SettingsInputProps>(
  function StackedStats(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const { loadValue, saveValue, onChange, children, ...otherProps } = props
    const ownerState = { ...props }
    const externalForwardedProps = { ...otherProps }

    const [, startTransition] = useTransition()
    const [error, setError] = useState(false)
    const [value, setStateValue] = useState(loadValue ?? "")

    const setValue: React.Dispatch<string> = (value) => {
      setStateValue((previousValue) => {
        if (previousValue !== value) {
          setTimeout(() => saveValue?.(value))
          return value
        }
        return previousValue
      })
    }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: SettingsInputRoot,
      ownerState,
      externalForwardedProps,
      internalForwardedProps: { direction: "column" } satisfies StackProps,
    })

    const [SlotInput, inputProps] = useSlot("input", {
      ref,
      className: "input",
      elementType: SettingsInputInput,
      ownerState,
      externalForwardedProps,
      internalForwardedProps: { error } satisfies InputProps,
    })

    const [SlotError, errorProps] = useSlot("error", {
      ref,
      className: "error",
      elementType: SettingsInputError,
      ownerState,
      externalForwardedProps,
      internalForwardedProps: {
        color: error ? "danger" : "neutral",
        level: "body-xs",
      } satisfies TypographyProps,
    })

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      startTransition(() => {
        const change = onChange ? onChange(event.target.value) : true

        if (typeof change === "string") {
          setValue(change)
          setError(false)
        } else if (change === true) {
          setValue(event.target.value)
          setError(false)
        } else if (change === false) {
          setStateValue(event.target.value)
          setError(true)
        }
      })
    }

    return (
      <SlotRoot {...rootProps}>
        <SlotInput {...inputProps} value={value} onChange={handleChange} />
        {children?.({ setValue })}
        {error && <SlotError {...errorProps} />}
      </SlotRoot>
    )
  },
)

export default SettingsInput
