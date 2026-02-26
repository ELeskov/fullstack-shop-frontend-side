import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { apiClient } from '@/shared/config'
import { QUERY_KEY } from '@/shared/config/query-key'

export const useSendResetPasswordEmailMessage = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.SEND_MESSAGE_RESET_PASSWORD_EMAIL],
    mutationFn: async (email: string) =>
      await apiClient.POST('/api/account/password/reset/send', {
        body: { email },
      }),
    onSuccess: async () => {
      toast.info(
        'Письмо с инструкциями по сбросу пароля отправлено на вашу почту',
        { duration: 5000 },
      )
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
