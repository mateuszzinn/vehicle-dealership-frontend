import { apiRequest, normalizeListResponse } from './apiClient'
import type { Dealer, DealerPayload } from '../Utils/domain'

export const dealersService = {
  async list() {
    const response = await apiRequest<unknown>('/dealer')
    return normalizeListResponse<Dealer>(response)
  },
  async getById(id: number) {
    const response = await apiRequest<Dealer | { data: Dealer }>(`/dealer/${id}`)
    return 'data' in response ? response.data : response
  },
  async create(payload: DealerPayload) {
    const response = await apiRequest<Dealer | { data: Dealer }>('/dealer', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return 'data' in response ? response.data : response
  },
  async update(id: number, payload: DealerPayload) {
    const response = await apiRequest<Dealer | { data: Dealer }>(`/dealer/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    return 'data' in response ? response.data : response
  },
  async remove(id: number) {
    await apiRequest<void>(`/dealer/${id}`, { method: 'DELETE' })
  },
}
