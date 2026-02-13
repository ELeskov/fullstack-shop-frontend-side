import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaUploadLogoShopDto } from '../api-endpoints'

export const useUploadLogoMutation = () =>
  useMutation({
    mutationKey: [QUERY_KEY.SHOP_UPLOAD_LOGO],
    mutationFn: async (formData: SchemaUploadLogoShopDto) => {
      const { data } = await apiClient.POST('/api/shop/logo', {
        body: formData,
      })

      return data
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
