'use client'

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Pen, UserRoundX } from 'lucide-react'
import z from 'zod'

import { ChangePasswordButton } from '@/features/changePasswordButton'
import { LogoutButton } from '@/features/logoutButton'
import { useGetMe, useUpdateUserData } from '@/shared/api'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'

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
  const { mutateAsync } = useUpdateUserData()
  const [isShowIcon, setIsShowIcon] = useState(false)

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

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <section className={s['user-settings']}>
      <div className={s['user-settings__content']}>
        <div className={s['user-settings__preview-info-container']}>
          <div className={s['user-settings__image-wrapper']}>
            <Avatar
              onMouseEnter={() => setIsShowIcon(true)}
              onMouseLeave={() => setIsShowIcon(false)}
              className={s['user-settings__image']}
            >
              <AvatarImage src={user?.picture} />
              <AvatarFallback>
                <UserRoundX size={20} />
              </AvatarFallback>
            </Avatar>
            <Pen
              className={clsx(
                'absolute bottom-0 right-0 hidden',
                isShowIcon ? 'block!' : '',
              )}
              size={18}
            />
          </div>

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
