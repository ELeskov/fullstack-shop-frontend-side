import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

export const useDeleteCategoryMutation = () => {
  const qc = useQueryClient()
  const activeShopId = loadSelectedShopId()

  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_CATEGORY],
    mutationFn: async (categoryId: string) => {
      return await apiClient.DELETE('/api/category', {
        body: { categoryId },
      })
    },

    onSuccess: async () => {
      toast.success('Категория успешно удалена')
    },

    onError: (error) => {
      toast.error(error.message)
    },

    onSettled: () => {
      qc.invalidateQueries({
        queryKey: [QUERY_KEY.SHOP_CATEGORIES, activeShopId],
      })
    },
  })
}
