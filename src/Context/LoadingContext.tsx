import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface LoadingContextValue {
  loadingIds: string[]
  startLoading: (id: string) => void
  stopLoading: (id: string) => void
  isLoading: (id: string) => boolean
}

export const LoadingContext = createContext<LoadingContextValue | null>(null)

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loadingIds, setLoadingIds] = useState<string[]>([])

  const startLoading = useCallback((id: string) => {
    setLoadingIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const stopLoading = useCallback((id: string) => {
    setLoadingIds((prev) => prev.filter((item) => item !== id))
  }, [])

  const isLoading = useCallback((id: string) => loadingIds.includes(id), [loadingIds])

  const value = useMemo(
    () => ({ loadingIds, startLoading, stopLoading, isLoading }),
    [isLoading, loadingIds, startLoading, stopLoading],
  )

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}
