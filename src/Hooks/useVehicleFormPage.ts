import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { vehicleSchema, type VehicleFormData } from '../Schemas/vehicleSchema'
import { useCreateVehicleMutation, useUpdateVehicleMutation, useVehicleQuery } from '../Services/vehicleQueries'
import { useDealersQuery } from '../Services/dealerQueries'
import { FUEL_OPTIONS } from '../Utils/constants'
import type { VehiclePayload } from '../Utils/domain'

export const useVehicleFormPage = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const isEdit = Number.isFinite(id)
  const { enqueueSnackbar } = useSnackbar()

  const vehicleQuery = useVehicleQuery(id)
  const dealersQuery = useDealersQuery()
  const createMutation = useCreateVehicleMutation()
  const updateMutation = useUpdateVehicleMutation()

  const form = useForm<VehicleFormData>({
    resolver: yupResolver(vehicleSchema),
    values: {
      brand: vehicleQuery.data?.brand ?? '',
      model: vehicleQuery.data?.model ?? '',
      fuelType: vehicleQuery.data?.fuelType ?? 'GASOLINE',
      color: vehicleQuery.data?.color ?? '',
      year: vehicleQuery.data?.year,
      chassis: vehicleQuery.data?.chassis ?? '',
      value: vehicleQuery.data?.value,
      dealerId: vehicleQuery.data?.dealerId ?? null,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const payload = values as unknown as VehiclePayload

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, payload })
        enqueueSnackbar('Veiculo atualizado com sucesso', { variant: 'success' })
      } else {
        await createMutation.mutateAsync(payload)
        enqueueSnackbar('Veiculo cadastrado com sucesso', { variant: 'success' })
      }
      navigate('/vehicles')
    } catch {
      enqueueSnackbar('Nao foi possivel salvar o veiculo', { variant: 'error' })
    }
  })

  const fuelOptions = useMemo(
    () => FUEL_OPTIONS.map((option) => ({ label: option, value: option })),
    [],
  )

  const dealerOptions = useMemo(
    () =>
      (dealersQuery.data ?? []).map((dealer) => ({
        label: dealer.businessName,
        value: String(dealer.id),
      })),
    [dealersQuery.data],
  )

  return {
    id,
    isEdit,
    form,
    onSubmit,
    isLoading: vehicleQuery.isLoading,
    isSaving: createMutation.isPending || updateMutation.isPending,
    fuelOptions,
    dealerOptions,
    goBack: () => navigate('/vehicles'),
  }
}
