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
                  <td className="py-4 align-middle">{dealer.businessName}</td>
                  <td className="py-4 align-middle">{dealer.cnpj}</td>
                  <td className="py-4 align-middle">{dealer.city ?? '-'}</td>
                  <td className="py-4 align-middle">{dealer.state ?? '-'}</td>
                  <td className="py-4 align-middle">
                    <div className="flex flex-wrap justify-end gap-3">
                      <Button className="shrink-0 whitespace-nowrap" variant="secondary" onClick={() => goToDetail(dealer.id)}>
                        Ver
                      </Button>
                      <Button className="shrink-0 whitespace-nowrap" variant="secondary" onClick={() => goToEdit(dealer.id)}>
                        Editar
                      </Button>
                      <Button className="shrink-0 whitespace-nowrap" variant="danger" onClick={() => openDeleteModal(dealer.id)}>
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
