import type { FuelType } from './domain'

export const STORAGE_KEYS = {
  USER: 'vehicle-dealership:user',
} as const

export const LOADING_IDS = {
  VEHICLES_LIST: 'vehicles:list',
  VEHICLE_SUBMIT: 'vehicle:submit',
  DEALERS_LIST: 'dealers:list',
  DEALER_SUBMIT: 'dealer:submit',
  LOGIN_SUBMIT: 'login:submit',
} as const

export const MODAL_IDS = {
  DELETE_VEHICLE: 'modal:delete-vehicle',
  DELETE_DEALER: 'modal:delete-dealer',
} as const

export const FUEL_OPTIONS: FuelType[] = [
  'GASOLINE',
  'ETHANOL',
  'FLEX',
  'DIESEL',
  'ELECTRIC',
  'HYBRID',
]
