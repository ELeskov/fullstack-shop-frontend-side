import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import z from 'zod'

import { useRegisterMutation } from '@/shared/api/account'
import { ROUTES } from '@/shared/config'
import { AuthProvidersButtons } from '@/shared/ui/authProvidersButtons'
import { Captcha } from '@/shared/ui/captcha'
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

import s from './signupPage.module.scss'

const registerSchema = z.object({
  name: z.string().min(1, { message: 'Имя обязательно' }),
  email: z
    .email({ message: 'Введите корректный адрес электронной почты' })
    .min(1, { message: 'Email обязателен' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
    .max(128, { message: 'Пароль должен содержать не более 128 символов' }),
  captcha: z.string(),
})

type Register = z.infer<typeof registerSchema>

export function SignupPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      captcha: '',
    },
  })

  const { mutateAsync, isPending } = useRegisterMutation()

  async function onSubmit(values: Register) {
    if (!values.captcha) {
      toast.warning('Пройдите капчу!')
      return
    }

    try {
      await mutateAsync(values)
    } catch {
      // Ошибка обрабатывается в onError мутации.
    }
  }

  return (
    <div
      datatype="auth-page"
      className={`flex flex-col gap-3.5 w-112.5 ${s['signup-page']}`}
    >
      <div>
        <h1 className="text-3xl! ">Создать аккаунт</h1>
        <p className={`mb-6! text-neutral-400/80 ${s['signup-page__muted']}`}>
          Создай аккаунт, чтобы открыть больше возможностей платформы
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="given-name"
                    placeholder="Иван Иванов"
                    className={s['signup-page__input']}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@gmail.com"
                    className={s['signup-page__input']}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <div className={s['signup-page__password-wrap']}>
                    <Input
                      placeholder="*******"
                      type={isPasswordVisible ? 'text' : 'password'}
                      className={`${s['signup-page__input']} ${s['signup-page__password-input']}`}
                      disabled={isPending}
                      {...field}
                    />
                    <button
                      type="button"
                      className={s['signup-page__password-toggle']}
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
                    onVerify={(token) => form.setValue('captcha', token)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Зарегистрироваться
          </Button>
          <div className={`text-center text-neutral-400/80 ${s['signup-page__muted']}`}>
            У вас уже есть аккаунт?{' '}
            <Link to={ROUTES.login} className="text-white">
              Войти
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
