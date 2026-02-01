import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/shared/config/query-client'
import { Toaster } from '@/shared/ui/components/ui/sonner'

import '@/app/styles/index.css'
import '@/app/styles/index.scss'

import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
