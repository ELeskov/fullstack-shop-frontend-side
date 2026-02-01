import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, TriangleAlert } from 'lucide-react'
import z from 'zod'

import { ChangePasswordButton } from '@/features/changePasswordButton'
import { LogoutButton } from '@/features/logoutButton'
import { useEmailVerify, useGetMe, usePatchUser } from '@/shared/api'
import { Badge } from '@/shared/ui/components/ui/badge'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import { UserAvatarUpload } from '@/shared/ui/userAvatarUpload'

import s from './userSettings.module.scss'

const firstNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Имя обязательно' })
    .max(50, { message: 'Имя не должно превышать 50 символов' }),
})

const emailSchema = z.object({
  email: z
    .email({ message: 'Введите корректный email' })
    .min(1, { message: 'Email обязателен' }),
})

type FirstNameForm = z.infer<typeof firstNameSchema>
type EmailForm = z.infer<typeof emailSchema>

export function UserSettings() {
  const { data: user, isLoading } = useGetMe()

  const { mutateAsync: mutateFirstNameChange, isPending } = usePatchUser()
  const { mutateAsync: mutateEmailVerify } = useEmailVerify()

  const firstNameForm = useForm<FirstNameForm>({
    resolver: zodResolver(firstNameSchema),
    defaultValues: { firstName: '' },
  })

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  useEffect(() => {
    if (user) {
      firstNameForm.reset({ firstName: user.name || '' })
      emailForm.reset({ email: user.email || '' })
    }
  }, [user, isLoading])

  const handleChangeUsername = async () => {
    const values = firstNameForm.getValues()

    if (user?.name !== values.firstName && !firstNameForm.formState.isValid) {
      return
    }

    await mutateFirstNameChange({
      firstName: values.firstName,
    })

    firstNameForm.reset(values)
  }

  const handleChangeEmail = async () => {
    const values = emailForm.getValues()

    if (!emailForm.formState.isValid) {
      return
    }

    await mutateEmailVerify(values.email)

    emailForm.reset(values)
  }

  if (isLoading || !user) {
    return <div>Загрузка...</div>
  }

  return (
    <section className={s['user-settings']}>
      <div className={s['user-settings__content']}>
        <div className={s['user-settings__preview-info-container']}>
          <UserAvatarUpload user={user} />

          <div className={s['user-settings__information']}>
            <div className={s['user-settings__name']}>{user?.name}</div>
            <div className={s['user-settings__email']}>{user?.email}</div>
          </div>
        </div>

        <FieldGroup className={s['user-settings__form-content']}>
          <Controller
            name="firstName"
            control={firstNameForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="user-settings-first-name">Имя</FieldLabel>
                <div className="flex gap-3">
                  <Input
                    {...field}
                    id="user-settings-first-name"
                    type="text"
                    placeholder="Имя"
                    aria-invalid={fieldState.invalid}
                  />
                  <Button disabled={isPending} onClick={handleChangeUsername}>
                    Сохранить
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="email"
            control={emailForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-[70%]">
                <div className="flex gap-2.5">
                  <FieldLabel htmlFor="user-settings-email">Email</FieldLabel>{' '}
                  {user?.isVerified && (
                    <Badge
                      variant={'ghost'}
                      className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                    >
                      <CircleCheck className="fill-green-500 dark:fill-green-400 text-black border-none!" />{' '}
                      Подтверждена
                    </Badge>
                  )}
                </div>
                <div className="flex gap-3">
                  <Input
                    {...field}
                    id="user-settings-email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {!user?.isVerified && (
                    <Button variant={'secondary'} onClick={handleChangeEmail}>
                      Подтвердить
                    </Button>
                  )}
                </div>
                {!user?.isVerified && (
                  <Badge className="bg-transparent dark:text-yellow-400 flex justify-start">
                    Почта не подтверждена{' '}
                    <TriangleAlert className='className=" dark:fill-amber-400 text-black border-none!"' />
                  </Badge>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className={s['user-settings__bottom-items']}>
          <div className="flex gap-3">
            <ChangePasswordButton />
            <LogoutButton />
          </div>
        </div>
      </div>
    </section>
  )
}
