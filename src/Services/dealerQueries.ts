import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dealersService } from './dealers'
import type { DealerCreatePayload, DealerUpdatePayload } from '../Utils/domain'

const QUERY_KEYS = {
  dealers: ['dealers'] as const,
  dealer: (id: number) => ['dealers', id] as const,
}

export const useDealersQuery = () =>
  useQuery({ queryKey: QUERY_KEYS.dealers, queryFn: () => dealersService.list() })

export const useDealerQuery = (id: number) =>
  useQuery({
    queryKey: QUERY_KEYS.dealer(id),
    queryFn: () => dealersService.getById(id),
    enabled: Number.isFinite(id),
  })

export const useCreateDealerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: DealerCreatePayload) => dealersService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dealers })
    },
  })
}

export const useUpdateDealerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: DealerUpdatePayload }) =>
      dealersService.update(id, payload),
    onSuccess: (_, vars) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dealers })
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dealer(vars.id) })
    },
  })
}

export const useDeleteDealerMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => dealersService.remove(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dealers })
    },
  })
}
