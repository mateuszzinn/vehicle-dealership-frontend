import { normalizeNumberString } from '../Utils/masks'

interface ViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

export const viaCepService = {
  async getByZipCode(zipCode: string) {
    const normalized = normalizeNumberString(zipCode)
    const response = await fetch(`https://viacep.com.br/ws/${normalized}/json/`)
    const data = (await response.json()) as ViaCepResponse

    if (data.erro) {
      throw new Error('CEP nao encontrado')
    }

    return {
      zipCode: data.cep,
      address: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    }
  },
}
