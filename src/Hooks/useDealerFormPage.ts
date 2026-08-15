import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { dealerSchema, type DealerFormData } from '../Schemas/dealerSchema'
import { useCreateDealerMutation, useDealerQuery, useUpdateDealerMutation } from '../Services/dealerQueries'
import { viaCepService } from '../Services/viacep'
import { maskCnpj, maskPhone, maskZipCode } from '../Utils/masks'

export const useDealerFormPage = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const isEdit = Number.isFinite(id)
  const { enqueueSnackbar } = useSnackbar()

  const dealerQuery = useDealerQuery(id)
  const createMutation = useCreateDealerMutation()
  const updateMutation = useUpdateDealerMutation()

  const form = useForm<DealerFormData>({
    resolver: yupResolver(dealerSchema),
    values: {
      businessName: dealerQuery.data?.businessName ?? '',
      cnpj: dealerQuery.data?.cnpj ?? '',
      zipCode: dealerQuery.data?.zipCode ?? '',
      address: dealerQuery.data?.address ?? '',
      neighborhood: dealerQuery.data?.neighborhood ?? '',
      city: dealerQuery.data?.city ?? '',
      state: dealerQuery.data?.state ?? '',
      phone: dealerQuery.data?.phone ?? '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, payload: values })
        enqueueSnackbar('Concessionaria atualizada com sucesso', { variant: 'success' })
      } else {
        await createMutation.mutateAsync(values)
        enqueueSnackbar('Concessionaria cadastrada com sucesso', { variant: 'success' })
      }
      navigate('/dealers')
    } catch {
      enqueueSnackbar('Nao foi possivel salvar a concessionaria', { variant: 'error' })
    }
  })

  const fillAddressByZipCode = async () => {
    const zipCode = form.getValues('zipCode')
    try {
      const data = await viaCepService.getByZipCode(zipCode)
      form.setValue('address', data.address, { shouldValidate: true })
      form.setValue('neighborhood', data.neighborhood, { shouldValidate: true })
      form.setValue('city', data.city, { shouldValidate: true })
      form.setValue('state', data.state, { shouldValidate: true })
      enqueueSnackbar('Endereco preenchido via CEP', { variant: 'info' })
    } catch {
      enqueueSnackbar('Nao foi possivel buscar o CEP', { variant: 'warning' })
    }
  }

  const handlers = useMemo(
    () => ({
      onCnpjChange: (value: string) => form.setValue('cnpj', maskCnpj(value), { shouldValidate: true }),
      onZipCodeChange: (value: string) =>
        form.setValue('zipCode', maskZipCode(value), { shouldValidate: true }),
      onPhoneChange: (value: string) =>
        form.setValue('phone', maskPhone(value), { shouldValidate: true }),
    }),
    [form],
  )

  return {
    isEdit,
    form,
    onSubmit,
    isLoading: dealerQuery.isLoading,
    isSaving: createMutation.isPending || updateMutation.isPending,
    fillAddressByZipCode,
    goBack: () => navigate('/dealers'),
    handlers,
  }
}
