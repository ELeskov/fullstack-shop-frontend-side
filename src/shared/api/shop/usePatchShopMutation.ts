import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaUpdateShopDto } from '../api-endpoints'

interface UpdateShopVariables {
  shopId: string
  body: SchemaUpdateShopDto
}

export const usePatchShopMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_SHOP],
    mutationFn: async ({ body, shopId }: UpdateShopVariables) => {
      const { data } = await apiClient.PATCH('/api/shops/{id}', {
        body: { ...body },
        params: {
          path: { id: shopId },
        },
      })

      if (!data) {
        throw new Error('Пустой ответ сервера при создании магазина')
      }

      return data
    },

    onSuccess: () => {
      toast.success('Данные успешно обновлены')
      navigate(ROUTES.profile.shops.root)
    },

    onError: error => {
      toast.error(error.message)
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME_SHOPS] })
    },
  })
}
