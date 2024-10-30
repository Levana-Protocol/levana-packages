import Box from "@mui/joy/Box"
import Chip from "@mui/joy/Chip"
import ChipDelete from "@mui/joy/ChipDelete"
import IconButton from "@mui/joy/IconButton"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"

import FilterIcon from "./icons/FilterIcon"

interface AdaptiveListHeaderProps<Filter extends string> {
  title: string
  titledFilters: [Filter, string][]
  onPresentFilters: () => void
  onRemoveFilter: (filter: Filter) => void
}

const AdaptiveListHeader = <Filter extends string>(
  props: AdaptiveListHeaderProps<Filter>,
) => {
  return (
    <Box
      sx={(theme) => ({
        "--AdaptiveListHeader-lineHeight": theme.spacing(4.5),
        "--AdaptiveListHeader-gap": theme.spacing(2),
        "--Chip-minHeight": "var(--AdaptiveListHeader-lineHeight)",
        textAlign: "right",
        mt: 4,
      })}
    >
      <Typography
        level="h4"
        component="h2"
        sx={{
          lineHeight: "var(--AdaptiveListHeader-lineHeight)",
          float: "left",
          mr: "var(--AdaptiveListHeader-gap)",
          mb: "var(--AdaptiveListHeader-gap)",
        }}
      >
        {props.title}
      </Typography>

      <IconButton
        variant="outlined"
        onClick={props.onPresentFilters}
        sx={{
          "--IconButton-size": "var(--AdaptiveListHeader-lineHeight)",
          borderRadius: "calc(var(--IconButton-size) / 2)",
          float: "right",
          mb: "var(--AdaptiveListHeader-gap)",
          ml: "var(--AdaptiveListHeader-gap)",
        }}
      >
        <FilterIcon />
      </IconButton>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "end",
          mb: "var(--AdaptiveListHeader-gap)",
        }}
      >
        {props.titledFilters.map(([filter, title]) => (
          <Chip
            key={filter}
            size="lg"
            variant="outlined"
            startDecorator={
              <ChipDelete onDelete={() => props.onRemoveFilter(filter)} />
            }
          >
            {title}
          </Chip>
        ))}
      </Stack>
    </Box>
  )
}

export default AdaptiveListHeader
