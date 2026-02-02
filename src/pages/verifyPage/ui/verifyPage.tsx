import { useEffect, useState } from 'react'

import { CheckCircle, XCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { useVerifyEmail } from '@/shared/api/account/useVerifyEmail'
import { useGetTokenFromQueryParam } from '@/shared/utils'

type VerifyState = 'loading' | 'success' | 'error'

export function VerifyPage() {
  const [state, setState] = useState<VerifyState>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  const { mutateAsync, error } = useVerifyEmail()
  const { token, hasToken } = useGetTokenFromQueryParam()

  useEffect(() => {
    const verifyEmail = async () => {
      if (!hasToken) {
        setState('error')
        setErrorMsg('Токен не найден в ссылке')
        return
      }

      try {
        await mutateAsync(token)
        setState('success')
      } catch {
        setState('error')
        setErrorMsg(error?.message || 'Ссылка недействительна')
      }
    }

    verifyEmail()
  }, [token, mutateAsync])

  return (
    <div className="bg-linear-to-br  flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <AnimatePresence mode="wait">
        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-sm w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-10 text-center space-y-6 min-h-80 flex flex-col justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-emerald-200 border-t-emerald-500 rounded-full mx-auto mb-6 shrink-0"
            />

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                Проверяем email
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed px-2">
                Подтверждаем ваш адрес почты по ссылке из письма...
              </p>
            </div>
          </motion.div>
        )}

        {state === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 300, damping: 30 },
            }}
            className="max-w-sm w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200 p-8 sm:p-10 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
                delay: 0.2,
              }}
              className="w-24 h-24 sm:w-28 sm:h-28 bg-linear-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6 shrink-0"
            >
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" />
            </motion.div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent leading-tight">
                Email подтверждён!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                Ваш адрес почты успешно подтверждён
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 font-medium leading-relaxed">
                Теперь вы можете закрыть эту страницу и{' '}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  войти в аккаунт
                </span>
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-700 px-2"
            >
              ✅ Подтверждение завершено безопасно
            </motion.div>
          </motion.div>
        )}

        {state === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-200/50 p-8 sm:p-10 text-center space-y-6 flex flex-col justify-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-r from-red-500/90 to-pink-600/90 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shrink-0">
              <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center px-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                Ошибка подтверждения
              </h1>
              <p
                className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed wrap-break-word max-w-full hyphens-auto"
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {errorMsg}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ссылка может быть недействительной или устаревшей
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
