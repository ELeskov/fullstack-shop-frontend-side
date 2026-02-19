import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

export const useGetMeAllCategories = () => {
  const activeShopId = loadSelectedShopId()

  return useQuery({
    queryKey: [QUERY_KEY.SHOP_CATEGORIES, activeShopId],
    queryFn: async ({ signal }) => {
      if (!activeShopId) {
        throw new Error('Магазин не найден')
      }

      const { data: shops, error } = await apiClient.GET(
        '/api/shop/{shopId}/categories',
        {
          params: {
            path: { shopId: activeShopId },
          },
          signal,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки ккатегорий')
      }

      return shops
    },
  })
}
