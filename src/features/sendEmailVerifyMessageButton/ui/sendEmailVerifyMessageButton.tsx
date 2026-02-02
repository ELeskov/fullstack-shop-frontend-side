import { useGetMe, useSendVerifyEmailMessage } from '@/shared/api'
import { CustomButton } from '@/shared/ui/customButton'

export function SendEmailVerifyMessageButton() {
  const { data: user } = useGetMe()
  const { mutateAsync, isPending } = useSendVerifyEmailMessage()

  async function onSubmit() {
    if (!user) {
      return null
    }

    await mutateAsync(user.email)
  }

  return (
    <CustomButton variant="secondary" onClick={onSubmit} isLoading={isPending}>
      Подтвердить
    </CustomButton>
  )
}
