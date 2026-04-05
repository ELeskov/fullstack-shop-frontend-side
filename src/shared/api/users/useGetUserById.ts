import { useQuery } from '@tanstack/react-query'

import type { SchemaUserResponseDto } from '@/shared/api/api-endpoints'
import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetUserById = (userId?: string) =>
  useQuery({
    queryKey: [QUERY_KEY.USER_BY_ID, userId],
    enabled: Boolean(userId),
    queryFn: async ({ signal }): Promise<SchemaUserResponseDto> => {
      if (!userId) {
        throw new Error('Пользователь не найден')
      }

      const { data, error, response } = await apiClient.GET('/api/users/{id}', {
        signal,
        params: {
          path: {
            id: userId,
          },
        },
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки пользователя')
      }

      if (data && typeof data === 'object') {
        return data as unknown as SchemaUserResponseDto
      }

      try {
        const fallbackData = (await response.clone().json()) as unknown

        if (fallbackData && typeof fallbackData === 'object') {
          return fallbackData as SchemaUserResponseDto
        }
      } catch {
        throw new Error('Ошибка загрузки пользователя')
      }

      throw new Error('Пользователь не найден')
    },
  })
