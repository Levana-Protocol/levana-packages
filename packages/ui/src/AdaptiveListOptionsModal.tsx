import Button from "@mui/joy/Button"
import Chip from "@mui/joy/Chip"
import Stack from "@mui/joy/Stack"
import Select from "@mui/joy/Select"
import SvgIcon, { type SvgIconProps } from "@mui/joy/SvgIcon"
import Option from "@mui/joy/Option"
import Typography from "@mui/joy/Typography"
import { type PropsWithChildren, useState, useEffect, useRef } from "react"
import type Sortable from "sortablejs"
import { deepCopy } from "@levana/utils/object"

import NavigationModal, { NavigationModalDynamicItem } from "./NavigationModal"

export interface AdaptiveListOptionsItem<Id extends string> {
  id: Id
  title: string
}

export interface AdaptiveListOptionsTag<TagId extends string>
  extends AdaptiveListOptionsItem<TagId> {
  selected?: boolean
  disabled?: boolean
  arrangeable?: boolean
}

interface AdaptiveListOptionsTagsOption<TagId extends string> {
  title?: string
  all: AdaptiveListOptionsTag<TagId>[]
}

interface AdaptiveListOptionsDropdownOption<DropdownId extends string> {
  title?: string
  all: AdaptiveListOptionsItem<DropdownId>[]
  selected: DropdownId
}

export type AdaptiveListOptionsUpdateTag<TagId extends string> = Pick<
  Required<AdaptiveListOptionsTag<TagId>>,
  "id" | "selected"
>

interface AdaptiveListOptionsLocale {
  locale?: {
    apply?: string
    reset?: string
    filterBy?: string
    sortBy?: string
  }
}

export interface AdaptiveListOptionsModalProps<
  TagId extends string,
  DropdownId extends string,
> extends AdaptiveListOptionsLocale {
  id: string
  tags: AdaptiveListOptionsTagsOption<TagId>
  dropdown: AdaptiveListOptionsDropdownOption<DropdownId>
  onUpdate: (
    tags: AdaptiveListOptionsUpdateTag<TagId>[],
    dropdown: DropdownId,
  ) => void
  onReset: () => void
  onIsDirty?: () => boolean
}

const AdaptiveListOptionsModal = <
  TagId extends string,
  DropdownId extends string,
>(
  props: PropsWithChildren<AdaptiveListOptionsModalProps<TagId, DropdownId>>,
) => {
  const tagsOption = useTagsOption(props.tags)
  const dropdownOption = useDropdownOption(props.dropdown)

  const isDirty =
    tagsOption.isDirty ||
    dropdownOption.isDirty ||
    (props.onIsDirty?.() ?? false)

  return (
    <NavigationModal rootId={props.id}>
      {(modal) => (
        <NavigationModalDynamicItem id={props.id} canClose>
          <Stack spacing={3}>
            {tagsOption.all.length > 0 && (
              <TagsOption locale={props.locale} {...tagsOption} />
            )}
            {dropdownOption.all.length > 0 && (
              <DropdownOption locale={props.locale} {...dropdownOption} />
            )}
            {props.children}
            <Stack direction="column" spacing={1}>
              <Button
                variant="solid"
                color="primary"
                fullWidth
                disabled={!isDirty}
                onClick={() => {
                  props.onUpdate(
                    tagsOption.sessionAll,
                    dropdownOption.sessionSelected,
                  )
                  modal.close()
                }}
              >
                {props.locale?.apply ?? "Apply"}
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                fullWidth
                onClick={() => {
                  props.onReset()
                  modal.close()
                }}
              >
                {props.locale?.reset ?? "Reset"}
              </Button>
            </Stack>
          </Stack>
        </NavigationModalDynamicItem>
      )}
    </NavigationModal>
  )
}

const useTagsOption = <TagId extends string>(
  tags: AdaptiveListOptionsTagsOption<TagId>,
) => {
  const [sessionAll, setSessionAll] = useState(
    tags.all.map((tag) => ({
      id: tag.id,
      selected: tag.selected ?? false,
    })),
  )

  const isArrangeable = tags.all.find((tag) => tag.arrangeable) !== undefined

  const handleToggle = (tagId: TagId) => {
    const all = deepCopy(sessionAll)
    const tag = all.find((tag) => tag.id === tagId)

    if (tag) {
      tag.selected = !tag.selected
      setSessionAll(all)
    }
  }

  const handleRearrange = (fromIndex: number, toIndex: number) => {
    if (Math.max(fromIndex, toIndex) > sessionAll.length) {
      return
    }

    const tags = deepCopy(sessionAll)
    const tag = tags.splice(fromIndex, 1)[0]
    tags.splice(toIndex, 0, tag)

    return setSessionAll(tags)
  }

  const isDirty = ((): boolean => {
    for (let i = 0; i < sessionAll.length; i += 1) {
      const sessionTag = sessionAll[i]
      const tag = tags.all[i]

      if (sessionTag.id !== tag.id) {
        return true
      }

      if (sessionTag.selected !== (tag.selected ?? false)) {
        return true
      }
    }

    return false
  })()

  return {
    ...tags,
    all: tags.all.filter((tag) => tag.title),
    sessionAll,
    handleToggle,
    handleRearrange,
    isDirty,
    isArrangeable,
  }
}

