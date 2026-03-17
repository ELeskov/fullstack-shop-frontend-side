import { useQuery } from '@tanstack/react-query'

import type { paths } from '@/shared/api/api-endpoints'
import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export type GetAllProductsQuery =
  paths['/api/product/filters']['get']['parameters']['query']

export const useGetAllProductWithFilters = (query: GetAllProductsQuery) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_PRODUCT_WITH_FILTERS, query],
    queryFn: async ({ signal }) => {
      const { data: shops, error } = await apiClient.GET(
        '/api/product/filters',
        {
          params: {
            query,
          },
          signal,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки товаров')
      }

      return shops
    },
  })
}
