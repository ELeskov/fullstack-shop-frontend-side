import { useForm } from 'react-hook-form'
import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import z from 'zod'

import { useLoginMutation } from '@/shared/api/auth'
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

  const { mutateAsync, isPending } = useLoginMutation()

  async function onSubmit(values: Login) {
    // if (!values.captcha) {
    //   toast.warning('Пройдите капчу!')
    //   return
    // }

    await mutateAsync(values)
  }

  return (
    <div datatype="auth-page" className="flex flex-col gap-3.5 w-112.5">
      <div>
        <h1 className="text-3xl! ">Войти в аккаунт</h1>
        <p className="mb-6! text-neutral-400/80">
          Для входа на сайт используйте ваш email и пароль, которые были указаны
          при регистрации на сайте
        </p>
      </div>
      <div className="flex gap-4 mb-5 justify-around">
        <Button
          variant="outline"
          type="button"
          className="hover:text-red-400 grow"
        >
          <FaYandex size={50} color="red" />
        </Button>
        <Button variant="outline" type="button" className="grow">
          <FcGoogle />
        </Button>
      </div>
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
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
                    type="password"
                    autoComplete="current-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
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
          /> */}
          <Button type="submit" disabled={isPending}>
            Войти
          </Button>
          <div className="text-center text-sm text-neutral-400/80">
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
