import { useState } from 'react'
import { useForm } from 'react-hook-form'

import clsx from 'clsx'
import { Pen, UserRoundX } from 'lucide-react'

import { ChangePasswordButton } from '@/features/changePasswordButton'
import { LogoutButton } from '@/features/logoutButton'
import { useGetMe } from '@/shared/api/auth/useGetMe'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import { Input } from '@/shared/ui/components/ui/input'

import s from './userSettings.module.scss'

export function UserSettings() {
  const form = useForm()
  const [isShowIcon, setIsShowIcon] = useState(false)

  const { data: user, isLoading } = useGetMe()

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
              <AvatarImage src={user.picture} />
              <AvatarFallback>
                <UserRoundX size={20} />
              </AvatarFallback>
            </Avatar>
            <Pen
              className={clsx(
                `absolute bottom-0 right-0 hidden`,
                isShowIcon ? 'block!' : '',
              )}
              size={18}
            />
          </div>

          <div className={s['user-settings__information']}>
            <div className={s['user-settings__name']}>{user.name}</div>
            <div className={s['user-settings__email']}>{user.email}</div>
          </div>
        </div>
        <Form {...form}>
          <div className={s['user-settings__form-content']}>
            <div className={s['user-settings__input-group']}>
              <FormField
                control={form.control}
                name="firstName"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Имя"
                        name="firstName"
                        value={user.name}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>

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
