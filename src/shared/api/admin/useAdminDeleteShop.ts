import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface AdminDeleteShopArgs {
  shopId: string
}

export const useAdminDeleteShop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.ADMIN_DELETE_SHOP],
    mutationFn: async ({ shopId }: AdminDeleteShopArgs) => {
      const { error } = await apiClient.DELETE('/api/shops/{id}', {
        params: {
          path: { id: shopId },
        },
        body: {
          shopId,
        },
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления магазина')
      }
    },
    onSuccess: () => {
      toast.success('Магазин удален')
    },
    onError: error => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_SHOPS],
      })
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME_SHOPS] })
    },
  })
}
