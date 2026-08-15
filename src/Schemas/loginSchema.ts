import * as yup from 'yup'
import { isValidPhone } from '../Utils/validators'

export const loginSchema = yup.object({
  name: yup.string().required('Nome e obrigatorio').min(3, 'Minimo de 3 caracteres'),
  email: yup.string().required('Email e obrigatorio').email('Email invalido'),
  phone: yup
    .string()
    .required('Telefone e obrigatorio')
    .test('phone', 'Telefone invalido', (value) => isValidPhone(value ?? '')),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
