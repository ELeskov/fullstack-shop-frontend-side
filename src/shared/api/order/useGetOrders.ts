import { useQuery } from '@tanstack/react-query'

import type { SchemaOrderResponseDto } from '@/shared/api/api-endpoints'
import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

type GetOrdersParams = {
  status?: SchemaOrderResponseDto['orderStatus']
  sortByCreatedAt?: 'asc' | 'desc'
}

export const useGetOrders = (params?: GetOrdersParams) => {
  return useQuery({
    queryKey: ['orders', QUERY_KEY.GET_ORDERS, params],
    queryFn: async ({ signal }) => {
      const { data, error } = await apiClient.GET('/api/orders', {
        params: {
          query: params,
        },
        signal,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка получения заказов')
      }

      return data
    },
  })
}
