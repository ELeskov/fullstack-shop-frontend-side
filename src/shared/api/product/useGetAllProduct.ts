import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_PRODUCT],
    queryFn: async ({ signal }) => {
      const { data: shops, error } = await apiClient.GET('/api/product', {
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки товаров')
      }

      return shops
    },
  })
}
