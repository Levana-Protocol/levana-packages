import Box, { type BoxProps } from "@mui/joy/Box"
import { buttonClasses } from "@mui/joy/Button"
import Typography from "@mui/joy/Typography"
import { checkboxClasses } from "@mui/joy/Checkbox"
import Stack from "@mui/joy/Stack"
import { styled, type Theme } from "@mui/joy/styles"
import type { Breakpoint } from "@mui/system/createTheme"
import type { SystemStyleObject } from "@mui/system/styleFunctionSx"
import type React from "react"
import { Fragment } from "react"

import HelperButton, { type HelperButtonModalProps } from "./HelperButton"

type AdaptiveListHelperButtonAction =
  | {
      /**
       * The `itemIndex` will not exist for the table layout
       */
      onClick: (itemIndex?: number) => void
    }
  | { modal: HelperButtonModalProps }

export interface AdaptiveListSection<Id extends string> {
  id: Id
  title?: string
  helper?: AdaptiveListHelperButtonAction
}

export interface AdaptiveListItem {
  hideContentTitle?: boolean
  width?: ResponsiveItemWidthProps
  cell: React.ReactNode
}

export interface AdaptiveListFooterItem {
  cell: React.ReactNode
}

export interface AdaptiveListProps<Id extends string>
  extends Partial<AdaptiveListOwnerState>,
    Pick<BoxProps, "sx"> {
  /**
   * The sections are like table headers.
   *
   * The order of the sections will determine the order of the items.
   */
  sections: AdaptiveListSection<Id>[]
  /**
   * The items can be thought of as table rows.
   */
  items: (Record<Id, AdaptiveListItem> & AdaptiveListReservedItem)[]
}

interface AdaptiveListReservedItem {
  /**
   * Display an item footer
   *
   * If this key is not set or its `cell` property is nullish, than the footer
   * will not display.
   */
  footer?: AdaptiveListFooterItem
  onClick?: () => void
}

interface AdaptiveListOwnerState {
  /**
   * The min breakpoint for the table layout
   *
   * @default lg
   */
  minTableLayout: Breakpoint
}

interface AdaptiveListContentOwnerState extends AdaptiveListOwnerState {
  hasOnClick: boolean
}

const name = "LevanaAdaptiveList"

const AdaptiveListRoot = styled("table", {
  name,
  slot: "root",
})<{ ownerState: AdaptiveListOwnerState }>(({ theme, ownerState }) => ({
  "--AdaptiveList-columnGap": theme.spacing(1),
  "--AdaptiveList-rowGap": theme.spacing(1),
  "--AdaptiveList-padding": theme.spacing(2),
  [theme.breakpoints.down(ownerState.minTableLayout)]: {
    "&, & tbody": {
      display: "block",
    },
    "& tbody .content": {
      paddingTop: "var(--AdaptiveList-padding)",
      paddingLeft: "var(--AdaptiveList-padding)",
      paddingRight: "var(--AdaptiveList-padding)",
    },
    "& tbody .footer td > *": {
      paddingLeft: "var(--AdaptiveList-padding)",
      paddingRight: "var(--AdaptiveList-padding)",
    },
  },
  [theme.breakpoints.up(ownerState.minTableLayout)]: {
    display: "table",
    borderCollapse: "separate",
    borderSpacing: 0,
    width: "100%",
    "& thead tr, & tbody .content, & tbody .footer td": {
      "& > *": {
        paddingRight: "var(--AdaptiveList-columnGap)",
      },
      "& > :first-of-type": {
        paddingLeft: "var(--AdaptiveList-padding)",
      },
      "& > :last-of-type": {
        paddingRight: "var(--AdaptiveList-padding)",
      },
    },
    "& thead th": {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      textAlign: "left",
    },
    "& tbody .content td": {
      paddingTop: "var(--AdaptiveList-padding)",
    },
  },
  "& th, & td": {
    padding: 0,
  },
  "& tbody .footer td": {
    paddingBottom: "var(--AdaptiveList-rowGap)",
    "& > *": {
      paddingBottom: "var(--AdaptiveList-padding)",
      "&:has(:first-of-type)": {
        paddingTop: "var(--AdaptiveList-padding)",
      },
    },
  },
}))

