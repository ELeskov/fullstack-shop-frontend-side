import { useGetMe } from '@/shared/api'
import { useSendResetPasswordEmailMessage } from '@/shared/api/account/useSendResetPasswordEmailMessage'
import { CustomButton } from '@/shared/ui/customButton'

import s from './sendResetPasswordEmailButton.module.scss'

export function SendResetPasswordEmailButton() {
  const { mutateAsync, isPending } = useSendResetPasswordEmailMessage()
  const { data: user } = useGetMe()

  return (
    <CustomButton
      type="button"
      variant="outline"
      isLoading={isPending}
      onClick={() => mutateAsync(user ? user.email : '')}
      className={s['change-password-button']}
    >
      Сменить пароль
    </CustomButton>
  )
}
