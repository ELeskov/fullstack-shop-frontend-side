import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaUpdateUserDataDto } from '../api-endpoints'

export const useUpdateUserData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.updateUserData],
    mutationFn: async (newUpdateUserValues: SchemaUpdateUserDataDto) => {
      const { data, error } = await apiClient.PATCH('/api/users/me', {
        body: newUpdateUserValues,
      })

      if (error) {
        const message = error.message || 'Неизвестная ошибка'
        throw new Error(message)
      }

      return data
    },
    onSuccess: () => {
      toast('Данные обновлены')
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.me] })
    },
    onError: (err: Error) => {
      toast.error(err.message)
    },
  })
}
