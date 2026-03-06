import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

import type { SchemaColorResponseDto } from '../api-endpoints'

export const useGetMeAllColors = () => {
  const activeShopId = loadSelectedShopId()

  return useQuery({
    queryKey: [QUERY_KEY.SHOP_COLORS, activeShopId],
    enabled: Boolean(activeShopId),
    queryFn: async ({ signal }): Promise<SchemaColorResponseDto[]> => {
      if (!activeShopId) {
        throw new Error('Магазин не выбран')
      }

      const { data, error } = await apiClient.GET(
        '/api/shops/{shopId}/colors',
        {
          params: { path: { shopId: activeShopId } },
          signal,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки цветов')
      }
      return data ?? []
    },
  })
}
