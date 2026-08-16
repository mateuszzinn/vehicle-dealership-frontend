export type FuelType =
  | 'GASOLINE'
  | 'ETHANOL'
  | 'FLEX'
  | 'DIESEL'
  | 'ELECTRIC'
  | 'HYBRID'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
}

export interface Vehicle {
  id: number
  brand: string
  model: string
  fuelType: FuelType
  color: string
  dealerCorporateName?: string
  year?: number
  chassis?: string
  value?: number
  dealerId?: number | null
}

export interface Dealer {
  id: number
  businessName: string
  cnpj: string
  zipCode: string
  address: string
  neighborhood?: string
  city?: string
  state?: string
  phone?: string
}

export interface VehiclePayload {
  brand: string
  model: string
  fuelType: FuelType
  color: string
  year?: number
  chassis?: string
  value?: number
  dealerId?: number | null
}

export interface DealerCreatePayload {
  businessName: string
  cnpj: string
  zipCode: string
  address: string
  neighborhood?: string
  city?: string
  state?: string
}

export interface DealerUpdatePayload {
  businessName: string
  cnpj: string
}

export type DealerPayload = DealerCreatePayload
