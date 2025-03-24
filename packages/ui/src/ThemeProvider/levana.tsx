import { buttonClasses } from "@mui/joy/Button"
import { checkboxClasses } from "@mui/joy/Checkbox"
import { inputClasses } from "@mui/joy/Input"
import { listItemButtonClasses } from "@mui/joy/ListItemButton"
import { sheetClasses } from "@mui/joy/Sheet"
import { sliderClasses } from "@mui/joy/Slider"
import { extendTheme } from "@mui/joy/styles"
import type { StyleOverrides, Theme } from "@mui/joy/styles"
import type { ColorSystemOptions } from "@mui/joy/styles/extendTheme"
import type {
  PaletteBackground,
  PaletteCommon,
  PaletteDanger,
  PaletteNeutral,
  PalettePrimary,
  PaletteSuccess,
  PaletteText,
  PaletteWarning,
} from "@mui/joy/styles/types"

import type { AdaptiveListOwnerState, AdaptiveListProps } from "../AdaptiveList"
import type {
  ButtonSliderOwnerState,
  ButtonSliderProps,
  ButtonSliderSlots,
} from "../ButtonSlider/ButtonSliderProps"
import type {
  FormInputOwnerState,
  FormInputProps,
  FormInputSlots,
} from "../FormInput/FormInputProps"
import type {
  FormToggleInputOwnerState,
  FormToggleInputProps,
  FormToggleInputSlots,
} from "../FormToggleInput/FormToggleInputProps"
import CheckedIcon from "../icons/CheckedIcon"
import UncheckedIcon from "../icons/UncheckedIcon"
import type { ColorRange, CssVarsData } from "./types"

declare module "@mui/joy/styles" {
  interface Components {
    LevanaAdaptiveList?: {
      defaultProps?: Partial<AdaptiveListProps<string>>
      styleOverrides?: StyleOverrides<
        keyof {
          root?: React.ElementType
        },
        AdaptiveListOwnerState,
        Theme
      >
    }
    LevanaButtonSlider?: {
      defaultProps?: Partial<ButtonSliderProps>
      styleOverrides?: StyleOverrides<
        keyof ButtonSliderSlots,
        ButtonSliderOwnerState,
        Theme
      >
    }
    LevanaFormInput?: {
      defaultProps?: Partial<FormInputProps>
      styleOverrides?: StyleOverrides<
        keyof FormInputSlots,
        FormInputOwnerState,
        Theme
      >
    }
    LevanaFormToggleInput?: {
      defaultProps?: Partial<FormToggleInputProps>
      styleOverrides?: StyleOverrides<
        keyof FormToggleInputSlots,
        FormToggleInputOwnerState,
        Theme
      >
    }
  }
}

const dangerColor: ColorRange = {
  50: "#fef2f7",
  100: "#fbdbe8",
  200: "#f8c4da",
  300: "#f297bd",
  400: "#ed69a0",
  500: "#e52574",
  600: "#c0175d",
  700: "#921247",
  800: "#650c31",
  900: "#4e0926",
}

const neutralColor: ColorRange = {
  50: "#F2F1F4",
  100: "#E5E3E8",
  200: "#CCC7D1",
  300: "#B2ACB9",
  400: "#9992A0",
  500: "#807887",
  600: "#675F6D",
  700: "#4D4653",
  800: "#332E38",
  900: "#1A161D",
}

const primaryColor: ColorRange = {
  50: "#fcf8ff",
  100: "#f0deff",
  200: "#d8abff",
  300: "#c078ff",
  400: "#9c2bff",
  500: "#7600dd",
  600: "#5b00aa",
  700: "#400077",
  800: "#250044",
  900: "#17002b",
}

const successColor: ColorRange = {
  50: "#f0faf7",
  100: "#ddf4ec",
  200: "#b7e7d6",
  300: "#90dbc0",
  400: "#6aceaa",
  500: "#44c194",
  600: "#349e78",
  700: "#27785b",
  800: "#1a523e",
  900: "#0e2b21",
}

