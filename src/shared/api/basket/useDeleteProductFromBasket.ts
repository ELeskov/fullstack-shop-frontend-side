import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useDeleteProductFromBasket = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['basket', QUERY_KEY.DELETE_PRODUCT_FROM_BASKET],
    mutationFn: async (productId: string) => {
      const { data, error } = await apiClient.DELETE(
        '/api/baskets/products/{productId}',
        {
          params: {
            path: { productId },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления товара из корзины')
      }

      return data
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['basket'],
      })
    },

    onError: error => {
      toast.error(error.message)
    },
  })
}
