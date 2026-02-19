import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaColorResponseDto } from '../api-endpoints'

export const useGetMeAllColors = (shopId: string) =>
  useQuery({
    queryKey: [QUERY_KEY.SHOP_COLORS, shopId],
    enabled: Boolean(shopId),
    queryFn: async ({ signal }): Promise<SchemaColorResponseDto[]> => {
      const { data, error } = await apiClient.GET('/api/shop/{shopId}/colors', {
        params: { path: { shopId } },
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки цветов')
      }
      return data ?? []
    },
  })
