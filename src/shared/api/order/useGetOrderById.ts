import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useGetOrderById = (orderId: string, enabled = true) => {
  return useQuery({
    queryKey: ['orders', QUERY_KEY.GET_ORDER_BY_ID, orderId],
    enabled: Boolean(orderId) && enabled,
    queryFn: async ({ signal }) => {
      const { data, error } = await apiClient.GET('/api/orders/{id}', {
        params: {
          path: { id: orderId },
        },
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка получения заказа')
      }

      return data
    },
  })
}
