import { type ReactNode, useEffect, useRef, useState } from 'react'

import { CheckCircle, XCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { useVerifyEmail } from '@/shared/api/account/useVerifyEmail'
import { useGetTokenFromQueryParam } from '@/shared/utils'

type VerifyState = 'loading' | 'success' | 'error'

type VerifyViewConfig = {
  title: string
  description: string
  hint?: ReactNode
  containerClassName: string
  titleClassName: string
  icon: ReactNode
}

const MISSING_TOKEN_MESSAGE = 'Токен не найден в ссылке'
const DEFAULT_ERROR_MESSAGE = 'Ссылка недействительна или уже устарела'

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.trim()
  ) {
    return error.message
  }

  return DEFAULT_ERROR_MESSAGE
}

export function VerifyPage() {
  const [state, setState] = useState<VerifyState>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const verifiedTokenRef = useRef<string | null>(null)

  const { mutateAsync } = useVerifyEmail()
  const { token, hasToken } = useGetTokenFromQueryParam()

  useEffect(() => {
    const requestKey = hasToken && token ? token : '__missing_token__'

    // Prevent duplicate verification requests (e.g. React Strict Mode in dev).
    if (verifiedTokenRef.current === requestKey) {
      return
    }

    verifiedTokenRef.current = requestKey

    const verifyEmail = async () => {
      if (!hasToken || !token) {
        setState('error')
        setErrorMsg(MISSING_TOKEN_MESSAGE)
        return
      }

      try {
        await mutateAsync(token)
        setState('success')
      } catch (error) {
        setState('error')
        setErrorMsg(getErrorMessage(error))
      }
    }

    void verifyEmail()
  }, [hasToken, mutateAsync, token])

  const viewByState: Record<VerifyState, VerifyViewConfig> = {
    loading: {
      title: 'Проверяем email',
      description: 'Подтверждаем адрес почты по ссылке из письма.',
      containerClassName: 'border-slate-200/80 dark:border-slate-700/70',
      titleClassName: 'text-slate-900 dark:text-white',
      icon: (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="mx-auto h-16 w-16 shrink-0 rounded-full border-4 border-emerald-200 border-t-emerald-500 sm:h-20 sm:w-20"
        />
      ),
    },
    success: {
      title: 'Email подтверждён',
      description:
        'Адрес почты успешно подтвержден. Теперь можно войти в аккаунт.',
      hint: (
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
          Подтверждение завершено безопасно
        </span>
      ),
      containerClassName: 'border-emerald-200/90 dark:border-emerald-500/40',
      titleClassName:
        'bg-linear-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent',
      icon: (
        <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r from-emerald-500 to-green-600 shadow-lg sm:h-20 sm:w-20">
          <CheckCircle className="h-9 w-9 text-white sm:h-11 sm:w-11" />
        </div>
      ),
    },
    error: {
      title: 'Ошибка подтверждения',
      description: errorMsg || DEFAULT_ERROR_MESSAGE,
      hint: (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Проверьте, что открыли последнюю ссылку из письма.
        </span>
      ),
      containerClassName: 'border-red-200/90 dark:border-red-500/40',
      titleClassName: 'text-slate-900 dark:text-white',
      icon: (
        <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-r from-red-500 to-rose-600 shadow-lg sm:h-20 sm:w-20">
          <XCircle className="h-9 w-9 text-white sm:h-11 sm:w-11" />
        </div>
      ),
    },
  }

  const { title, description, hint, containerClassName, titleClassName, icon } =
    viewByState[state]

  return (
    <div className="flex items-center justify-center bg-linear-to-br  px-4 py-8    sm:px-6 sm:py-10">
      <AnimatePresence mode="wait">
        <motion.article
          key={state}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 280, damping: 26 },
          }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          className={`w-full max-w-md space-y-5 rounded-3xl border bg-white/85 p-6 text-center shadow-[0_25px_70px_-35px_rgba(15,23,42,0.65)] backdrop-blur-xl dark:bg-slate-900/80 sm:space-y-6 sm:p-8 ${containerClassName}`}
        >
          {icon}

          <div className="space-y-2 sm:space-y-3">
            <h1
              className={`text-xl font-bold leading-tight sm:text-2xl ${titleClassName}`}
            >
              {title}
            </h1>
            <p className="break-words text-sm leading-relaxed text-slate-600 [overflow-wrap:anywhere] dark:text-slate-300 sm:text-base">
              {description}
            </p>
          </div>

          {hint && (
            <div className="break-words border-t border-slate-200/70 px-1 pt-3 [overflow-wrap:anywhere] dark:border-slate-700/70">
              {hint}
            </div>
          )}
        </motion.article>
      </AnimatePresence>
    </div>
  )
}
