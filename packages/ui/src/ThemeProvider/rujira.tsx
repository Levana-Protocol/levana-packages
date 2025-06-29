import { buttonClasses } from "@mui/joy/Button"
import { checkboxClasses } from "@mui/joy/Checkbox"
import { inputClasses } from "@mui/joy/Input"
import { listDividerClasses } from "@mui/joy/ListDivider"
import { listItemButtonClasses } from "@mui/joy/ListItemButton"
import { listItemDecoratorClasses } from "@mui/joy/ListItemDecorator"
import { modalCloseClasses } from "@mui/joy/ModalClose"
import { sheetClasses } from "@mui/joy/Sheet"
import { sliderClasses } from "@mui/joy/Slider"
import { typographyClasses } from "@mui/joy/Typography"
import { type StyleOverrides, type Theme, extendTheme } from "@mui/joy/styles"
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
import "@fontsource/barlow-semi-condensed/400.css"
import "@fontsource/barlow-semi-condensed/500.css"
import "@fontsource/barlow-semi-condensed/600.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"

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
import type {
  NavigationModalOwnerState,
  NavigationModalProps,
  NavigationModalSlots,
} from "../NavigationModal"
import type {
  NavigationModalDialogOwnerState,
  NavigationModalDialogProps,
  NavigationModalDialogSlots,
} from "../NavigationModalDialog"
import type {
  NavigationModalFooterOwnerState,
  NavigationModalFooterProps,
  NavigationModalFooterSlots,
} from "../NavigationModalFooter"
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
    LevanaNavigationModal?: {
      defaultProps?: Partial<NavigationModalProps>
      styleOverrides?: StyleOverrides<
        keyof NavigationModalSlots,
        NavigationModalOwnerState,
        Theme
      >
    }
    LevanaNavigationModalDialog?: {
      defaultProps?: Partial<NavigationModalDialogProps>
      styleOverrides?: StyleOverrides<
        keyof NavigationModalDialogSlots,
        NavigationModalDialogOwnerState,
        Theme
      >
    }
    LevanaNavigationModalFooter?: {
      defaultProps?: Partial<NavigationModalFooterProps>
      styleOverrides?: StyleOverrides<
        keyof NavigationModalFooterSlots,
        NavigationModalFooterOwnerState,
        Theme
      >
    }
  }
}

const dangerColor: ColorRange = {
  50: "#FEF2F7",
  100: "#FBDBE8",
  200: "#F8C4DA",
  300: "#F297BD",
  400: "#ED69A0",
  500: "#E52574",
  600: "#C0175D",
  700: "#921247",
  800: "#650C31",
  900: "#4E0926",
}

const neutralColor: ColorRange = {
  50: "#DCD5FF",
  100: "#D4CAFF",
  200: "#D6CEFF",
  300: "#857BB3",
  400: "#625A88",
  500: "#7367A6",
  600: "#2E3844",
  700: "#22242E",
  800: "#161621",
  900: "#0C0C11",
}

const primaryColor: ColorRange = {
  50: "#DBC4FF",
  100: "#CBAAFF",
  200: "#C19AFF",
  300: "#9E61FF",
  400: "#9250FC",
  500: "#8436F5",
  600: "#6B3EDB",
  700: "#6133D2",
  800: "#431DA0",
  900: "#070E50",
}

const successColor: ColorRange = {
  50: "#F0FAF7",
  100: "#DDF4EC",
  200: "#B7E7D6",
  300: "#90DBC0",
  400: "#5DFBD0",
  500: "#44C194",
  600: "#349E78",
  700: "#27785B",
  800: "#1A523E",
  900: "#0E2B21",
}

const warningColor: ColorRange = {
  50: "#FFF1D5",
  100: "#FFEAC0",
  200: "#FFE3AB",
  300: "#FFD482",
  400: "#FFC658",
  500: "#FFB82E",
  600: "#CC9325",
  700: "#996E1C",
  800: "#664A12",
  900: "#332509",
}

const specialPrimaryColor = "#d615eb"
const specialBlueColor = "#4490dc"
const specialTealColor = "#8DF7D2"

const createGradientSuccess = (deg = "90deg") => {
  return `linear-gradient(${deg}, 
    ${specialBlueColor} 0%,
    ${specialTealColor} 100%
  )`
}

