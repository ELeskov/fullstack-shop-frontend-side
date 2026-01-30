import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const usePatchAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.PATCH_AVATAR],
    mutationFn: async (formData: FormData) => {
      const { data, error } = await apiClient.PATCH('/api/users/me/avatar', {
        body: formData,
      })

      if (error) {
        const message = error.message || 'Неизвестная ошибка'
        throw new Error(message)
      }

      return data
    },
    onSuccess: () => {
      toast.success('Аватар обновлен')
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
    },
    onError: (err: Error) => {
      toast.error(err.message)
    },
  })
}
