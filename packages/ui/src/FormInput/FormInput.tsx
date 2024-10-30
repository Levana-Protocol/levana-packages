import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import Input, { inputClasses } from "@mui/joy/Input"
import useSlot from "@mui/joy/utils/useSlot"
import { styled, useThemeProps } from "@mui/joy/styles"
import { forwardRef, useEffect, useRef, useState } from "react"

import type { FormInputOwnerState, FormInputProps } from "./FormInputProps"

export * from "./FormInputProps"

const name = "LevanaFormInput"

const FormInputRoot = styled("div", {
  name,
  slot: "root",
})(({ theme }) => ({
  "--FormInput-fontSize": theme.vars.fontSize.xl,
  "--FormInput-fontWeight": theme.vars.fontWeight.lg,
  "--FormInput-lineHeight": "2.25rem",
  "--FormInput-gap": "2px",
  "--FormInputPrefix-fontSize": theme.vars.fontSize.md,
  "--FormInputPrefix-fontWeight": theme.vars.fontWeight.md,
  "--FormInputSuffix-fontSize": theme.vars.fontSize.md,
  "--FormInputSuffix-fontWeight": theme.vars.fontWeight.md,
}))

const FormInputInput = styled(Input, {
  name,
  slot: "input",
})<{ ownerState: FormInputOwnerState }>(({ theme, ownerState }) => ({
  "--focus-thickness": 0,
  "--Input-paddingInline": 0,
  "--Input-gap": "var(--FormInput-gap)",
  backgroundColor: "unset",
  fontSize: "var(--FormInput-fontSize)",
  fontWeight: "var(--FormInput-fontWeight)",
  lineHeight: "var(--FormInput-lineHeight)",
  letterSpacing: "normal",
  alignItems: "baseline",

  [`.${inputClasses.root}`]: {
    color: "var(--FormAssetField-color)",
  },
  [`.${inputClasses.startDecorator}`]: {
    pointerEvents: "none",
    marginInlineEnd: 0,
  },
  [`.${inputClasses.endDecorator}`]: {
    pointerEvents: "none",
    userSelect: "none",
    flexShrink: 99999,
    whiteSpace: "nowrap",
  },
  [`.${inputClasses.input}`]: {
    width: "100%",
    zIndex: 1,
    flexBasis: "auto",
  },
  ...(ownerState.issueType === "warning" && {
    color: theme.vars.palette.warning[500],
  }),
}))

const FormInputPrefixLabel = styled(Typography, {
  name,
  slot: "prefixLabel",
})(({ theme }) => ({
  fontSize: "var(--FormInputPrefix-fontSize)",
  fontWeight: "var(--FormInputPrefix-fontWeight)",
  color: theme.vars.palette.text.tertiary,
  marginInlineEnd: "var(--FormInput-gap)",
}))

const FormInputSuffixLabel = styled(Typography, {
  name,
  slot: "suffixLabel",
})(({ theme }) => ({
  fontSize: "var(--FormInputSuffix-fontSize)",
  fontWeight: "var(--FormInputSuffix-fontWeight)",
  color: theme.vars.palette.text.tertiary,
  userSelect: "none",
}))

const FormInput = forwardRef<HTMLDivElement, FormInputProps>(
  function FormInput(inProps, ref) {
    const props = useThemeProps({ props: inProps, name })

    const {
      onChange,
      value,
      placeholder,
      prefix,
      suffix,
      minSuffix,
      readOnly,
      disabled,
      issueType,
      ...otherProps
    } = props

    const ownerState = { ...otherProps, readOnly, disabled, issueType }

    const [SlotRoot, rootProps] = useSlot("root", {
      ref,
      className: "root",
      elementType: FormInputRoot,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const [SlotInput, inputProps] = useSlot("input", {
      ref,
      className: "input",
      elementType: FormInputInput,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const [SlotPrefixLabel, prefixLabelProps] = useSlot("prefixLabel", {
      ref,
      className: "prefixLabel",
      elementType: FormInputPrefixLabel,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const [SlotSuffixLabel, suffixLabelProps] = useSlot("suffixLabel", {
      ref,
      className: "suffixLabel",
      elementType: FormInputSuffixLabel,
      ownerState,
      externalForwardedProps: otherProps,
    })

    const suffixRef = useRef<HTMLElement>(null)
    const [suffixWidth, setSuffixWidth] = useState<number>()

    useEffect(() => {
      if (minSuffix !== undefined && suffixRef.current) {
        setSuffixWidth(suffixRef.current.offsetWidth)
      } else {
        setSuffixWidth(undefined)
      }
    }, [minSuffix])

    return (
      <SlotRoot {...rootProps}>
        <Box sx={{ position: "relative" }}>
          {suffix && (
            <Typography
              sx={{
                fontSize: "var(--FormInput-fontSize)",
                fontWeight: "var(--FormInput-fontWeight)",
                lineHeight: "var(--FormInput-lineHeight)",
                color: "transparent",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                alignItems: "baseline",
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: "100%",
                userSelect: "none",
              }}
              endDecorator={
                <SlotSuffixLabel {...suffixLabelProps}>
                  {suffix}
                </SlotSuffixLabel>
              }
              slotProps={{
                endDecorator: {
                  sx: {
                    marginInlineStart: "var(--FormInput-gap)",
                    flexShrink: 99999,
                    ...(suffixWidth !== undefined && {
                      minWidth: suffixWidth,
                    }),
                  },
                },
              }}
            >
              {prefix && (
                <Box
                  component="span"
                  sx={{
                    fontSize: "var(--FormInputPrefix-fontSize)",
                    fontWeight: "var(--FormInputPrefix-fontWeight)",
                    marginInlineEnd: "var(--FormInput-gap)",
                  }}
                >
                  {prefix}
                </Box>
              )}
              <Box component="span" sx={{ overflow: "hidden" }}>
                {value || placeholder}
              </Box>
            </Typography>
          )}
          <SlotInput
            variant="plain"
            autoComplete="off"
            value={value}
            onChange={readOnly ? undefined : onChange}
            placeholder={placeholder}
            disabled={disabled}
            startDecorator={
              prefix && (
                <SlotPrefixLabel {...prefixLabelProps}>
                  {prefix}
                </SlotPrefixLabel>
              )
            }
            endDecorator={
              suffix && (
                <Typography ref={suffixRef} sx={{ color: "transparent" }}>
                  {minSuffix || suffix}
                </Typography>
              )
            }
            aria-label="field input"
            {...inputProps}
            slotProps={{
              input: {
                inputMode: "decimal",
                disabled: disabled || readOnly,
                ...inputProps.slotProps?.input,
              },
              endDecorator: {
                ...inputProps.slotProps?.endDecorator,
                sx: {
                  ...(suffixWidth !== undefined && {
                    minWidth: suffixWidth,
                  }),
                },
              },
            }}
          />
        </Box>
      </SlotRoot>
    )
  },
)

export default FormInput