const dark = ((): ColorSystemOptions => {
  const common: Partial<PaletteCommon> = {
    black: "#000000",
    white: "#FFFFFF",
  }

  const background: Partial<PaletteBackground> = {
    backdrop: "rgba(0 0 0 / 0.25)",
    body: "#161721",
    level1: neutralColor[800],
    level2: "#221F32",
    level3: neutralColor[700],
    level4: neutralColor[900],
    popup: common.black,
    spotlight1: "#211A33", // ???: update
    spotlight2: "#332C48", // ???: update
    surface: "#0D0B14",
    tooltip: neutralColor[600],
  }

  const text: Partial<PaletteText> = {
    primary: "#FFFFFF",
    secondary: "#71909F",
    tertiary: "#8F8D90",
    icon: "#71909F",
  }

  const danger: Partial<PaletteDanger> = {
    ...dangerColor,
    mainChannel: "229 57 53",
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
    mainChannel: "115 103 166",
    outlinedActiveBg: neutralColor[700],
    outlinedBorder: neutralColor[600],
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
    softBg: neutralColor[700],
    softColor: neutralColor[200],
    softDisabledBg: neutralColor[800],
    softDisabledColor: neutralColor[500],
    softHoverBg: neutralColor[600],
    solidActiveBg: "#675F6D",
    solidBg: "#807887",
    solidColor: common.white,
    solidDisabledBg: "#868388",
    solidDisabledColor: neutralColor[500], // ???: not set in figma
    solidHoverBg: "#9992A0",
  }

  const primary: Partial<PalettePrimary> = {
    ...primaryColor,
    mainChannel: "132 54 245",
    outlinedActiveBg: primaryColor[700],
    outlinedBorder: primaryColor[700],
    outlinedColor: primaryColor[50],
    outlinedDisabledBorder: neutralColor[800],
    outlinedDisabledColor: neutralColor[500],
    outlinedHoverBg: primaryColor[800],
    plainActiveBg: primaryColor[700],
    plainColor: primaryColor[300],
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
    mainChannel: "93 251 208",
    outlinedActiveBg: successColor[700],
    outlinedBorder: successColor[700],
    outlinedColor: successColor[200],
    outlinedDisabledBorder: neutralColor[800],
    outlinedDisabledColor: neutralColor[500],
    outlinedHoverBg: successColor[800],
    plainActiveBg: successColor[700],
    plainColor: successColor[500],
    plainDisabledColor: neutralColor[500],
    plainHoverBg: successColor[800],
    softActiveBg: successColor[500],
    softBg: successColor[800],
    softColor: successColor[200],
    softDisabledBg: neutralColor[800],
    softDisabledColor: neutralColor[500],
    softHoverBg: successColor[700],
    solidActiveBg: successColor[700],
    solidBg: "#1BB389",
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
      divider: neutral[600],
      gradient: {
        primary: `linear-gradient(90deg, 
          ${specialPrimaryColor} 0%,
          ${primaryColor[500]} 100%
        )`,
        success: createGradientSuccess(),
      },
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

const theme = extendTheme({
  cssVarPrefix: "",
  colorSchemes: {
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
      fontWeight: "var(--fontWeight-lg)",
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
      fontFamily: "Barlow Semi Condensed",
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
      fontFamily: "Barlow Semi Condensed",
    },
    "body-xs": {
      fontSize: "var(--fontSize-xs2)",
      fontWeight: "var(--fontWeight-md)",
      fontFamily: "Barlow Semi Condensed",
    },
    caption: {
      fontSize: "var(--fontSize-xs2)",
      fontWeight: "var(--fontWeight-md)",
    },
  },
  fontFamily: {
    body: "Montserrat",
    display: "Montserrat",
    fallback: "Montserrat",
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
          "& th": {
            borderBottom: `1px solid ${theme.vars.palette.divider}`,
          },
          "& tr:first-of-type td": {
            paddingTop: theme.spacing(2),
          },
        }),
      },
    },
    LevanaButtonSlider: {
      styleOverrides: {
        buttonGroup: ({ theme }) => ({
          "--ButtonGroup-radius": theme.vars.radius.sm,

          [`& .${buttonClasses.root}`]: {
            color: theme.vars.palette.text.primary,
          },
        }),
      },
    },
    LevanaFormInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--FormInput-fontSize": theme.vars.fontSize.lg,
          "--FormInput-fontWeight": "initial",
          "--FormInput-lineHeight": "2.25rem",
          "--FormInputPrefix-fontSize": theme.vars.fontSize.sm,
          "--FormInputPrefix-fontWeight": "initial",
          "--FormInputSuffix-fontSize": theme.vars.fontSize.sm,
          "--FormInputSuffix-fontWeight": "initial",

          [`& .${typographyClasses.root}`]: {
            justifyContent: "right",
            alignItems: "center",
          },
        }),
        input: {
          "--FormInput-gap": "4px",
          [`& > * > .${typographyClasses.root}`]: {
            justifyContent: "right",
          },
          [`& .${inputClasses.input}`]: {
            textAlign: "right",
          },
        },
      },
    },
    LevanaFormToggleInput: {
      defaultProps: {
        slotProps: {
          toggle: {
            variant: "plain",
          },
        },
        sx: () => ({
          p: 0,
          "& > .input": {
            pt: 0.5,
          },
          "& > .label": {
            pb: 1,
          },
        }),
      },
      styleOverrides: {
        input: {
          "--FormInput-gap": "8px",
          [`& > * > .${typographyClasses.root}`]: {
            justifyContent: "right",
          },
          [`& .${inputClasses.input}`]: {
            textAlign: "right",
          },
        },
        label: ({ theme }) => ({
          justifyContent: "right",
          fontSize: theme.vars.fontSize.xs3,
        }),
        toggle: ({ theme }) => ({
          "& > svg": {
            fontSize: theme.fontSize.xl4,
          },
        }),
      },
    },
    LevanaNavigationModal: {
      defaultProps: {
        slotProps: {
          dialog: {
            slotProps: {
              root: {
                sx: () => ({
                  backgroundColor: "#22242fd9",
                  rowGap: "0.5rem",
                }),
              },
              header: {
                sx: ({ vars, typography, spacing }) => ({
                  [`& > h3.${typographyClasses.root}`]: {
                    fontSize: vars.fontSize.xl5,
                    fontWeight: "unset",
                    textAlign: "left",
                    "& > div": {
                      display: "none",
                    },
                  },
                  "& > button": {
                    ...typography.caption,
                    "--Icon-fontSize": "28px",
                    "--Icon-color": vars.palette.text.primary,
                    fontWeight: vars.fontWeight.lg,
                    top: spacing(-4),
                    border: "none",
                    p: 0,
                    color: vars.palette.text.primary,
                    "&:hover": {
                      color: specialPrimaryColor,
                      backgroundColor: "unset",
                    },
                    "&:after": {
                      display: "block",
                      content: "'Back'",
                    },
                    "& > svg": {
                      pr: 1,
                    },
                  },
                  [`& > .${modalCloseClasses.root}`]: {
                    right: spacing(1),
                    "&:after": {
                      display: "block",
                      content: "'Close'",
                    },
                  },
                }),
              },
            },
          },
        },
      },
    },
    LevanaNavigationModalDialog: {
      defaultProps: {
        centerBreakpoint: "xs",
      },
    },
    LevanaNavigationModalFooter: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginLeft: "calc(var(--ModalContent-horizontalPadding) * -1)",
          marginBottom: "calc(var(--ModalContent-horizontalPadding) * -1)",
          marginRight: "calc(var(--ModalContent-horizontalPadding) * -1)",
          backgroundColor: theme.vars.palette.background.body,
          padding: theme.spacing(2, 3),
          borderBottomLeftRadius: theme.vars.radius.lg,
          borderBottomRightRadius: theme.vars.radius.lg,
          flexDirection: "row-reverse",
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
            fontWeight: theme.vars.fontWeight.lg,
          }),
          ...(ownerState.size === "md" && {
            paddingInline: "0.75rem",
            fontSize: theme.vars.fontSize.xs,
            fontWeight: theme.vars.fontWeight.lg,
          }),
          ...(ownerState.size === "lg" && {
            paddingInline: "1.5rem",
            borderRadius: theme.vars.radius.md,
            fontSize: theme.vars.fontSize.sm,
            fontWeight: theme.vars.fontWeight.lg,
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

          ...(ownerState["data-special"] === true && {
            "--variant-solidDisabledColor": theme.vars.palette.text.primary,
            ...(ownerState.disabled && {
              opacity: 0.5,
            }),
            ...(ownerState.color === "success" && {
              background: theme.palette.gradient.success,
              "&:hover": {
                background: specialBlueColor,
              },
            }),
            ...(ownerState.color === "primary" && {
              background: theme.palette.gradient.primary,
              // "&:hover": {
              //   background: specialBlueColor,
              // },
            }),
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
            "--Icon-color": theme.vars.palette.text.icon,
            "&:hover": {
              opacity: 0.75,
            },
            "&:active": {
              opacity: 0.5,
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
    JoyDrawer: {
      styleOverrides: {
        content: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.body,
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
          // Override rujira.ui global styles
          "&.toggle:before": {
            display: "none",
          },
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
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "soft" && {
            "--ListItem-paddingLeft": "0px",
            "--ListItem-paddingRight": "0px",
            "--ListItem-marginInline": "0.5rem",
            "--ListItem-startActionWidth": "0.5rem",
            "--ListItem-endActionWidth": "0.5rem",
            marginInlineStart: 0,
          }),
        }),
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "outlined" && {
            "--variant-borderWidth": "2px",
            borderRadius: theme.vars.radius.md,
          }),
        }),
      },
    },
    JoyMenu: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--variant-borderWidth": "0px",
          backgroundColor: theme.vars.palette.background.body,
          [`& .${listDividerClasses.root}`]: {
            display: "none",
          },
          [`& .${listItemDecoratorClasses.root}`]: {
            display: "none",
          },
        }),
      },
    },
    JoyMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--background-color": "#71909f1f",
          "--ListItem-minHeight": "0px",
          "--variant-plainColor": theme.vars.palette.text.secondary,
          "--variant-plainHoverColor": theme.vars.palette.text.primary,
          "--variant-plainHoverBg": "var(--background-color)",
          backgroundColor: "var(--background-color)",
        }),
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: ({ theme }) => ({
          "--ModalDialog-maxWidth": "550px",
          "--ModalDialog-minWidth": "550px",
          "--ModalDialog-radius": theme.vars.radius.xl,
          "--ModalContent-maxWidth":
            "calc(var(--ModalDialog-maxWidth) - (var(--ModalContent-padding) * 2))",
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
        root: ({ ownerState, theme }) => ({
          "--Slider-railBackground": theme.vars.palette.background.level3,
          "--Slider-thumbBackground": "var(--Slider-railBackground)",
          "--Slider-thumbWidth": theme.spacing(2),
          "--Slider-thumbSize": theme.spacing(2),

          [`&.${sliderClasses.disabled}, &:hover, &:active`]: {
            "--Slider-railBackground": theme.vars.palette.background.level3,
          },

          [`&.${sliderClasses.sizeLg}`]: {
            "--Slider-trackSize": "4px",
          },

          ...(ownerState["data-special"] === true && {
            "--variant-solidBg": specialTealColor,
            "--Slider-thumbBackground": specialTealColor,
            "--Slider-trackBackground": createGradientSuccess(),
            [`&:not(.${sliderClasses.disabled}) .${sliderClasses.track}`]: {
              "&[style*='right:']": {
                "--Slider-trackBackground": createGradientSuccess("270deg"),
              },
            },
            "&:hover": {
              "--Slider-trackBackground": createGradientSuccess(),
              [`& .${sliderClasses.track}`]: {
                opacity: 0.75,
                "&[style*='right:']": {
                  "--Slider-trackBackground": createGradientSuccess("270deg"),
                },
              },
            },
            "&:active": {
              "--Slider-trackBackground": createGradientSuccess(),
              [`& .${sliderClasses.track}`]: {
                opacity: 0.5,
                "&[style*='right:']": {
                  "--Slider-trackBackground": createGradientSuccess("270deg"),
                },
              },
            },
          }),
        }),
        track: {
          background: "var(--Slider-trackBackground)",
          "&[style*='right:']": {
            borderRadius:
              "0 var(--Slider-trackRadius) var(--Slider-trackRadius) 0",
          },
        },
        thumb: {
          "&:before": {
            borderWidth: 0,
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
    JoyTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "unset",
        },
      },
    },
    JoyTab: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          "--variant-plainColor": theme.vars.palette.text.secondary,
          "--variant-plainHoverColor": "#90A4AE",
          "--ListItem-paddingX": "1rem",
          "--ListItem-paddingY": "0",
          "--ListItem-minHeight": "2rem",
          "--Tab-indicatorThickness": "0",
          borderRadius: "2rem",
          flexShrink: 0,
          ...(ownerState.selected && {
            "--variant-plainColor": theme.vars.palette.text.primary,
          }),
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
          ...(ownerState.variant === "soft" && {
            "--variant-borderWidth": "2px",
            "--ToggleButtonGroup-gap": "var(--variant-borderWidth)",
            "--ToggleButtonGroup-radius": "2rem",
            "--ButtonGroup-separatorSize": "0",
            gap: "calc(2 * var(--ToggleButtonGroup-gap))",
            [`& .${buttonClasses.root}`]: {
              "--Button-radius": "var(--ToggleButtonGroup-radius)",
              "--variant-softBg": "transparent",
              "--variant-softHoverBg": theme.vars.palette.neutral.plainHoverBg,
              "--unstable_childRadius": "var(--ToggleButtonGroup-radius)",
              border: 0,
            },
            [`& .${buttonClasses.root}[aria-pressed=true]`]: {
              backgroundColor: theme.vars.palette.background.level3,
            },
            [`& .${buttonClasses.root}[aria-pressed=false], & .${buttonClasses.root}[aria-pressed=false] svg`]:
              {
                color: theme.vars.palette.text.secondary,
              },
          }),
          ...(ownerState.variant === "outlined" && {
            "--ButtonGroup-separatorColor": "none",
            "--ButtonGroup-separatorSize": "0",
            "--variant-outlinedBorder": theme.vars.palette.divider,
            "--active-color": "113, 144, 159",
            [`& > .${buttonClasses.root}`]: {
              '&[aria-pressed="true"]': {
                "--variant-outlinedColor": "rgb(var(--active-color))",
                border:
                  "var(--variant-borderWidth) solid rgb(var(--active-color))",
                backgroundColor: "rgba(var(--active-color), 0.1)",
              },
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
