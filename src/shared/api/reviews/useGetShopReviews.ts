import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetShopReviews = (shopId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SHOP_REVIEWS, shopId],
    enabled: Boolean(shopId),
    queryFn: async ({ signal }) => {
      const { data, error } = await apiClient.GET(
        '/api/reviews/shop/{shopId}',
        {
          params: {
            path: {
              shopId: shopId!,
            },
          },
          signal,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка получения отзывов магазина')
      }

      return data
    },
  })
}
