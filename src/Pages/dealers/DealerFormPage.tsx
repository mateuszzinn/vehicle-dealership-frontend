import { Card } from '../../Components/Card'
import { InputField } from '../../Components/InputField'
import { Button } from '../../Components/Button'
import { LoadingBlock } from '../../Components/LoadingBlock'
import { useDealerFormPage } from '../../Hooks/useDealerFormPage'

export const DealerFormPage = () => {
  const { form, onSubmit, isEdit, isLoading, isSaving, fillAddressByZipCode, goBack, handlers } =
    useDealerFormPage()

  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card title={isEdit ? 'Editar concessionaria' : 'Nova concessionaria'}>
      {isLoading ? <LoadingBlock /> : null}

      {!isLoading ? (
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <InputField
            label="Razao social"
            error={errors.businessName?.message}
            {...register('businessName')}
          />

          <InputField
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            error={errors.cnpj?.message}
            {...register('cnpj')}
            onChange={(event) => handlers.onCnpjChange(event.target.value)}
          />

          <div className="flex items-end gap-2">
            <InputField
              label="CEP"
              placeholder="00000-000"
              error={errors.zipCode?.message}
              {...register('zipCode')}
              onChange={(event) => handlers.onZipCodeChange(event.target.value)}
            />
            <Button type="button" variant="secondary" onClick={fillAddressByZipCode}>
              Buscar
            </Button>
          </div>

          <InputField label="Telefone" error={errors.phone?.message} {...register('phone')} onChange={(event) => handlers.onPhoneChange(event.target.value)} />

          <InputField label="Endereco" error={errors.address?.message} {...register('address')} />
          <InputField label="Bairro" error={errors.neighborhood?.message} {...register('neighborhood')} />
          <InputField label="Cidade" error={errors.city?.message} {...register('city')} />
          <InputField label="UF" error={errors.state?.message} {...register('state')} />

          <div className="sm:col-span-2 flex gap-3">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
            <Button type="button" variant="secondary" onClick={goBack}>
              Cancelar
            </Button>
          </div>
        </form>
      ) : null}
    </Card>
  )
}
