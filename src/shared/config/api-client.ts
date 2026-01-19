import createClient from 'openapi-fetch'

import type { apiEndpoints } from '@/shared/api/'

export const apiClient = createClient<apiEndpoints>({
  baseUrl: 'http://localhost:4000/',
  credentials: 'include',
})
