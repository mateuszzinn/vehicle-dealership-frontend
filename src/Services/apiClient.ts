const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

interface ApiError extends Error {
  status?: number
}

const extractErrorMessage = (payload: unknown): string | null => {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  const response = payload as Record<string, unknown>

  if (typeof response.message === 'string' && response.message.trim()) {
    return response.message
  }

  if (response.messages && typeof response.messages === 'object' && !Array.isArray(response.messages)) {
    const messages = response.messages as Record<string, unknown>
    const firstMessage = Object.values(messages).find((value) => typeof value === 'string' && value.trim())

    if (typeof firstMessage === 'string') {
      return firstMessage
    }
  }

  return null
}

const toError = (status: number, message: string): ApiError => {
  const error = new Error(message) as ApiError
  error.status = status
  return error
}

export const apiRequest = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const headers = new Headers(init?.headers ?? {})

  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const raw = await response.text()
  const data = raw ? (JSON.parse(raw) as unknown) : null

  if (!response.ok) {
    const message = extractErrorMessage(data) ?? 'Nao foi possivel concluir a requisicao'

    throw toError(response.status, message)
  }

  return data as T
}

export const normalizeListResponse = <T>(payload: unknown): T[] => {
  if (Array.isArray(payload)) return payload as T[]
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>
    if (Array.isArray(obj.data)) return obj.data as T[]
    if (Array.isArray(obj.content)) return obj.content as T[]
  }
  return []
}
