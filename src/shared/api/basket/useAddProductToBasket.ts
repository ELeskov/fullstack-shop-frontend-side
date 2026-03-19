import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useAddProductToBasket = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['basket', QUERY_KEY.ADD_PRODUCT_TO_BASKET],
    mutationFn: async (productId: string) => {
      const { data, error } = await apiClient.POST(
        '/api/baskets/products/{productId}',
        {
          params: {
            path: { productId },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка добавления товара в корзину')
      }

      return data
    },
    onSuccess: (_, productId) => {
      qc.invalidateQueries({
        queryKey: ['basket', QUERY_KEY.GET_QUANTITY_BY_PRODUCT_ID, productId],
      })
    },
    onError: error => {
      toast.error(error.message)
    },
  })
}
