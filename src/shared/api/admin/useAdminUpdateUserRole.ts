import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { SchemaUpdateRoleDto } from '@/shared/api/api-endpoints'
import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

interface AdminUpdateUserRoleArgs {
  userId: string
  role: SchemaUpdateRoleDto['role']
}

export const useAdminUpdateUserRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.ADMIN_UPDATE_ROLE],
    mutationFn: async ({ userId, role }: AdminUpdateUserRoleArgs) => {
      const { error } = await apiClient.PATCH('/api/users/{id}/role', {
        params: {
          path: { id: userId },
        },
        body: { role },
      })

      if (error) {
        throw new Error(error.message ?? 'Ошибка изменения роли')
      }
    },
    onSuccess: () => {
      toast.success('Роль пользователя обновлена')
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
