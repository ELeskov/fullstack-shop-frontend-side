import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useDeleteProductFromFavorites = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['favorites', QUERY_KEY.DELETE_FROM_FAVORITES],
    mutationFn: async (productId: string) => {
      const { data, error } = await apiClient.DELETE(
        '/api/favorites/{productId}',
        {
          params: {
            path: { productId },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления товара из избранных')
      }

      return data
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['favorites', QUERY_KEY.GET_USER_FAVORITES],
      })
      qc.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_PRODUCT_WITH_FILTERS],
      })
    },

    onError: error => {
      toast.error(error.message)
    },
  })
}