const warningColor: ColorRange = {
  50: "#fff1d5",
  100: "#ffeac0",
  200: "#ffe3ab",
  300: "#ffd482",
  400: "#ffc658",
  500: "#FFB82E",
  600: "#cc9325",
  700: "#996e1c",
  800: "#664a12",
  900: "#332509",
}

const dark = ((): ColorSystemOptions => {
  const common: Partial<PaletteCommon> = {
    black: "#000000",
    white: "#FFFFFF",
  }

  const background: Partial<PaletteBackground> = {
    backdrop: "rgba(0 0 0 / 0.25)",
    body: "#0E0A12",
    level1: "#1D1A21",
    level2: "#26222A",
    level3: "#39343E",
    level4: "#16111A",
    popup: common.black,
    spotlight1: "#211A33",
    spotlight2: "#332C48",
    surface: neutralColor[900],
    tooltip: neutralColor[600],
  }

  const text: Partial<PaletteText> = {
    primary: "#FFFFFF",
    secondary: "#B4AFB7",
    tertiary: neutralColor[400],
    icon: neutralColor[400],
  }

  const danger: Partial<PaletteDanger> = {
    ...dangerColor,
    mainChannel: "229 37 116",
    outlinedActiveBg: dangerColor[700],
    outlinedBorder: dangerColor[700],
    outlinedColor: dangerColor[200],
    outlinedDisabledBorder: neutralColor[800],
    outlinedDisabledColor: neutralColor[500],
    outlinedHoverBg: dangerColor[800],
    plainActiveBg: dangerColor[700],
    plainColor: dangerColor[300],
    plainDisabledColor: neutralColor[500],
    plainHoverBg: dangerColor[800],
    softActiveBg: dangerColor[500],
    softBg: dangerColor[800],
    softColor: dangerColor[200],
    softDisabledBg: neutralColor[800],
    softDisabledColor: neutralColor[500],
    softHoverBg: dangerColor[700],
    solidActiveBg: dangerColor[700],
    solidBg: dangerColor[500],
    solidColor: common.white,
    solidDisabledBg: neutralColor[800],
    solidDisabledColor: neutralColor[500],
    solidHoverBg: dangerColor[600],
  }

  const neutral: Partial<PaletteNeutral> = {
    ...neutralColor,
    mainChannel: "128 120 135",
    outlinedActiveBg: neutralColor[700],
    outlinedBorder: "#3E3B41",
    outlinedColor: neutralColor[200],
    outlinedDisabledBorder: neutralColor[800],
    outlinedDisabledColor: "#868388",
    outlinedHoverBg: neutralColor[800],
    plainActiveBg: neutralColor[700],
    plainColor: common.white,
    plainDisabledColor: neutralColor[500],
    plainHoverBg: neutralColor[800],
    plainHoverColor: neutralColor[300],
    softActiveBg: neutralColor[600],
    softBg: neutralColor[800],
    softColor: neutralColor[200],
    softDisabledBg: neutralColor[800],
    softDisabledColor: neutralColor[500],
    softHoverBg: neutralColor[700],
    solidActiveBg: "#675F6D",
    solidBg: "#807887",
    solidColor: common.white,
    solidDisabledBg: "#868388",
    solidDisabledColor: common.white,
    solidHoverBg: "#9992A0",
  }

  const primary: Partial<PalettePrimary> = {
    ...primaryColor,
    mainChannel: "118 0 221",
    outlinedActiveBg: primaryColor[700],
    outlinedBorder: primaryColor[700],
    outlinedColor: primaryColor[200],
    outlinedDisabledBorder: neutralColor[800],
    outlinedDisabledColor: neutralColor[500],
    outlinedHoverBg: primaryColor[800],
    plainActiveBg: primaryColor[700],
    plainColor: primaryColor[500],
    plainDisabledColor: neutralColor[500],
    plainHoverBg: primaryColor[800],
    softActiveBg: primaryColor[600],
    softBg: primaryColor[800],
    softColor: primaryColor[200],
    softDisabledBg: neutralColor[800],
    softDisabledColor: neutralColor[500],
    softHoverBg: primaryColor[700],
    solidActiveBg: primaryColor[700],
    solidBg: primaryColor[500],
    solidColor: common.white,
    solidDisabledBg: neutralColor[800],
    solidDisabledColor: neutralColor[500],
    solidHoverBg: primaryColor[600],
  }

  const success: Partial<PaletteSuccess> = {
    ...successColor,
    mainChannel: "68 193 148",
    outlinedActiveBg: successColor[700],
    outlinedBorder: successColor[700],
    outlinedColor: successColor[200],
    outlinedDisabledBorder: neutralColor[800],
    outlinedDisabledColor: neutralColor[500],
    outlinedHoverBg: successColor[800],
    plainActiveBg: successColor[700],
    plainColor: successColor[300],
    plainDisabledColor: neutralColor[500],
    plainHoverBg: successColor[800],
    softActiveBg: successColor[500],
    softBg: successColor[800],
    softColor: successColor[200],
    softDisabledBg: neutralColor[800],
    softDisabledColor: neutralColor[500],
    softHoverBg: successColor[700],
    solidActiveBg: successColor[700],
    solidBg: successColor[500],
    solidColor: common.white,
    solidDisabledBg: neutralColor[800],
    solidDisabledColor: neutralColor[500],
    solidHoverBg: successColor[600],
  }

  const warning: Partial<PaletteWarning> = {
    ...warningColor,
    mainChannel: "255 184 46",
    outlinedActiveBg: warningColor[700],
    outlinedBorder: warningColor[700],
    outlinedColor: warningColor[200],
    outlinedDisabledBorder: neutralColor[800],
    outlinedDisabledColor: neutralColor[500],
    outlinedHoverBg: warningColor[800],
    plainActiveBg: warningColor[700],
    plainColor: warningColor[300],
    plainDisabledColor: neutralColor[500],
    plainHoverBg: warningColor[800],
    softActiveBg: warningColor[500],
    softBg: warningColor[800],
    softColor: warningColor[200],
    softDisabledBg: neutralColor[800],
    softDisabledColor: neutralColor[500],
    softHoverBg: warningColor[700],
    solidActiveBg: warningColor[700],
    solidBg: warningColor[500],
    solidColor: common.white,
    solidDisabledBg: neutralColor[800],
    solidDisabledColor: neutralColor[500],
    solidHoverBg: warningColor[600],
  }

  return {
    palette: {
      background,
      common,
      text,
      divider: neutral.outlinedBorder,
      danger,
      neutral,
      primary,
      success,
      warning,
      focusVisible: "none",
      mode: "dark",
    },
  }
})()

