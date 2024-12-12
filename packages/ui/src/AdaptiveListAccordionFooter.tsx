import Accordion from "@mui/joy/Accordion"
import AccordionDetails from "@mui/joy/AccordionDetails"
import AccordionSummary from "@mui/joy/AccordionSummary"
import Typography from "@mui/joy/Typography"
import type { PropsWithChildren } from "react"

interface AdaptiveListAccordionFooterProps {
  title: string | React.ReactElement
}

const AdaptiveListAccordionFooter = (
  props: PropsWithChildren<AdaptiveListAccordionFooterProps>,
) => {
  return (
    <Accordion
      sx={({ spacing, vars }) => ({
        "--ListItem-minHeight": spacing(5),
        "--ListItem-paddingLeft": spacing(2),
        "--ListItem-paddingRight": spacing(2),
        backgroundColor: vars.palette.background.level2,
        borderBottomRightRadius: "var(--AdaptiveList-borderRadius)",
        borderBottomLeftRadius: "var(--AdaptiveList-borderRadius)",
        overflow: "hidden",
      })}
    >
      <AccordionSummary>
        {typeof props.title === "string" ? (
          <Typography level="body-sm">{props.title}</Typography>
        ) : (
          props.title
        )}
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  )
}

export default AdaptiveListAccordionFooter
