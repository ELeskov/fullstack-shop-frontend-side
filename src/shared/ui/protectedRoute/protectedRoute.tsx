import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useGetMe } from '@/shared/api/auth/useGetMe'
import { ROUTES } from '@/shared/config'
import { type EnumUserRole } from '@/shared/constants'

interface ProtectedRouteProps {
  requiredRole?: EnumUserRole
  children: ReactNode
}

export function ProtectedRoute({
  requiredRole,
  children,
}: ProtectedRouteProps) {
  const { data: user, isLoading, isError } = useGetMe()
  const location = useLocation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !user) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={ROUTES.home} replace />
  }

  return <>{children}</>
}