const light = ((): ColorSystemOptions => {
  const common: Partial<PaletteCommon> = {
    black: "#000000",
    white: "#FFFFFF",
  }

  const body = "#FEFDFC"

  const background: Partial<PaletteBackground> = {
    backdrop: "rgba(255 255 255 / 0.3)",
    body,
    level1: "#F6F6F6",
    level2: "#EEEEEE",
    level3: "#DEDEDE",
    level4: "#F5F5F5",
    popup: common.white,
    spotlight1: "#e3e1f7",
    spotlight2: "#d6d2f2",
    surface: body,
    tooltip: neutralColor[500],
  }

  const text: Partial<PaletteText> = {
    primary: "#39343E",
    secondary: "#788099",
    tertiary: "#5C595E",
  }

  const divider = "#D5DBE1"
  const disabled = "#C2BCC4"

  const danger: Partial<PaletteDanger> = {
    ...dangerColor,
    solidBg: dangerColor[500],
    solidHoverBg: dangerColor[400],
    solidActiveBg: dangerColor[600],
    solidDisabledBg: disabled,
    solidDisabledColor: text.primary,
    plainColor: dangerColor[500],
  }

  const neutral: Partial<PaletteNeutral> = {
    ...neutralColor,
    solidBg: neutralColor[500],
    solidHoverBg: neutralColor[400],
    solidActiveBg: neutralColor[600],
    solidDisabledBg: disabled,
    solidDisabledColor: text.primary,
    plainColor: text.primary,
    outlinedBorder: divider,
  }

  const primary: Partial<PalettePrimary> = {
    ...primaryColor,
    solidBg: primaryColor[500],
    solidHoverBg: primaryColor[400],
    solidActiveBg: primaryColor[600],
    solidDisabledBg: disabled,
    solidDisabledColor: text.primary,
    plainColor: primaryColor[400],
  }

  const success: Partial<PaletteSuccess> = {
    ...successColor,
    solidBg: successColor[500],
    solidHoverBg: successColor[400],
    solidActiveBg: successColor[600],
    solidDisabledBg: disabled,
    solidDisabledColor: text.primary,
    plainColor: successColor[500],
  }

  const warning: Partial<PaletteWarning> = {
    ...warningColor,
    solidBg: warningColor[500],
    solidHoverBg: warningColor[400],
    solidActiveBg: warningColor[600],
    solidDisabledBg: disabled,
    solidDisabledColor: text.primary,
    plainColor: warningColor[700],
  }

  return {
    palette: {
      background,
      common,
      text,
      divider,
      danger,
      neutral,
      primary,
      success,
      warning,
      focusVisible: "none",
      mode: "light",
    },
  }
})()

