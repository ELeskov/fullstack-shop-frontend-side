import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaCreateShopDto } from '../api-endpoints'

export const useCreateMutation = () => {
  const navigation = useNavigate()

  return useMutation({
    mutationKey: [QUERY_KEY.SHOP_CREATE],
    mutationFn: async (shopValues: SchemaCreateShopDto) => {
      const { data } = await apiClient.POST('/api/shop', {
        body: shopValues,
      })
      return data
    },

    onSuccess: () => {
      toast.success('Магазин успешно создан')
      navigation(ROUTES.profile.shops.root)
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
}
