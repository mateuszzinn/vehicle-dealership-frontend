import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './Components/AppShell'
import { DashboardPage } from './Pages/DashboardPage'
import { DealersListPage } from './Pages/dealers/DealersListPage'
import { DealerFormPage } from './Pages/dealers/DealerFormPage'
import { DealerDetailsPage } from './Pages/dealers/DealerDetailsPage'
import { NotFoundPage } from './Pages/NotFoundPage'
import { VehiclesListPage } from './Pages/vehicles/VehiclesListPage'
import { VehicleFormPage } from './Pages/vehicles/VehicleFormPage'
import { VehicleDetailsPage } from './Pages/vehicles/VehicleDetailsPage'

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        <Route path="/vehicles" element={<VehiclesListPage />} />
        <Route path="/vehicles/new" element={<VehicleFormPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
        <Route path="/vehicles/:id/edit" element={<VehicleFormPage />} />

        <Route path="/dealers" element={<DealersListPage />} />
        <Route path="/dealers/new" element={<DealerFormPage />} />
        <Route path="/dealers/:id" element={<DealerDetailsPage />} />
        <Route path="/dealers/:id/edit" element={<DealerFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
