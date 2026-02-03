import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaResetPasswordDto } from '../api-endpoints'

export const useResetPassword = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.RESET_PASSWORD],
    mutationFn: async (dto: SchemaResetPasswordDto) => {
      const { data, error } = await apiClient.POST(
        '/api/account/password/reset',
        {
          body: {
            token: dto.token,
            password: dto.password,
            confirmPassword: dto.confirmPassword,
          },
        },
      )

      if (error) {
        const message = error.message || 'Неизвестная ошибка'
        throw new Error(message)
      }

      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
      toast.success('Пароль успешно сброшен')
      navigate(ROUTES.login)
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
