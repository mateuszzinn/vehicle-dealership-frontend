import { apiRequest, normalizeListResponse } from './apiClient'
import type { Dealer, DealerCreatePayload, DealerUpdatePayload } from '../Utils/domain'

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

interface DealerCreateApiRequest {
  corporateName: string
  cnpj: string
  cep: string
}

interface DealerUpdateApiRequest {
  corporateName: string
  cnpj: string
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

const toDealerCreateRequest = (payload: DealerCreatePayload): DealerCreateApiRequest => ({
  corporateName: payload.businessName,
  cnpj: payload.cnpj,
  cep: payload.zipCode,
})

const toDealerUpdateRequest = (payload: DealerUpdatePayload): DealerUpdateApiRequest => ({
  corporateName: payload.businessName,
  cnpj: payload.cnpj,
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
  async create(payload: DealerCreatePayload) {
    const response = await apiRequest<DealerApiResponse | { data: DealerApiResponse }>('/dealer', {
      method: 'POST',
      body: JSON.stringify(toDealerCreateRequest(payload)),
    })
    const dealer = 'data' in response ? response.data : response
    return toDealer(dealer)
  },
  async update(id: number, payload: DealerUpdatePayload) {
    const response = await apiRequest<DealerApiResponse | { data: DealerApiResponse }>(`/dealer/${id}`, {
      method: 'PUT',
      body: JSON.stringify(toDealerUpdateRequest(payload)),
    })
    const dealer = 'data' in response ? response.data : response
    return toDealer(dealer)
  },
  async remove(id: number) {
    await apiRequest<void>(`/dealer/${id}`, { method: 'DELETE' })
  },
}
