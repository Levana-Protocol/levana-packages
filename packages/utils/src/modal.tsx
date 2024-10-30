import { Fragment, createElement } from "react"
import { create } from "zustand"

type QueueKey = string
type QueueModal = React.JSXElementConstructor<unknown> | React.ReactNode
type Queue = Map<QueueKey, QueueModal>

interface UseQueueStoreProps {
  importantQueue: Queue
  standardQueue: Queue
  onboardQueue: Queue
  combinedQueue: () => [QueueKey, QueueModal][]
  isModalVisible: () => boolean
  add: (presenting: QueueKey | QueueModal, options?: ModalOptions) => void
  remove: (key?: QueueKey) => void
}

const useQueueStore = create<UseQueueStoreProps>((set, get) => {
  const priorityQueue = (priority: ModalPriority): Queue => {
    switch (priority) {
      case "important":
        return get().importantQueue
      case "standard":
        return get().standardQueue
      case "onboard":
        return get().onboardQueue
    }
  }

  const setQueue = (newQueue: Queue, priority: ModalPriority): null => {
    switch (priority) {
      case "important":
        set({ importantQueue: newQueue })
        return null
      case "standard":
        set({ standardQueue: newQueue })
        return null
      case "onboard":
        set({ onboardQueue: newQueue })
        return null
    }
  }

  return {
    importantQueue: new Map(),
    standardQueue: new Map(),
    onboardQueue: new Map(),
    combinedQueue: () => [
      ...get().importantQueue.entries(),
      ...get().standardQueue.entries(),
      ...get().onboardQueue.entries(),
    ],
    isModalVisible: () => get().combinedQueue().length > 0,
    add: (presenting, options) => {
      const [queueKey, modal] = (() => {
        if (typeof presenting === "string") {
          return [presenting, null]
        } else {
          const queueKey =
            options?.key ??
            Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1)
          return [queueKey, presenting]
        }
      })()

      const priority = options?.priority ?? "standard"
      const queue = priorityQueue(priority)

      if (options?.key) {
        for (const key of queue.keys()) {
          if (key === queueKey) {
            return
          }
        }
      }

      setQueue(new Map([[queueKey, modal], ...queue]), priority)
    },
    remove: (key) => {
      const removeFromQueue = (priority: ModalPriority): boolean => {
        const queue = priorityQueue(priority)
        let queueKey = typeof key === "string" ? key : undefined

        if (!queueKey && queue.size > 0) {
          queueKey = queue.keys().next().value
        }

        if (queueKey && queue.has(queueKey)) {
          queue.delete(queueKey)
          setQueue(new Map(queue), priority)
          return true
        } else {
          return false
        }
      }

      const priorities: ModalPriority[] = ["important", "standard", "onboard"]

      for (const priority of priorities) {
        if (removeFromQueue(priority)) {
          break
        }
      }
    },
  }
})

type ModalPriority = "standard" | "important" | "onboard"

export interface ModalOptions {
  key?: QueueKey
  priority?: ModalPriority
}

export interface UseModal {
  /**
   * Present a modal using a key
   *
   * This provides a modal the ability to be presented while maintaining an
   * expected position in the DOM tree. This can be helpful for tree related
   * features such as using with the Context API.
   *
   * @example
   * const { present } = useModal()
   * const handleClick = () => present("Settings")
   * return (
   *   <>
   *     <Button onClick={handleClick}>Settings</Button>
   *     <ModalPresenter queueKey="Settings">
   *       <SettingsModal />
   *     </ModalPresenter>
   *   </>
   * )
   */
  present(key: QueueKey, options?: Omit<ModalOptions, "key">): void
  /**
   * Present a modal using a component
   *
   * This provides a modal the ability to be presented within the current scope.
   * This can be helpful for passing scope related values directly to the modal.
   *
   * @example
   * const { present } = useModal()
   * const handleClick = () => present(<SettingsModal />)
   * return <Button onClick={handleClick}>Settings</Button>
   */
  present(modal: QueueModal, options?: ModalOptions): void
  /**
   * @param key If omitted, the top most modal will be dismissed.
   */
  dismiss(key?: QueueKey): void
}

export const useModal = (): UseModal => {
  return {
    present: useQueueStore((state) => state.add),
    dismiss: useQueueStore((state) => state.remove),
  }
}

export const useModalTopKey = (): string | undefined => {
  const entry = useQueueStore((state) => state.combinedQueue()).at(0)

  if (entry) {
    const [key] = entry
    return key
  }
}

export const useModalVisible = (): boolean => {
  return useQueueStore((state) => state.isModalVisible())
}

export const ModalProvider = () => {
  const entries = useQueueStore((state) => state.combinedQueue())
  const reverseEntries = [...entries].reverse()

  return (
    <>
      {reverseEntries.map(([key, modal]) => (
        <Fragment key={key}>
          {typeof modal === "function" ? createElement(modal) : modal}
        </Fragment>
      ))}
    </>
  )
}

export interface ModalPresenterProps {
  queueKey: QueueKey
  children: React.ReactElement
}

export const ModalPresenter = (props: ModalPresenterProps) => {
  const topModalKey = useModalTopKey()

  if (topModalKey === props.queueKey) {
    return props.children
  }
}
