import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetBasket = () => {
  return useQuery({
    queryKey: ['basket', QUERY_KEY.GET_BASKET_BY_USER_ID],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/api/baskets')

      if (error) {
        throw new Error(error.message ?? 'Ошибка получения корзинны')
      }

      return data
    },
  })
}
