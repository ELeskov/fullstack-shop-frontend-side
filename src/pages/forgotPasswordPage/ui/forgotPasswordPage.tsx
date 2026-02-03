import { ForgotPasswordForm } from '@/widgets/forgotPasswordForm'

import s from './forgotPasswordPage.module.scss'

export const ForgotPasswordPage = () => {
  return (
    <div className={s['forgot-password-page']}>
      <ForgotPasswordForm />
    </div>
  )
}
