import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface ModalContextValue {
  openIds: string[]
  openModal: (id: string) => void
  closeModal: (id: string) => void
  isOpen: (id: string) => boolean
}

export const ModalContext = createContext<ModalContextValue | null>(null)

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openIds, setOpenIds] = useState<string[]>([])

  const openModal = useCallback((id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const closeModal = useCallback((id: string) => {
    setOpenIds((prev) => prev.filter((item) => item !== id))
  }, [])

  const isOpen = useCallback((id: string) => openIds.includes(id), [openIds])

  const value = useMemo(
    () => ({ openIds, openModal, closeModal, isOpen }),
    [closeModal, isOpen, openIds, openModal],
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
