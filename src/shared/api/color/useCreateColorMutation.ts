import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { SchemaCreateColorDto } from '@/shared/api/api-endpoints'
import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useCreateColorMutation = () => {
  const qc = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_COLOR],
    mutationFn: async (payload: SchemaCreateColorDto) => {
      const { data, error } = await apiClient.POST('/api/color', {
        body: payload,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка создания цвета')
      }

      if (!data) {
        throw new Error('Пустой ответ при создании цвета')
      }

      return data
    },

    onSuccess: async (_, variables) => {
      toast.success('Цвет успешно создан')
      await qc.invalidateQueries({
        queryKey: [QUERY_KEY.SHOP_COLORS, variables.shopId],
      })
      navigate(ROUTES.profile.shops.colors.root)
    },

    onError: (error) => toast.error(error.message),
  })
}
