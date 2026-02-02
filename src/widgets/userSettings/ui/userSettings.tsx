import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, TriangleAlert } from 'lucide-react'
import z from 'zod'

import { LogoutButton } from '@/features/logoutButton'
import { SendEmailVerifyMessageButton } from '@/features/sendEmailVerifyMessageButton'
import { ChangePasswordButton } from '@/features/sendResetPasswordEmailButton'
import { useGetMe, usePatchUser } from '@/shared/api'
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

type FirstNameForm = z.infer<typeof firstNameSchema>

export function UserSettings() {
  const { data: user, isLoading } = useGetMe()
  const { mutateAsync, isPending } = usePatchUser()

  const firstNameForm = useForm<FirstNameForm>({
    resolver: zodResolver(firstNameSchema),
    defaultValues: { firstName: '' },
  })

  useEffect(() => {
    if (user) {
      firstNameForm.reset({ firstName: user.name || '' })
    }
  }, [user])

  const handleChangeUsername = async () => {
    const values = firstNameForm.getValues()

    if (!firstNameForm.formState.isValid) {
      return
    }

    if (user?.name === values.firstName) {
      return
    }

    await mutateAsync({ firstName: values.firstName })

    firstNameForm.reset(values)
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
            <div className={s['user-settings__name']}>{user.name}</div>
            <div className={s['user-settings__email']}>{user.email}</div>
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
                    type="text"
                    placeholder="Имя"
                    id="user-settings-first-name"
                    aria-invalid={fieldState.invalid}
                  />
                  <Button
                    disabled={
                      isPending ||
                      user.name === field.value ||
                      !firstNameForm.formState.isValid
                    }
                    onClick={handleChangeUsername}
                  >
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

        <div className={s['user-settings__email-section']}>
          <div className="flex items-center mb-3 gap-3">
            <span className="font-medium text-sm">Email</span>
            {!user.isVerified ? (
              <TriangleAlert size={15} className="text-yellow-400" />
            ) : (
              <CircleCheck size={15} className="text-green-400" />
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground bg-muted px-2 py-1 rounded-md">
              {user.email}
            </span>
            {!user.isVerified && <SendEmailVerifyMessageButton />}
          </div>
        </div>

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
