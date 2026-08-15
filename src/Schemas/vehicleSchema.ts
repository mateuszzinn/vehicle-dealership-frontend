import * as yup from 'yup'
import { FUEL_OPTIONS } from '../Utils/constants'

export const vehicleSchema = yup.object({
  brand: yup.string().required('Marca e obrigatoria'),
  model: yup.string().required('Modelo e obrigatorio'),
  fuelType: yup
    .mixed<(typeof FUEL_OPTIONS)[number]>()
    .oneOf(FUEL_OPTIONS, 'Combustivel invalido')
    .required('Combustivel e obrigatorio'),
  color: yup.string().required('Cor e obrigatoria'),
  externalColor: yup.string().optional(),
  year: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .optional()
    .min(1900, 'Ano invalido'),
  chassis: yup.string().optional(),
  value: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .optional()
    .min(0, 'Valor invalido'),
  dealerId: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .nullable()
    .optional(),
})

export type VehicleFormData = yup.InferType<typeof vehicleSchema>
