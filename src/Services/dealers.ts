import { apiRequest, normalizeListResponse } from './apiClient'
import type { Dealer, DealerPayload } from '../Utils/domain'

interface DealerApiResponse {
  id: number
  corporateName: string
  cnpj: string
  cep: string
  street: string
  neighborhood?: string
  city?: string
  state?: string
}

interface DealerApiRequest {
  corporateName: string
  cnpj: string
  cep: string
}

const toDealer = (dealer: DealerApiResponse): Dealer => ({
  id: dealer.id,
  businessName: dealer.corporateName,
  cnpj: dealer.cnpj,
  zipCode: dealer.cep,
  address: dealer.street,
  neighborhood: dealer.neighborhood,
  city: dealer.city,
  state: dealer.state,
})

const toDealerRequest = (payload: DealerPayload): DealerApiRequest => ({
  corporateName: payload.businessName,
  cnpj: payload.cnpj,
  cep: payload.zipCode,
})

export const dealersService = {
  async list() {
    const response = await apiRequest<unknown>('/dealer')
    return normalizeListResponse<DealerApiResponse>(response).map(toDealer)
  },
  async getById(id: number) {
    const response = await apiRequest<DealerApiResponse | { data: DealerApiResponse }>(`/dealer/${id}`)
    const dealer = 'data' in response ? response.data : response
    return toDealer(dealer)
  },
  async create(payload: DealerPayload) {
    const response = await apiRequest<DealerApiResponse | { data: DealerApiResponse }>('/dealer', {
      method: 'POST',
      body: JSON.stringify(toDealerRequest(payload)),
    })
    const dealer = 'data' in response ? response.data : response
    return toDealer(dealer)
  },
  async update(id: number, payload: DealerPayload) {
    const response = await apiRequest<DealerApiResponse | { data: DealerApiResponse }>(`/dealer/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toDealerRequest(payload)),
    })
    const dealer = 'data' in response ? response.data : response
    return toDealer(dealer)
  },
  async remove(id: number) {
    await apiRequest<void>(`/dealer/${id}`, { method: 'DELETE' })
  },
}
