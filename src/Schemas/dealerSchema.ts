import * as yup from 'yup'
import { isValidCnpj, isValidZipCode, isValidPhone } from '../Utils/validators'

export const dealerSchema = yup.object({
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
  phone: yup
    .string()
    .required('Telefone e obrigatorio')
    .test('phone', 'Telefone invalido', (value) => isValidPhone(value ?? '')),
})

export type DealerFormData = yup.InferType<typeof dealerSchema>
