import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './Context/AuthContext'
import { LoadingProvider } from './Context/LoadingContext'
import { ModalProvider } from './Context/ModalContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <AuthProvider>
          <LoadingProvider>
            <ModalProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ModalProvider>
          </LoadingProvider>
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </StrictMode>,
)
