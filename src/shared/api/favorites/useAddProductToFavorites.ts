import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useAddProductToFavorites = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationKey: ['favorites', QUERY_KEY.ADD_TO_FAVORITES],
    mutationFn: async (productId: string) => {
      const { data, error } = await apiClient.POST(
        '/api/favorites/{productId}',
        {
          params: {
            path: { productId },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка добавления товара в избранное')
      }

      return data
    },

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['favorites', QUERY_KEY.GET_USER_FAVOTITES],
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
