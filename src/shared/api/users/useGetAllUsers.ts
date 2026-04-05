import { useQuery } from '@tanstack/react-query'

import type { SchemaUserResponseDto } from '@/shared/api/api-endpoints'
import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS],
    queryFn: async ({ signal }): Promise<SchemaUserResponseDto[]> => {
      const { data, error, response } = await apiClient.GET('/api/users', {
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки пользователей')
      }

      if (Array.isArray(data)) {
        return data as unknown as SchemaUserResponseDto[]
      }

      try {
        const fallbackData = (await response.clone().json()) as unknown

        if (Array.isArray(fallbackData)) {
          return fallbackData as SchemaUserResponseDto[]
        }
      } catch {
        return []
      }

      return []
    },
  })
}
