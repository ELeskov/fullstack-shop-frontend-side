import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { clearSelectedShopId } from '@/shared/helpers'

interface DeleteShopArgs {
  shopId: string
}

export const useDeleteShopMutation = () => {
  const qc = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_SHOP],
    mutationFn: async ({ shopId }: DeleteShopArgs) => {
      const { data, error } = await apiClient.DELETE('/api/shops/{id}', {
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

      return data
    },

    onSuccess: async () => {
      clearSelectedShopId()
      toast.success('Магазин удалён')
      navigate(ROUTES.profile.shops.root)
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.ME_SHOPS] })
    },

    onError: error => {
      toast.error(error.message)
    },
  })
}
