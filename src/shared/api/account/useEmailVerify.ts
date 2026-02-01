import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useEmailVerify = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.VERIFY_EMAIL],
    mutationFn: (verifyEmailToken: string) =>
      apiClient.POST('/api/account/verify', {
        body: {
          token: verifyEmailToken,
        },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
      navigate(ROUTES.profile.root, { replace: true })
      toast.success('Почта успешно подтверждена')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
