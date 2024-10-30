export const getAriaLabel = (
  component: object | undefined,
): string | undefined => {
  if (
    component &&
    "aria-label" in component &&
    typeof component["aria-label"] === "string"
  ) {
    return component["aria-label"]
  }
}
