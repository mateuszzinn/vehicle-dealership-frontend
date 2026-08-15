import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useDeleteVehicleMutation, useVehiclesQuery } from '../Services/vehicleQueries'
import { MODAL_IDS } from '../Utils/constants'
import { useModal } from './useModal'

export const useVehiclesListPage = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { isOpen, openModal, closeModal } = useModal()
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const vehiclesQuery = useVehiclesQuery()
  const deleteVehicleMutation = useDeleteVehicleMutation()

  const openDeleteModal = (id: number) => {
    setSelectedId(id)
    openModal(MODAL_IDS.DELETE_VEHICLE)
  }

  const closeDeleteModal = () => {
    setSelectedId(null)
    closeModal(MODAL_IDS.DELETE_VEHICLE)
  }

  const confirmDelete = async () => {
    if (!selectedId) return

    try {
      await deleteVehicleMutation.mutateAsync(selectedId)
      enqueueSnackbar('Veiculo removido com sucesso', { variant: 'success' })
      closeDeleteModal()
    } catch {
      enqueueSnackbar('Nao foi possivel remover o veiculo', { variant: 'error' })
    }
  }

  return {
    vehicles: vehiclesQuery.data ?? [],
    isLoading: vehiclesQuery.isLoading,
    hasError: vehiclesQuery.isError,
    goToNew: () => navigate('/vehicles/new'),
    goToEdit: (id: number) => navigate(`/vehicles/${id}/edit`),
    goToDetail: (id: number) => navigate(`/vehicles/${id}`),
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    isDeleteModalOpen: isOpen(MODAL_IDS.DELETE_VEHICLE),
  }
}
