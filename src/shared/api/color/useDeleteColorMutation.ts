import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface DeleteColorArgs {
  shopId: string
  colorId: string
}

export const useDeleteColorMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_COLOR],
    mutationFn: async ({ shopId, colorId }: DeleteColorArgs) => {
      const { data, error } = await apiClient.DELETE(
        '/api/color/{shopId}/{colorId}',
        {
          params: {
            path: {
              shopId,
              colorId,
            },
          },
        },
      )

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления цвета')
      }

      return data
    },
    onSuccess: async (_, variables) => {
      toast.success('Цвет удалён')

      await qc.invalidateQueries({
        queryKey: [QUERY_KEY.SHOP_COLORS, variables.shopId],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
