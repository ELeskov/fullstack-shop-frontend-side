import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface AdminDeleteProductArgs {
  shopId: string
  productId: string
}

export const useAdminDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.ADMIN_DELETE_PRODUCT],
    mutationFn: async ({ shopId, productId }: AdminDeleteProductArgs) => {
      const { error } = await apiClient.DELETE(
        '/api/product/{shopId}/{productId}',
        {
          params: {
            path: {
              shopId,
              productId,
            },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления товара')
      }
    },
    onSuccess: () => {
      toast.success('Товар удален')
    },
    onError: error => {
      toast.error(error.message)
    },
    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_PRODUCTS],
      })
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SHOP_PRODUCTS, variables.shopId],
      })
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_PRODUCT_BY_ID, variables.productId],
      })
    },
  })
}
