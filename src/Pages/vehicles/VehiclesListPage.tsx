import { Card } from '../../Components/Card'
import { Button } from '../../Components/Button'
import { ConfirmModal } from '../../Components/ConfirmModal'
import { LoadingBlock } from '../../Components/LoadingBlock'
import { useVehiclesListPage } from '../../Hooks/useVehiclesListPage'

export const VehiclesListPage = () => {
  const {
    vehicles,
    isLoading,
    hasError,
    goToNew,
    goToEdit,
    goToDetail,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteModalOpen,
  } = useVehiclesListPage()

  return (
    <Card
      title="Veiculos"
      description="Listagem e manutencao de veiculos"
      actions={<Button onClick={goToNew}>Novo veiculo</Button>}
    >
      {isLoading ? <LoadingBlock /> : null}
      {hasError ? <LoadingBlock label="Erro ao carregar veiculos" /> : null}

      {!isLoading && !hasError ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2">Marca</th>
                <th>Modelo</th>
                <th>Combustivel</th>
                <th>Cor</th>
                <th>Concessionaria</th>
                <th className="text-right">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-slate-100">
                  <td className="py-2">{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.fuelType}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.dealerId ?? '-'}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" onClick={() => goToDetail(vehicle.id)}>
                        Ver
                      </Button>
                      <Button variant="secondary" onClick={() => goToEdit(vehicle.id)}>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => openDeleteModal(vehicle.id)}>
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Excluir veiculo"
        description="Deseja realmente excluir este veiculo?"
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Card>
  )
}
