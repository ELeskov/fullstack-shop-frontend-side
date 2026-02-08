import { ArrowLeft, Home, SearchX } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/shared/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/ui/card'

type NotFoundProps = {
  title?: string
  description?: string
  homeHref?: string
  onBack?: () => void
}

export function FallBack({
  title = 'Этой страницы не существует',
  description = 'Проверьте адрес или вернитесь на главную.',
  homeHref = '/',
  onBack,
}: NotFoundProps) {
  const handleBack = () => {
    if (onBack) {
      return onBack()
    }
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <div className="min-h-svh w-full">
      <div className="mx-auto flex min-h-svh max-w-3xl items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full"
        >
          <Card className="border-muted/70">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/20"
                  aria-hidden="true"
                >
                  <SearchX className="h-5 w-5 text-muted-foreground" />
                </motion.div>

                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <CardTitle className="text-base sm:text-lg">
                      {title}
                    </CardTitle>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="text-sm text-muted-foreground"
                    >
                      404
                    </motion.span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.2 }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <Button asChild className="w-full sm:w-auto">
                  <a href={homeHref}>
                    <Home className="mr-2 h-4 w-4" />
                    На главную
                  </a>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.22, ease: 'easeOut' }}
                className="mt-5 text-xs text-muted-foreground"
              >
                Если вы перешли по ссылке из приложения — возможно, страница
                была перемещена или удалена.
              </motion.div>
            </CardContent>
          </Card>

          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="pointer-events-none mt-8 select-none text-center text-7xl font-semibold tracking-tight"
          >
            404
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
