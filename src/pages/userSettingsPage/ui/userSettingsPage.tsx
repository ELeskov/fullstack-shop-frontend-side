import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import {
  Ellipsis,
  KeyRound,
  LoaderCircle,
  LogOut,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { z } from 'zod'

import { ProfileHeader } from '@/widgets/profileHeader'

import {
  useGetMe,
  useLogoutMutation,
  usePatchUser,
  useSendResetPasswordEmailMessage,
  useSendVerifyEmailMessage,
} from '@/shared/api'
import { Badge } from '@/shared/ui/components/ui/badge'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'
import { UserAvatarUpload } from '@/shared/ui/userAvatarUpload'

import s from './userSettingsPage.module.scss'

const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Введите имя')
    .max(50, 'Максимум 50 символов'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function UserSettingsPage() {
  const { data: user, isLoading } = useGetMe()
  const { mutateAsync: patchUser, isPending: isUserUpdating } = usePatchUser()
  const { mutateAsync: logout, isPending: isLogoutPending } =
    useLogoutMutation()
  const { mutateAsync: sendVerifyEmail, isPending: isVerifyPending } =
    useSendVerifyEmailMessage()
  const {
    mutateAsync: sendResetPasswordEmail,
    isPending: isResetPasswordPending,
  } = useSendResetPasswordEmailMessage()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: '' },
    mode: 'onChange',
  })

  useEffect(() => {
    if (!user) {
      return
    }

    form.reset({ firstName: user.name || '' })
  }, [form, user])

  if (isLoading) {
    return <LoadingData />
  }

  if (!user) {
    return <EmptyData title="Не удалось загрузить настройки пользователя" />
  }

  const handleSaveProfile = form.handleSubmit(async values => {
    await patchUser({ firstName: values.firstName })
  })

  const handleResetPassword = async () => {
    await sendResetPasswordEmail(user.email)
  }

  const handleVerifyEmail = async () => {
    await sendVerifyEmail(user.email)
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <section className={s['account-settings-page']}>
      <ProfileHeader title="Аккаунт" />

      <div className={s['account-settings-page__section']}>
        <h2 className={s['account-settings-page__section-title']}>Профиль</h2>

        <form
          className={s['account-settings-page__box']}
          onSubmit={handleSaveProfile}
        >
          <div className={s['account-settings-page__profile-row']}>
            <UserAvatarUpload user={user} />

            <div className={s['account-settings-page__profile-info']}>
              <p className={s['account-settings-page__row-title']}>Аватарка</p>
              <p className={s['account-settings-page__row-description']}>
                Форматы: JPG, JPEG, PNG, WEBP. Макс. размер: 10 МБ.
              </p>
            </div>
          </div>

          <div className={s['account-settings-page__field']}>
            <label
              htmlFor="account-settings-name"
              className={s['account-settings-page__label']}
            >
              Ваше имя
            </label>
            <div className={s['account-settings-page__input-row']}>
              <Input
                id="account-settings-name"
                {...form.register('firstName')}
                className={s['account-settings-page__input']}
                placeholder="Введите имя"
              />

              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-500"
                disabled={
                  isUserUpdating ||
                  !form.formState.isDirty ||
                  !form.formState.isValid
                }
              >
                {isUserUpdating ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <ShieldCheck />
                )}
                Сохранить
              </Button>
            </div>
            {form.formState.errors.firstName ? (
              <p className={s['account-settings-page__error']}>
                {form.formState.errors.firstName.message}
              </p>
            ) : null}
            <p className={s['account-settings-page__hint']}>
              Измените ваше имя на любое, какое захотите.
            </p>
          </div>
        </form>
      </div>

      <div className={s['account-settings-page__section']}>
        <h2 className={s['account-settings-page__section-title']}>Аккаунт</h2>

        <div className={s['account-settings-page__box']}>
          <div className={s['account-settings-page__action-row']}>
            <div className={s['account-settings-page__action-icon']}>
              <Mail size={18} />
            </div>
            <div className={s['account-settings-page__action-content']}>
              <div className={s['account-settings-page__action-head']}>
                <p className={s['account-settings-page__row-title']}>Почта</p>
                <Badge
                  variant={user.isVerified ? 'secondary' : 'outline'}
                  className={
                    user.isVerified
                      ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                      : 'border-amber-500/30 bg-amber-500/15 text-amber-300'
                  }
                >
                  {user.isVerified ? 'Подтверждена' : 'Не подтверждена'}
                </Badge>
              </div>
              <p className={s['account-settings-page__row-description']}>
                Учетная запись привязана к адресу <b>{user.email}</b>.
              </p>
            </div>
            {!user.isVerified ? (
              <Button
                type="button"
                variant="outline"
                className="border-white/12 bg-white/3 text-zinc-100 hover:bg-white/10 hover:text-white"
                onClick={handleVerifyEmail}
                disabled={isVerifyPending}
              >
                {isVerifyPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : null}
                Подтвердить
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                className="text-zinc-400 hover:bg-transparent hover:text-zinc-300"
                disabled
              >
                <Ellipsis />
              </Button>
            )}
          </div>

          <div className={s['account-settings-page__divider']} />

          <div className={s['account-settings-page__action-row']}>
            <div className={s['account-settings-page__action-icon']}>
              <KeyRound size={18} />
            </div>
            <div className={s['account-settings-page__action-content']}>
              <p className={s['account-settings-page__row-title']}>Пароль</p>
              <p className={s['account-settings-page__row-description']}>
                При необходимости вы можете изменить пароль для повышения
                безопасности аккаунта.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="border-white/12 bg-white/3 text-zinc-100 hover:bg-white/10 hover:text-white"
              onClick={handleResetPassword}
              disabled={isResetPasswordPending}
            >
              {isResetPasswordPending ? (
                <LoaderCircle className="animate-spin" />
              ) : null}
              Изменить
            </Button>
          </div>
        </div>
      </div>

      <div className={s['account-settings-page__section']}>
        <h2 className={s['account-settings-page__section-title']}>Действия</h2>

        <div className={s['account-settings-page__box']}>
          <div className={s['account-settings-page__action-row']}>
            <div className={s['account-settings-page__action-content']}>
              <p className={s['account-settings-page__row-title']}>Выход</p>
              <p className={s['account-settings-page__row-description']}>
                Завершите сеанс, чтобы выйти из аккаунта на этом устройстве.
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              className={clsx(
                s['account-settings-page__logout-button'],
                'border-white/12 bg-white/3 text-zinc-100 hover:bg-white/10 hover:text-white',
              )}
              onClick={handleLogout}
              disabled={isLogoutPending}
            >
              {isLogoutPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <LogOut />
              )}
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