const AdaptiveListTitle = styled(Typography, {
  name,
  slot: "title",
})(({ theme }) => ({
  ...theme.typography["body-xs"],
  color: theme.vars.palette.text.secondary,
}))

const AdaptiveListRowContent = styled("tr", {
  name,
  slot: "rowContent",
})<{ ownerState: AdaptiveListContentOwnerState }>(({ theme, ownerState }) => ({
  position: "relative",
  [theme.breakpoints.down(ownerState.minTableLayout)]: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: theme.vars.palette.background.level1,
    rowGap: theme.spacing(3),
    columnGap: "var(--AdaptiveList-columnGap)",
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    ...(ownerState.hasOnClick && {
      "&:hover, &:hover + .footer td > *, &:has(+ .footer:hover)": {
        cursor: "pointer",
        backgroundColor: theme.vars.palette.background.level2,
      },
    }),
    "& td": {
      position: "relative",
    },
  },
  [theme.breakpoints.up(ownerState.minTableLayout)]: {
    display: "table-row",
    "& td": {
      display: "table-cell",
      backgroundColor: theme.vars.palette.background.level1,
      verticalAlign: "middle",
      "&:first-of-type": {
        borderTopLeftRadius: theme.radius.md,
      },
      "&:last-of-type": {
        borderTopRightRadius: theme.radius.md,
      },
      [`&:has(.${checkboxClasses.root}, .${buttonClasses.root})`]: {
        position: "relative",
      },
    },
    ...(ownerState.hasOnClick && {
      "&:hover td, &:hover + .footer td > *, &:has(+ .footer:hover) td": {
        cursor: "pointer",
        backgroundColor: theme.vars.palette.background.level2,
      },
    }),
  },
}))

const AdaptiveListRowFooter = styled("tr", {
  name,
  slot: "rowFooter",
})<{ ownerState: AdaptiveListContentOwnerState }>(({ theme, ownerState }) => ({
  "& td > *": {
    backgroundColor: theme.vars.palette.background.level1,
    borderBottomLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
  },
  [theme.breakpoints.down(ownerState.minTableLayout)]: {
    display: "flex",
    "& td": {
      display: "block",
      width: "100%",
    },
  },
  [theme.breakpoints.up(ownerState.minTableLayout)]: {
    display: "table-row",
    "& td": {
      display: "table-cell",
    },
  },
  ...(ownerState.hasOnClick && {
    "&:hover td > *": {
      cursor: "pointer",
      backgroundColor: theme.vars.palette.background.level2,
    },
  }),
}))

const AdaptiveListStack = styled(Stack, {
  name,
  slot: "stack",
})(({ theme }) => ({
  height: "100%",
  [`& > .${checkboxClasses.root}`]: {
    height: "100%",
    alignItems: "center",
    [`& .${checkboxClasses.checkbox}`]: {
      "--variant-borderWidth": theme.spacing(1),
    },
  },
}))

const AdaptiveList = <Id extends string>(props: AdaptiveListProps<Id>) => {
  const { sections, items, minTableLayout = "lg", sx } = props
  const ownerState = { minTableLayout }

  const sectionForId = (id: string) => {
    return sections.find((section) => section.id === id)
  }

  return (
    <AdaptiveListRoot ownerState={ownerState} sx={sx}>
      <Box
        component="thead"
        sx={({ vars }) => ({
          display: {
            xs: "none",
            [minTableLayout]: "table-header-group",
          },
          position: "sticky",
          top: 0,
          backgroundColor: vars.palette.background.body,
          zIndex: 10,
        })}
      >
        <Box component="tr">
          {sections.map((section) => (
            <Box key={section.id} component="th">
              <AdaptiveListTitle
                endDecorator={<AdaptiveListHelperButton section={section} />}
              >
                {section.title}
              </AdaptiveListTitle>
            </Box>
          ))}
        </Box>
      </Box>
      <Box component="tbody">
        {items.map((item, index) => (
          <Fragment key={index}>
            <AdaptiveListRowContent
              className={`content item-${index}`}
              ownerState={contentOwnerState(ownerState, item)}
              onClick={(event) => handleItemClick(event, item)}
            >
              {contentItemKeys(item, sections).map((id) => (
                <AdaptiveListCellContainer
                  key={id}
                  section={sectionForId(id)}
                  itemIndex={index}
                  minTableLayout={minTableLayout}
                  {...item[id as keyof typeof item]}
                />
              ))}
            </AdaptiveListRowContent>
            <AdaptiveListRowFooter
              className={`footer item-${index}`}
              ownerState={contentOwnerState(ownerState, item)}
              onClick={(event) => handleItemClick(event, item)}
            >
              <Box component="td" colSpan={Object.keys(item).length}>
                {<Box>{item.footer?.cell}</Box>}
              </Box>
            </AdaptiveListRowFooter>
          </Fragment>
        ))}
      </Box>
    </AdaptiveListRoot>
  )
}

