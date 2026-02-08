import { Link } from 'react-router'

import { Atom } from 'lucide-react'

import { cn } from '@/app/lib/utils'

import { LoginButton } from '@/features/loginButton'

import { ROUTES } from '@/shared/config'
import { Captcha } from '@/shared/ui/captcha'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { Label } from '@/shared/ui/components/ui/label'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Atom size={30} />
              </div>
              <span className="sr-only">Shop.</span>
            </a>
            <h1 className="text-xl! font-bold">Добро пожаловать в Shop.</h1>
            <div className="text-center text-sm">
              У вас нет аккаунта?{' '}
              <Link to={ROUTES.signup} className="underline underline-offset-4">
                Регистрация
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Captcha onVerify={(token) => console.log(token)} />
            <LoginButton />
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground text-base relative z-10 px-2">
              или
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                width="800px"
                height="800px"
                viewBox="-6 0 24 24"
              >
                <path d="m7.083 14.8-4.098 9.2h-2.986l4.5-9.834c-2.114-1.074-3.525-3.018-3.525-6.614-.005-5.034 3.185-7.551 6.979-7.551h3.858v24h-2.582v-9.2h-2.146zm2.147-12.62h-1.378c-2.08 0-4.097 1.378-4.097 5.372 0 3.858 1.847 5.1 4.097 5.1h1.378z" />
              </svg>
              Продолжить с Яндекс
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Продолжить с Google
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
