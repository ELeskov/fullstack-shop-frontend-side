import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface ChangeProductSelectParams {
  productId: string
  newStatus: boolean
}

export const useChangeProductSelect = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: ['basket', QUERY_KEY.CHANGE_PRODUCT_SELECT],
    mutationFn: async ({ newStatus, productId }: ChangeProductSelectParams) => {
      const { data, error } = await apiClient.PATCH(
        '/api/baskets/products/{productId}/selection',
        {
          body: {
            isSelected: newStatus,
          },
          params: {
            path: { productId },
          },
        },
      )

      if (error) {
        throw new Error(
          error.message ?? 'Ошибка при изменении состояния выбора товара',
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
