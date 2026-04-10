import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export type CreateReviewPayload = {
  text: string
  rating: number
  productId: string
  shopId: string
}

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_REVIEW],
    mutationFn: async (payload: CreateReviewPayload) => {
      const { data, error } = await apiClient.POST('/api/reviews', {
        body: payload,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка создания отзыва')
      }

      return data
    },
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_PRODUCT_REVIEWS, variables.productId],
      })

      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_SHOP_REVIEWS, variables.shopId],
      })
    },
  })
}
