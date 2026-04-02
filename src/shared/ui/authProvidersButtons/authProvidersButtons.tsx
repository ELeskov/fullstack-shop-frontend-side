import { FaYandex } from 'react-icons/fa'

import clsx from 'clsx'
import { toast } from 'sonner'

import { Button } from '@/shared/ui/components/ui/button'

import s from './authProvidersButtons.module.scss'

interface AuthProvidersButtonsProps {
  className?: string
}

function GoogleBrandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`${s['auth-providers-buttons__icon']} size-google-brand`}
    >
      <path
        d="M21.6 12.227c0-.818-.073-1.604-.209-2.364H12v4.47h5.386a4.607 4.607 0 0 1-2 3.02v2.51h3.227c1.89-1.742 2.987-4.31 2.987-7.636z"
        style={{ fill: '#4285F4' }}
      />
      <path
        d="M12 22c2.7 0 4.964-.895 6.618-2.424l-3.227-2.51c-.895.6-2.04.954-3.391.954-2.61 0-4.82-1.764-5.609-4.136H3.055v2.59A9.997 9.997 0 0 0 12 22z"
        style={{ fill: '#34A853' }}
      />
      <path
        d="M6.391 13.884A6.003 6.003 0 0 1 6.077 12c0-.654.113-1.29.314-1.884v-2.59H3.055A9.997 9.997 0 0 0 2 12c0 1.61.386 3.132 1.055 4.474l3.336-2.59z"
        style={{ fill: '#FBBC05' }}
      />
      <path
        d="M12 5.98c1.468 0 2.785.505 3.822 1.495l2.864-2.864C16.959 2.99 14.695 2 12 2A9.997 9.997 0 0 0 3.055 7.526l3.336 2.59C7.18 7.744 9.39 5.98 12 5.98z"
        style={{ fill: '#EA4335' }}
      />
    </svg>
  )
}

export function AuthProvidersButtons({ className }: AuthProvidersButtonsProps) {
  return (
    <div className={clsx(s['auth-providers-buttons'], className)}>
      <Button
        variant="outline"
        type="button"
        className={s['auth-providers-buttons__button']}
        onClick={() => toast.info('Вход через Google скоро появится')}
      >
        <GoogleBrandIcon />
        <span className={s['auth-providers-buttons__label']}>
          Продолжить с Google
        </span>
      </Button>

      <Button
        variant="outline"
        type="button"
        className={s['auth-providers-buttons__button']}
        onClick={() => toast.info('Вход через Яндекс скоро появится')}
      >
        <FaYandex
          className={`${s['auth-providers-buttons__yandex-icon']} size-yandex-brand`}
        />
        <span className={s['auth-providers-buttons__label']}>
          Продолжить с Яндекс
        </span>
      </Button>
    </div>
  )
}
