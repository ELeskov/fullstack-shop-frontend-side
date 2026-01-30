import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { ChangePasswordButton } from '@/features/changePasswordButton'
import { LogoutButton } from '@/features/logoutButton'
import { useGetMe, usePatchUser } from '@/shared/api'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import { UserAvatarUpload } from '@/shared/ui/userAvatarUpload'

import s from './userSettings.module.scss'

const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Имя обязательно' })
    .max(50, { message: 'Имя не должно превышать 50 символов' }),
  email: z
    .email({ message: 'Введите корректный email' })
    .min(1, { message: 'Email обязателен' }),
})

type UserSettingsForm = z.infer<typeof userSettingsSchema>

export function UserSettings() {
  const { data: user, isLoading } = useGetMe()
  const { mutateAsync } = usePatchUser()

  const form = useForm<UserSettingsForm>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      firstName: '',
      email: '',
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.name || '',
        email: user.email || '',
      })
    }
  }, [user, form])

  const handleUpdateUserSettings = async () => {
    if (
      user?.name !== form.getValues().firstName ||
      user.email !== form.getValues().email
    ) {
      await mutateAsync({
        firstName: form.getValues().firstName,
        newEmail: form.getValues().email,
      })
    }
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

        <form>
          <FieldGroup className={s['user-settings__form-content']}>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-settings-first-name">
                    Имя
                  </FieldLabel>
                  <Input
                    {...field}
                    onBlur={handleUpdateUserSettings}
                    id="user-settings-first-name"
                    type="text"
                    placeholder="Имя"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="user-settings-email">Email</FieldLabel>
                  <Input
                    {...field}
                    onBlur={handleUpdateUserSettings}
                    id="user-settings-email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <div className={s['user-settings__bottom-items']}>
          <div className="flex gap-3">
            <LogoutButton />
            <ChangePasswordButton />
          </div>
        </div>
      </div>
    </section>
  )
}
