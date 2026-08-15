import { createContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { UserProfile } from '../Utils/domain'
import { STORAGE_KEYS } from '../Utils/constants'

interface AuthContextValue {
  user: UserProfile | null
  login: (payload: UserProfile) => void
  logout: () => void
  updateUser: (payload: Partial<UserProfile>) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER)
    if (!raw) return null
    try {
      return JSON.parse(raw) as UserProfile
    } catch {
      localStorage.removeItem(STORAGE_KEYS.USER)
      return null
    }
  })

  const login = (payload: UserProfile) => {
    setUser(payload)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(payload))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.USER)
  }

  const updateUser = (payload: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...payload }
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated))
      return updated
    })
  }

  const value = useMemo(() => ({ user, login, logout, updateUser }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
