import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { saveSelectedShopId } from '@/shared/helpers'

import type { SchemaCreateShopDto } from '../api-endpoints'

export const useCreateMutation = () => {
  const navigation = useNavigate()
  const qc = useQueryClient()

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

    onSuccess: async (created) => {
      const { id: shopId } = created

      qc.setQueryData([QUERY_KEY.ME_SELECTED_SHOP_ID], shopId)
      saveSelectedShopId(shopId)

      await qc.invalidateQueries({ queryKey: [QUERY_KEY.ME_SHOPS] })

      toast.success('Магазин успешно создан')
      navigation(ROUTES.profile.shops.root)
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
}
