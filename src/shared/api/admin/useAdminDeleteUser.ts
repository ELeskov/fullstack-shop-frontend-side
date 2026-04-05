import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface AdminDeleteUserArgs {
  userId: string
}

export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.ADMIN_DELETE_USER],
    mutationFn: async ({ userId }: AdminDeleteUserArgs) => {
      const { error } = await apiClient.DELETE('/api/users/{id}', {
        params: {
          path: { id: userId },
        },
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка удаления пользователя')
      }
    },
    onSuccess: () => {
      toast.success('Пользователь удален')
    },
    onError: error => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
    },
  })
}
