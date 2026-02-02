import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import z from 'zod'

import { useResetPassword } from '@/shared/api/account/useResetPassword'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import { Input } from '@/shared/ui/components/ui/input'
import { useGetTokenFromQueryParam } from '@/shared/utils'

import s from './resetPasswordPage.module.scss'

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'Пароль должен содержать минимум 6 символов' })
      .max(128, { message: 'Пароль должен содержать не более 128 символов' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage() {
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    shouldUnregister: false,
    resetOptions: {
      keepDirtyValues: true,
    },
  })
  const { token, hasToken } = useGetTokenFromQueryParam()

  const { mutateAsync, isPending } = useResetPassword()

  async function handleResetPassword() {
    if (!hasToken) {
      toast.error('Невалидный токен')
      return <p>Ошибка</p>
    }

    const values = form.getValues()

    try {
      await mutateAsync({
        token: token,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      })

      form.reset()
    } catch {
      toast.error('Ошибка при смене пароля. Попробуйте еще раз.')
    }
  }

  return (
    <div className={s['reset-password-page']}>
      <div datatype="auth-page" className="flex flex-col gap-3.5 w-112.5">
        <div>
          <h1 className="text-3xl! ">Сброс пароля</h1>
          <p className="mb-6! text-neutral-400/80">
            Создайте новый надежный пароль для вашей учетной записи
          </p>
        </div>

        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(handleResetPassword)}
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новый пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-2" disabled={isPending}>
              Сбросить пароль
            </Button>

            <div className="text-center text-sm text-neutral-400/80">
              Вспомнили пароль?{' '}
              <Link to={ROUTES.login} className="text-white hover:underline">
                Войти в аккаунт
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
