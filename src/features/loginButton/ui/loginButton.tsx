import { Button } from '@/shared/ui/components/ui/button'

import s from './loginButton.module.scss'

export function LoginButton() {
  return (
    <Button type="submit" className={s['login-button']}>
      Войти
    </Button>
  )
}
