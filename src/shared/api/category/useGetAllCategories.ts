import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CATEGORY],
    queryFn: async ({ signal }) => {
      const { data: shops, error } = await apiClient.GET('/api/category', {
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки цветов')
      }

      return shops
    },
  })
}
