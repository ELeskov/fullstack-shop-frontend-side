import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCT_BY_ID, productId],
    queryFn: async ({ signal }) => {
      if (!productId) {
        throw new Error('ID продукта не указан')
      }

      const { data, error } = await apiClient.GET('/api/product/{id}', {
        params: {
          path: { id: productId },
        },
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки продукта')
      }

      return data
    },
    enabled: !!productId,
  })
}
