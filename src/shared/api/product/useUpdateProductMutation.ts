import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

interface UpdateArgs {
  productId: string
  formData: FormData
}

export const useUpdateProductMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.UPDATE_PRODUCT],
    mutationFn: async ({ productId, formData }: UpdateArgs) => {
      const activeShopId = loadSelectedShopId()
      if (!activeShopId) {
        throw new Error('Магазин не выбран')
      }

      const { data, error } = await apiClient.PATCH(
        '/api/product/{shopId}/{productId}',
        {
          params: {
            path: { shopId: activeShopId, productId },
          },
          body: formData,
          bodySerializer: (body) => body,
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка обновления продукта')
      }
      return data
    },
    onSuccess: async (_, variables) => {
      toast.success('Товар успешно обновлен')
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.SHOP_PRODUCTS] })
      await qc.invalidateQueries({
        queryKey: [QUERY_KEY.GET_PRODUCT_BY_ID, variables.productId],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
