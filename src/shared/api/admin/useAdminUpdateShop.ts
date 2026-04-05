import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { SchemaUpdateShopDto } from '@/shared/api/api-endpoints'
import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface AdminUpdateShopArgs {
  shopId: string
  body: SchemaUpdateShopDto
}

export const useAdminUpdateShop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.ADMIN_UPDATE_SHOP],
    mutationFn: async ({ shopId, body }: AdminUpdateShopArgs) => {
      const { error } = await apiClient.PATCH('/api/shops/{id}', {
        params: {
          path: { id: shopId },
        },
        body,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка обновления магазина')
      }
    },
    onSuccess: () => {
      toast.success('Данные магазина обновлены')
    },
    onError: error => {
      toast.error(error.message)
    },
    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_SHOPS] })
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME_SHOPS] })
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_SHOP_BY_ID, variables.shopId],
      })
    },
  })
}
