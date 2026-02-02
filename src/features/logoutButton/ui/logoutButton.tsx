import { LogOut } from 'lucide-react'

import { useLogoutMutation } from '@/shared/api/account'
import { CustomButton } from '@/shared/ui/customButton'

import s from './logoutButton.module.scss'

export function LogoutButton() {
  const { mutateAsync, isPending } = useLogoutMutation()

  async function onSubmit() {
    await mutateAsync()
  }

  return (
    <CustomButton
      type="button"
      onClick={onSubmit}
      isLoading={isPending}
      variant="destructive"
      className={s['logout-button']}
    >
      <LogOut />
      Выйти
    </CustomButton>
  )
}