const theme = extendTheme({
  cssVarPrefix: "",
  colorSchemes: {
    light,
    dark,
  },
  typography: {
    h1: {
      fontSize: "var(--fontSize-xl7)",
      fontWeight: "var(--fontWeight-lg)",
    },
    h2: {
      fontSize: "var(--fontSize-xl3)",
      fontWeight: "var(--fontWeight-xl)",
    },
    h3: {
      fontSize: "var(--fontSize-xl2)",
      fontWeight: "var(--fontWeight-md)",
    },
    h4: {
      fontSize: "var(--fontSize-lg)",
      fontWeight: "var(--fontWeight-md)",
    },
    "title-lg": {
      fontSize: "var(--fontSize-md)",
      fontWeight: "var(--fontWeight-lg)",
    },
    "title-md": {
      fontSize: "var(--fontSize-sm)",
      fontWeight: "var(--fontWeight-lg)",
    },
    "title-sm": {
      fontSize: "var(--fontSize-xs)",
      fontWeight: "var(--fontWeight-lg)",
    },
    "body-lg": {
      fontSize: "var(--fontSize-md)",
    },
    "body-md": {
      fontSize: "var(--fontSize-sm)",
    },
    "body-sm": {
      fontSize: "var(--fontSize-xs)",
      fontWeight: "var(--fontWeight-md)",
    },
    "body-xs": {
      fontSize: "var(--fontSize-xs2)",
      fontWeight: "var(--fontWeight-md)",
    },
    caption: {
      fontSize: "var(--fontSize-xs3)",
      fontWeight: "var(--fontWeight-md)",
    },
  },
  fontSize: {
    /**
     * @link https://utopia.fyi/type/calculator?c=320,14,1.125,1200,18,1.125,8,4,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12
     */

    // Step -4: 8.74px → 11.24px
    xs3: "clamp(0.5463rem, 0.4894rem + 0.2841vw, 0.7025rem)",
    // Step -3: 9.83px → 12.64px
    xs2: "clamp(0.6144rem, 0.5505rem + 0.3193vw, 0.79rem)",
    // Step -2: 11.06px → 14.22px
    xs: "clamp(0.6913rem, 0.6194rem + 0.3591vw, 0.8888rem)",
    // Step -1: 12.44px → 16.00px
    sm: "clamp(0.7775rem, 0.6966rem + 0.4045vw, 1rem)",
    // Step 0: 14.00px → 18.00px
    md: "clamp(0.875rem, 0.7841rem + 0.4545vw, 1.125rem)",
    // Step 1: 15.75px → 20.25px
    lg: "clamp(0.9844rem, 0.8821rem + 0.5114vw, 1.2656rem)",
    // Step 2: 17.72px → 22.78px
    xl: "clamp(1.1075rem, 0.9925rem + 0.575vw, 1.4238rem)",
    // Step 3: 19.93px → 25.63px
    xl2: "clamp(1.2456rem, 1.1161rem + 0.6477vw, 1.6019rem)",
    // Step 4: 22.43px → 28.83px
    xl3: "clamp(1.4019rem, 1.2564rem + 0.7273vw, 1.8019rem)",
    // Step 5: 25.23px → 32.44px
    xl4: "clamp(1.5769rem, 1.413rem + 0.8193vw, 2.0275rem)",
    // Step 6: 28.38px → 36.49px
    xl5: "clamp(1.7738rem, 1.5894rem + 0.9216vw, 2.2806rem)",
    // Step 7: 31.93px → 41.05px
    xl6: "clamp(1.9956rem, 1.7884rem + 1.0364vw, 2.5656rem)",
    // Step 8: 35.92px → 46.18px
    xl7: "clamp(2.245rem, 2.0118rem + 1.1659vw, 2.8863rem)",
  },
  fontWeight: {
    sm: 300,
    md: 500,
    lg: 600,
    xl: 700,
  },
  radius: {
    xs: "2px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "24px",
  },
  zIndex: {
    snackbar: 1000000, // Above Zendesk button
  },
  components: {
    LevanaAdaptiveList: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--AdaptiveList-backgroundColor":
            theme.vars.palette.background.level1,
          "--AdaptiveList-headerBackgroundColor":
            theme.vars.palette.background.body,
          "--AdaptiveList-hoverBackgroundColor":
            theme.vars.palette.neutral.plainHoverBg,
          "--AdaptiveList-selectedBackgroundColor":
            theme.vars.palette.neutral.plainActiveBg,
          "--AdaptiveList-padding": theme.spacing(2),
        }),
      },
    },
    LevanaButtonSlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(0, 1),
          backgroundColor: theme.vars.palette.background.level2,
          borderRadius: theme.vars.radius.sm,
        }),
        buttonGroup: ({ theme }) => ({
          "--ButtonGroup-radius": theme.vars.radius.lg,
          paddingTop: theme.spacing(0.5),
          paddingBottom: theme.spacing(1),
        }),
      },
    },
    LevanaFormInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--FormInput-fontSize": theme.vars.fontSize.xl,
          "--FormInput-fontWeight": theme.vars.fontWeight.lg,
          "--FormInput-lineHeight": "2.25rem",
          "--FormInputPrefix-fontSize": theme.vars.fontSize.md,
          "--FormInputPrefix-fontWeight": theme.vars.fontWeight.md,
          "--FormInputSuffix-fontSize": theme.vars.fontSize.md,
          "--FormInputSuffix-fontWeight": theme.vars.fontWeight.md,
        }),
      },
    },
    LevanaFormToggleInput: {
      styleOverrides: {
        label: ({ theme }) => ({
          fontSize: theme.vars.fontSize.xs,
        }),
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: {
          "--variant-borderWidth": "2px",
        },
      },
    },
    JoyBadge: {
      styleOverrides: {
        root: {
          [`.${sheetClasses.colorNeutral} &`]: {
            "--Badge-ringColor": "var(--palette-background-level2)",
          },
          [`.${sheetClasses.colorNeutral} .${listItemButtonClasses.colorNeutral}:hover &`]:
            {
              "--Badge-ringColor": "var(--palette-neutral-plainHoverBg)",
            },
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "--variant-borderWidth": "2px",

          ...(ownerState.size === "sm" && {
            paddingInline: "0.75rem",
            fontSize: theme.vars.fontSize.xs2,
          }),
          ...(ownerState.size === "md" && {
            paddingInline: "0.75rem",
            fontSize: theme.vars.fontSize.xs,
          }),
          ...(ownerState.size === "lg" && {
            paddingInline: "1.5rem",
            borderRadius: theme.vars.radius.md,
            fontSize: theme.vars.fontSize.sm,
          }),

          ...(ownerState.variant === "plain" && {
            paddingInline: "0.5rem",

            "&:hover": {
              ...(ownerState.color === "primary" && {
                color: theme.vars.palette.primary[300],
              }),
              ...(ownerState.color === "success" && {
                color: theme.vars.palette.success[400],
              }),
              ...(ownerState.color === "warning" && {
                color: theme.vars.palette.warning[400],
              }),
              ...(ownerState.color === "danger" && {
                color: theme.vars.palette.danger[400],
              }),
              ...(ownerState.color === "neutral" && {
                color: theme.vars.palette.neutral[400],
              }),
            },
            "&:active": {
              ...(ownerState.color === "primary" && {
                color: theme.vars.palette.primary[500],
              }),
              ...(ownerState.color === "success" && {
                color: theme.vars.palette.success[600],
              }),
              ...(ownerState.color === "warning" && {
                color: theme.vars.palette.warning[600],
              }),
              ...(ownerState.color === "danger" && {
                color: theme.vars.palette.danger[600],
              }),
              ...(ownerState.color === "neutral" && {
                color: theme.vars.palette.neutral[200],
              }),
            },
            "&:hover, &:active": {
              backgroundColor: "transparent",
            },
          }),
        }),
      },
    },
    JoyCard: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "--variant-borderWidth": "2px",

          ...(ownerState.variant === "outlined" && {
            backgroundColor: theme.vars.palette.background.level1,
          }),
          ...(ownerState.variant === "soft" && {
            backgroundColor: theme.vars.palette.background.level2,
          }),
        }),
      },
    },
    JoyCheckbox: {
      defaultProps: {
        variant: "plain",
        checkedIcon: <CheckedIcon />,
        uncheckedIcon: <UncheckedIcon />,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            color: theme.vars.palette.text.secondary,
          },
        }),
        checkbox: ({ ownerState, theme }) => ({
          backgroundColor: "unset",
          [`&.${checkboxClasses.checked}`]: {
            "--Icon-color": theme.vars.palette.success[500],
            "&:hover": {
              "--Icon-color": theme.vars.palette.success[600],
            },
            "&:active": {
              "--Icon-color": theme.vars.palette.success[700],
            },
          },
          "&:hover": {
            backgroundColor: "unset",

            ...(!ownerState.checked &&
              ownerState.color && {
                ...(theme.palette.mode === "dark"
                  ? {
                      "--Icon-color": theme.vars.palette[ownerState.color][600],
                    }
                  : {
                      "--Icon-color": theme.vars.palette[ownerState.color][300],
                    }),
              }),
          },
          "&:active": {
            backgroundColor: "unset",

            ...(!ownerState.checked &&
              ownerState.color && {
                ...(theme.palette.mode === "dark"
                  ? {
                      "--Icon-color": theme.vars.palette[ownerState.color][700],
                    }
                  : {
                      "--Icon-color": theme.vars.palette[ownerState.color][200],
                    }),
              }),
          },
        }),
        label: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    JoyChip: {
      styleOverrides: {
        root: {
          "--variant-borderWidth": "2px",
        },
      },
    },
    JoyCircularProgress: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "soft" && {
            "--CircularProgress-trackColor":
              theme.vars.palette.background.level2,
            ...(ownerState.color === "primary" && {
              "--CircularProgress-progressColor":
                theme.vars.palette.primary[500],
            }),
          }),
        }),
      },
    },
    JoyFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.vars.fontSize.xs2,
          fontWeight: theme.vars.fontWeight.md,
          color: `var(--FormHelperText-color, ${theme.vars.palette.text.secondary})`,
        }),
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: {
          "--variant-borderWidth": "2px",
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          "--variant-borderWidth": "2px",
          [`&.${inputClasses.variantPlain}`]: {
            backgroundColor: "transparent",
            [`&.${inputClasses.focused}`]: {
              "--Input-focusedHighlight": "transparent",
            },
          },
        },
        input: ({ theme }) => ({
          "::placeholder": {
            color: theme.vars.palette.text.secondary,
            opacity: 1,
          },
          [`&.${inputClasses.disabled}::placeholder`]: {
            color: theme.vars.palette.text.tertiary,
          },
        }),
      },
    },
    JoyLink: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === undefined && {
            ...(ownerState.color === "primary" && {
              "--color":
                theme.palette.mode === "dark"
                  ? theme.palette.primary[200]
                  : theme.palette.primary[600],
              "--variant-plainColor": "var(--color)",
              "--variant-outlinedBorder": "var(--color)",
            }),
          }),
        }),
      },
    },
    JoyListItem: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "plain" && {
            ...(ownerState.color === "primary" && {
              "--variant-plainColor":
                theme.palette.mode === "dark"
                  ? theme.palette.primary[200]
                  : theme.palette.primary[600],
            }),
          }),
        }),
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "plain" && {
            ...(ownerState.color === "primary" && {
              "--variant-plainColor":
                theme.palette.mode === "dark"
                  ? theme.palette.primary[200]
                  : theme.palette.primary[600],
            }),
          }),
          ...(ownerState.variant === "outlined" && {
            "--variant-borderWidth": "2px",
            borderRadius: theme.vars.radius.md,
          }),
        }),
      },
    },
    JoyListItemDecorator: {
      styleOverrides: {
        root: {
          "& svg": {
            color: "var(--Icon-color)",
          },
        },
      },
    },
    JoyMenu: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.level2,
          boxShadow: "unset",
        }),
      },
    },
    JoyMenuItem: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "plain" &&
            ownerState.color === "primary" && {
              "--variant-plainColor":
                theme.palette.mode === "dark"
                  ? theme.palette.primary[200]
                  : theme.palette.primary[600],
            }),
        }),
      },
    },
    JoyModalClose: {
      styleOverrides: {
        root: {
          "--variant-borderWidth": "2px",
        },
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--ModalDialog-maxWidth": "550px",
          "--ModalDialog-minWidth": "550px",
          "--ModalDialog-radius": theme.vars.radius.xl,
          "--ModalContent-maxWidth": "400px",
          "--ModalContent-padding": theme.spacing(3),
          backgroundColor: theme.vars.palette.background.surface,
          padding: 0,
        }),
      },
    },
    JoyRadio: {
      styleOverrides: {
        root: {
          "& > svg": {
            display: "block",
          },
        },
      },
    },
    JoyRadioGroup: {
      styleOverrides: {
        root: {
          backgroundColor: "unset",
        },
      },
    },
    JoySheet: {
      defaultProps: {
        variant: "solid",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: theme.vars.radius.md,
          overflow: "hidden",

          ...(ownerState.variant === "plain" && {
            borderRadius: 0,
          }),

          ...(ownerState.variant === "solid" && {
            backgroundColor: theme.vars.palette.background.level1,
            "--palette-background-surface":
              theme.vars.palette.background.level3,
          }),
        }),
      },
    },
    JoySlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--Slider-railBackground": theme.vars.palette.background.level3,
          "--Slider-thumbBackground": "var(--Slider-railBackground)",

          [`&.${sliderClasses.disabled}, &:hover, &:active`]: {
            "--Slider-railBackground": theme.vars.palette.background.level3,
          },

          [`&.${sliderClasses.sizeLg}`]: {
            "--Slider-trackSize": "8px",
          },
        }),
        track: {
          "&[style*='right:']": {
            borderRadius:
              "0 var(--Slider-trackRadius) var(--Slider-trackRadius) 0",
          },
        },
        thumb: {
          [`.${sliderClasses.sizeLg} &:before`]: {
            borderWidth:
              "calc((var(--Slider-thumbWidth) - var(--Slider-trackSize)) / 2)",
          },
          "&[style*='right:']": {
            transform: "translate(50%, -50%)",
          },
        },
      },
    },
    JoyStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    JoyStepIndicator: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "outlined" && {
            "--variant-borderWidth": "2px",
          }),
          ...(ownerState.color === "primary" && {
            "--variant-outlinedBorder": theme.vars.palette.primary[500],
          }),
        }),
      },
    },
    JoyTab: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: theme.vars.radius.sm,
          color: theme.vars.palette.text.secondary,

          ...(ownerState.selected && {
            borderBottomLeftRadius: "unset",
            borderBottomRightRadius: "unset",
            color: theme.vars.palette.text.primary,
          }),

          "&.Mui-selected": {
            backgroundColor: "unset",
          },
        }),
      },
    },
    JoyTabList: {
      styleOverrides: {
        root: {
          boxShadow: "unset",
        },
      },
    },
    JoyToggleButtonGroup: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...((ownerState.variant === "outlined" ||
            // !!!: plain is a temp hack for rujira theme syncing
            ownerState.variant === "soft") && {
            "--variant-borderWidth": "2px",
            "--ToggleButtonGroup-separatorColor":
              theme.vars.palette.background.level3,
            "--ToggleButtonGroup-gap": "var(--variant-borderWidth)",
            "--ToggleButtonGroup-radius": theme.vars.radius.xl,
            "--ButtonGroup-separatorColor": "unset",
            border:
              "var(--variant-borderWidth) solid var(--ToggleButtonGroup-separatorColor)",
            borderRadius: "var(--ToggleButtonGroup-radius)",
            gap: "calc(2 * var(--ToggleButtonGroup-gap))",
            padding: "var(--ToggleButtonGroup-gap)",
            [`& .${buttonClasses.root}`]: {
              "--Button-radius": "var(--ToggleButtonGroup-radius)",
              "--unstable_childRadius": "var(--ToggleButtonGroup-radius)",
              border: 0,
              flex: 1,
            },
            [`& .${buttonClasses.root}[aria-pressed=true]`]: {
              backgroundColor: theme.vars.palette.background.level3,
            },
            [`& .${buttonClasses.root}[aria-pressed=false]`]: {
              "--variant-softBg": "transparent",
              "&:hover": {
                backgroundColor: theme.vars.palette.background.level2,
              },
            },
            [`& .${buttonClasses.root}[aria-pressed=false], & .${buttonClasses.root}[aria-pressed=false] svg`]:
              {
                color: theme.vars.palette.text.secondary,
              },
          }),
        }),
      },
    },
    JoyTooltip: {
      defaultProps: {
        placement: "top",
        variant: "plain",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "--Tooltip-arrowSize": theme.spacing(2),
          borderRadius: theme.vars.radius.lg,
          padding: theme.spacing(2),
          ...(ownerState.variant === "plain" &&
            ownerState.color === "neutral" && {
              backgroundColor: theme.vars.palette.background.spotlight1,
            }),
        }),
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.level === "title-md" &&
            ownerState.color === "neutral" && {
              color: theme.vars.palette.text.primary,
            }),
          ...(ownerState.level === "body-xs" &&
            ownerState.color === "neutral" && {
              color: theme.vars.palette.text.primary,
            }),
        }),
      },
    },
  },
})

const cssVarsData: CssVarsData = {
  theme,
  defaultMode: "dark",
}

export default cssVarsData