const TagsOption = <TagId extends string>(
  props: ReturnType<typeof useTagsOption<TagId>> & AdaptiveListOptionsLocale,
) => {
  const handleRearrangeRef = useRef(props.handleRearrange)
  useEffect(() => {
    handleRearrangeRef.current = props.handleRearrange
  }, [props.handleRearrange])

  useEffect(() => {
    if (!props.isArrangeable) {
      return
    }

    const element = document.getElementById("grid-items")

    if (element) {
      const lifecycle: {
        unmount: boolean
        sortable: ReturnType<(typeof Sortable)["create"]> | undefined
      } = { unmount: false, sortable: undefined }

      import("sortablejs").then((SortableJs) => {
        if (lifecycle.unmount) {
          return
        }

        lifecycle.sortable = SortableJs.default.create(element, {
          draggable: ".draggable",
          delay: 50,
          delayOnTouchOnly: true,
          onEnd: (event) => {
            if (event.oldIndex !== undefined && event.newIndex !== undefined) {
              handleRearrangeRef.current(event.oldIndex, event.newIndex)
            }
          },
        })
      })

      return () => {
        lifecycle.unmount = true
        lifecycle.sortable?.destroy()
        lifecycle.sortable = undefined
      }
    }
  }, [props.isArrangeable])

  return (
    <Stack spacing={0.5}>
      <Typography level="body-sm" textColor="text.secondary">
        {props.title ?? props.locale?.filterBy ?? "Filter by"}
      </Typography>
      <Stack
        id="grid-items"
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap" }}
      >
        {props.all.map((tag) => (
          <Chip
            key={tag.id}
            size="lg"
            variant={
              tag.disabled
                ? "plain"
                : props.sessionAll.find(
                      (sessionTag) => sessionTag.id === tag.id,
                    )?.selected
                  ? "soft"
                  : "outlined"
            }
            disabled={tag.disabled}
            startDecorator={
              tag.arrangeable ? (
                <ArrangeIcon
                  sx={(theme) => ({
                    fontSize: theme.vars.fontSize.xs,
                    color: theme.vars.palette.text.tertiary,
                  })}
                />
              ) : undefined
            }
            onClick={() => props.handleToggle(tag.id)}
            className={tag.arrangeable ? "draggable" : undefined}
            sx={(theme) => ({
              "--Chip-minHeight": theme.spacing(4.5),
              "--variant-plainDisabledColor": theme.vars.palette.text.secondary,
            })}
          >
            {tag.title}
          </Chip>
        ))}
      </Stack>
    </Stack>
  )
}

const useDropdownOption = <DropdownId extends string>(
  dropdown: AdaptiveListOptionsDropdownOption<DropdownId>,
) => {
  const [sessionSelected, setSessionSelected] = useState(dropdown.selected)

  const handle = (dropdownId: DropdownId) => {
    setSessionSelected(dropdownId)
  }

  const isDirty = sessionSelected !== dropdown.selected

  return {
    ...dropdown,
    sessionSelected,
    handle,
    isDirty,
  }
}

const DropdownOption = <DropdownId extends string>(
  props: ReturnType<typeof useDropdownOption<DropdownId>> &
    AdaptiveListOptionsLocale,
) => {
  return (
    <Stack spacing={0.5}>
      <Typography level="body-sm" textColor="text.secondary">
        {props.locale?.sortBy ?? "sort by"}
      </Typography>
      <Select
        defaultValue={props.selected}
        onChange={(_event, dropdown) => {
          if (dropdown) {
            props.handle(dropdown)
          }
        }}
      >
        {props.all.map(({ id, title }) => (
          <Option key={id} value={id}>
            {title}
          </Option>
        ))}
      </Select>
    </Stack>
  )
}

const ArrangeIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 10 16">
      <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM8 16C7.45 16 6.97917 15.8042 6.5875 15.4125C6.19583 15.0208 6 14.55 6 14C6 13.45 6.19583 12.9792 6.5875 12.5875C6.97917 12.1958 7.45 12 8 12C8.55 12 9.02083 12.1958 9.4125 12.5875C9.80417 12.9792 10 13.45 10 14C10 14.55 9.80417 15.0208 9.4125 15.4125C9.02083 15.8042 8.55 16 8 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM8 10C7.45 10 6.97917 9.80417 6.5875 9.4125C6.19583 9.02083 6 8.55 6 8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6C8.55 6 9.02083 6.19583 9.4125 6.5875C9.80417 6.97917 10 7.45 10 8C10 8.55 9.80417 9.02083 9.4125 9.4125C9.02083 9.80417 8.55 10 8 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4ZM8 4C7.45 4 6.97917 3.80417 6.5875 3.4125C6.19583 3.02083 6 2.55 6 2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0C8.55 0 9.02083 0.195833 9.4125 0.5875C9.80417 0.979167 10 1.45 10 2C10 2.55 9.80417 3.02083 9.4125 3.4125C9.02083 3.80417 8.55 4 8 4Z" />
    </SvgIcon>
  )
}

export default AdaptiveListOptionsModal
