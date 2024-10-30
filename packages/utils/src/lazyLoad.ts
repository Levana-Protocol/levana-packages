import { create } from "zustand"

/**
 * Lazy load data in a store
 *
 * This allows for the same data to be reused anywhere it's called.
 *
 * @example
 * const useClient = lazyLoadStore(async () => await import("./lib"))
 * // Rerender once the data loads
 * const client = useClient()
 * // Wait for the data to load
 * const client = await useClient.getState()
 */
export const lazyLoadStore = <Data>(loadData: () => Promise<Data>) => {
  interface Props {
    data: Data | undefined
    load: () => Promise<void>
  }

  const store = create<Props>((set, get) => ({
    data: undefined,
    load: async () => {
      if (!get().data) {
        set({ data: await loadData() })
      }
    },
  }))

  const caller = () => {
    const s = store()
    s.load()
    return s.data
  }

  caller.getState = async (): Promise<Data> => {
    await store.getState().load()
    return store.getState().data as Data
  }

  return caller
}

export const lazyLoad = async <Value>(
  lazyImport: () => Promise<{ default: Value }>,
) => {
  const module = await lazyImport()
  return module.default
}
