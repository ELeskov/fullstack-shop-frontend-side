import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

type PayOrderResponse = {
  confirmationUrl: string
}

export const usePayOrderMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['orders', QUERY_KEY.PAY_ORDER],
    mutationFn: async (orderId: string) => {
      const { data, error } = await apiClient.POST(
        '/api/orders/{orderId}/pay',
        {
          params: {
            path: { orderId },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка создания платежа')
      }

      return data as PayOrderResponse
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['orders', QUERY_KEY.GET_ORDERS],
      })
    },
    onError: error => {
      toast.error(error.message)
    },
  })
}
