import { useNavigate, useParams } from 'react-router-dom'
import { useVehicleQuery } from '../Services/vehicleQueries'

export const useVehicleDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const vehicleQuery = useVehicleQuery(id)

  return {
    vehicle: vehicleQuery.data,
    isLoading: vehicleQuery.isLoading,
    hasError: vehicleQuery.isError,
    goBack: () => navigate('/vehicles'),
    goToEdit: () => navigate(`/vehicles/${id}/edit`),
  }
}
