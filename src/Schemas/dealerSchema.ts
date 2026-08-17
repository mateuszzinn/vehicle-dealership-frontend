import * as yup from 'yup'
import { isValidCnpj, isValidZipCode } from '../Utils/validators'

export const dealerCreateSchema = yup.object({
  businessName: yup.string().required('Razao social e obrigatoria'),
  cnpj: yup
    .string()
    .required('CNPJ e obrigatorio')
    .test('cnpj', 'CNPJ invalido', (value) => isValidCnpj(value ?? '')),
  zipCode: yup
    .string()
    .required('CEP e obrigatorio')
    .test('zipCode', 'CEP invalido', (value) => isValidZipCode(value ?? '')),
  address: yup.string().required('Endereco e obrigatorio'),
  neighborhood: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional().max(2, 'UF deve ter 2 caracteres'),
})

export const dealerUpdateSchema = yup.object({
  businessName: yup.string().required('Razao social e obrigatoria'),
  cnpj: yup
    .string()
    .required('CNPJ e obrigatorio')
    .test('cnpj', 'CNPJ invalido', (value) => isValidCnpj(value ?? '')),
})

export type DealerCreateFormData = yup.InferType<typeof dealerCreateSchema>
export type DealerUpdateFormData = yup.InferType<typeof dealerUpdateSchema>
