import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const usePatchAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.PATCH_AVATAR],
    mutationFn: async (formData: FormData) => {
      const { data } = await apiClient.PATCH('/api/account/@me/avatar', {
        body: formData,
      })

      return data
    },
    onSuccess: () => {
      toast.success('Аватарка обновлена')
    },
    onError: (err) => {
      toast.error(err.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
    },
  })
}
