import Box, { type BoxProps } from "@mui/joy/Box"
import { buttonClasses } from "@mui/joy/Button"
import { checkboxClasses } from "@mui/joy/Checkbox"
import Stack from "@mui/joy/Stack"
import SvgIcon, { type SvgIconProps } from "@mui/joy/SvgIcon"
import Typography from "@mui/joy/Typography"
import { type Theme, styled } from "@mui/joy/styles"
import type { Breakpoint } from "@mui/system/createTheme"
import type { SystemStyleObject } from "@mui/system/styleFunctionSx"
import type React from "react"
import { Fragment, useEffect, useState } from "react"

import { IconButton } from "@mui/joy"
import HelperButton, { type HelperButtonModalProps } from "./HelperButton"

type AdaptiveListHelperButtonAction =
  | {
      /**
       * The `itemIndex` will not exist for the table layout.
       */
      onClick: (itemIndex?: number) => void
    }
  | { modal: HelperButtonModalProps }

export interface AdaptiveListSortSection {
  /**
   * Indicate this section to be active
   *
   * Only the active sort section should have a truthy value.
   * If the value is `ascending`, an up arrow will be highlighted.
   * If the value is `desending`, a down arrow will be highlighted.
   * If the value is `true`, both arrows will be highlighted.
   */
  indicator?: boolean | "ascending" | "descending"
  /**
   * Is this section bi directional or uni directional
   *
   * @default true
   */
  biDirectional?: boolean
  onSort: (ascending: boolean) => void
}

export interface AdaptiveListSection<Id extends string> {
  id: Id
  title?: string
  helper?: AdaptiveListHelperButtonAction
  /**
   * Sort by a section
   *
   * Setting this value will add a sort button next to the title. This is only
   * for the table layout.
   */
  sort?: AdaptiveListSortSection
}

export interface AdaptiveListItem {
  /**
   * Hide the title when in the card layout.
   */
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
  selected?: boolean
  onClick?: () => void
}

interface AdaptiveListOwnerState {
  /**
   * The min breakpoint for the table layout. Anything below that will use the
   * card layout.
   *
   * @default lg
   */
  minTableLayout: Breakpoint
}

interface AdaptiveListContentOwnerState extends AdaptiveListOwnerState {
  isSelected: boolean
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
  "--AdaptiveList-backgroundColor": theme.vars.palette.background.level1,
  "--AdaptiveList-hoverBackgroundColor":
    theme.vars.palette.neutral.plainHoverBg,
  "--AdaptiveList-selectedBackgroundColor":
    theme.vars.palette.neutral.plainActiveBg,
  "--AdaptiveList-headerBackgroundColor": theme.vars.palette.background.body,
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
      height: theme.spacing(6),
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
  whiteSpace: "pre-line",
  lineHeight: theme.vars.lineHeight.xs,
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
    backgroundColor: "var(--AdaptiveList-backgroundColor)",
    rowGap: theme.spacing(3),
    columnGap: "var(--AdaptiveList-columnGap)",
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    ...(ownerState.isSelected && {
      backgroundColor: "var(--AdaptiveList-selectedBackgroundColor)",
    }),
    ...(ownerState.hasOnClick && {
      "&:hover, &:hover + .footer td > *, &:has(+ .footer:hover)": {
        cursor: "pointer",
        backgroundColor: "var(--AdaptiveList-hoverBackgroundColor)",
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
      backgroundColor: "var(--AdaptiveList-backgroundColor)",
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
      ...(ownerState.isSelected && {
        backgroundColor: "var(--AdaptiveList-selectedBackgroundColor)",
      }),
    },
    ...(ownerState.hasOnClick && {
      "&:hover td, &:hover + .footer td > *, &:has(+ .footer:hover) td": {
        cursor: "pointer",
        backgroundColor: "var(--AdaptiveList-hoverBackgroundColor)",
      },
    }),
  },
}))

