import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

export const useDeleteCategoryMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_CATEGORY],
    mutationFn: async (categoryId: string) => {
      const activeShopId = loadSelectedShopId()

      if (!activeShopId) {
        throw new Error('Не удалось найти выбранный магазин')
      }

      const { data, error } = await apiClient.DELETE(
        '/api/category/{shopId}/{categoryId}',
        {
          params: {
            path: {
              shopId: activeShopId,
              categoryId,
            },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления категории')
      }

      return data
    },

    onSuccess: async () => {
      toast.success('Категория успешно удалена')
    },

    onError: (error) => {
      toast.error(error.message)
    },

    onSettled: () => {
      const activeShopId = loadSelectedShopId()
      if (activeShopId) {
        qc.invalidateQueries({
          queryKey: [QUERY_KEY.SHOP_CATEGORIES, activeShopId],
        })
      }
    },
  })
}
