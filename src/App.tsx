import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './Components/AppShell'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { DashboardPage } from './Pages/DashboardPage'
import { DealersListPage } from './Pages/dealers/DealersListPage'
import { DealerFormPage } from './Pages/dealers/DealerFormPage'
import { DealerDetailsPage } from './Pages/dealers/DealerDetailsPage'
import { LoginPage } from './Pages/LoginPage'
import { NotFoundPage } from './Pages/NotFoundPage'
import { ProfilePage } from './Pages/ProfilePage'
import { VehiclesListPage } from './Pages/vehicles/VehiclesListPage'
import { VehicleFormPage } from './Pages/vehicles/VehicleFormPage'
import { VehicleDetailsPage } from './Pages/vehicles/VehicleDetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/vehicles" element={<VehiclesListPage />} />
          <Route path="/vehicles/new" element={<VehicleFormPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="/vehicles/:id/edit" element={<VehicleFormPage />} />

          <Route path="/dealers" element={<DealersListPage />} />
          <Route path="/dealers/new" element={<DealerFormPage />} />
          <Route path="/dealers/:id" element={<DealerDetailsPage />} />
          <Route path="/dealers/:id/edit" element={<DealerFormPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
