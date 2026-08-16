import { apiRequest, normalizeListResponse } from './apiClient'
import type { Vehicle, VehiclePayload } from '../Utils/domain'

interface VehicleApiResponse {
  id: number
  brand: string
  model: string
  fuelType: Vehicle['fuelType']
  color: string
  price?: number
  dealerCorporateName?: string
  year?: number
  chassis?: string
}

interface VehicleApiRequest {
  brand: string
  model: string
  fuelType: Vehicle['fuelType']
  color: string
  price?: number
  year?: number
  chassis?: string
  dealerId?: number | null
}

const hasStatus = (error: unknown, status: number) =>
  typeof error === 'object' && error !== null && 'status' in error && error.status === status

const toVehicle = (vehicle: VehicleApiResponse): Vehicle => ({
  id: vehicle.id,
  brand: vehicle.brand,
  model: vehicle.model,
  fuelType: vehicle.fuelType,
  color: vehicle.color,
  value: vehicle.price,
  dealerCorporateName: vehicle.dealerCorporateName,
  year: vehicle.year,
  chassis: vehicle.chassis,
})

const toVehicleRequest = (payload: VehiclePayload): VehicleApiRequest => ({
  brand: payload.brand,
  model: payload.model,
  fuelType: payload.fuelType,
  color: payload.color,
  price: payload.value,
  year: payload.year,
  chassis: payload.chassis,
  dealerId: payload.dealerId,
})

const normalizeVehiclesResponse = (payload: unknown): Vehicle[] => {
  const normalized = normalizeListResponse<VehicleApiResponse>(payload).map(toVehicle)
  if (normalized.length > 0) return normalized

  if (!payload || typeof payload !== 'object') return normalized

  const obj = payload as Record<string, unknown>
  const topLevelKeys = ['vehicles', 'items', 'results']

  for (const key of topLevelKeys) {
    if (Array.isArray(obj[key])) return (obj[key] as VehicleApiResponse[]).map(toVehicle)
  }

  if (obj.data && typeof obj.data === 'object') {
    const dataObj = obj.data as Record<string, unknown>
    for (const key of topLevelKeys) {
      if (Array.isArray(dataObj[key])) return (dataObj[key] as VehicleApiResponse[]).map(toVehicle)
    }
    if (Array.isArray(dataObj.content)) return (dataObj.content as VehicleApiResponse[]).map(toVehicle)
  }

  if (obj._embedded && typeof obj._embedded === 'object') {
    const embedded = obj._embedded as Record<string, unknown>
    const firstArray = Object.values(embedded).find(Array.isArray)
    if (firstArray) return (firstArray as VehicleApiResponse[]).map(toVehicle)
  }

  return normalized
}

export const vehiclesService = {
  async list() {
    try {
      const response = await apiRequest<unknown>('/vehicles')
      return normalizeVehiclesResponse(response)
    } catch (error) {
      if (!hasStatus(error, 404)) throw error

      const fallbackResponse = await apiRequest<unknown>('/vehicle')
      return normalizeVehiclesResponse(fallbackResponse)
    }
  },
  async byDealer(dealerId: number) {
    const response = await apiRequest<unknown>(`/vehicles/dealer/${dealerId}`)
    return normalizeVehiclesResponse(response)
  },
  async getById(id: number) {
    const response = await apiRequest<VehicleApiResponse | { data: VehicleApiResponse }>(`/vehicles/${id}`)
    return toVehicle('data' in response ? response.data : response)
  },
  async create(payload: VehiclePayload) {
    const response = await apiRequest<Vehicle | { data: Vehicle }>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(toVehicleRequest(payload)),
    })
    return 'data' in response ? response.data : response
  },
  async update(id: number, payload: VehiclePayload) {
    const response = await apiRequest<Vehicle | { data: Vehicle }>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toVehicleRequest(payload)),
    })
    return 'data' in response ? response.data : response
  },
  async remove(id: number) {
    await apiRequest<void>(`/vehicles/${id}`, { method: 'DELETE' })
  },
}
