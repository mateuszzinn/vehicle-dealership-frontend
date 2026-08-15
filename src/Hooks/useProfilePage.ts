import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { loginSchema, type LoginFormData } from '../Schemas/loginSchema'
import { useAuth } from './useAuth'
import { maskPhone } from '../Utils/masks'

export const useProfilePage = () => {
  const { user, updateUser } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    updateUser(values)
    enqueueSnackbar('Dados atualizados com sucesso', { variant: 'success' })
  })

  const handlePhoneChange = (value: string) => {
    form.setValue('phone', maskPhone(value), { shouldValidate: true })
  }

  return {
    form,
    onSubmit,
    handlePhoneChange,
  }
}
