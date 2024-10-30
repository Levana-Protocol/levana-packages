export type OmitComponentProps<
  T extends React.ElementType,
  PropsToOmit extends keyof React.ComponentPropsWithRef<T>,
> = React.ForwardRefExoticComponent<
  Omit<React.ComponentPropsWithRef<T>, PropsToOmit>
>
