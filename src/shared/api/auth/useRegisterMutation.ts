import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { SchemaRegisterDto } from '@/shared/api/api-endpoints'
import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: [QUERY_KEY.REGISTER],
    mutationFn: async (registerValues: SchemaRegisterDto) => {
      const { error, data } = await apiClient.POST('/api/auth/register', {
        body: registerValues,
      })

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
      toast.success('Вы успешно зарегистрировались')
      navigate(ROUTES.home, { replace: true })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
