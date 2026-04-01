import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { queryClient } from './app/queryClients.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AppRouter from './app/routes/AppRouter.tsx'
import { SnackbarUtilsConfig } from './app/utils/notify.ts'

if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    import('react').then((React) => {
      import('react-dom/client').then((ReactDOM) => {
        axe.default(React, ReactDOM, 1000)
      })
    })
  })
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <SnackbarUtilsConfig />
          <AppRouter />
        </SnackbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
