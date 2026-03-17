import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetAllShops = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_SHOPS],
    queryFn: async ({ signal }) => {
      const { data: shops, error } = await apiClient.GET('/api/shops', {
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки магазинов')
      }

      return shops
    },
  })
}
