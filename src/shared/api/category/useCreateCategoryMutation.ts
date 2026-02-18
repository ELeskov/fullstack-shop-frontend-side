import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'
import { loadSelectedShopId } from '@/shared/helpers'

import type { SchemaCreateCategoryDto } from '../api-endpoints'

export const useCreateCategoryMutation = () => {
  const navigation = useNavigate()
  const qc = useQueryClient()
  const activeShopId = loadSelectedShopId()

  if (!activeShopId) {
    throw new Error('Не удалось найти магазин')
  }

  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_CATEGORY],
    mutationFn: async (
      categoryBody: Omit<SchemaCreateCategoryDto, 'shopId'>,
    ) => {
      const { data } = await apiClient.POST('/api/category', {
        body: {
          title: categoryBody.title,
          description: categoryBody.description,
          shopId: activeShopId,
        },
      })

      if (!data) {
        throw new Error('Пустой ответ сервера при создании категории')
      }

      return data
    },

    onSuccess: async () => {
      toast.success('Категория успешно создана')
      navigation(ROUTES.profile.shops.categories.root)
    },

    onError: (error) => {
      toast.error(error.message)
    },

    onSettled: () => {
      qc.invalidateQueries({
        queryKey: [QUERY_KEY.SHOP_CATEGORIES, activeShopId],
      })
    },
  })
}
