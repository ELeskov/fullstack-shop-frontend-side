import createClient, { type Middleware } from 'openapi-fetch'

import type { apiEndpoints } from '@/shared/api/'

import type { SchemaApiErrorResponseDto } from '../api/api-endpoints'

export class ApiClientError extends Error {
  public readonly payload: SchemaApiErrorResponseDto

  constructor(payload: SchemaApiErrorResponseDto) {
    super(payload.message)
    this.name = 'ApiClientError'
    this.payload = payload
  }
}

const throwOnHttpError: Middleware = {
  async onResponse({ response }) {
    if (response.ok) {
      return
    }

    let payload: SchemaApiErrorResponseDto | null = null

    try {
      payload = await response.clone().json()
    } catch {
      payload = {
        statusCode: response.status,
        error: response.statusText || 'Error',
        message: 'Неизвестная ошибка',
        code: 'INTERNAL',
        path: '',
        timestamp: new Date().toISOString(),
      }
    }

    throw new ApiClientError(payload)
  },
}

export const apiClient = createClient<apiEndpoints>({
  baseUrl: 'http://localhost:4000/',
  credentials: 'include',
})

apiClient.use(throwOnHttpError)
