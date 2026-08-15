import { Card } from '../../Components/Card'
import { Button } from '../../Components/Button'
import { LoadingBlock } from '../../Components/LoadingBlock'
import { useVehicleDetailsPage } from '../../Hooks/useVehicleDetailsPage'

export const VehicleDetailsPage = () => {
  const { vehicle, isLoading, hasError, goBack, goToEdit } = useVehicleDetailsPage()

  return (
    <Card title="Detalhes do veiculo">
      {isLoading ? <LoadingBlock /> : null}
      {hasError ? <LoadingBlock label="Erro ao buscar detalhes do veiculo" /> : null}

      {!isLoading && !hasError && vehicle ? (
        <div className="grid gap-2 text-sm text-slate-700">
          <p><strong>Marca:</strong> {vehicle.brand}</p>
          <p><strong>Modelo:</strong> {vehicle.model}</p>
          <p><strong>Combustivel:</strong> {vehicle.fuelType}</p>
          <p><strong>Cor:</strong> {vehicle.color}</p>
          <p><strong>Concessionaria:</strong> {vehicle.dealerId ?? '-'}</p>
          <div className="mt-3 flex gap-3">
            <Button onClick={goToEdit}>Editar</Button>
            <Button variant="secondary" onClick={goBack}>Voltar</Button>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
