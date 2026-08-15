import { Card } from '../../Components/Card'
import { Button } from '../../Components/Button'
import { LoadingBlock } from '../../Components/LoadingBlock'
import { useDealerDetailsPage } from '../../Hooks/useDealerDetailsPage'

export const DealerDetailsPage = () => {
  const { dealer, vehicles, isLoading, hasError, goBack, goToEdit } = useDealerDetailsPage()

  return (
    <Card title="Detalhes da concessionaria">
      {isLoading ? <LoadingBlock /> : null}
      {hasError ? <LoadingBlock label="Erro ao buscar detalhes da concessionaria" /> : null}

      {!isLoading && !hasError && dealer ? (
        <div className="space-y-4">
          <div className="grid gap-2 text-sm text-slate-700">
            <p><strong>Razao social:</strong> {dealer.businessName}</p>
            <p><strong>CNPJ:</strong> {dealer.cnpj}</p>
            <p><strong>CEP:</strong> {dealer.zipCode}</p>
            <p><strong>Endereco:</strong> {dealer.address}</p>
            <p><strong>Cidade:</strong> {dealer.city ?? '-'}</p>
            <p><strong>UF:</strong> {dealer.state ?? '-'}</p>
          </div>

          <div>
            <h3 className="mb-2 text-base font-semibold text-slate-900">Veiculos vinculados</h3>
            <ul className="space-y-2">
              {vehicles.map((vehicle) => (
                <li key={vehicle.id} className="rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                  {vehicle.brand} {vehicle.model} ({vehicle.fuelType})
                </li>
              ))}
              {vehicles.length === 0 ? (
                <li className="rounded border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-500">
                  Nenhum veiculo vinculado
                </li>
              ) : null}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={goToEdit}>Editar</Button>
            <Button variant="secondary" onClick={goBack}>Voltar</Button>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
