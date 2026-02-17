import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaCreateCategoryDto } from '../api-endpoints'

export const useCreateCategoryMutation = () => {
  const navigation = useNavigate()
  const qc = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.CREATE_CATEGORY],
    mutationFn: async (categoryBody: SchemaCreateCategoryDto) => {
      const { data } = await apiClient.POST('/api/category', {
        body: categoryBody,
      })

      if (!data) {
        throw new Error('Пустой ответ сервера при создании магазина')
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
  })
}
