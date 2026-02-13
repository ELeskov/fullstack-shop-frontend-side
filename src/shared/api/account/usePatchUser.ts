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
      const { data } = await apiClient.PATCH('/api/account/@me', {
        body: patchUserValues,
      })

      return data
    },
    onSuccess: () => {
      toast.success('Данные обновлены')
    },
    onError: async (err) => {
      toast.error(err.message)
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
    },
  })
}
