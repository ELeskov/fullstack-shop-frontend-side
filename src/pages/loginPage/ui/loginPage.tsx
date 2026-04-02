import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import z from 'zod'

import { useLoginMutation } from '@/shared/api/account'
import { ROUTES } from '@/shared/config'
import { AuthProvidersButtons } from '@/shared/ui/authProvidersButtons'
import { Captcha } from '@/shared/ui/captcha'
import { Button } from '@/shared/ui/components/ui/button'
import { FieldLabel } from '@/shared/ui/components/ui/field'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import { Input } from '@/shared/ui/components/ui/input'

import s from './loginPage.module.scss'

const loginSchema = z.object({
  email: z
    .email({ message: 'Введите корректный адрес электронной почты' })
    .min(1, { message: 'Email обязателен' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
    .max(128, { message: 'Пароль должен содержать не более 128 символов' }),
  captcha: z.string(),
})

type Login = z.infer<typeof loginSchema>

export function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      captcha: '',
    },
    mode: 'onChange',
    shouldUnregister: false,
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const { mutateAsync: mutateLogin, isPending } = useLoginMutation()

  async function onSubmit(values: Login) {
    if (!values.captcha) {
      toast.error('Пройдите капчу!')
      return
    }

    try {
      await mutateLogin(values)
    } catch {
      // Ошибка обрабатывается в onError мутации.
    }
  }

  return (
    <div
      datatype="auth-page"
      className={`flex flex-col gap-3.5 w-112.5 ${s['login-page']}`}
    >
      <div>
        <h1 className="text-3xl!">Войти в аккаунт</h1>
        <p className={`mb-6! text-neutral-400/80 ${s['login-page__muted']}`}>
          Для входа на сайт используйте ваш email и пароль, которые были указаны
          при регистрации на сайте
        </p>
      </div>
      <AuthProvidersButtons className="mb-5" />
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@gmail.com"
                    className={s['login-page__input']}
                    disabled={isPending}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  <Link
                    to={ROUTES.sendResetPasswordEmail}
                    className="ml-auto inline-block underline-offset-4 hover:underline"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <FormControl>
                  <div className={s['login-page__password-wrap']}>
                    <Input
                      id="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`${s['login-page__input']} ${s['login-page__password-input']}`}
                      autoComplete="current-password"
                      disabled={isPending}
                      {...field}
                    />
                    <button
                      type="button"
                      className={s['login-page__password-toggle']}
                      onClick={() => setIsPasswordVisible(prev => !prev)}
                      aria-label={
                        isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'
                      }
                      disabled={isPending}
                    >
                      {isPasswordVisible ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="captcha"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <Captcha
                    onVerify={token => form.setValue('captcha', token)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Войти
          </Button>
          <div
            className={`text-center text-neutral-400/80 ${s['login-page__muted']}`}
          >
            У вас еще нет аккаунта?{' '}
            <Link to={ROUTES.signup} className="text-white">
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
