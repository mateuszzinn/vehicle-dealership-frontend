import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { loginSchema, type LoginFormData } from '../Schemas/loginSchema'
import { useAuth } from './useAuth'
import { useLoading } from './useLoading'
import { LOADING_IDS } from '../Utils/constants'
import { maskPhone } from '../Utils/masks'

export const useLoginPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { login } = useAuth()
  const { startLoading, stopLoading, isLoading } = useLoading()

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    startLoading(LOADING_IDS.LOGIN_SUBMIT)

    try {
      login({
        id: crypto.randomUUID(),
        name: values.name,
        email: values.email,
        phone: values.phone,
      })
      enqueueSnackbar('Dados do usuario salvos com sucesso', { variant: 'success' })
      navigate('/dashboard')
    } catch {
      enqueueSnackbar('Nao foi possivel salvar os dados do usuario', { variant: 'error' })
    } finally {
      stopLoading(LOADING_IDS.LOGIN_SUBMIT)
    }
  })

  const handlePhoneChange = (value: string) => {
    form.setValue('phone', maskPhone(value), { shouldValidate: true })
  }

  return {
    form,
    onSubmit,
    isSubmitting: isLoading(LOADING_IDS.LOGIN_SUBMIT),
    handlePhoneChange,
  }
}
