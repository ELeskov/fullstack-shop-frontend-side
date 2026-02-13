import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useVerifyEmail = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.VERIFY_EMAIL],
    mutationFn: async (token: string) => {
      const { data } = await apiClient.POST('/api/account/email/verify', {
        body: { token },
      })

      return data
    },
    onSuccess: async () => {
      toast.success('Почта успешно подтверждена!')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
