import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

export const useGetMeAllProductByShopId = () => {
  const activeShopId = loadSelectedShopId()

  return useQuery({
    queryKey: [QUERY_KEY.SHOP_PRODUCTS, activeShopId],
    queryFn: async ({ signal }) => {
      if (!activeShopId) {
        throw new Error('Магазин не выбран')
      }

      const { data: shops, error } = await apiClient.GET(
        '/api/product/shop/{shopId}',
        {
          params: {
            path: { shopId: activeShopId },
          },
          signal,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки товаров')
      }

      return shops
    },
    enabled: !!activeShopId,
  })
}
