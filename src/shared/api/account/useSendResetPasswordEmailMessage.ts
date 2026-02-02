import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useSendResetPasswordEmailMessage = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.SEND_MESSAGE_RESET_PASSWORD_EMAIL],
    mutationFn: (email: string) =>
      apiClient.POST('/api/account/password/reset/send', {
        body: { email },
      }),
    onSuccess: async () => {
      toast.info('Сообщение со сбросом пароля было отправлено на вашу почту.')
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
