import { useNavigate, useParams } from 'react-router-dom'
import { useDealerQuery } from '../Services/dealerQueries'
import { useVehiclesByDealerQuery } from '../Services/vehicleQueries'

export const useDealerDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const id = Number(params.id)

  const dealerQuery = useDealerQuery(id)
  const vehiclesByDealerQuery = useVehiclesByDealerQuery(id)

  return {
    dealer: dealerQuery.data,
    vehicles: vehiclesByDealerQuery.data ?? [],
    isLoading: dealerQuery.isLoading || vehiclesByDealerQuery.isLoading,
    hasError: dealerQuery.isError || vehiclesByDealerQuery.isError,
    goBack: () => navigate('/dealers'),
    goToEdit: () => navigate(`/dealers/${id}/edit`),
  }
}
