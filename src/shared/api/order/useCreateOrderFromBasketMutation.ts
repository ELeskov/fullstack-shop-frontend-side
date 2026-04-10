import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useCreateOrderFromBasketMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['orders', QUERY_KEY.CREATE_ORDER_FROM_BASKET],
    mutationFn: async () => {
      const { data, error } = await apiClient.POST('/api/orders')

      if (error) {
        throw new Error(error.message ?? 'Ошибка создания заказа')
      }

      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['basket', QUERY_KEY.GET_BASKET_BY_USER_ID],
      })
      qc.invalidateQueries({
        queryKey: ['orders', QUERY_KEY.GET_ORDERS],
      })
    },
    onError: error => {
      toast.error(error.message)
    },
  })
}
