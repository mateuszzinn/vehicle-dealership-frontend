import { apiRequest, normalizeListResponse } from './apiClient'
import type { Vehicle, VehiclePayload } from '../Utils/domain'

export const vehiclesService = {
  async list() {
    const response = await apiRequest<unknown>('/vehicles')
    return normalizeListResponse<Vehicle>(response)
  },
  async byDealer(dealerId: number) {
    const response = await apiRequest<unknown>(`/vehicles?dealerId=${dealerId}`)
    const list = normalizeListResponse<Vehicle>(response)
    if (list.length > 0) return list

    // Fallback when backend does not support dealerId filter.
    const all = await this.list()
    return all.filter((vehicle) => vehicle.dealerId === dealerId)
  },
  async getById(id: number) {
    const response = await apiRequest<Vehicle | { data: Vehicle }>(`/vehicles/${id}`)
    return 'data' in response ? response.data : response
  },
  async create(payload: VehiclePayload) {
    const response = await apiRequest<Vehicle | { data: Vehicle }>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return 'data' in response ? response.data : response
  },
  async update(id: number, payload: VehiclePayload) {
    const response = await apiRequest<Vehicle | { data: Vehicle }>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    return 'data' in response ? response.data : response
  },
  async remove(id: number) {
    await apiRequest<void>(`/vehicles/${id}`, { method: 'DELETE' })
  },
}
