import { LogOut } from 'lucide-react'

import { useLogoutMutation } from '@/shared/api/auth'
import { Button } from '@/shared/ui/components/ui/button'

import s from './logoutButton.module.scss'

export function LogoutButton() {
  const { mutateAsync } = useLogoutMutation()

  async function onSubmit() {
    await mutateAsync()
  }
  return (
    <Button
      variant="destructive"
      type="button"
      className={s['logout-button']}
      onClick={onSubmit}
    >
      <LogOut />
      Выйти
    </Button>
  )
}
