import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: QUERY_KEY.logout,
    mutationFn: async () => {
      return await apiClient.POST('/api/auth/logout')
    },
    onSuccess: () => {
      toast.success('Вы успешно вышли!')
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.me })
      navigate(ROUTES.login, { replace: true })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
