import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useDeleteDealerMutation, useDealersQuery } from '../Services/dealerQueries'
import { MODAL_IDS } from '../Utils/constants'
import { useModal } from './useModal'

export const useDealersListPage = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { isOpen, openModal, closeModal } = useModal()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const dealersQuery = useDealersQuery()
  const deleteDealerMutation = useDeleteDealerMutation()

  const openDeleteModal = (id: number) => {
    setSelectedId(id)
    openModal(MODAL_IDS.DELETE_DEALER)
  }

  const closeDeleteModal = () => {
    setSelectedId(null)
    closeModal(MODAL_IDS.DELETE_DEALER)
  }

  const confirmDelete = async () => {
    if (!selectedId) return

    try {
      await deleteDealerMutation.mutateAsync(selectedId)
      enqueueSnackbar('Concessionaria removida com sucesso', { variant: 'success' })
      closeDeleteModal()
    } catch {
      enqueueSnackbar('Nao foi possivel remover a concessionaria', { variant: 'error' })
    }
  }

  return {
    dealers: dealersQuery.data ?? [],
    isLoading: dealersQuery.isLoading,
    hasError: dealersQuery.isError,
    goToNew: () => navigate('/dealers/new'),
    goToEdit: (id: number) => navigate(`/dealers/${id}/edit`),
    goToDetail: (id: number) => navigate(`/dealers/${id}`),
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteModalOpen: isOpen(MODAL_IDS.DELETE_DEALER),
  }
}
