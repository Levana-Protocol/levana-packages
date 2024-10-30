export type PropsWithFunctionChildren<In = unknown, Out = unknown> = In & {
  children?: (props: Out) => React.ReactNode
}
