import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetQuantityByProductId = (productId: string) => {
  return useQuery({
    queryKey: ['basket', QUERY_KEY.GET_QUANTITY_BY_PRODUCT_ID, productId],
    queryFn: async () => {
      const { data, error } = await apiClient.GET(
        '/api/baskets/products/{productId}',
        {
          params: {
            path: { productId },
          },
        },
      )

      if (error) {
        throw new Error(
          error.message ?? 'Ошибка получения количества товара в корзине',
        )
      }

      return data
    },
  })
}
