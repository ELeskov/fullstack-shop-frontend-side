import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetFavorites = () => {
  return useQuery({
    queryKey: ['favorites', QUERY_KEY.GET_USER_FAVOTITES],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/api/favorites')

      if (error) {
        throw new Error(error.message ?? 'Ошибка получения корзинны')
      }

      return data
    },
  })
}
