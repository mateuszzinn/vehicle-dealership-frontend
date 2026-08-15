import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { vehiclesService } from './vehicles'
import type { VehiclePayload } from '../Utils/domain'

const QUERY_KEYS = {
  vehicles: ['vehicles'] as const,
  vehicle: (id: number) => ['vehicles', id] as const,
  vehiclesByDealer: (dealerId: number) => ['vehicles', 'dealer', dealerId] as const,
}

export const useVehiclesQuery = () =>
  useQuery({ queryKey: QUERY_KEYS.vehicles, queryFn: () => vehiclesService.list() })

export const useVehicleQuery = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.vehicle(id),
    queryFn: () => vehiclesService.getById(id),
    enabled: Number.isFinite(id),
  })

export const useVehiclesByDealerQuery = (dealerId: number) =>
  useQuery({
    queryKey: QUERY_KEYS.vehiclesByDealer(dealerId),
    queryFn: () => vehiclesService.byDealer(dealerId),
    enabled: Number.isFinite(dealerId),
  })

export const useCreateVehicleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: VehiclePayload) => vehiclesService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vehicles })
    },
  })
}

export const useUpdateVehicleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: VehiclePayload }) =>
      vehiclesService.update(id, payload),
    onSuccess: (_, vars) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vehicles })
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vehicle(vars.id) })
    },
  })
}

export const useDeleteVehicleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => vehiclesService.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vehicles })
    },
  })
}
