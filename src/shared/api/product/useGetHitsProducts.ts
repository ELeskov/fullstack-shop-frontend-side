import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetHitsProduct = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_HITS_PRODUCTS],
    queryFn: async ({ signal }) => {
      const { data: productHits, error } = await apiClient.GET(
        '/api/product/hits',
        {
          signal,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки товаров')
      }

      return productHits
    },
  })
}