interface AdaptiveListHelperButtonProps {
  section: AdaptiveListSection<string>
  itemIndex?: number
}

const AdaptiveListHelperButton = (props: AdaptiveListHelperButtonProps) => {
  const { section, itemIndex } = props
  const { helper } = section

  if (!helper) {
    return null
  }

  return (
    <HelperButton
      aria-label={`${section.id} helper`}
      {...("modal" in helper
        ? { modal: helper.modal }
        : { onClick: () => helper.onClick(itemIndex) })}
    />
  )
}

type AdaptiveListCellContainerProps = AdaptiveListItem &
  Pick<AdaptiveListOwnerState, "minTableLayout"> & {
    section: AdaptiveListSection<string> | undefined
    itemIndex: number
  }

const AdaptiveListCellContainer = (props: AdaptiveListCellContainerProps) => {
  const { width = {}, hideContentTitle = false, minTableLayout } = props

  return (
    <Box component="td" sx={responsiveItemWidth(width)}>
      <AdaptiveListStack
        sx={{
          flexDirection: { xs: "column", [minTableLayout]: "unset" },
          alignItems: { [minTableLayout]: "center" },
        }}
      >
        {props.section?.title && !hideContentTitle && (
          <AdaptiveListTitle
            endDecorator={
              <AdaptiveListHelperButton
                section={props.section}
                itemIndex={props.itemIndex}
              />
            }
            sx={{ display: { [minTableLayout]: "none" } }}
          >
            {props.section.title}
          </AdaptiveListTitle>
        )}
        {props.cell}
      </AdaptiveListStack>
    </Box>
  )
}

type ResponsiveItemLayout = number | string | { fills: number; total: number }

type ResponsiveItemWidthProps = Partial<
  Record<Breakpoint, ResponsiveItemLayout>
>

const responsiveItemWidth = (
  props: ResponsiveItemWidthProps,
): ((theme: Theme) => SystemStyleObject<Theme>) => {
  const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"]

  const calculateWidth = (layout: ResponsiveItemLayout) => {
    if (typeof layout === "string" || typeof layout === "number") {
      return layout
    }

    const f = layout.fills
    const t = layout.total
    const g = "var(--AdaptiveList-columnGap)"
    return `calc((100% - (${g} * ${t - 1})) * ${f / t} + (${g} * ${f - 1}))`
  }

  return () => {
    const width: Partial<Record<Breakpoint, string | number>> = {}

    for (const breakpoint of breakpoints) {
      const layout = props[breakpoint]

      if (layout) {
        width[breakpoint] = calculateWidth(layout)
      }
    }

    return { width }
  }
}

const contentOwnerState = (
  ownerState: AdaptiveListOwnerState,
  item: AdaptiveListReservedItem,
): AdaptiveListContentOwnerState => {
  return {
    ...ownerState,
    hasOnClick: item.onClick !== undefined,
  }
}

const contentItemKeys = (
  items: Record<string, unknown> & AdaptiveListReservedItem,
  sections: AdaptiveListSection<string>[],
) => {
  // Remove reserved keys from the `otherItems`
  const { footer: _1, onClick: _2, ...otherItems } = items
  return Object.keys(otherItems)
    .filter((key) => {
      return sections.find((section) => section.id === key)
    })
    .sort((aId, bId) => {
      const aIndex = sections.findIndex((section) => section.id === aId)
      const bIndex = sections.findIndex((section) => section.id === bId)
      return aIndex - bIndex
    })
}

const handleItemClick = (
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  item: AdaptiveListReservedItem,
) => {
  if (!item.onClick) {
    return
  }

  if (event.target instanceof Element) {
    const { tagName } = event.target

    if (!["A", "BUTTON", "INPUT"].includes(tagName)) {
      item.onClick()
    }
  }
}

export default AdaptiveList
