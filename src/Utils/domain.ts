export type FuelType =
  | 'GASOLINA'
  | 'ETANOL'
  | 'FLEX'
  | 'DIESEL'
  | 'ELETRICO'
  | 'HIBRIDO'

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
  externalColor?: string
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
  externalColor?: string
  year?: number
  chassis?: string
  value?: number
  dealerId?: number | null
}

export interface DealerPayload {
  businessName: string
  cnpj: string
  zipCode: string
  address: string
  neighborhood?: string
  city?: string
  state?: string
  phone?: string
}
