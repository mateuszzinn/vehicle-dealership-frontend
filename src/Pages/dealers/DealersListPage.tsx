import { Card } from '../../Components/Card'
import { Button } from '../../Components/Button'
import { ConfirmModal } from '../../Components/ConfirmModal'
import { LoadingBlock } from '../../Components/LoadingBlock'
import { useDealersListPage } from '../../Hooks/useDealersListPage'

export const DealersListPage = () => {
  const {
    dealers,
    isLoading,
    hasError,
    goToNew,
    goToEdit,
    goToDetail,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteModalOpen,
  } = useDealersListPage()

  return (
    <Card
      title="Concessionarias"
      description="Listagem e manutencao de concessionarias"
      actions={<Button onClick={goToNew}>Nova concessionaria</Button>}
    >
      {isLoading ? <LoadingBlock /> : null}
      {hasError ? <LoadingBlock label="Erro ao carregar concessionarias" /> : null}

      {!isLoading && !hasError ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-2">Razao social</th>
                <th>CNPJ</th>
                <th>Cidade</th>
                <th>UF</th>
                <th className="text-right">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map((dealer) => (
                <tr key={dealer.id} className="border-b border-slate-100">
                  <td className="py-2">{dealer.businessName}</td>
                  <td>{dealer.cnpj}</td>
                  <td>{dealer.city ?? '-'}</td>
                  <td>{dealer.state ?? '-'}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" onClick={() => goToDetail(dealer.id)}>
                        Ver
                      </Button>
                      <Button variant="secondary" onClick={() => goToEdit(dealer.id)}>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => openDeleteModal(dealer.id)}>
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
        title="Excluir concessionaria"
        description="Deseja realmente excluir esta concessionaria?"
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Card>
  )
}
