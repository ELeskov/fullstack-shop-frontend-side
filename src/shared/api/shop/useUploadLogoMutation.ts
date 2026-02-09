import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaUploadLogoShopDto } from '../api-endpoints'

export const useUploadLogoMutation = () =>
  useMutation({
    mutationKey: [QUERY_KEY.SHOP_UPLOAD_LOGO],
    mutationFn: async (FormData: SchemaUploadLogoShopDto) => {
      const { data, error } = await apiClient.POST('/api/shop/logo', {
        body: FormData,
      })

      if (error) {
        throw new Error(error.message)
      }

      return data
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
