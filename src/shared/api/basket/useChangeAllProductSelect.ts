import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useChangeAllProductSelect = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['basket', QUERY_KEY.CHANGE_ALL_PRODUCT_SELECT],
    mutationFn: async () => {
      const { data, error } = await apiClient.PATCH(
        '/api/baskets/products/selection',
      )

      if (error) {
        throw new Error(
          error.message ?? 'Ошибка при изменении состояния выбора товаров',
        )
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
