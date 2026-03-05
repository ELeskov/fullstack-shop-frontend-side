import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

import { toast } from 'sonner'

import { useGetMe } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { type EnumUserRole } from '@/shared/constants'
import { FullScreenLoader } from '@/shared/ui/fullScreenLoader'

interface ProtectedRouteProps {
  allowedRoles?: EnumUserRole[]
  children: ReactNode
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { data: user, isLoading, isError } = useGetMe()
  const location = useLocation()

  if (isLoading) {
    return <FullScreenLoader text="Проверка прав доступа..." />
  }
  if (isError || !user) {
    setTimeout(() => toast.error('Необходимо авторизоваться'), 0)
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = allowedRoles.includes(user.role)

    if (!hasPermission) {
      setTimeout(() => toast.error('Недостаточно прав для этой страницы'), 0)
      return <Navigate to={ROUTES.home} replace />
    }
  }

  return <>{children}</>
}
