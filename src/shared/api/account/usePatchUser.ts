import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaPatchUserDto } from '../api-endpoints'

export const usePatchUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.PATCH_USER],
    mutationFn: async (patchUserValues: SchemaPatchUserDto) => {
      const { data, error } = await apiClient.PATCH('/api/account/@me', {
        body: patchUserValues,
      })

      if (error) {
        const message = error.message || 'Неизвестная ошибка'
        throw new Error(message)
      }

      return data
    },
    onSuccess: () => {
      toast.success('Данные обновлены')
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
    },
    onError: (err: Error) => {
      toast.error(err.message)
    },
  })
}
