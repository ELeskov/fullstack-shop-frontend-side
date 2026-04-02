import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useUploadLogoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.SHOP_UPLOAD_LOGO],
    mutationFn: async (formData: FormData) => {
      const shopId = formData.get('shopId')
      const file = formData.get('file')

      if (!shopId || !file) {
        throw new Error('Не удалось подготовить данные для загрузки логотипа')
      }

      const { data } = await apiClient.POST('/api/shops/logo', {
        body: formData,
      })

      if (!data) {
        throw new Error('Пустой ответ сервера при загрузке логотипа')
      }

      return data
    },

    onSuccess: async (_data, formData) => {
      const shopId = formData.get('shopId')

      toast.success('Логотип магазина обновлён')

      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME_SHOPS] })

      if (typeof shopId === 'string' && shopId) {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GET_SHOP_BY_ID, shopId],
        })
      }
    },

    onError: error => {
      toast.error(error.message)
    },
  })
}
