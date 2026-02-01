import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useSendVerifyEmailMessage = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.SEND_MESSAGE_VERIFY_EMAIL],
    mutationFn: (email: string) =>
      apiClient.POST('/api/account/email/verification/send', {
        body: { email },
      }),
    onSuccess: async () => {
      toast.success('Сообщение с подтверждением было отправлено на вашу почту.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
