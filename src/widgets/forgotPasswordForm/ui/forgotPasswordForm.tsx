import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import z from 'zod'

import { useSendResetPasswordEmailMessage } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import { Input } from '@/shared/ui/components/ui/input'
import { CustomButton } from '@/shared/ui/customButton'

import s from './forgotPasswordForm.module.scss'

const forgotPasswordSchema = z.object({
  email: z.email('Некорректный адрес электронной почты'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  })

  const { mutateAsync, isPending } = useSendResetPasswordEmailMessage()

  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      await mutateAsync(data.email)

      form.reset()
    } catch {
      toast.error(
        'Не удалось отправить письмо. Проверьте корректность email и попробуйте снова',
        { duration: 4000 },
      )
    }
  }

  return (
    <div className={s['forgot-password-page']}>
      <div className="w-120 border rounded-xl p-5 ">
        <div className="text-center flex flex-col justify-center gap-3">
          <h3 className="text-3xl font-bold">Забыли пароль?</h3>
          <p className="mb-6 text-neutral-400/80">
            Мы вышлем ссылку для восстановления доступа к аккаунту
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 my-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Электронная почта</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      autoComplete="email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomButton
              type="submit"
              isLoading={isPending}
              disabled={!form.formState.isValid}
            >
              Сбросить
            </CustomButton>

            <div className="text-center text-sm text-neutral-400/80 flex gap-2 justify-center">
              Вспомнили пароль?
              <Link
                to={ROUTES.login}
                className="text-primary hover:underline font-medium"
              >
                Войти в аккаунт
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
