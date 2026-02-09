import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaCreateShopDto } from '../api-endpoints'

export const useCreateMutation = () =>
  useMutation({
    mutationKey: [QUERY_KEY.SHOP_CREATE],
    mutationFn: async (shopValues: SchemaCreateShopDto) => {
      const { data, error } = await apiClient.POST('/api/shop', {
        body: shopValues,
      })

      if (error) {
        throw new Error(error.message)
      }

      return data
    },

    onSuccess: () => {
      toast.success('Магазин успешно создан')
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
