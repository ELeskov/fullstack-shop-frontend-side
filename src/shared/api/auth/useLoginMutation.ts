import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

import type { SchemaLoginDto } from '../api-endpoints'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: QUERY_KEY.login,
    mutationFn: async (loginValues: SchemaLoginDto) => {
      const response = await apiClient.POST('/api/auth/login', {
        body: loginValues,
      })
      console.log(response)

      if (!response.data?.userId) {
        throw new Error(response.error?.message || 'Ошибка авторизации')
      }

      return response.data
    },
    onSuccess: () => {
      toast.success('Вы успешно вошли в аккаунт')
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.me })
      navigate(ROUTES.home, { replace: true })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
