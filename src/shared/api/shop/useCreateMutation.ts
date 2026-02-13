import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaCreateShopDto } from '../api-endpoints'

export const useCreateMutation = () => {
  const navigation = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.SHOP_CREATE],
    mutationFn: async (shopValues: SchemaCreateShopDto) => {
      const { data } = await apiClient.POST('/api/shop', {
        body: shopValues,
      })

      if (!data) {
        throw new Error('Пустой ответ сервера при создании магазина')
      }

      return data
    },

    onSuccess: (data) => {
      toast.success('Магазин успешно создан')
      queryClient.setQueriesData(['active-shop', data.shopId])
      navigation(ROUTES.profile.shops.root)
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
}
