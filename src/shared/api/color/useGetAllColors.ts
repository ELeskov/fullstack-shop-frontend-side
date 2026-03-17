import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetAllColors = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ALL_COLORS],
    queryFn: async ({ signal }) => {
      const { data: shops, error } = await apiClient.GET('/api/color', {
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка загрузки цветов')
      }

      return shops
    },
  })
}
