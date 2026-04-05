import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { SchemaAdminUpdateUserDto } from '@/shared/api/api-endpoints'
import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface AdminUpdateUserArgs {
  userId: string
  body: SchemaAdminUpdateUserDto
}

export const useAdminUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.ADMIN_UPDATE_USER],
    mutationFn: async ({ userId, body }: AdminUpdateUserArgs) => {
      const { error } = await apiClient.PATCH('/api/users/{id}', {
        params: {
          path: { id: userId },
        },
        body,
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка обновления пользователя')
      }
    },
    onSuccess: () => {
      toast.success('Профиль пользователя обновлен')
    },
    onError: error => {
      toast.error(error.message)
    },
    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER_BY_ID, variables.userId],
      })
    },
  })
}
