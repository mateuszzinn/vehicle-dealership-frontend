import { normalizeNumberString } from './masks'

export const isValidCnpj = (value: string) => {
  const cnpj = normalizeNumberString(value)
  return cnpj.length === 14
}

export const isValidCpf = (value: string) => {
  const cpf = normalizeNumberString(value)
  return cpf.length === 11
}

export const isValidPhone = (value: string) => {
  const phone = normalizeNumberString(value)
  return phone.length >= 10 && phone.length <= 11
}

export const isValidZipCode = (value: string) => {
  const zip = normalizeNumberString(value)
  return zip.length === 8
}
