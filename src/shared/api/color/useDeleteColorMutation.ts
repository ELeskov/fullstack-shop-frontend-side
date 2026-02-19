import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaDeleteColorDto } from '../api-endpoints'

export const useDeleteColorMutation = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_COLOR],
    mutationFn: async (payload: SchemaDeleteColorDto) => {
      const { data, error } = await apiClient.DELETE('/api/color', {
        body: payload,
      })
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
    onError: (error) => toast.error(error.message),
  })
}
