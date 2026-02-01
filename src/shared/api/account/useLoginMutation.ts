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
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: async (loginValues: SchemaLoginDto) => {
      const response = await apiClient.POST('/api/account/login', {
        body: loginValues,
      })

      if (!response.data?.userId) {
        throw new Error(response.error?.message)
      }

      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
      toast.success('Вы успешно вошли в аккаунт')
      navigate(ROUTES.home, { replace: true })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
