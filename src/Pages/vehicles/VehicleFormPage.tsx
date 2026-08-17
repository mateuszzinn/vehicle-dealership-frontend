import { Card } from '../../Components/Card'
import { InputField } from '../../Components/InputField'
import { SelectField } from '../../Components/SelectField'
import { Button } from '../../Components/Button'
import { LoadingBlock } from '../../Components/LoadingBlock'
import { useVehicleFormPage } from '../../Hooks/useVehicleFormPage'

export const VehicleFormPage = () => {
  const { form, onSubmit, isEdit, isLoading, isSaving, fuelOptions, dealerOptions, goBack } =
    useVehicleFormPage()

  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card title={isEdit ? 'Editar veiculo' : 'Novo veiculo'}>
      {isLoading ? <LoadingBlock /> : null}

      {!isLoading ? (
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <InputField label="Marca" error={errors.brand?.message} {...register('brand')} />
          <InputField label="Modelo" error={errors.model?.message} {...register('model')} />

          <SelectField
            label="Combustivel"
            options={fuelOptions.map((item) => ({ label: item.label, value: item.value }))}
            error={errors.fuelType?.message}
            {...register('fuelType')}
          />

          <InputField label="Cor" error={errors.color?.message} {...register('color')} />
          <InputField label="Ano" type="number" error={errors.year?.message} {...register('year')} />
          <InputField label="Chassi" error={errors.chassis?.message} {...register('chassis')} />
          <InputField label="Valor" type="number" step="0.01" error={errors.value?.message} {...register('value')} />

          <SelectField
            label="Concessionaria"
            options={dealerOptions}
            error={errors.dealerId?.message}
            {...register('dealerId')}
          />

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
