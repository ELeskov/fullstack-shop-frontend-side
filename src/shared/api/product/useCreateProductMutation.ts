import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

import type { SchemaCreateProductDto } from '../api-endpoints'

export const useCreateProductMutation = () => {
  const navigation = useNavigate()
  const qc = useQueryClient()
  const activeShopId = loadSelectedShopId()

  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_PRODUCT],
    mutationFn: async (productBody: SchemaCreateProductDto) => {
      if (!activeShopId) {
        throw new Error('Магазин не выбран')
      }
      const { data } = await apiClient.POST('/api/product/{shopId}', {
        body: productBody,
        bodySerializer: (body) => body,
        params: {
          path: { shopId: activeShopId },
        },
      })

      if (!data) {
        throw new Error('Пустой ответ сервера при создании товара')
      }

      return data
    },

    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [QUERY_KEY.SHOP_PRODUCTS] })

      toast.success('Товар успешно создан')
      navigation(ROUTES.profile.shops.products.root)
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })
}
