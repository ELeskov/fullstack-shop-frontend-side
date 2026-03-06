import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

export const useDeleteProductMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_PRODUCT],
    mutationFn: async (productId: string) => {
      const activeShopId = loadSelectedShopId()

      if (!activeShopId) {
        throw new Error('Магазин не найден')
      }

      const { data, error } = await apiClient.DELETE(
        '/api/product/{shopId}/{productId}',
        {
          params: {
            path: {
              shopId: activeShopId,
              productId,
            },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления товара')
      }

      return data
    },

    onSuccess: async () => {
      toast.success('Товар успешно удален')
    },

    onError: (error) => {
      toast.error(error.message)
    },

    onSettled: () => {
      const activeShopId = loadSelectedShopId()

      if (activeShopId) {
        qc.invalidateQueries({
          queryKey: [QUERY_KEY.SHOP_PRODUCTS, activeShopId],
        })
      }
    },
  })
}
