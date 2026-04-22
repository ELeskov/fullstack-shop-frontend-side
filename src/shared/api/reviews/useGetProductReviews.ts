import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetProductReviews = (productId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_REVIEWS, productId],
    enabled: Boolean(productId),
    queryFn: async ({ signal }) => {
      const { data, error } = await apiClient.GET(
        '/api/reviews/product/{productId}',
        {
          params: {
            path: {
              productId: productId!,
            },
          },
          signal,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка получения отзывов товара')
      }

      return data
    },
  })
}