const AdaptiveListRowFooter = styled("tr", {
  name,
  slot: "rowFooter",
})<{ ownerState: AdaptiveListContentOwnerState }>(({ theme, ownerState }) => ({
  "& td > *": {
    backgroundColor: "var(--AdaptiveList-backgroundColor)",
    borderBottomLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    ...(ownerState.isSelected && {
      backgroundColor: "var(--AdaptiveList-selectedBackgroundColor)",
    }),
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
      backgroundColor: "var(--AdaptiveList-hoverBackgroundColor)",
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
        sx={{
          display: {
            xs: "none",
            [minTableLayout]: "table-header-group",
          },
          position: "sticky",
          top: 0,
          backgroundColor: "var(--AdaptiveList-headerBackgroundColor)",
          zIndex: 10,
        }}
      >
        <AdaptiveListTableHeader sections={sections} />
      </Box>
      <Box component="tbody">
        {items.map((item, index) => (
          <Fragment key={index}>
            <AdaptiveListRowContent
              className={`content item-${index}`}
              ownerState={contentOwnerState(ownerState, item)}
              onClick={(event) => handleItemClick(event, item)}
            >
              {contentItemEntries(item, sections).map(([id, value]) => (
                <AdaptiveListCellContainer
                  key={id}
                  section={sectionForId(id)}
                  itemIndex={index}
                  minTableLayout={minTableLayout}
                  {...value}
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

interface AdaptiveListSortData {
  sectionId: string
  ascending: boolean
}

interface AdaptiveListTableHeaderProps<Id extends string> {
  sections: AdaptiveListProps<Id>["sections"]
}

const AdaptiveListTableHeader = <Id extends string>(
  props: AdaptiveListTableHeaderProps<Id>,
) => {
  const sortDataState = useState<AdaptiveListSortData>()

  return (
    <Box component="tr">
      {props.sections.map((section) => (
        <Box key={section.id} component="th">
          <AdaptiveListTitle
            endDecorator={
              <>
                <AdaptiveListHelperButton section={section} />
                <AdaptiveListSortButton
                  section={section}
                  sortDataState={sortDataState}
                />
              </>
            }
            slotProps={{
              endDecorator: {
                sx: {
                  alignItems: "center",
                },
              },
            }}
          >
            {section.title}
          </AdaptiveListTitle>
        </Box>
      ))}
    </Box>
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

interface AdaptiveListSortButtonProps {
  section: AdaptiveListSection<string>
  sortDataState: ReturnType<typeof useState<AdaptiveListSortData>>
}

const AdaptiveListSortButton = (props: AdaptiveListSortButtonProps) => {
  const { section } = props
  const { id, sort } = section
  const [sortData, setSortData] = props.sortDataState

  useEffect(() => {
    if (sort?.indicator) {
      setSortData({
        sectionId: id,
        ascending: sort.indicator !== "descending",
      })
    }
  }, [id, sort?.indicator, setSortData])

  if (!sort) {
    return null
  }

  const sortState =
    sortData?.sectionId === id
      ? sort.biDirectional
        ? sortData.ascending
          ? "ascending"
          : "descending"
        : "both"
      : "none"

  const handleSort = () => {
    let sortAscending = sortData?.ascending ?? true

    if (sortData?.sectionId === id && sort.biDirectional) {
      sortAscending = !sortAscending
    } else {
      sortAscending = true
    }

    sort.onSort(sortAscending)
  }

  return (
    <IconButton
      size="sm"
      onClick={handleSort}
      sx={({ vars }) => ({
        position: "relative",
        "& > *": {
          position: "absolute",
          color: vars.palette.text.secondary,
        },
      })}
    >
      <SortUpArrow
        sx={
          sortState === "ascending" || sortState === "both"
            ? ({ vars }) => ({ color: vars.palette.text.primary })
            : undefined
        }
      />
      <SortDownArrow
        sx={
          sortState === "descending" || sortState === "both"
            ? ({ vars }) => ({ color: vars.palette.text.primary })
            : undefined
        }
      />
    </IconButton>
  )
}

const SortUpArrow = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path d="M5.96667 6.03332L5 5.06665L8 2.06665L11 5.06665L10.0333 6.03332L8 3.99998L5.96667 6.03332Z" />
    </SvgIcon>
  )
}

const SortDownArrow = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 16 16">
      <path d="M5 11L8 14L11 11L10.0333 10.0333L8 12.0667L5.96667 10.0333L5 11Z" />
    </SvgIcon>
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
    isSelected: item.selected === true,
    hasOnClick: item.onClick !== undefined,
  }
}

const contentItemEntries = (
  items: Record<string, AdaptiveListItem> & AdaptiveListReservedItem,
  sections: AdaptiveListSection<string>[],
): [string, AdaptiveListItem][] => {
  // Remove reserved keys from the `otherItems`
  const { footer: _1, selected: _2, onClick: _3, ...otherItems } = items
  return Object.entries(otherItems)
    .filter(([key]) => {
      return sections.find((section) => section.id === key)
    })
    .sort(([aId], [bId]) => {
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
