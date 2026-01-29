import { useNavigate } from 'react-router'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient, ROUTES } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useEmailVerify = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY_KEY.VERIFY_EMAIL],
    mutationFn: (verifyEmailToken: string) =>
      apiClient.POST('/api/auth/account/verify', {
        body: {
          token: verifyEmailToken,
        },
      }),
    onSuccess: () => {
      // navigate(ROUTES.profile.root)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
      console.log('success')
    },
    onError: () => {
      console.log('error')
    },
  })
}
