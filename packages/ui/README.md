# Levana UI

A collection of components for Levana applications.

The Levana UI library uses [Joy UI](https://mui.com/joy-ui/getting-started/) as a base layer. If you're looking for a component that doesn't exist here, check the components in Joy UI.

## Setup

To work with Levana UI, just include the `ThemeProvider` at the root of the application.

```ts
import ThemeProvider from "@levana-protocol/ui/ThemeProvider"

const Main = () => {
  return (
    <ThemeProvider variant="levana">
      ...
    </ThemeProvider>
  )
}
```

## Slots and SlotProps

Here's some helpful tips when creating new components.

### Accessing inherited props from the parent SlotProps

Add the component type to the type map to make the components props accessible from the slot props.

<!-- TODO: This also adds the inherited components props as callable props to the child component -->

#### Example

```ts
interface FirstComponentProps {
  one?: string
}

interface OtherComponentTypeMap<
  P = object,
  D extends React.ElementType = typeof FirstComponent,
> {
  props: P & OtherComponentSlotsAndSlotProps & {
    sx?: SxProps
  }
  defaultComponent: D
}

interface OtherComponentProps {
  a: string
  b: string
  c?: string
}

interface MyComponentTypeMap<
  P = object,
  D extends React.ElementType = typeof OtherComponent,
> {
  props: P & MyComponentSlotsAndSlotProps & {
    sx?: SxProps
  }
  defaultComponent: D
}

const Main = () => {
  return (
    <MyComponent slotProps={{
      other: { 
        one: "" // Only accessible through the type map default component
       }
    }} />
  )
}
```

### Omit required props from the parent SlotProps

When defining a `CreateSlotsAndSlotProps` type, the slot props generic record should omit required props. Without doing this, calling the `slotProps` of this component will force all required props to be defined. The props can be omitted by using the `OmitComponentProps` type.

#### Example

```ts
interface OtherComponentProps {
  a: string
  b: string
  c?: string
}

type MyComponentSlotsAndSlotProps = CreateSlotsAndSlotProps<
  MyComponentSlots,
  {
    root: SlotProps<"div", object, MyComponentOwnerState>
    other: SlotProps<
      OmitComponentProps<typeof OtherComponent, "a" | "b">,
      object,
      MyComponentOwnerState
    >
  }
>

const Main = () => {
  return (
    <MyComponent slotProps={{
      other: { 
        // If `OmitComponentProps` was not removing `a` and `b`, this would error
       }
    }} />
  )
}
```
